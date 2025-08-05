
'use client'
import { adduser } from "@/app/actions/actions"
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
import { useState } from "react"



export function  SigneUpButton() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  

  async function Sign(): Promise<void> {
    const form = new FormData();
    form.append("name", name);
    form.append("password", password);
    form.append("lastname", email);
    try {
      await adduser(form)
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("User not added");
    }
  }

  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button  variant="outline">Sign up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>creat account</DialogTitle>
            <DialogDescription>
                Create a new account by filling in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1" className="text-black">first name</Label>
              <Input onChange={(e)=>setName(e.target.value)} className="text-black" id="name" name="name" placeholder="Pedro" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1" className="text-black">Last name</Label>
              <Input onChange={(e)=>setemail(e.target.value)} className="text-black" id="Lastname" name="name" placeholder="Duarte" type="email" />
            </div>        
            <div className="grid gap-3">
              <Label htmlFor="username-1" className="text-black">passsword</Label>
              <Input onChange={(e)=>setPassword(e.target.value)} className="text-black" id="password" name="username" placeholder="********" type="passeword"/>
            </div>
          </div>
          <DialogFooter>
              <Button onClick={()=>Sign()} className="text-black" variant="outline">signe up</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
