import requests
import json

def test_chatbot():
    print("Testing Mental Health Chatbot...")
    
    # Test health endpoint
    try:
        health_response = requests.get('http://localhost:5001/health')
        if health_response.status_code == 200:
            print("✅ Health check passed")
            print(f"Response: {health_response.json()}")
        else:
            print(f"❌ Health check failed with status {health_response.status_code}")
            return
    except Exception as e:
        print(f"❌ Cannot connect to chatbot server: {e}")
        print("Make sure to run: python app.py")
        return
    
    # Test chat endpoint
    test_messages = [
        "Hello",
        "I'm feeling stressed",
        "I need help with anxiety",
        "Can you help me with meditation?"
    ]
    
    for message in test_messages:
        try:
            chat_response = requests.post('http://localhost:5001/chat', 
                                        headers={'Content-Type': 'application/json'},
                                        data=json.dumps({'message': message}))
            
            if chat_response.status_code == 200:
                response_data = chat_response.json()
                print(f"\n📤 User: {message}")
                print(f"🤖 Bot: {response_data['response']}")
                print(f"🎯 Intent: {response_data['intent']} (Confidence: {response_data['confidence']})")
            else:
                print(f"❌ Chat failed for '{message}': {chat_response.status_code}")
                print(f"Error: {chat_response.text}")
        except Exception as e:
            print(f"❌ Error testing message '{message}': {e}")
    
    print("\n✅ Chatbot test completed!")

if __name__ == "__main__":
    test_chatbot()