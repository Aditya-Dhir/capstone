from flask import Flask, request, jsonify
from huggingface_hub import login
from thai_llm_tester import LLM_Tester
import warnings

login()

# Suppress warnings
warnings.filterwarnings("ignore")

# Initialize Flask app
app = Flask(__name__)

# Load Thai LLM
llm_tester = LLM_Tester("Here")

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()  # Get request data
        instruction = data['instruction']  # Extract instruction

        formatted_result = llm_tester.generate_output(instruction)

        return jsonify({'generated_text': formatted_result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Handle exceptions

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
