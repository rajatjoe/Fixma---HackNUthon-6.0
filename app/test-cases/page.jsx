import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Search, Settings } from "lucide-react"

export default function TestCasesPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Test Cases</h1>
        <p className="text-muted-foreground text-lg">Create, view, and manage test cases for your Figma designs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/test-cases/generate" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5" />
                Generate Test Cases
              </CardTitle>
              <CardDescription>Create new test cases from your Figma designs and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upload your Figma design link and software requirements to automatically generate comprehensive test
                cases.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/test-cases/show" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                View Test Cases
              </CardTitle>
              <CardDescription>Browse and search through your existing test cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access all your previously generated test cases, filter by project, and export them in various formats.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Cases
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/test-cases/modify" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Modify Test Cases
              </CardTitle>
              <CardDescription>Edit and update your existing test cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Make changes to your test cases, add new test scenarios, or update expected results as your design
                evolves.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Cases
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">About Test Case Generation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What are Test Cases?</h3>
            <p className="text-muted-foreground">
              Test cases are detailed procedures that verify that your software works as expected. They include test
              steps, expected results, and actual results to validate functionality, usability, and performance.
            </p>
            <h3 className="text-xl font-semibold">Benefits of Automated Test Case Generation</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Save time by automating the creation of test cases</li>
              <li>Ensure comprehensive coverage of all UI elements and interactions</li>
              <li>Maintain consistency across your testing process</li>
              <li>Easily update test cases as your design evolves</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Our Process</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Upload Figma Design</h4>
                  <p className="text-sm text-muted-foreground">Share your Figma design link with our platform</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Provide Requirements</h4>
                  <p className="text-sm text-muted-foreground">Upload your software requirements document</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">Our AI analyzes your design and requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Test Case Generation</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive test cases are automatically created</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

