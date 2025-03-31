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
                    <Card 
                      key={testCase.id} 
                      className="overflow-hidden transform hover:scale-[1.01] transition-all duration-300 
                      border border-slate-200 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-800 
                      hover:shadow-lg hover:shadow-violet-100/20 dark:hover:shadow-violet-900/20"
                    >
                      <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pb-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3 animate-fadeIn">
                              <Badge 
                                className={`${getPriorityColor(testCase.priority)} px-4 py-1.5 rounded-full 
                                flex items-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 
                                transition-all duration-300 cursor-default border-2 border-opacity-20`}
                              >
                                <span className="h-2.5 w-2.5 rounded-full bg-current opacity-75 animate-pulse"></span>
                                {testCase.priority}
                              </Badge>
                              <span className="text-sm bg-emerald-50 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full 
                                flex items-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 
                                transition-all duration-200 group hover:shadow-inner">
                                <span className="text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 
                                  dark:group-hover:text-emerald-300">ID:</span>
                                <span className="font-mono font-medium tracking-wide text-emerald-700 dark:text-emerald-300">
                                  {testCase.id.substring(0, 8)}
                                </span>
                              </span>
                              <span className="text-sm bg-amber-50 dark:bg-amber-900/30 px-4 py-1.5 rounded-full 
                                flex items-center gap-2 hover:bg-amber-100 dark:hover:bg-amber-800/40 
                                transition-all duration-200 hover:shadow-inner">
                                <span className="text-amber-600 dark:text-amber-400">Created:</span>
                                <span className="font-medium text-amber-700 dark:text-amber-300">{testCase.createdAt}</span>
                              </span>
                            </div>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 
                              dark:from-violet-300 dark:to-purple-400 bg-clip-text text-transparent 
                              transform hover:scale-[1.01] transition-transform duration-200 leading-tight"
                            >
                              {testCase.summary}
                            </CardTitle>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleViewTestCase(testCase)}
                              className="hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 
                              dark:hover:text-violet-400 transition-colors duration-200"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => toggleExpandTestCase(testCase.id)}
                              className="hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 
                              dark:hover:text-violet-400 transition-colors duration-200"
                            >
                              {expandedTestCase === testCase.id ? 
                                <ChevronUp className="h-4 w-4 transition-transform duration-200 transform hover:-translate-y-0.5" /> : 
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 transform hover:translate-y-0.5" />
                              }
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {testCase.tags.map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 
                              dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800 
                              text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-full
                              hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 
                              dark:hover:from-indigo-800/30 dark:hover:to-purple-800/30 
                              transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 
                              hover:shadow-md hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/50
                              font-medium tracking-wide text-sm cursor-default
                              flex items-center gap-1.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 opacity-70"></span>
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
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-950 border border-blue-100/50 dark:border-blue-900/20 shadow-lg rounded-lg transition-all duration-300 transform scale-100">
          {selectedTestCase && (
            <>
              <DialogHeader className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg border-b border-blue-100/50 dark:border-blue-900/20">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className={`${getPriorityColor(selectedTestCase.priority)} px-3 py-1 text-sm font-medium shadow-sm hover:shadow transition-all duration-200`}>
                    {selectedTestCase.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                    ID: {selectedTestCase.id.substring(0, 10)}...
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">{selectedTestCase.summary}</DialogTitle>
                <DialogDescription className="flex flex-wrap gap-2 mt-3">
                  {selectedTestCase.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 transition-all duration-300 hover:translate-y-[-2px]">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <span className="inline-block w-1 h-6 bg-blue-500 rounded-full mr-1"></span>
                  Test Steps
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {selectedTestCase.test_cases.length} {selectedTestCase.test_cases.length === 1 ? 'step' : 'steps'}
                  </span>
                </h3>
                <div className="rounded-lg border border-blue-100 dark:border-blue-900/30 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                        <TableRow className="border-b border-blue-100 dark:border-blue-800/20">
                          <TableHead className="w-12 font-semibold text-blue-800 dark:text-blue-300">#</TableHead>
                          <TableHead className="font-semibold text-blue-800 dark:text-blue-300">Test Step</TableHead>
                          <TableHead className="font-semibold text-blue-800 dark:text-blue-300">Expected Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedTestCase.test_cases.map((step, index) => (
                          <TableRow 
                            key={index}
                            className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/50 dark:bg-slate-800/10'}`}
                          >
                            <TableCell className="font-medium text-blue-600 dark:text-blue-400 w-12">{index + 1}</TableCell>
                            <TableCell className="font-medium">{step.step}</TableCell>
                            <TableCell className="text-slate-600 dark:text-slate-300 italic">{step.expected_result}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-800 dark:hover:text-blue-200 transition-all duration-200 px-6 hover:scale-105"
                >
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
