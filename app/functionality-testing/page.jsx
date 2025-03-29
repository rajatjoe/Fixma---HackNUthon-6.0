import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, FileText } from "lucide-react"

export default function FunctionalityTestingPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Functionality Testing</h1>
        <p className="text-muted-foreground text-lg">
          Validate your implementation against test cases with automated testing tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/functionality-testing/api-testing" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                API Testing
              </CardTitle>
              <CardDescription>Test your API endpoints for reliability, performance, and correctness</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Validate your API endpoints against test cases, check response formats, error handling, and performance
                metrics.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/functionality-testing/ui-testing" className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                UI Testing
              </CardTitle>
              <CardDescription>Validate your UI implementation against test cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Run automated tests using Selenium and other tools to validate your UI implementation against the test
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
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">About Functionality Testing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is Functionality Testing?</h3>
            <p className="text-muted-foreground">
              Functionality testing is the process of validating that your software implementation meets the
              requirements and functions as expected. It ensures that all features work correctly, handle edge cases
              properly, and provide a good user experience.
            </p>
            <h3 className="text-xl font-semibold">Benefits of Automated Testing</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Faster feedback on implementation issues</li>
              <li>Consistent and repeatable test execution</li>
              <li>Ability to run tests in parallel</li>
              <li>Early detection of regressions</li>
              <li>Improved code quality and reliability</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Our Testing Approach</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Test Case Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    We analyze your test cases to determine the best testing approach
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Test Script Creation</h4>
                  <p className="text-sm text-muted-foreground">
                    We create automated test scripts using Selenium, Cypress, or other tools
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Test Execution</h4>
                  <p className="text-sm text-muted-foreground">We run the tests against your implementation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 w-8 h-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Results Analysis</h4>
                  <p className="text-sm text-muted-foreground">We analyze the results and provide detailed reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

