"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { ChangeEvent, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { addblog } from "@/app/actions/actions"
import { RichTextEditor } from "./rich-text-editor"
import { Icon } from "@radix-ui/react-select"
import { CheckCheck } from "lucide-react"

type Category = {
   color: string ; id: string | number; name: string 
};
export function NewBlog({ cath }: { cath: Category[] }): React.JSX.Element {
    const [title,settitle]=useState("")
    const [image,setimage]=useState("")
    const [categ,setcath]=useState<string | null>(null)
    const [description,setdescription]=useState("") 
    const [editorContent, setEditorContent] = useState<string>("");
    const [plainTextContent, setPlainTextContent] = useState<string>("");
    const { data: session } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);
    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
      const index = event.target.value.lastIndexOf("\\")
      const filename = event.target.value.substring(index+1)
        setimage("/"+filename)
        
        
        
      }    
      async function onsubmit(){
        const form = new FormData();
        form.append("title",title)
        form.append("description",description)
        form.append("image",image)
        form.append("slug" ,title.replace(" ","-") )
        form.append("user", session?.user?.email ?? "")
        form.append("category",categ?categ.toString():"")
        form.append("content",editorContent)
        form.append("plainTextContent",plainTextContent)
        for (const [key, value] of form.entries()) {
  console.log(key, value);
}
        // need to deside whether i will se the action form or this submit function
        addblog(form)
        
        
        
        
        
    }

  function handleEditorChange(htmlContent: string, plainText: string): void {
    setEditorContent(htmlContent)
    setPlainTextContent(plainText)

  }

  

  return (
    

    <Card className="w-full ">
      <CardHeader>
        <CardTitle>here you can creat a new blog</CardTitle>
        <CardDescription>
            Fill in the form below to create a new blog post.
        </CardDescription>
        
      </CardHeader>
      <CardContent>
        <form action={addblog}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label  htmlFor="title">title</Label>
              <Input
                className="w-2/5"
                id="title"
                type="text"
                placeholder="Enter the title of your blog post"
                required
                onChange={(e)=>{settitle(e.target.value)}} 

              />
            </div>
            <div>
                
                <Button variant="default" type="button" onClick={() => fileInputRef.current?.click()}>Choose File {image && <CheckCheck />}</Button>
                
                {/* it take the name of the file only so the image need to be in the folder public/images*/} 
                <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg"
                />
               
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                 <RichTextEditor
                
                placeholder={"Start typing..."}
                onChange={handleEditorChange}
              />
                
              </div>
              <Textarea 
                placeholder="Type your message here."
                onChange={(e)=>{setdescription(e.target.value)}} 
              />

            </div>
            <div > 
              {cath ? cath.map((cat) => (
                <button
                  onClick={() => setcath(cat.id.toString())}
                  key={cat.id}
                  type="button"
                  className={`m-1 p-2 border rounded-md hover:bg-gray-200 ${categ === cat.id.toString() ? "bg-blue-200" : "bg-gray-100"}`}
                  style={{ color: cat.color }}
                >
                  {cat.name}
                </button>
              )) : "no categories available"}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className=" flex-col  gap-2">
        <Button type="submit" className="place-self-start" onClick={() => onsubmit()}>
          submit
        </Button>
      </CardFooter>
    </Card>
    
  )
}
