import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./db"
export const { auth, handlers } = NextAuth({ providers: [Credentials({
    credentials:{
        email:{},
        password:{},
    },
    authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
            where: { email: credentials?.email ,password: credentials?.password },

        })
        if (!user) {
            throw new Error("Invalid email or password");
        }
        // Convert id to string to match User type
        return {
            ...user,
            id: String(user.id),
        };
}
}
)] })