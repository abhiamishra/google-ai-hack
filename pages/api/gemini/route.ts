// GET request on /api/gemini/get

import axios from "axios";
import { NextResponse } from "next/server";


export default async function handler(request: Request){
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

// import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//   message: string
// }
 
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'MIKE IS GOD' })
// }