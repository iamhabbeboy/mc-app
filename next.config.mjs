/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URI: process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://makelovepossible-api.vercel.app",
        BASE_URI: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "makelovepossible.mcom.ng",
    }
};

export default nextConfig;
