"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function GenerateTestCasePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [figmaLink, setFigmaLink] = useState("")
  const [requirements, setRequirements] = useState("")
  const [projectName, setProjectName] = useState("")

  const handleGenerate = async (e) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      // Redirect to show test cases page or show success message
      alert("Test cases generated successfully!")
    }, 3000)
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Generate Test Cases</h1>
        <p className="text-muted-foreground text-lg">
          Create comprehensive test cases from your Figma designs and requirements
        </p>
      </div>

      <Tabs defaultValue="figma" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="figma">Figma Design</TabsTrigger>
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
        </TabsList>
        <TabsContent value="figma">
          <Card>
            <CardHeader>
              <CardTitle>Generate from Figma</CardTitle>
              <CardDescription>Provide your Figma design link and requirements to generate test cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="figma-link">Figma Design Link</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="figma-link"
                      placeholder="https://www.figma.com/file/..."
                      value={figmaLink}
                      onChange={(e) => setFigmaLink(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Make sure your Figma file is set to public or has view access
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Software Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Enter your software requirements or user stories..."
                    className="min-h-[200px]"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Test Cases...
                    </>
                  ) : (
                    "Generate Test Cases"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual Input</CardTitle>
              <CardDescription>Manually describe your UI components and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name-manual">Project Name</Label>
                  <Input id="project-name-manual" placeholder="Enter project name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ui-description">UI Description</Label>
                  <Textarea
                    id="ui-description"
                    placeholder="Describe your UI components, layout, and interactions..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements-manual">Software Requirements</Label>
                  <Textarea
                    id="requirements-manual"
                    placeholder="Enter your software requirements or user stories..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Test Cases...
                    </>
                  ) : (
                    "Generate Test Cases"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Tips for Better Test Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Figma Design Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Ensure all components are properly named in your Figma file</li>
                <li>Use frames to organize related UI elements</li>
                <li>Include all states for interactive elements (hover, active, disabled)</li>
                <li>Add comments to explain complex interactions</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Requirements Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Be specific about expected behaviors and interactions</li>
                <li>Include validation rules for forms and inputs</li>
                <li>Describe error states and how they should be handled</li>
                <li>Specify any performance requirements or constraints</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

