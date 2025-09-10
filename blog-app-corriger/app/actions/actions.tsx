"use server";

import prisma from "../lib/db";



async function adduser(formData: FormData) {
    

 try {
    const user = await prisma.user.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("lastname") as string,
        password: formData.get("password") as string,
        role: "user", // or set this to the appropriate role value
      },
    });

    
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("User not found");
  }
}

async function addblog(formData:FormData) {
  try{

    const email = formData.get("user") as string;

// Cherche l'utilisateur correspondant
const user = await prisma.user.findUnique({
  where: { email: email },
  select: { id: true },
});


if (!user) {
  throw new Error("Utilisateur non trouvé");
}
 const cathid = Number(formData.get("category")) 

    const blog = await prisma.blog.create({
      data:{
          title :formData.get("title") as string,
          slug  :formData.get("slug") as string,
          image :formData.get("image") as   string,
          description :formData.get("description") as string,
          content :formData.get("content") as string,
          authorId :user.id,
          categoryId :cathid,

      }
    })
  } catch(error){
    console.error("we couldn't add the blog", error);

  }

}
export { adduser, addblog };