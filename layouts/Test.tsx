import React from "react";
import { useQuery } from "react-query";
import axios from "axios";


const retrievePosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  console.log(response.data)
  return response.data;
};

const retrieveEndpoint = async () => {
  const response = await axios.get(
    "http://localhost:8000"
  );
  console.log(response.data)
  return response.data
};
export default function Test() {
  // const { data:posts, error, isLoading } = useQuery("postsData", retrievePosts)

  // if (isLoading) return <div>Fetching posts...</div>;
  // if (error) return <div>An error occurred: {error.message}</div>;
  const { data:endpointData, error, isLoading } = useQuery("Endpoint1", retrievePosts)

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;



  return (
    <>
    <h1>{endpointData.message}</h1>
    <h1>{endpointData["message"]}</h1>
      <h1> test </h1>
      <TextInput />
      <button
        type="button"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </>
  );
}

function TextInput() {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Email
      </label>
      <div className="mt-2">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
}