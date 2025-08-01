import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function  LoginButton() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button  variant="outline">login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1" className="text-black">Username</Label>
              <Input className="text-black" id="name-1" name="name" placeholder="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1" className="text-black">passsword</Label>
              <Input className="text-black" id="username-1" name="username" placeholder="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="text-black" variant="outline">signe up</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
