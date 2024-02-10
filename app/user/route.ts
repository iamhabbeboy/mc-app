import { NextRequest } from 'next/server';
import { put } from '@vercel/blob';
import { MongoClient ,ServerApiVersion } from 'mongodb';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const userInfo = formData.get("user") as string;
    if(!userInfo) {
        return Response.json({ error: "error occured: request received failed"})
    }
    const ext = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2);
    const filename = `${Math.floor(Date.now() / 1000)}.${ext}`
    // const blob = await put(file.name, file, {
    //     access: 'public',
    // });
    // const url = blob.url;
    const user = JSON.parse(userInfo) || null;
    const data = {
        image:"url",
        ...user
    }
    const client = new MongoClient("mongodb+srv://iamhabbeboy:Physics1000!@cluster0.eqrfwdv.mongodb.net/?retryWrites=true&w=majority", { 
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }});
      try {
        await client.connect();
        const database = client.db('mcom'); // Choose a name for your database
        const collection = database.collection('users'); // Choose a name for your collection
        const resp = await collection.insertOne({ data });
        return Response.json({ data: resp})
      }catch(e) {
        return Response.json({ error: e})
    }
}