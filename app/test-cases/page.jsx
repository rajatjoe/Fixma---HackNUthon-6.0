import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Search, Settings } from "lucide-react"

export default function TestCasesPage() {
  return (
    <div className="container py-12 md:py-16 space-y-12 px-4 md:px-6">
      <div className="space-y-4 text-center max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Test Cases
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Create, view, and manage test cases for your Figma designs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <Link href="/test-cases/generate" className="block group transform transition-all duration-300 hover:scale-105">
          <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center group-hover:text-primary transition-colors duration-300">
                <PlusCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Generate Test Cases
              </CardTitle>
              <CardDescription>Create new test cases from your Figma designs and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                Upload your Figma design link and software requirements to automatically generate comprehensive test
                cases.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/test-cases/show" className="block group transform transition-all duration-300 hover:scale-105 hover:z-10">
          <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center group-hover:text-primary transition-colors duration-300">
                <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                View Test Cases
              </CardTitle>
              <CardDescription>Browse and search through your existing test cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                Access all your previously generated test cases, filter by project, and export them in various formats.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                View Cases
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/test-cases/modify" className="block group transform transition-all duration-300 hover:scale-105">
          <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center group-hover:text-primary transition-colors duration-300">
                <Settings className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:rotate-45 transition-all duration-500" />
                Modify Test Cases
              </CardTitle>
              <CardDescription>Edit and update your existing test cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                Make changes to your test cases, add new test scenarios, or update expected results as your design
                evolves.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                Edit Cases
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <div className="space-y-8 bg-card rounded-xl p-6 md:p-8 shadow-md border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          About Test Case Generation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 transform transition-all duration-500 hover:translate-y-[-4px]">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">What are Test Cases?</h3>
              <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Test cases are detailed procedures that verify that your software works as expected. They include test
                steps, expected results, and actual results to validate functionality, usability, and performance.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">Benefits of Automated Test Case Generation</h3>
              <ul className="space-y-3">
                {[
                  "Save time by automating the creation of test cases",
                  "Ensure comprehensive coverage of all UI elements and interactions",
                  "Maintain consistency across your testing process",
                  "Easily update test cases as your design evolves"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 group hover:translate-x-1 transition-transform duration-300">
                    <span className="h-2 w-2 rounded-full bg-primary/60 mt-2 group-hover:bg-primary transition-colors duration-300"></span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-6 transform transition-all duration-500 hover:translate-y-[-4px]">
            <h3 className="text-xl font-semibold text-primary">Our Process</h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload Figma Design", desc: "Share your Figma design link with our platform" },
                { step: 2, title: "Provide Requirements", desc: "Upload your software requirements document" },
                { step: 3, title: "AI Analysis", desc: "Our AI analyzes your design and requirements" },
                { step: 4, title: "Test Case Generation", desc: "Comprehensive test cases are automatically created" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:translate-x-1 group">
                  <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1 group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}