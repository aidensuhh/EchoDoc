from flask import Flask, request, jsonify
import os
import torch
from openvoice import se_extractor
from openvoice.api import ToneColorConverter

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, Flask!'

@app.route('/convert', methods=['GET'])
def convert():
    text = request.args.get('text', 'Hello World')
    
    try:
        # Set up the configuration path and create the converter with it.
        config_path = os.path.join(os.getcwd(), "config", "config.json")
        converter = ToneColorConverter(config_path)
        result = converter.convert(text)
    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"error": str(e)}), 500

    return jsonify({"input": text, "result": result})

@app.route('/extract', methods=['GET'])
def extract():
    file_path = request.args.get('file', 'sample.wav')
    
    try:
        features = se_extractor.extract_features(file_path)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"file": file_path, "features": features})

@app.route('/clone', methods=['POST'])
def clone_voice():
    """
    Expects a multipart/form-data POST request with:
    - 'audio': the reference audio file
    - 'text': (optional) text to say using the cloned voice (default: "Hello World")
    """
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    text = request.form.get('text', 'Hello World')
    temp_audio_path = os.path.join(os.getcwd(), 'temp_audio.wav')
    
    try:
        # Save the uploaded audio file temporarily.
        audio_file.save(temp_audio_path)
        
        # Extract speaker embedding/features from the reference audio.
        speaker_embedding = se_extractor.extract_features(temp_audio_path)
        
        # Set up the converter using your config.
        config_path = os.path.join(os.getcwd(), "config", "config.json")
        converter = ToneColorConverter(config_path)
        
        # Generate speech with the cloned voice.
        # Note: We assume that the clone_voice method exists and takes text and speaker_embedding.
        result = converter.clone_voice(text, speaker_embedding)
    except Exception as e:
        print("An error occurred during voice cloning:", e)
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(temp_audio_path):
            os.remove(temp_audio_path)
    
    return jsonify({"text": text, "result": result})

if __name__ == '__main__':
    app.run(debug=True)