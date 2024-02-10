import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const userInfo = formData.get("user") as string;
    if(!userInfo) {
        return Response.json({ error: "error occured: request received failed"})
    }
    const user = JSON.parse(userInfo) || null;
    console.log(file)
    return Response.json({ data: user})
}