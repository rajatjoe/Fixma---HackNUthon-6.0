import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, FileText, PlayCircle, Zap } from "lucide-react"

export default function FunctionalityTestingPage() {
  return (
    <div className="container py-12 md:py-16 space-y-12 px-4 md:px-6">
      <div className="space-y-4 text-center max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Functionality Testing
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Validate your implementation against test cases with automated testing tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <Link href="/functionality-testing/api-testing" className="block group transform transition-all duration-300 hover:scale-105">
          <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center group-hover:text-primary transition-colors duration-300">
                <Code className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                API Testing
              </CardTitle>
              <CardDescription>Test your API endpoints for reliability and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                Validate your API endpoints against test cases, check response formats, error handling, and performance metrics.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/functionality-testing/ui-testing" className="block group transform transition-all duration-300 hover:scale-105 hover:z-10">
          <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center group-hover:text-primary transition-colors duration-300">
                <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                UI Testing
              </CardTitle>
              <CardDescription>Validate your UI implementation against test cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                Run automated tests using Selenium and other tools to validate your UI implementation against the test cases.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/functionality-testing/script-testing" className="block group transform transition-all duration-300 hover:scale-105">
          <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center group-hover:text-primary transition-colors duration-300">
                <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:rotate-45 transition-all duration-500" />
                Script Testing
              </CardTitle>
              <CardDescription>Generate and run automated test scripts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                Generate Selenium test scripts automatically and run them against your website to validate functionality.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <div className="space-y-8 bg-card rounded-xl p-6 md:p-8 shadow-md border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          About Functionality Testing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 transform transition-all duration-500 hover:translate-y-[-4px]">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">What is Functionality Testing?</h3>
              <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                Functionality testing is the process of validating that your software implementation meets the requirements and functions as expected.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary">Benefits of Automated Testing</h3>
              <ul className="space-y-3">
                {[
                  "Faster feedback on implementation issues",
                  "Consistent and repeatable test execution",
                  "Ability to run tests in parallel",
                  "Early detection of regressions",
                  "Improved code quality and reliability"
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
            <h3 className="text-xl font-semibold text-primary">Our Testing Approach</h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "Test Case Analysis", desc: "We analyze your test cases to determine the best testing approach" },
                { step: 2, title: "Test Script Generation", desc: "Generate automated test scripts based on your requirements" },
                { step: 3, title: "Test Execution", desc: "Run tests and collect comprehensive results" },
                { step: 4, title: "Results Analysis", desc: "Analyze test results and provide detailed reports" }
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