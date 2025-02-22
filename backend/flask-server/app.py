from flask import Flask, request, jsonify, send_file
import os
import torch
from openvoice import se_extractor
from openvoice.api import ToneColorConverter
from melo.api import TTS
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, Flask!'


ckpt_converter = 'checkpoints_v2/converter'
device = "cuda:0" if torch.cuda.is_available() else "cpu"
output_dir = 'outputs_v2'
tone_color_converter = ToneColorConverter(f'./OpenVoice/{ckpt_converter}/config.json', device=device)
tone_color_converter.load_ckpt(f'./OpenVoice/{ckpt_converter}/checkpoint.pth')
os.makedirs(output_dir, exist_ok=True)
reference_speaker = './OpenVoice/resources/audio.mp3' # This is the voice you want to clone
target_se, audio_name = se_extractor.get_se(reference_speaker, tone_color_converter, vad=True)

@app.route('/generateOpenVoiceTTS', methods=['POST'])
def generateOpenVoiceTTS():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
            
        input_text = data['text']
        src_path = f'{output_dir}/tmp.wav'
        
        # Initialize TTS model with fixed English language
        model = TTS(language='EN', device=device)
        
        # Get speaker information
        speaker_ids = model.hps.data.spk2id
        first_speaker_key = next(iter(speaker_ids.keys()))
        speaker_id = speaker_ids[first_speaker_key]
        
        # Load source speaker embedding
        source_se = torch.load(f'./OpenVoice/checkpoints_v2/base_speakers/ses/{first_speaker_key}.pth', 
                             map_location=device)
        
        # Generate initial TTS audio with fixed speed
        model.tts_to_file(input_text, speaker_id, src_path, speed=1.0)
        save_path = f'./{output_dir}/audio.wav'
        
        # Apply voice cloning
        encode_message = "@MyShell"
        tone_color_converter.convert(
            audio_src_path=src_path,
            src_se=source_se,
            tgt_se=target_se,
            output_path=save_path,
            message=encode_message
        )
        return send_file(
            save_path,
            mimetype='audio/wav',
            as_attachment=True,
            download_name=f'audio.wav'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Clean up temporary files
        if os.path.exists(src_path):
            os.remove(src_path)
        if os.path.exists(save_path):
            os.remove(save_path)
    
    

# texts = {
#     'EN': "Did you ever hear a folk tale about a giant turtle?"
# }


# src_path = f'{output_dir}/tmp.wav'

# # Speed is adjustable
# speed = 1.0

# for language, text in texts.items():
#     model = TTS(language=language, device=device)
    
#     speaker_ids = model.hps.data.spk2id
#     first_speaker_key = next(iter(speaker_ids.keys()))  # Get the first key

#     speaker_id = speaker_ids[first_speaker_key]
#     first_speaker_key = first_speaker_key.lower().replace('_', '-')

#     source_se = torch.load(f'./OpenVoice/checkpoints_v2/base_speakers/ses/{first_speaker_key}.pth', map_location=device)
#     model.tts_to_file(text, speaker_id, src_path, speed=speed)
#     save_path = f'{output_dir}/output_v2_{first_speaker_key}.wav'

#     # Run the tone color converter
#     encode_message = "@MyShell"
#     tone_color_converter.convert(
#     audio_src_path=src_path, 
#     src_se=source_se, 
#     tgt_se=target_se, 
#     output_path=save_path,
#     message=encode_message)

if __name__ == '__main__':
    app.run(debug=True)