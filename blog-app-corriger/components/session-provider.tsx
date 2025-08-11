

import * as React from "react"
import { auth } from "@/app/lib/auth";
import Cnav from "./nav";
import prisma from "@/app/lib/db";

export async function CustomSessionProvider(){
  
    const session = await auth();

    const cathegorie = await prisma.categiory.findMany({})
  return <Cnav session={session} cathegorie={cathegorie}/>;
}