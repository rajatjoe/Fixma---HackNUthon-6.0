"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Play, RefreshCcw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function ScriptTestingPage() {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState(null)
  const [testResults, setTestResults] = useState(null)

  // Sample test case for mockup
  const sampleTestCase = {
    id: "TC001",
    summary: "Login Functionality Test",
    description: "Test the user login process with valid credentials",
    steps: [
      "Navigate to login page",
      "Enter valid username",
      "Enter valid password",
      "Click login button",
      "Verify successful login"
    ],
    expectedResult: "User should be successfully logged in and redirected to dashboard"
  }

  // Sample generated script
  const sampleScript = `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_login():
    # Setup webdriver
    driver = webdriver.Chrome()
    driver.get("${websiteUrl}")
    
    try:
        # Find and click login button
        login_button = driver.find_element(By.ID, "login-btn")
        login_button.click()
        
        # Enter credentials
        username = driver.find_element(By.ID, "username")
        username.send_keys("testuser")
        
        password = driver.find_element(By.ID, "password")
        password.send_keys("testpass")
        
        # Submit form
        submit = driver.find_element(By.ID, "submit-btn")
        submit.click()
        
        # Wait for dashboard
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "dashboard"))
        )
        
        print("Test passed: Successfully logged in!")
        return True
        
    except Exception as e:
        print(f"Test failed: {str(e)}")
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    test_login()`

  const handleGenerateScript = async () => {
    if (!websiteUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    
    // Simulate script generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratedScript(sampleScript)
    
    toast({
      title: "Success",
      description: "Selenium script generated successfully!",
    })
    
    setIsGenerating(false)
  }

  const handleRunTest = async () => {
    setTestResults(null)
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setTestResults({
      success: true,
      steps: [
        { name: "Navigate to login page", status: "passed", duration: "0.5s" },
        { name: "Enter valid username", status: "passed", duration: "0.3s" },
        { name: "Enter valid password", status: "passed", duration: "0.2s" },
        { name: "Click login button", status: "passed", duration: "0.3s" },
        { name: "Verify successful login", status: "passed", duration: "1.2s" }
      ],
      totalDuration: "2.5s"
    })
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Selenium Script Testing</h1>
        <p className="text-muted-foreground">Generate and run Selenium tests for your website</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Input and Test Case */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website URL</label>
                  <Input 
                    placeholder="https://example.com" 
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleGenerateScript}
                  disabled={isGenerating || !websiteUrl}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Script...
                    </>
                  ) : (
                    "Generate Selenium Script"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Case Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{sampleTestCase.id}: {sampleTestCase.summary}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{sampleTestCase.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Test Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    {sampleTestCase.steps.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Expected Result:</h4>
                  <p className="text-sm">{sampleTestCase.expectedResult}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Generated Script and Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Generated Selenium Script</CardTitle>
              {generatedScript && (
                <Button 
                  onClick={handleRunTest}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Run Test
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {generatedScript ? (
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">{generatedScript}</code>
                </pre>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Enter a website URL and generate a script to see it here
                </div>
              )}
            </CardContent>
          </Card>

          {testResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Test Results</span>
                  <span className={`text-sm ${testResults.success ? 'text-green-600' : 'text-red-600'}`}>
                    {testResults.success ? 'Passed' : 'Failed'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.steps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{step.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{step.duration}</span>
                        <span className={step.status === 'passed' ? 'text-green-600' : 'text-red-600'}>
                          {step.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total Duration</span>
                      <span>{testResults.totalDuration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}