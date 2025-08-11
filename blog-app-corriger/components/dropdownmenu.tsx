import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import Link from "next/link";

export  function DropdownMenuDemo({cathegorie}: {cathegorie?: category[];}) 
  
  
{
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">cathegorie <ChevronDown/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
            {cathegorie?cathegorie.map((cat) => (
                <DropdownMenuItem key={cat.id}>
                <Link href={`${cat.id}`}>
                
                {cat.name}
                
                </Link>
                
                </DropdownMenuItem>
            )):"No categories available"}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
