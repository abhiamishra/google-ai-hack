import os
from dotenv import load_dotenv
import json

# Load .env file
load_dotenv()

import google.generativeai as genai

# my_model.py

class GenModel:
    def __init__(self):
      # Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
      GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

      genai.configure(api_key=GOOGLE_API_KEY)

      # Set up the model
      generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 0,
        "max_output_tokens": 8192,
      }

      safety_settings = [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
      ]

      system_instruction = "You are an immigration lawyer whose sole task is to help students immigrate to other countries. You are kind, patient, and understand the anxiety of the fears of the student. As such, your responses are thought-out and measured. Your task is to create a checklist of what the student needs to achieve/accomplish:"

      self.model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                    generation_config=generation_config,
                                    system_instruction=system_instruction)
      
    def generate_base_checklist(
          self,
          isEnroll,
          school,
          major,
          degreeLevel,
          startDate,
          isenrollAlt,
          nameAlt,
          isfullTime,
          englishLevel,
          isTOEFL,
          TOEFLScore,
          isEnrollEnglishCourse,
          isResidence,
          isFamily,
          isEmployed,
          hasAssets,
          isReturn):
        
        isEnrollStatement = f"The student is {'not ' if not isEnroll else ''} enrolled in a university.\n"
        univStatement = ""
        altStatement = f"The student is {'not ' if not isenrollAlt else ''} planning to attend any other academic programs in the US.\n"

        if isEnroll:
           univStatement += "The student will be going to " + school + " in " + str(startDate) + " pursuing " + major + " at a " + degreeLevel + " level.\n"
        else:
           altStatement += "The name of the other/alternative academic program is " + nameAlt + ".\n"
          
        isFullTimeStatement = f"The student is {'not ' if not isfullTime else ''} a full-time student.\n"

        englishLevelStatement = "The student's english profiency level is " + englishLevel + ".\n"

        isTOEFLStatement = f"The student does {'not ' if not isEnroll else ''} have a TOEFL score.\n"
        TOEFLScoreStatement  = ""
        if isTOEFL:
           TOEFLScoreStatement = "The student's TOEFL Score is " + str(TOEFLScore) + ".\n"
          
        isEnrollEnglishCourseStatement = f"The student is {'not ' if not isEnrollEnglishCourse else ''} enrolled a English course at the university.\n"

        isResidenceStatement = f"The student does {'not ' if not isResidence else ''} have either a house residence or apartment in their home country.\n"
        isFamilyStatement = f"The student does {'not ' if not isFamily else ''} have immeadiate family members.\n"
        isEmployedStatement = f"The student is {'not ' if not isEmployed else ''} employed in their home country.\n"
        hasAssetsStatement = f"The student does {'not ' if not hasAssets else ''} have assets in their home country.\n"
        isReturnStatement = f"The student does {'not ' if not isReturn else ''} planning to return to their home country.\n"

        # prompt_parts = [
        #   '''The student will be going to UT Austin in the August of 2024 pursuing a Master's in Computer Science.
        #      The student is looking to apply to a university program in United States.
        #      They are not planning to attend any other academic programs in the United States.
        #      They will not be enrolled as a full-time student. Their level of English proficiency is Beginner.
        #      They have not taken any TOEFL/IELTS exam.
        #      They do not have any English courses they've signed up for attaining English proficiency.
        #      They have not participated in any other activities that demonstrate your English proficiency (e.g., English-taught academic programs, work experience in an English-speaking environment).
        #      \n\n\n\nUse the F-1 VIsa requirements given below:\n\"\nHome > Working in the United States > Students and Exchange Visitors > Students and Employment\nStudents and Employment\nALERT: Please remember that photos submitted to USCIS must be unmounted and unretouched. Unretouched means the photos must not be edited or digitally enhanced. The submission of any mounted or retouched images will delay the processing of your application and may prompt USCIS to require that you appear at an Applicant Support Center to verify your identity.\nIf you would like to study as a full-time student in the United States, you will generally need a student visa.\nThere are two nonimmigrant visa categories for persons wishing to study in the United States. These visas are commonly known as the F and M visas.\nYou may enter in the F-1 or M-1 visa category provided you meet the following criteria:\nYou must be enrolled in an \"academic\" educational program, a language-training program, or a vocational program\nYour school must be approved by the Student and Exchange Visitors Program, Immigration & Customs Enforcement\nYou must be enrolled as a full-time student at the institution\nYou must be proficient in English or be enrolled in courses leading to English proficiency\nYou must have sufficient funds available for self-support during the entire proposed course of study\nYou must maintain a residence abroad which you have no intention of giving up.\nF-1 Student Visa\nThe F-1 Visa (Academic Student) allows you to enter the United States as a full-time student at an accredited college, university, seminary, conservatory, academic high school, elementary school, or other academic institution or in a language training program. You must be enrolled in a program or course of study that culminates in a degree, diploma, or certificate and your school must be authorized by the U.S. government to accept international students.\nM-1 Student Visa\nThe M-1 visa (Vocational Student) category includes students in vocational or other nonacademic programs, other than language training.\nMENU\nPage 2\nEmployment\nF-1 students may not work off-campus during the first academic year, but may accept on-campus employment subject to certain conditions and restrictions. After the first academic year, F-1 students may engage in three types of off-campus employment:\nCurricular Practical Training (CPT)\nOptional Practical Training (OPT) (pre-completion or post-completion)\nScience, Technology, Engineering, and Mathematics (STEM) Optional Practical Training Extension (OPT)\nF-1 students may also be eligible to work off-campus on a case-by-case basis as a result of special situations such as severe economic hardship or special student relief. M-1 students may engage in practical training only after they have completed their studies.\nFor both F-1 and M-1 students any off-campus training employment must be related to their area of study and must be authorized prior to starting any work by the Designated School Official (the person authorized to maintain the Student and Exchange Visitor Information System (SEVIS)) and USCIS.\nFor more information on the Student and Exchange Visitors Program, see the Student & Exchange Visitor Program, Immigration & Customs Enforcement and the Study in the States Training Opportunities in the United States pages.\nIn general, only noncitizens who have permission from DHS to work can apply for a Social Security number.  Find additional information about  International Students and Social Security Numbers (PDF) on the Social Security Administration website.\nSpecial Instructions\nIf you are interested in changing to F or M Student Status, see the Changing to a Nonimmigrant F or M Student Status page.\nLast Reviewed/Updated: 03/27/2024
        #      \"\n\nCheck the student's information with above information and detail a checklist about what the student still needs to do to get the F1 Visa. Make these items into a to-do list. If there is a violation between the information and rules, make that the first checklist item. Give each checklist item an priority based off the student's information. 
        #      Output should be in JSON format:\n\n{\n\"Task\": ,\n\"Priority\":  ,\n\"Description\": \n}\n\nand make a list of these JSONs with no title:'''
        # ]

        prompt_parts = [
           isEnrollStatement,
           univStatement,
           altStatement,
           isFullTimeStatement,
           englishLevelStatement,
           isTOEFLStatement,
           TOEFLScoreStatement,
           isEnrollEnglishCourseStatement,
           isResidenceStatement,
           isFamilyStatement,
           isEmployedStatement,
           hasAssetsStatement,
           isReturnStatement,
          '''\n\n\n\nUse the F-1 VIsa requirements given below:\n\"\nHome > Working in the United States > Students and Exchange Visitors > Students and Employment\nStudents and Employment\nALERT: Please remember that photos submitted to USCIS must be unmounted and unretouched. Unretouched means the photos must not be edited or digitally enhanced. The submission of any mounted or retouched images will delay the processing of your application and may prompt USCIS to require that you appear at an Applicant Support Center to verify your identity.\nIf you would like to study as a full-time student in the United States, you will generally need a student visa.\nThere are two nonimmigrant visa categories for persons wishing to study in the United States. These visas are commonly known as the F and M visas.\nYou may enter in the F-1 or M-1 visa category provided you meet the following criteria:\nYou must be enrolled in an \"academic\" educational program, a language-training program, or a vocational program\nYour school must be approved by the Student and Exchange Visitors Program, Immigration & Customs Enforcement\nYou must be enrolled as a full-time student at the institution\nYou must be proficient in English or be enrolled in courses leading to English proficiency\nYou must have sufficient funds available for self-support during the entire proposed course of study\nYou must maintain a residence abroad which you have no intention of giving up.\nF-1 Student Visa\nThe F-1 Visa (Academic Student) allows you to enter the United States as a full-time student at an accredited college, university, seminary, conservatory, academic high school, elementary school, or other academic institution or in a language training program. You must be enrolled in a program or course of study that culminates in a degree, diploma, or certificate and your school must be authorized by the U.S. government to accept international students.\nM-1 Student Visa\nThe M-1 visa (Vocational Student) category includes students in vocational or other nonacademic programs, other than language training.\nMENU\nPage 2\nEmployment\nF-1 students may not work off-campus during the first academic year, but may accept on-campus employment subject to certain conditions and restrictions. After the first academic year, F-1 students may engage in three types of off-campus employment:\nCurricular Practical Training (CPT)\nOptional Practical Training (OPT) (pre-completion or post-completion)\nScience, Technology, Engineering, and Mathematics (STEM) Optional Practical Training Extension (OPT)\nF-1 students may also be eligible to work off-campus on a case-by-case basis as a result of special situations such as severe economic hardship or special student relief. M-1 students may engage in practical training only after they have completed their studies.\nFor both F-1 and M-1 students any off-campus training employment must be related to their area of study and must be authorized prior to starting any work by the Designated School Official (the person authorized to maintain the Student and Exchange Visitor Information System (SEVIS)) and USCIS.\nFor more information on the Student and Exchange Visitors Program, see the Student & Exchange Visitor Program, Immigration & Customs Enforcement and the Study in the States Training Opportunities in the United States pages.\nIn general, only noncitizens who have permission from DHS to work can apply for a Social Security number.  Find additional information about  International Students and Social Security Numbers (PDF) on the Social Security Administration website.\nSpecial Instructions\nIf you are interested in changing to F or M Student Status, see the Changing to a Nonimmigrant F or M Student Status page.\nLast Reviewed/Updated: 03/27/2024
             \"\n\nCheck the student's information with above information and detail a checklist about what the student still needs to do to get the F1 Visa. Make these items into a to-do list. If there is a violation between the information and rules, make that the first checklist item. Give each checklist item an priority based off the student's information. 
             Output should be in JSON format:\n\n{\n\"Task\": ,\n\"Priority\":  ,\n\"Description\": \n}\n\nand make a list of these JSONs with no title:'''
        ]
        response = self.model.generate_content(prompt_parts)
        actual_response = response.text
        actual_response = actual_response.replace("```json", "")
        actual_response = actual_response.replace("```", "")

        json_data = actual_response
        python_object = json.loads(json_data)
        return python_object
    
    def generate_actual_checklist(self, checklist, school):
        checklist_str = json.dumps(checklist)
        print(checklist_str)
        checklistStatement = "Here is the checklist generated for the student: " + checklist_str + ".\n"
        instructionStatement = '''Go through each task and make a to-do item list for each task - generating subtasks and give each of them a priority.
                                  Make these sub-tasks based off the information required to get a F1 visa and the university requirements for ''' +  school + ".\n"
        instructionStatement += "The sub-tasks should be of the JSON format:\n\n{\n\"Task\": ,\n\"Priority\":  ,\n\"Description\": \n}\n\n and must exist under the original tasks in the original JSON and absolutely no title at all for the response: "
        prompt_parts = [
            '''\n\n\n\nUse the F-1 VIsa requirements given below:\n\"\nHome > Working in the United States > Students and Exchange Visitors > Students and Employment\nStudents and Employment\nALERT: Please remember that photos submitted to USCIS must be unmounted and unretouched. Unretouched means the photos must not be edited or digitally enhanced. The submission of any mounted or retouched images will delay the processing of your application and may prompt USCIS to require that you appear at an Applicant Support Center to verify your identity.\nIf you would like to study as a full-time student in the United States, you will generally need a student visa.\nThere are two nonimmigrant visa categories for persons wishing to study in the United States. These visas are commonly known as the F and M visas.\nYou may enter in the F-1 or M-1 visa category provided you meet the following criteria:\nYou must be enrolled in an \"academic\" educational program, a language-training program, or a vocational program\nYour school must be approved by the Student and Exchange Visitors Program, Immigration & Customs Enforcement\nYou must be enrolled as a full-time student at the institution\nYou must be proficient in English or be enrolled in courses leading to English proficiency\nYou must have sufficient funds available for self-support during the entire proposed course of study\nYou must maintain a residence abroad which you have no intention of giving up.\nF-1 Student Visa\nThe F-1 Visa (Academic Student) allows you to enter the United States as a full-time student at an accredited college, university, seminary, conservatory, academic high school, elementary school, or other academic institution or in a language training program. You must be enrolled in a program or course of study that culminates in a degree, diploma, or certificate and your school must be authorized by the U.S. government to accept international students.\nM-1 Student Visa\nThe M-1 visa (Vocational Student) category includes students in vocational or other nonacademic programs, other than language training.\nMENU\nPage 2\nEmployment\nF-1 students may not work off-campus during the first academic year, but may accept on-campus employment subject to certain conditions and restrictions. After the first academic year, F-1 students may engage in three types of off-campus employment:\nCurricular Practical Training (CPT)\nOptional Practical Training (OPT) (pre-completion or post-completion)\nScience, Technology, Engineering, and Mathematics (STEM) Optional Practical Training Extension (OPT)\nF-1 students may also be eligible to work off-campus on a case-by-case basis as a result of special situations such as severe economic hardship or special student relief. M-1 students may engage in practical training only after they have completed their studies.\nFor both F-1 and M-1 students any off-campus training employment must be related to their area of study and must be authorized prior to starting any work by the Designated School Official (the person authorized to maintain the Student and Exchange Visitor Information System (SEVIS)) and USCIS.\nFor more information on the Student and Exchange Visitors Program, see the Student & Exchange Visitor Program, Immigration & Customs Enforcement and the Study in the States Training Opportunities in the United States pages.\nIn general, only noncitizens who have permission from DHS to work can apply for a Social Security number.  Find additional information about  International Students and Social Security Numbers (PDF) on the Social Security Administration website.\nSpecial Instructions\nIf you are interested in changing to F or M Student Status, see the Changing to a Nonimmigrant F or M Student Status page.\nLast Reviewed/Updated: 03/27/2024''',
            checklistStatement,
            instructionStatement
        ]
        response = self.model.generate_content(prompt_parts)
        actual_response = response.text
        actual_response = actual_response.replace("```json", "")
        actual_response = actual_response.replace("```", "")

        json_data = actual_response
        python_object = json.loads(json_data)
        return python_object


