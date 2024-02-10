import type { NextApiRequest, NextApiResponse } from 'next';
export async function GET() {
    return Response.json({ data: "Hello world"})
}