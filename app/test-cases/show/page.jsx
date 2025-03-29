"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Filter, Search } from "lucide-react"

// Mock data for demonstration
const mockTestCases = [
  {
    id: "TC001",
    name: "Login Form Validation",
    project: "E-commerce Dashboard",
    created: "2023-10-15",
    status: "Passed",
    type: "UI",
  },
  {
    id: "TC002",
    name: "Product Search Functionality",
    project: "E-commerce Dashboard",
    created: "2023-10-16",
    status: "Failed",
    type: "Functional",
  },
  {
    id: "TC003",
    name: "Checkout Process",
    project: "E-commerce Dashboard",
    created: "2023-10-17",
    status: "Pending",
    type: "Integration",
  },
  {
    id: "TC004",
    name: "User Registration Form",
    project: "Social Media App",
    created: "2023-10-18",
    status: "Passed",
    type: "UI",
  },
  {
    id: "TC005",
    name: "Post Creation and Sharing",
    project: "Social Media App",
    created: "2023-10-19",
    status: "Pending",
    type: "Functional",
  },
]

export default function ShowTestCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTestCases, setFilteredTestCases] = useState(mockTestCases)
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    applyFilters(term, selectedProject, selectedType, selectedStatus)
  }

  const applyFilters = (term, project, type, status) => {
    let filtered = mockTestCases

    if (term) {
      filtered = filtered.filter(
        (tc) => tc.name.toLowerCase().includes(term.toLowerCase()) || tc.id.toLowerCase().includes(term.toLowerCase()),
      )
    }

    if (project) {
      filtered = filtered.filter((tc) => tc.project === project)
    }

    if (type) {
      filtered = filtered.filter((tc) => tc.type === type)
    }

    if (status) {
      filtered = filtered.filter((tc) => tc.status === status)
    }

    setFilteredTestCases(filtered)
  }

  const handleProjectFilter = (value) => {
    setSelectedProject(value)
    applyFilters(searchTerm, value, selectedType, selectedStatus)
  }

  const handleTypeFilter = (value) => {
    setSelectedType(value)
    applyFilters(searchTerm, selectedProject, value, selectedStatus)
  }

  const handleStatusFilter = (value) => {
    setSelectedStatus(value)
    applyFilters(searchTerm, selectedProject, selectedType, value)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Passed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">View Test Cases</h1>
        <p className="text-muted-foreground text-lg">Browse and search through your existing test cases</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search test cases..." className="pl-8" value={searchTerm} onChange={handleSearch} />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Select value={selectedProject} onValueChange={handleProjectFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="E-commerce Dashboard">E-commerce Dashboard</SelectItem>
                    <SelectItem value="Social Media App">Social Media App</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={handleTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="UI">UI</SelectItem>
                    <SelectItem value="Functional">Functional</SelectItem>
                    <SelectItem value="Integration">Integration</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={handleStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Passed">Passed</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestCases.length > 0 ? (
                    filteredTestCases.map((testCase) => (
                      <TableRow key={testCase.id}>
                        <TableCell className="font-medium">{testCase.id}</TableCell>
                        <TableCell>{testCase.name}</TableCell>
                        <TableCell>{testCase.project}</TableCell>
                        <TableCell>{testCase.type}</TableCell>
                        <TableCell>{testCase.created}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(testCase.status)}>{testCase.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                        No test cases found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

