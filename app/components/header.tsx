import Link from "next/link"
import { Bell, Mail, Search } from "lucide-react"

import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <nav className="flex-1">
        <ul className="flex gap-4">
          <li>
            <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 border-b-2 border-blue-600 px-1 py-4">
              Dashboard
            </Link>
          </li>
          <Link href="/signin" className="text-blue-600 hover:text-blue-800">
          login
        </Link>
        </ul>


        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search here" className="w-64 pl-8" />
          </div>
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

