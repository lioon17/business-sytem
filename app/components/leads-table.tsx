import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { MessageSquare, CheckCircle, Trash2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"

const leads = [
  {
    name: "Esther Howard",
    email: "esther@gmail.com",
    phone: "(684) 555-0102",
    company: "MasterCard",
    status: "New Lead",
    initials: "EH",
  },
  {
    name: "Kathryn Murphy",
    email: "kathryn@gmail.com",
    phone: "(316) 555-0116",
    company: "eBay",
    status: "Lost Client",
    initials: "KM",
  },
  {
    name: "Courtney Henry",
    email: "courtney@gmail.com",
    phone: "(629) 555-0129",
    company: "Gillette",
    status: "Converted",
    initials: "CH",
  },
  {
    name: "Marvin McKinney",
    email: "marvin@gmail.com",
    phone: "(308) 555-0121",
    company: "Louis Vuitton",
    status: "New Lead",
    initials: "MM",
  },
  {
    name: "Arlene McCoy",
    email: "arlene@gmail.com",
    phone: "(406) 555-0120",
    company: "Mitsubishi",
    status: "Converted",
    initials: "AM",
  },
]

export function LeadsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Lead Monthly Progress</h2>
        <select className="px-2 py-1 border rounded-md text-gray-900 bg-white">
          <option className="text-gray-900">This Month</option>
          <option className="text-gray-900">Last Month</option>
          <option className="text-gray-900">This Year</option>
        </select>
      </div>
      <div className="border rounded-lg">
        <Table>
        <TableHead>   
          <TableRow>
            <TableHeader>Lead Name</TableHeader>
            <TableHeader>Email Address</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Company Name</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.email}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{lead.initials}</AvatarFallback>
                    </Avatar>
                    {lead.name}
                  </div>
                </TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      lead.status === "New Lead" ? "default" : lead.status === "Lost Client" ? "destructive" : "success"
                    }
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

