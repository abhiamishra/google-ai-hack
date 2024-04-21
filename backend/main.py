from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

creds = credentials.Certificate("./borderless-asmr-firebase-adminsdk.json")

# Initialize the app with a None auth variable, limiting the server's access
firebase_admin.initialize_app(creds)
db = firestore.client()

# The app only has access to public data as defined in the Security Rules
# ref = db.reference('/test')
collection = db.collection('test').document('MYfL7vSJPmzYCPO6U9HX')
data = collection.get().to_dict()
print(data)
# print(ref.get())
# print(default_app)
@app.get("/")
async def root():
    return {"message": "Hello World"}