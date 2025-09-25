import json
import random
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

import nltk
from nltk.stem import WordNetLemmatizer

from tensorflow.keras.models import load_model

#Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"])  # Enable CORS for React app

#Load Model,DataFiles
try:
    lemmatizer = WordNetLemmatizer()
    intents = json.loads(open('intents.json').read())
    words = pickle.load(open('words.pkl', 'rb'))
    classes = pickle.load(open('classes.pkl', 'rb'))
    model = load_model('chatbot_model.h5')
    print("Chatbot model loaded successfully!")
except FileNotFoundError as e:
    print(f"Error: Model or data files not found. {e}")
    print("Please run training.py first.")
    exit()

def clean_up_sentence(sentence):
    sentence_words=nltk.word_tokenize(sentence)
    sentence_words=[lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words=clean_up_sentence(sentence)
    bag=[0]*len(words)
    for w in sentence_words:
        for i,word in enumerate(words):
            if word==w:
                bag[i]=1
    return np.array(bag)

def predict_class(sentence):
    bow=bag_of_words(sentence)
    res=model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD=0.25
    results=[[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1],reverse=True)
    
    return_list=[]
    for r in results:
        return_list.append({'intent':classes[r[0]], 'probability':str(r[1])})
    
    if not return_list:
        return_list.append({'intent':'default','probability': '1.0'})
        
    return return_list

<<<<<<< HEAD
def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    result = "I'm sorry, I don't understand. Ask me anything related to mental health, stress management, motivation, or meditation."
    
=======
def get_response(intents_list,intents_json):
    tag=intents_list[0]['intent']
    list_of_intents=intents_json['intents']
    result="I'm sorry,I don't understand,Ask me anything related to depression,stress management,motivation,meditation."#Default fallback response
>>>>>>> c9f18e0cab947dd66db607b8177fbf1da77b8068
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

#API Endpoints
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message') if data else None
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        print(f"Received message: {user_message}")  # Debug log
        
        # Get prediction
        ints = predict_class(user_message)
        response_text = get_response(ints, intents)
        
        print(f"Response: {response_text}")  # Debug log
        
        return jsonify({
            "response": response_text,
            "intent": ints[0]['intent'],
            "confidence": ints[0]['probability']
        })
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "Chatbot API is running", 
        "model_loaded": True,
        "intents_loaded": len(intents['intents']) if intents else 0,
        "words_loaded": len(words) if words else 0,
        "classes_loaded": len(classes) if classes else 0
    })

<<<<<<< HEAD
#Main Execution
if __name__ == "__main__":
    print("Starting Chatbot API server...")
    print(f"Loaded {len(intents['intents'])} intents")
    print(f"Loaded {len(words)} words")
    print(f"Loaded {len(classes)} classes")
    print("Server will run on http://localhost:5001")
    print("Make sure your React app is running on http://localhost:5173")
    app.run(host='0.0.0.0', port=5001, debug=True)
=======

if __name__=="__main__":
    print("Chatbot API is running.")
    app.run(host='0.0.0.0', port=5000)
>>>>>>> c9f18e0cab947dd66db607b8177fbf1da77b8068
