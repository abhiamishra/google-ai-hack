// GET request on /api/gemini/get

import axios from "axios";
import { NextApiRequest, NextApiResponse} from "next";


export default async function handler(request: NextApiRequest, response: NextApiResponse){
    if (request.method === 'POST')
    {
        console.log('hi mark')
    }
    console.log(request)
    console.log(request.body)

    var data = await request.body;
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
    var axios_response = await axios.get(url)
    console.log(axios_response)
    // console.log(response.json())
    console.log(axios_response.data)
    data = axios_response.data
    
    return response.status(200).json({data})
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