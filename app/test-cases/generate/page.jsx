"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, FileText, Code, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function GenerateTestCasePage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [figmaLink, setFigmaLink] = useState("")
  const [requirements, setRequirements] = useState("")
  const [manualProjectName, setManualProjectName] = useState("")
  const [uiDescription, setUiDescription] = useState("")
  const [manualRequirements, setManualRequirements] = useState("")
  const [generatedTestCaseId, setGeneratedTestCaseId] = useState(null)

  useEffect(() => {
    // Add event listener for file input
    const fileInput = document.getElementById('srs-document');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          document.getElementById('file-name').textContent = file.name;
          document.getElementById('remove-file-btn').classList.remove('hidden');
        } else {
          document.getElementById('file-name').textContent = 'No file chosen';
          document.getElementById('remove-file-btn').classList.add('hidden');
        }
      });
    }
  }, []);

  // API CALL FUNCTION FOR FIGMA DESIGN LINK 
  const handleGenerate = async (e) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      // Create form data to send files
      const formData = new FormData();
      formData.append("figmaLink", figmaLink);
      
      const srsDocument = document.getElementById('srs-document')?.files[0];
      if (srsDocument) {
        formData.append("srsDocument", srsDocument);
      }

      // Call the API to generate test cases
      const response = await fetch("/api/test-cases/generate", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate test cases");
      }
      
      const data = await response.json();
      console.log(data)

      // Store the generated test cases in MongoDB
      const saveResponse = await fetch("/api/test-cases/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testCases: data
        }),
      });
      
      
      if (!saveResponse.ok) {
        const saveErrorData = await saveResponse.json();
        throw new Error(saveErrorData.error || "Failed to save test cases");
      }
      
      const saveData = await saveResponse.json();
      setGeneratedTestCaseId(saveData.id);
      
      setIsGenerating(false);
      
      toast({
        title: "Success!",
        description: "Test cases generated and saved successfully.",
        variant: "success",
      });
      
      // Redirect to view the generated test cases
      // router.push(`/test-cases/view/${saveData.id}`);
      
    } catch (error) {
      console.error("Error generating test cases:", error);
      setIsGenerating(false);
      
      toast({
        title: "Error",
        description: error.message || "Failed to generate test cases. Please try again.",
        variant: "destructive",
      });
    }
  }

  // API CALL FUNCTION FOR MANUAL INPUT
  const handleManualGenerate = async (e) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      // Call the API to generate test cases from manual input
      const response = await fetch("/api/test-cases/generate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: manualProjectName,
          uiDescription: uiDescription,
          requirements: manualRequirements,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate test cases");
      }
      
      const data = await response.json();
      
      // Store the generated test cases in MongoDB
      const saveResponse = await fetch("/api/test-cases/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: manualProjectName,
          uiDescription,
          requirements: manualRequirements,
          testCases: data,
          source: "manual"
        }),
      });
      
      if (!saveResponse.ok) {
        const saveErrorData = await saveResponse.json();
        throw new Error(saveErrorData.error || "Failed to save test cases");
      }
      
      const saveData = await saveResponse.json();
      setGeneratedTestCaseId(saveData.id);
      
      setIsGenerating(false);
      
      toast({
        title: "Success!",
        description: "Test cases generated and saved successfully.",
        variant: "success",
      });
      
      // Redirect to view the generated test cases
      router.push(`/test-cases/view/${saveData.id}`);
      
    } catch (error) {
      console.error("Error generating test cases:", error);
      setIsGenerating(false);
      
      toast({
        title: "Error",
        description: error.message || "Failed to generate test cases. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container py-10 md:py-16 space-y-10 px-4 md:px-6 animate-fade-in">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Generate Test Cases
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Create comprehensive test cases from your Figma designs and requirements
        </p>
      </div>

      <Tabs defaultValue="figma" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8 p-1 bg-muted/30 rounded-xl shadow-sm">
          
          {/* Option Selector */}
          {/* we need it coz we will have 2 routes to hit one with pdf and one directly using the text */}
          <TabsTrigger 
            value="figma" 
            className="rounded-lg flex px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-300 data-[state=inactive]:hover:bg-muted/80"
          >
            <FileText className="w-4 h-4 mr-2" />
            Figma Design
          </TabsTrigger>
          <TabsTrigger 
            value="manual" 
            className="rounded-lg flex px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-300 data-[state=inactive]:hover:bg-muted/80"
          >
            <Code className="w-4 h-4 mr-2" />
            Manual Input
          </TabsTrigger>
        </TabsList>

        {/* FIGMA DESIGN */}
        <TabsContent value="figma" className="transition-all duration-500 animate-fade-in">
          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Generate from Figma</CardTitle>
              <CardDescription className="text-center text-base">Provide your Figma design link and upload your SRS document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleGenerate} className="space-y-8">
                <div className="space-y-4 group hover:transform hover:translate-y-[-2px] transition-all duration-300">
                  <Label htmlFor="figma-link" className="text-base group-hover:text-primary transition-colors duration-300">Figma Design Link</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="figma-link"
                      placeholder="   https://www.figma.com/file/..."
                      value={figmaLink}
                      onChange={(e) => setFigmaLink(e.target.value)}
                      required
                      className="border-primary/20 focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    Make sure your Figma file is set to public or has view access
                  </p>
                </div>

                <div className="space-y-4 group hover:transform hover:translate-y-[-2px] transition-all duration-300">
                  <Label htmlFor="srs-document" className="text-base group-hover:text-primary transition-colors duration-300">SRS Document (PDF)</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <input
                        type="file"
                        id="srs-document"
                        accept=".pdf"
                        className="hidden"
                        required
                      />
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Upload SRS Document</p>
                      <p className="text-xs text-muted-foreground text-center">Drag and drop or click to browse</p>
                      <div className="flex space-x-2 mt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => document.getElementById('srs-document').click()}
                        >
                          Choose File
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          className="text-destructive border-destructive/20 hover:bg-destructive/10 hidden"
                          id="remove-file-btn"
                          onClick={() => {
                            const fileInput = document.getElementById('srs-document');
                            fileInput.value = '';
                            document.getElementById('file-name').textContent = 'No file chosen';
                            document.getElementById('remove-file-btn').classList.add('hidden');
                          }}
                        >
                          Remove File
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2" id="file-name">No file chosen</p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center" 
                  disabled={isGenerating}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Test Cases...
                      </>
                    ) : (
                      "Generate Test Cases"
                    )}
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MANUAL INPUT */}
        <TabsContent value="manual" className="transition-all duration-500 animate-fade-in">
          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Manual Input</CardTitle>
              <CardDescription className="text-center text-base">Manually describe your UI components and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleManualGenerate} className="space-y-8">
                {/* Project name input removed */}

                <div className="space-y-4 group hover:transform hover:translate-y-[-2px] transition-all duration-300">
                  <Label htmlFor="ui-description" className="text-base group-hover:text-primary transition-colors duration-300">UI Description</Label>
                  <Textarea
                    id="ui-description"
                    placeholder="Describe your UI components, layout, and interactions..."
                    className="min-h-[150px] border-primary/20 focus:border-primary transition-all duration-300"
                    value={uiDescription}
                    onChange={(e) => setUiDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-4 group hover:transform hover:translate-y-[-2px] transition-all duration-300">
                  <Label htmlFor="requirements-manual" className="text-base group-hover:text-primary transition-colors duration-300">Software Requirements</Label>
                  <Textarea
                    id="requirements-manual"
                    placeholder="Enter your software requirements or user stories..."
                    className="min-h-[150px] border-primary/20 focus:border-primary transition-all duration-300"
                    value={manualRequirements}
                    onChange={(e) => setManualRequirements(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary flex items-center justify-center hover:bg-primary/90 text-primary-foreground py-6 text-lg relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02]" 
                  disabled={isGenerating}
                >
                  <span className="relative z-10">
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin " />
                        Generating Test Cases...
                      </>
                    ) : (
                      "Generate Test Cases"
                    )}
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help Guide  */}
      <div className="space-y-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Tips for Better Test Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group transform transition-all duration-300 hover:translate-y-[-8px]">
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader>
                <CardTitle className="text-xl flex items-center group-hover:text-primary transition-colors duration-300">
                  <FileText className="mr-2 h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  Figma Design Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Ensure all components are properly named in your Figma file",
                    "Use frames to organize related UI elements",
                    "Include all states for interactive elements (hover, active, disabled)",
                    "Add comments to explain complex interactions"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="group transform transition-all duration-300 hover:translate-y-[-8px]">
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader>
                <CardTitle className="text-xl flex items-center group-hover:text-primary transition-colors duration-300">
                  <Code className="mr-2 h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  Requirements Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Be specific about expected behaviors and interactions",
                    "Include validation rules for forms and inputs",
                    "Describe error states and how they should be handled",
                    "Specify any performance requirements or constraints"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}