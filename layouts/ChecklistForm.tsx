import { useQuery } from "react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { DatePicker, DatePickerProps } from "antd";
import { tailspin } from 'ldrs'
import { clsx } from 'clsx'


export default function ChecklistForm({formComplete, setFormComplete, setAPI_data}) {
  
  const [hiddenForm, setHiddenForm] = useState(false)
  
  useEffect(() => {
    async function getLoader() {
      const { bouncy} = await import('ldrs')
      bouncy.register()
    }
    getLoader()
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    // console.log(data)
    setHiddenForm(true)

    fetch("/api/gemini/route", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res: Response) => {
        console.log("Response received", res);
        if (res.status === 200) {
          // console.log("Response succeeded!");
          toast("Here's your checklist!");
        } else {
          // console.log("Email/Password is invalid.");
          toast("Invalid form/Error in processing");
        }
        return res.json()

      }).then((JSON_data) => {
        setAPI_data(JSON_data.data)
        setFormComplete(true)
      })
      .catch((e) => console.log("error: ", e));
      reset()
  };

  return (
    <>
<div className={clsx(formComplete === true && "hidden")}>

  <div className={clsx(hiddenForm === true && "hidden", "h-screen relative bg-white")}>
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
          </div>
          <div className="h-full relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
            {/* <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Tell us about yourself!
                </h2>
                <p className="mt-3 text-lg leading-6 text-gray-500">
                  We're excited to have the opportunity to curate your personal checklist on steps you need to do achieve your dreams.
                </p>
                <div className="mt-8 text-base text-gray-500">
                      <p className="pb-3">Send us an application:</p>
                </div>
              </div>
            </div> */}
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
              <div className="max-w-lg mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                  Tell us about yourself!
                </h2>
                <p className="mt-3 text-xl leading-6 text-gray-500">
                  We're excited to have the opportunity to curate your personal checklist on steps you need to do achieve your dreams.
                </p>
              </div>
            </div>
            <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
              <div className="max-w-lg mx-auto lg:max-w-none text-black">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="POST"
                  className="grid grid-cols-1 gap-y-6"
                >
                  <h4>1. Visa Type</h4>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">What type of visa are you looking for?</h1>
                    <label htmlFor="fullName" className="sr-only">
                      
                    </label>
                    <input
                      type="text"
                      id=""
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="F1 Visa"
                    />
                  </div>
                  <br></br>

                  
                  <h4>2. Study Programs</h4>
                  <h5>Section 1: Post-Secondary Education Plans</h5>
                  <div>
                    <p className="text-xl text-black font-bold pb-2 pl-1 ">Do you plan to enroll in a university or college in the United States? (Yes/No) </p>
                    <label htmlFor="isEnroll" className="sr-only">
                      Is Enroll
                    </label>
                    <input
                      type="checkbox"
                      id="isEnroll"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isEnroll", { required: false })}
                    />
                  </div>

                  <br></br>
                  <h5>If yes, please provide the following information: </h5>
  
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Name of the university/college</h1>
                    <label htmlFor="fullName" className="sr-only">
                      School
                    </label>
                    <input
                      type="text"
                      id="school"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="Harvard"

                      {...register("school", { required: false })}
                    />
                  </div>

                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Program/Major you intend to study</h1>
                    <label htmlFor="fullName" className="sr-only">
                      Major
                    </label>
                    <input
                      type="text"
                      id="major"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="CS"

                      {...register("major", { required: false })}
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Degree level (e.g., Bachelor's, Master's, PhD)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      degreeLevel
                    </label>
                    <input
                      type="text"
                      id="degreeLevel"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="Bachelor"

                      {...register("degreeLevel", { required: false })}
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Start Date</h1>
                    <label htmlFor="fullName" className="sr-only">
                      startDate
                    </label>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => {
                      return (
                        <DatePicker value={field.value} onChange={(date,dateString) => {
                            console.log(dateString)
                            field.onChange(date)
                        }}
                        />

                      );
                    }}/>
                  </div>
                   <br></br>

                  <h5>Section 2: Alternative Academic Programs</h5>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">If you are not planning to attend a university/college, are you considering any other academic programs in the United States? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      isEnrollAlt
                    </label>
                    <input
                      type="checkbox"
                      id="isEnrollAlt"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isEnrollAlt", { required: false })}
                    />
                  </div>
                  
                  <br></br>
                  <h5>If yes, please specify the type of program: </h5>

                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Name of the alternate program</h1>
                    <label htmlFor="fullName" className="sr-only">
                      nameAlt
                    </label>
                    <input
                      type="text"
                      id="nameAlt"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="Data Science Certification Program"

                      {...register("nameAlt")}
                    />
                  </div>

                  <br></br>

                  <h4>3. Full-Time Enrollment</h4>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Will you be enrolled as a full-time student in your chosen program? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      isfullTime
                    </label>
                    <input
                      type="checkbox"
                      id="isfullTime"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isfullTime", { required: false })}
                    />
                  </div>
                  <br></br>


                  <h4>4. English Proficiency</h4>
                  <h5>Section 1: Self-Assessment of English Proficiency</h5>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">How would you rate your current level of English proficiency?</h1>
                    <ul>
                      <li>Options: Beginner, Intermediate, Advanced, Native/Fluent</li>
                    </ul>
                    <label htmlFor="fullName" className="sr-only">
                      englishLevel
                    </label>
                    <input
                      type="text"
                      id="englishLevel"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="Beginner"

                      {...register("englishLevel", { required: false })}
                    />
                  </div>
                  <br></br>

                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Have you previously taken any standardized English language tests (e.g., TOEFL, IELTS)? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      isTOEFL
                    </label>
                    <input
                      type="checkbox"
                      id="isTOEFL"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isTOEFL", { required: false })}
                    />
                  </div>
                  <br></br>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">If yes, please specify the score(s).</h1>
                    <label htmlFor="fullName" className="sr-only">
                      TOEFLScore
                    </label>
                    <input
                      type="text"
                      id="TOEFLScore"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="400"

                      {...register("TOEFLScore")}
                    />
                  </div>
                  <br></br>
                  <h5>Section 2: English Language Course Plans</h5>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Does your chosen academic program require you to take any English language courses? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      isEnrollEnglishCourse
                    </label>
                    <input
                      type="checkbox"
                      id="isEnrollEnglishCourse"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isEnrollEnglishCourse", { required: false })}
                    />
                  </div>
                  <br></br>
                  <h4>5. Ties to Home Country</h4>
                  <h5>Section 1: Residence and Family</h5>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Do you own or rent a residence in your home country? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      isResidence
                    </label>
                    <input
                      type="checkbox"
                      id="isResidence"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isResidence", { required: false })}
                    />
                  </div>
                  <br></br>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Do you have immediate family members (e.g., spouse, children, parents) residing in your home country? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      isFamily
                    </label>
                    <input
                      type="checkbox"
                      id="isFamily"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isFamily", { required: false })}
                    />
                  </div>
                  <br></br>
                  <h5>Section 2: Employment and Assets</h5>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Are you currently employed in your home country? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                      isEmployed
                    </label>
                    <input
                      type="checkbox"
                      id="isEmployed"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isEmployed", { required: false })}
                    />
                  </div>
                  <br></br>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Do you have any significant assets (e.g., property, investments) in your home country? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                    hasAssets
                    </label>
                    <input
                      type="checkbox"
                      id="hasAssets"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("hasAssets", { required: false })}
                    />
                  </div>
                  <br></br>
                  <h5>Section 3: Future Plans</h5>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">After completing your studies in the United States, do you plan to return to your home country? (Yes/No)</h1>
                    <label htmlFor="fullName" className="sr-only">
                    isReturn
                    </label>
                    <input
                      type="checkbox"
                      id="isReturn"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isReturn", { required: false })}
                    />
                  </div>



                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit
                    </button>

                  
                  </div>                 
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className={clsx( hiddenForm === false && "hidden", "flex flex-row min-h-screen justify-center items-center")}>
          <h1 className="mb-12"> Loading</h1>
          <div className="pl-4">
            <l-bouncy
              size="80"
              bg-opacity={0.1}
              speed={1.75}
              color={"black"}
            />
            </div>
        </div>

        <ToastContainer />
</div>

    </>
  );
}
