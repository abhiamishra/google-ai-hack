

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


// const email = process.env.NEXT_PUBLIC_EMAIL;
// const pass = process.env.NEXT_PUBLIC_EMAIL_PASS;

// const CONTACT_MESSAGE_FIELDS : any = {
//   fullName: "Full Name",
//   email: "Email",
//   subject: "Subject",
//   message: "Message",
// };

// const generateEmailContent = (data:any) => {
//   const stringData = Object.entries(data).reduce(
//     (str, [key, val]) =>
//       (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
//     ""
//   );
//   const htmlData = Object.entries(data).reduce((str, [key, val]) => {
//     return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
//   }, "");

//   return {
//     text: stringData,
//     html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Vendor Application! </h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
//   };
// };

// export default async function (req:any, res:any) {
//     // require("env.local").config();
  
//     console.log ('made it into api section')
//     // "use strict";
//     let nodemailer = require("nodemailer");
//     const transporter = nodemailer.createTransport({
//       port: 465,
//       host: "smtp.gmail.com",
//       auth: {
//         user: email,
//         pass: pass
//       },
//       secure: true,
//     });
//     const mailData = {
//       from: email,
//       to: email,
//       ...generateEmailContent(req.body),
//       subject: "New Vendor Application",
//     };
//     await new Promise((resolve, reject) => {
//       transporter.sendMail(mailData, function (err:any, info:any) {
//         if (err) {
//           console.log(err);
//           reject(err);
//         } else {
//           console.log(info);
//           resolve(info);
//         }
//       });
//     });
//     res.status(200).json({ status: "OK" });
//   }
  