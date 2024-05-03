# Borderless
Welcome to the Borderless application.

On how to run the project, please follow the following steps:

# Step 1: Start up FastAPI Server
- go to Backend folder
- Open the install.txt file and do: pip install -r install.txt
- make a file called .env and make a secret with the following name and value: GOOGLE_API_KEY="Insert Google API Key value"
- Run this command: uvicorn main:app --reload
- It should start the server on: localhost:8000

# Step 2: Start up Frontend Server
- Go to root directory
- Run npm install
- Then either run: npm run dev (but page loading will be slow)
- Or run npm run build and then npm run start together (faster page loading)
- It should start the server on: localhost:3000

# Step 3: Go Borderless!
- Simply navigate to localhost:3000 and navigate Borderless!
- Notes:
    - Checklist generation is slow since we are using prompt chaining (agentic AI) and recursively going over item and making a checklist
    - Login page has no check for username/password - rather it is there for UX of the application. In the future, we plan to store the checklist onto the username in a database: Firebase

# Step 4: Additional Pictures and Videos:
- Please access images-display folder for images and videos if you don't want to run any of this and want to see a demo
- Or better yet, checkout our Devpost: https://devpost.com/software/borderless-e57bvl