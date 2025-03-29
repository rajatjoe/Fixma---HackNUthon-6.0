"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Check, FileText, Loader2, Play, Upload, X } from "lucide-react"

export default function UiTestingPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState(null)

  const handleRunTests = () => {
    setIsRunning(true)

    // Simulate API call
    setTimeout(() => {
      setIsRunning(false)
      setTestResults({
        total: 15,
        passed: 12,
        failed: 3,
        tests: [
          { id: 1, name: "Login form should display validation errors", status: "passed", duration: "1.2s" },
          { id: 2, name: "Login form should submit with valid credentials", status: "passed", duration: "0.8s" },
          { id: 3, name: "Navigation menu should display all items", status: "passed", duration: "0.5s" },
          { id: 4, name: "Product list should display 10 items per page", status: "passed", duration: "1.5s" },
          {
            id: 5,
            name: "Product filter should work correctly",
            status: "failed",
            duration: "2.1s",
            error: "Expected 5 items but found 7",
          },
          { id: 6, name: "Product search should return matching results", status: "passed", duration: "1.3s" },
          { id: 7, name: "Add to cart button should update cart count", status: "passed", duration: "0.9s" },
          { id: 8, name: "Cart page should display all added items", status: "passed", duration: "1.1s" },
          { id: 9, name: "Checkout form should validate all fields", status: "passed", duration: "1.7s" },
          {
            id: 10,
            name: "Payment form should accept valid card details",
            status: "failed",
            duration: "2.3s",
            error: "Element not found: #card-number",
          },
          { id: 11, name: "Order confirmation page should display order details", status: "passed", duration: "0.7s" },
          { id: 12, name: "User profile should display correct information", status: "passed", duration: "0.6s" },
          { id: 13, name: "User profile edit form should save changes", status: "passed", duration: "1.4s" },
          {
            id: 14,
            name: "Password change form should validate password strength",
            status: "failed",
            duration: "1.9s",
            error: "Timeout waiting for validation message",
          },
          { id: 15, name: "Logout should redirect to login page", status: "passed", duration: "0.4s" },
        ],
      })
    }, 3000)
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">UI Testing</h1>
        <p className="text-muted-foreground text-lg">Validate your UI implementation against test cases</p>
      </div>

      <Tabs defaultValue="selenium">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="selenium">Selenium Tests</TabsTrigger>
          <TabsTrigger value="upload">Upload Tests</TabsTrigger>
        </TabsList>
        <TabsContent value="selenium">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Run UI Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-suite">Test Suite</Label>
                      <Select defaultValue="e-commerce">
                        <SelectTrigger id="test-suite">
                          <SelectValue placeholder="Select test suite" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="e-commerce">E-commerce Website</SelectItem>
                          <SelectItem value="dashboard">Admin Dashboard</SelectItem>
                          <SelectItem value="mobile">Mobile App UI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="browser">Browser</Label>
                      <Select defaultValue="chrome">
                        <SelectTrigger id="browser">
                          <SelectValue placeholder="Select browser" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chrome">Chrome</SelectItem>
                          <SelectItem value="firefox">Firefox</SelectItem>
                          <SelectItem value="edge">Edge</SelectItem>
                          <SelectItem value="safari">Safari</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-url">Target URL</Label>
                    <Input id="base-url" placeholder="https://example.com" defaultValue="https://example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Test Options</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="headless" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="headless" className="font-normal">
                          Run in headless mode
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="screenshots" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="screenshots" className="font-normal">
                          Capture screenshots on failure
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="video" className="rounded border-gray-300" />
                        <Label htmlFor="video" className="font-normal">
                          Record video
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="parallel" className="rounded border-gray-300" />
                        <Label htmlFor="parallel" className="font-normal">
                          Run tests in parallel
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleRunTests} disabled={isRunning}>
                    {isRunning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running Tests...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Run UI Tests
                      </>
                    )}
                  </Button>

                  {testResults && (
                    <div className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Test Results</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              {testResults.passed} Passed
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                              {testResults.failed} Failed
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="divide-y">
                          {testResults.tests.map((test) => (
                            <div key={test.id} className="flex items-center p-4">
                              <div className="mr-4">
                                {test.status === "passed" ? (
                                  <Check className="h-5 w-5 text-green-500" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{test.name}</div>
                                {test.status === "failed" && (
                                  <div className="text-sm text-red-500 mt-1">{test.error}</div>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{test.duration}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Export Report
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Custom Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="test-name">Test Name</Label>
                  <Input id="test-name" placeholder="Enter test name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-description">Description</Label>
                  <Input id="test-description" placeholder="Enter test description" />
                </div>

                <div className="space-y-2">
                  <Label>Test Files</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center mb-2">
                      Drag and drop your test files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground text-center">Supports .js, .py, .ts files (Max 10MB)</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-framework">Test Framework</Label>
                  <Select>
                    <SelectTrigger id="test-framework">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="selenium">Selenium</SelectItem>
                      <SelectItem value="cypress">Cypress</SelectItem>
                      <SelectItem value="playwright">Playwright</SelectItem>
                      <SelectItem value="puppeteer">Puppeteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-config">Configuration (Optional)</Label>
                  <Input id="test-config" placeholder="Enter path to config file" />
                </div>

                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload and Run Tests
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

