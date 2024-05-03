# Start up FastAPI Server:
- go to Backend folder
- Open the install.txt file and do: pip install -r install.txt
- make a file called .env and make a secret with the following name and value: GOOGLE_API_KEY="Insert Google API Key value"
- Run this command: uvicorn main:app --reload
- It should start the server on: localhost:8000
