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
          toast("Thank you for contacting us!");
        } else {
          // console.log("Email/Password is invalid.");
          toast("Email/Password is invalid.");
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
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Tell us about yourself!
                </h2>
                <p className="mt-3 text-lg leading-6 text-gray-500">
                  We're excited to have the opportunity to curate your personal checklist on steps you need to do achieve your dreams.
                </p>
                <div className="mt-8 text-base text-gray-500">
                      <p className="pb-3">Send us an application:</p>
                      <div className="pl-4">

                      <p>- Are you currently enrolled?</p>
                      <p>- What school do you wish to attend</p>
                      <p>- What is your desired major?</p>
                      <p>- What degree level are you pursuing?</p>
                      <p>- When do you start?</p>
                      <p>- Enrollment Alternative?</p>
                      <p>- What is your current english level?</p>

                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
              <div className="max-w-lg mx-auto lg:max-w-none text-black">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="POST"
                  className="grid grid-cols-1 gap-y-6"
                >
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Is Enroll</h1>
                    <label htmlFor="isEnroll" className="sr-only">
                      Is Enroll
                    </label>
                    <input
                      type="checkbox"
                      id="isEnroll"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("isEnroll", { required: true })}
                    />
                  </div>
  
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">school</h1>
                    <label htmlFor="fullName" className="sr-only">
                      School
                    </label>
                    <input
                      type="text"
                      id="school"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("school", { required: true })}
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">major</h1>
                    <label htmlFor="fullName" className="sr-only">
                      Major
                    </label>
                    <input
                      type="text"
                      id="Major"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("major", { required: true })}
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">degree level</h1>
                    <label htmlFor="fullName" className="sr-only">
                      degree level
                    </label>
                    <input
                      type="text"
                      id="degreeLevel"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("degreeLevel", { required: true })}
                    />
                  </div>
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Start Date</h1>
                    <label htmlFor="fullName" className="sr-only">
                      Start Date
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
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">Is Enroll Alt</h1>
                    <label htmlFor="fullName" className="sr-only">
                      Is Enroll Alt
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
                  <div>
                    <h1 className="text-xl text-black font-bold pb-2 pl-1 ">english level</h1>
                    <label htmlFor="fullName" className="sr-only">
                      english level
                    </label>
                    <input
                      type="text"
                      id="englishLevel"
                      autoComplete="name"
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      placeholder="John Doe"

                      {...register("englishLevel", { required: true })}
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
