"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Filter, Search, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ShowTestCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [testCases, setTestCases] = useState([])
  const [filteredTestCases, setFilteredTestCases] = useState([])
  const [selectedPriority, setSelectedPriority] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTestCase, setSelectedTestCase] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [expandedTestCase, setExpandedTestCase] = useState(null)

  // Fetch test cases from API
  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/test-cases/fetch')
        
        if (!response.ok) {
          throw new Error('Failed to fetch test cases')
        }
        
        const data = await response.json()
        setTestCases(data)
        setFilteredTestCases(data)
      } catch (err) {
        console.error('Error fetching test cases:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTestCases()
  }, [])

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    applyFilters(term, selectedPriority, selectedTag)
  }

  const applyFilters = (term, priority, tag) => {
    let filtered = testCases

    if (term) {
      filtered = filtered.filter(
        (tc) => 
          tc.summary.toLowerCase().includes(term.toLowerCase()) || 
          tc.id.toLowerCase().includes(term.toLowerCase())
      )
    }

    if (priority && priority !== "all") {
      filtered = filtered.filter((tc) => tc.priority === priority)
    }

    if (tag && tag !== "all") {
      filtered = filtered.filter((tc) => tc.tags.includes(tag))
    }

    setFilteredTestCases(filtered)
  }

  const handlePriorityFilter = (value) => {
    setSelectedPriority(value)
    applyFilters(searchTerm, value, selectedTag)
  }

  const handleTagFilter = (value) => {
    setSelectedTag(value)
    applyFilters(searchTerm, selectedPriority, value)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "P1":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "P2":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "P3":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleViewTestCase = (testCase) => {
    setSelectedTestCase(testCase)
    setIsDialogOpen(true)
  }

  const toggleExpandTestCase = (id) => {
    if (expandedTestCase === id) {
      setExpandedTestCase(null)
    } else {
      setExpandedTestCase(id)
    }
  }

  // Extract unique tags for filters
  const allTags = testCases.flatMap(tc => tc.tags || [])
  const uniqueTags = [...new Set(allTags)]

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Test Cases</h1>
        <p className="text-muted-foreground text-lg">Browse and search through your Figma test cases</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading test cases...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              <p>Error loading test cases: {error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by summary or ID..." className="pl-8" value={searchTerm} onChange={handleSearch} />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select value={selectedPriority} onValueChange={handlePriorityFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="P1">P1</SelectItem>
                      <SelectItem value="P2">P2</SelectItem>
                      <SelectItem value="P3">P3</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedTag} onValueChange={handleTagFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {uniqueTags.map(tag => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredTestCases.length > 0 ? (
                <div className="space-y-6">
                  {filteredTestCases.map((testCase) => (
                    <Card key={testCase.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getPriorityColor(testCase.priority)}>
                                {testCase.priority}
                              </Badge>
                              <span className="text-sm text-muted-foreground">ID: {testCase.id.substring(0, 8)}</span>
                              <span className="text-sm text-muted-foreground">Created: {testCase.createdAt}</span>
                            </div>
                            <CardTitle className="text-xl">{testCase.summary}</CardTitle>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewTestCase(testCase)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toggleExpandTestCase(testCase.id)}>
                              {expandedTestCase === testCase.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {testCase.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-secondary/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      
                      {expandedTestCase === testCase.id && (
                        <CardContent className="pt-4">
                          <h3 className="text-lg font-semibold mb-4">Test Steps</h3>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-12">#</TableHead>
                                  <TableHead>Test Step</TableHead>
                                  <TableHead>Expected Result</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {testCase.test_cases.map((step, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{step.step}</TableCell>
                                    <TableCell>{step.expected_result}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No test cases found. Try adjusting your filters.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Case Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedTestCase && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getPriorityColor(selectedTestCase.priority)}>
                    {selectedTestCase.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground">ID: {selectedTestCase.id}</span>
                </div>
                <DialogTitle className="text-2xl">{selectedTestCase.summary}</DialogTitle>
                <DialogDescription className="flex flex-wrap gap-2 mt-2">
                  {selectedTestCase.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-secondary/10">
                      {tag}
                    </Badge>
                  ))}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Test Steps</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Test Step</TableHead>
                        <TableHead>Expected Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTestCase.test_cases.map((step, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{step.step}</TableCell>
                          <TableCell>{step.expected_result}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}