import { authconfig } from "@/lib/provider";
import NextAuth from "next-auth/next";

const handler = NextAuth(authconfig);

export {handler as GET , handler as POST}