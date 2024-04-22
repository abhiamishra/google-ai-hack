from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore

import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()
import google.generativeai as genai

from gemini import GenModel

model = GenModel()

app = FastAPI()

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

@app.get("/gemini")
async def callgemini(isEnroll: bool = True,
                     school: str = None,
                     city: str = None,
                     state: str = None,
                     major: str = None,
                     degreeLevel: str = None,
                     startDate: str = None,
                     isenrollAlt: bool = True,
                     nameAlt: str = None,
                     altDate: str = None,
                     isfullTime: bool = True,
                     englishLevel: str = None,
                     isTOEFL: bool = True,
                     TOEFLScore: str = None,
                     isEnrollEnglishCourse: bool = True,
                     isResidence: bool = True,
                     isFamily: bool = True,
                     isEmployed: bool = True,
                     hasAssets: bool = True,
                     isReturn: bool = True):
    
    og_checklist = model.generate_base_checklist(
        isEnroll,
        school,
        city,
        state,
        major,
        degreeLevel,
        startDate,
        isenrollAlt,
        nameAlt,
        altDate,
        isfullTime,
        englishLevel,
        isTOEFL,
        TOEFLScore,
        isEnrollEnglishCourse,
        isResidence,
        isFamily,
        isEmployed,
        hasAssets,
        isReturn
    )

    output = model.generate_actual_checklist(og_checklist, school)

    return output
    