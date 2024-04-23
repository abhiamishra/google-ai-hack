

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hello: "world",
    })
}


export async function POST(request: Request){
    var data = await request.json();
    console.log(data);
    console.log(data.startDate)

    try{
        data.startDate = data.startDate.split("T")[0] 
    }catch{
        data.startDate = "2014-06-02"
    }

    console.log(data.Calendar)
    const u = new URLSearchParams(data).toString()
    console.log(u)
    var url = "http://localhost:8000/gemini"

    url = url + "?" + u
    console.log(url)
    
    // Some url magic
    var response = await axios.get(url)
    console.log(response)
    // console.log(response.json())
    console.log(response.data)
    data = response.data
    return NextResponse.json({
        data,
    });
}

