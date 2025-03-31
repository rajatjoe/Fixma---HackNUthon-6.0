// here we will create a page which is going to display the repsonse from the scripting model for generating selenium script and then also give the option to the user to run the script for a particular website 
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Play, Download, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ScriptTestingPage() {
  const router = useRouter()
  const [scriptData, setScriptData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [runResults, setRunResults] = useState(null)

  useEffect(() => {
    const fetchScript = async () => {
      try {
        setLoading(true)
        const scriptId = localStorage.getItem("generatedScriptId")
        
        if (!scriptId) {
          throw new Error("No script ID found. Please generate a script first.")
        }
        
        const response = await fetch(`/api/script/fetch?id=${scriptId}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch script")
        }
        
        const data = await response.json()
        setScriptData(data)
      } catch (err) {
        console.error("Error fetching script:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchScript()
  }, [])

  const handleRunScript = async () => {
    try {
      setIsRunning(true)
      
      // Simulate script execution (in a real app, you would call an API to run the script)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock results (in a real app, these would come from the API)
      setRunResults({
        success: true,
        passedTests: 3,
        failedTests: 1,
        totalTests: 4,
        duration: "00:01:45",
        details: [
          { step: "Navigate to homepage", status: "passed", message: "Successfully navigated to homepage" },
          { step: "Click login button", status: "passed", message: "Successfully clicked login button" },
          { step: "Enter credentials", status: "passed", message: "Successfully entered credentials" },
          { step: "Verify dashboard", status: "failed", message: "Element not found: dashboard-header" }
        ]
      })
      
      toast({
        title: "Script execution completed",
        description: "The script has been executed successfully.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error running script:", error)
      toast({
        title: "Error",
        description: "Failed to run script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleDownloadScript = () => {
    if (!scriptData) return
    
    const element = document.createElement("a")
    const file = new Blob([scriptData.script], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `selenium_script_${scriptData._id}.py`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter">Selenium Script Testing</h1>
          <p className="text-muted-foreground text-lg">Run and test your generated Selenium scripts</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading script...</span>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          <p>Error: {error}</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/test-cases/show")}>
            Go Back to Test Cases
          </Button>
        </div>
      ) : scriptData ? (
        <div className="space-y-8">
          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 px-3 py-1">
                  Selenium Script
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1">
                  {scriptData.websiteUrl}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {scriptData.testCaseSummary}
              </CardTitle>
              <CardDescription>
                Generated on {new Date(scriptData.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="script" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-4">
                  <TabsTrigger value="script">Script</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="script" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Generated Selenium Script</h3>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleDownloadScript}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button 
                        onClick={handleRunScript}
                        disabled={isRunning}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                      >
                        {isRunning ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            Run Script
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      {scriptData.script}
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="results" className="space-y-4">
                  {runResults ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="bg-slate-50 dark:bg-slate-900">
                          <CardContent className="p-6 text-center">
                            <p className="text-sm text-muted-foreground mb-1">Status</p>
                            <p className={`text-xl font-bold ${runResults.success ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                              {runResults.success ? 'Passed' : 'Failed'}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-50 dark:bg-slate-900">
                          <CardContent className="p-6 text-center">
                            <p className="text-sm text-muted-foreground mb-1">Passed Tests</p>
                            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                              {runResults.passedTests}/{runResults.totalTests}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-50 dark:bg-slate-900">
                          <CardContent className="p-6 text-center">
                            <p className="text-sm text-muted-foreground mb-1">Failed Tests</p>
                            <p className="text-xl font-bold text-red-600 dark:text-red-400">
                              {runResults.failedTests}/{runResults.totalTests}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-50 dark:bg-slate-900">
                          <CardContent className="p-6 text-center">
                            <p className="text-sm text-muted-foreground mb-1">Duration</p>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {runResults.duration}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Test Details</h3>
                        <div className="rounded-md border">
                          <div className="divide-y">
                            {runResults.details.map((detail, index) => (
                              <div key={index} className="p-4 flex items-start gap-3">
                                {detail.status === 'passed' ? (
                                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                )}
                                <div>
                                  <p className="font-medium">{detail.step}</p>
                                  <p className={`text-sm ${detail.status === 'passed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {detail.message}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No results yet. Run the script to see results.</p>
                      <Button 
                        onClick={handleRunScript}
                        disabled={isRunning}
                        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {isRunning ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Running...
                          </>
                        ) : (
                          "Run Script"
                        )}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p>No script found. Please generate a script first.</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/test-cases/show")}>
            Go to Test Cases
          </Button>
        </div>
      )}
    </div>
  )
}