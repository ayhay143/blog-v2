"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SigneUpButton } from "./sign-up-button"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { executeAction } from "@/app/lib/executeAction"



export function  LoginButton({ openLogin, setOpenLogin }: { openLogin: boolean, setOpenLogin: (v: boolean) => void }) {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  
  async function onsubmit() {
    // console.log("Form submitted with data:", email, password);
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    try {
    
    executeAction ({
      actionFn: async () => {
        await signIn("credentials", { email, password });
      },
    });
    console.log("User found:");
    

    
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("User not found");
    }
    
  }
  return (
    <Dialog open={openLogin} onOpenChange={setOpenLogin}>
   
        <DialogTrigger asChild>
          <Button  variant="outline">login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>connect to your account</DialogTitle>
            <DialogDescription>
              Please enter your username and password to log in.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1" className="text-black">Username</Label>
              <Input onChange={(e) => setEmail(e.target.value)} className="text-black" id="name-1" name="name" placeholder="Pedro Duarte"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1" className="text-black">passsword</Label>
              <Input onChange={(e) => setPassword(e.target.value)} className="text-black" id="username-1" name="username" placeholder="@peduarte" />
            </div>
          </div>

          <DialogFooter>
            
            <SigneUpButton />
            <Button  onClick={() => onsubmit()} type="submit">Login</Button>
          </DialogFooter>
        </DialogContent>

    </Dialog>
  )
}
