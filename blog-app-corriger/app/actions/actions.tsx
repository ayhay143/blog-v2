"use server";

import prisma from "../lib/db";



export async function adduser(formData: FormData) {
    

 try {
    const user = await prisma.user.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("lastname") as string,
        password: formData.get("password") as string,
      },
    });

    
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("User not found");
  }
}

