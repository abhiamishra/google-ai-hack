import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hello: "world",
    })
}


export async function POST(request: Request){
    const data = await request.json();
    console.log(data);
    return NextResponse.json({
        data,
    });
}