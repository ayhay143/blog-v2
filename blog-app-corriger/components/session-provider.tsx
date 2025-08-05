

import * as React from "react"
import { auth } from "@/app/lib/auth";
import Cnav from "./nav";

export async function CustomSessionProvider(){
    const session = await auth();
  return <Cnav session={session}/>;
}