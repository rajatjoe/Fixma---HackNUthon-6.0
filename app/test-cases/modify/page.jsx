"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Edit, Loader2, Plus, Save, Search, Trash2 } from "lucide-react"

// Mock data for demonstration
const mockTestCase = {
  id: "TC001",
  name: "Login Form Validation",
  description: "Verify that the login form properly validates user inputs and displays appropriate error messages.",
  project: "E-commerce Dashboard",
  type: "UI",
  preconditions: "User is on the login page.",
  steps: [
    {
      id: 1,
      description: 'Enter invalid email format (e.g., "user@").',
      expected: 'System displays "Please enter a valid email address" error message.',
    },
    {
      id: 2,
      description: "Enter valid email but leave password field empty.",
      expected: 'System displays "Password is required" error message.',
    },
    {
      id: 3,
      description: "Enter valid email and password less than 8 characters.",
      expected: 'System displays "Password must be at least 8 characters" error message.',
    },
    {
      id: 4,
      description: "Enter valid email and password.",
      expected: "Form validation passes, login button becomes enabled.",
    },
  ],
}

export default function ModifyTestCasePage() {
  const [testCase, setTestCase] = useState(mockTestCase)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [newStep, setNewStep] = useState({ description: "", expected: "" })

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      alert("Test case updated successfully!")
    }, 1000)
  }

  const handleAddStep = () => {
    if (newStep.description && newStep.expected) {
      setTestCase({
        ...testCase,
        steps: [
          ...testCase.steps,
          {
            id: testCase.steps.length + 1,
            description: newStep.description,
            expected: newStep.expected,
          },
        ],
      })
      setNewStep({ description: "", expected: "" })
    }
  }

  const handleRemoveStep = (stepId) => {
    setTestCase({
      ...testCase,
      steps: testCase.steps.filter((step) => step.id !== stepId),
    })
  }

  const handleUpdateStep = (stepId, field, value) => {
    setTestCase({
      ...testCase,
      steps: testCase.steps.map((step) => (step.id === stepId ? { ...step, [field]: value } : step)),
    })
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Modify Test Cases</h1>
        <p className="text-muted-foreground text-lg">Edit and update your existing test cases</p>
      </div>

      <Tabs defaultValue="search">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="search">Find Test Case</TabsTrigger>
          <TabsTrigger value="edit">Edit Test Case</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Test Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID or name..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">{testCase.id}</TableCell>
                        <TableCell>{testCase.name}</TableCell>
                        <TableCell>{testCase.project}</TableCell>
                        <TableCell>{testCase.type}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Edit Test Case</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-id">Test Case ID</Label>
                    <Input id="test-id" value={testCase.id} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="test-name">Test Case Name</Label>
                    <Input
                      id="test-name"
                      value={testCase.name}
                      onChange={(e) => setTestCase({ ...testCase, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="test-project">Project</Label>
                    <Select
                      value={testCase.project}
                      onValueChange={(value) => setTestCase({ ...testCase, project: value })}
                    >
                      <SelectTrigger id="test-project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E-commerce Dashboard">E-commerce Dashboard</SelectItem>
                        <SelectItem value="Social Media App">Social Media App</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="test-type">Type</Label>
                    <Select value={testCase.type} onValueChange={(value) => setTestCase({ ...testCase, type: value })}>
                      <SelectTrigger id="test-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UI">UI</SelectItem>
                        <SelectItem value="Functional">Functional</SelectItem>
                        <SelectItem value="Integration">Integration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-description">Description</Label>
                  <Textarea
                    id="test-description"
                    value={testCase.description}
                    onChange={(e) => setTestCase({ ...testCase, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-preconditions">Preconditions</Label>
                  <Textarea
                    id="test-preconditions"
                    value={testCase.preconditions}
                    onChange={(e) => setTestCase({ ...testCase, preconditions: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Test Steps</Label>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">#</TableHead>
                          <TableHead>Test Step</TableHead>
                          <TableHead>Expected Result</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {testCase.steps.map((step) => (
                          <TableRow key={step.id}>
                            <TableCell>{step.id}</TableCell>
                            <TableCell>
                              <Textarea
                                value={step.description}
                                onChange={(e) => handleUpdateStep(step.id, "description", e.target.value)}
                                rows={2}
                                className="min-h-[80px]"
                              />
                            </TableCell>
                            <TableCell>
                              <Textarea
                                value={step.expected}
                                onChange={(e) => handleUpdateStep(step.id, "expected", e.target.value)}
                                rows={2}
                                className="min-h-[80px]"
                              />
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => handleRemoveStep(step.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell>
                            <Plus className="h-4 w-4" />
                          </TableCell>
                          <TableCell>
                            <Textarea
                              placeholder="Enter test step..."
                              value={newStep.description}
                              onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                              rows={2}
                              className="min-h-[80px]"
                            />
                          </TableCell>
                          <TableCell>
                            <Textarea
                              placeholder="Enter expected result..."
                              value={newStep.expected}
                              onChange={(e) => setNewStep({ ...newStep, expected: e.target.value })}
                              rows={2}
                              className="min-h-[80px]"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleAddStep}
                              disabled={!newStep.description || !newStep.expected}
                            >
                              <Check className="h-4 w-4 text-primary" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

