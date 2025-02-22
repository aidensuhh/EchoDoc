from flask import Flask, request, jsonify
import os
import torch
from openvoice import se_extractor
from openvoice.api import ToneColorConverter
from melo.api import TTS

def initialize_openvoice(ckpt_path='checkpoints_v2/converter', output_dir='outputs_v2'):
    """
    Initialize OpenVoice components and create necessary directories
    """
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    
    # Initialize tone color converter
    tone_color_converter = ToneColorConverter(
        f'./OpenVoice/{ckpt_path}/config.json', 
        device=device
    )
    tone_color_converter.load_ckpt(f'./OpenVoice/{ckpt_path}/checkpoint.pth')
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    return tone_color_converter, device

def load_reference_voice(reference_path, tone_color_converter):
    """
    Load and process reference voice for cloning
    """
    target_se, audio_name = se_extractor.get_se(
        reference_path, 
        tone_color_converter, 
        vad=True
    )
    return target_se

def generate_voice(prompt, tone_color_converter, target_se, 
                  output_dir='outputs_v2', language='EN'):
    """
    Generate voice clone with given prompt
    """
    src_path = f'{output_dir}/tmp.wav'
    
    # Initialize TTS model
    model = TTS(language=language, device=device)
    
    # Get English speaker
    speaker_ids = {k: v for k, v in model.hps.data.spk2id.items() 
                  if k.startswith(language)}
    speaker_key = list(speaker_ids.keys())[0]
    speaker_id = speaker_ids[speaker_key]
    speaker_key = speaker_key.lower().replace('_', '-')
    
    # Load source speaker embedding
    source_se = torch.load(
        f'./OpenVoice/checkpoints_v2/base_speakers/ses/{speaker_key}.pth',
        map_location=device
    )
    
    # Generate initial speech with fixed speed of 1.0
    model.tts_to_file(prompt, speaker_id, src_path, speed=1.0)
    save_path = f'{output_dir}/output_v2_{speaker_key}.wav'
    
    # Convert to target voice
    encode_message = "@MyShell"
    tone_color_converter.convert(
        audio_src_path=src_path,
        src_se=source_se,
        tgt_se=target_se,
        output_path=save_path,
        message=encode_message
    )
    
    return save_path

# Initialize Flask app
app = Flask(__name__)

# Initialize OpenVoice components
tone_color_converter, device = initialize_openvoice()

# Load reference voice
reference_speaker = './OpenVoice/resources/audio.mp3'
target_se = load_reference_voice(reference_speaker, tone_color_converter)

@app.route('/')
def hello():
    return 'Hello, Flask!'

@app.route('/generate', methods=['POST'])
def generate_voice_endpoint():
    data = request.json
    prompt = data.get('prompt', '')
    
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400
    
    try:
        output_path = generate_voice(
            prompt=prompt,
            tone_color_converter=tone_color_converter,
            target_se=target_se
        )
        return jsonify({
            'message': 'Voice generated successfully',
            'output_path': output_path
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)