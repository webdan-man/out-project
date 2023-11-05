import nextAuth from 'next-auth'
import {authConfig} from "@/config/auth";

const handler = nextAuth(authConfig);

export { handler as GET, handler as POST}