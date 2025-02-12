import { Users, Activity, Zap, UserPlus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
     <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Happy Customer</CardTitle>
    <Users className="h-4 w-4 text-blue-500" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold text-gray-900 dark:text-white">600</div>
  </CardContent>
</Card>

<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Active Customer</CardTitle>
    <Activity className="h-4 w-4 text-red-500" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold text-gray-900 dark:text-white">274</div>
  </CardContent>
</Card>

<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Deals</CardTitle>
    <Zap className="h-4 w-4 text-yellow-500" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold text-gray-900 dark:text-white">177</div>
  </CardContent>
</Card>

<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">New Members</CardTitle>
    <UserPlus className="h-4 w-4 text-green-500" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold text-gray-900 dark:text-white">130</div>
  </CardContent>
</Card>

    </div>
  )
}

