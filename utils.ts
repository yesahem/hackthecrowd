export default function getApiUrl() {
    const environment = process.env.NODE_ENV!;
    console.log(environment);

    if (environment === "production") {
        
        return `https://hackthecrowd-ioioii.vercel.app/`;
    } else {
        return process.env.NEXT_PUBLIC_API_URL!;
    }
}