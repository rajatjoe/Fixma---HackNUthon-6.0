import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FileText, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6 transform transition-transform duration-500 hover:translate-y-[-8px]">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-gradient hover:from-primary/80 hover:to-primary transition-all duration-300">
                Automated Testing for Figma Designs
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed hover:text-foreground transition-colors duration-300">
                Transform your Figma designs into comprehensive test cases and perform automated QA testing with our
                powerful platform.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/test-cases/generate" className="transform transition-all duration-300 hover:scale-105">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 animate-bounce" />
                  </Button>
                </Link>
                <Link href="#features" className="transform transition-all duration-300 hover:scale-105">
                  <Button variant="outline" size="lg" className="hover:bg-primary/10 hover:border-primary">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50">
              <div className="space-y-6">
                <div className="space-y-3 group cursor-pointer">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <FileText className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Figma Design Analysis</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Upload your Figma design link and requirements to generate comprehensive test cases.
                  </p>
                </div>
                <div className="space-y-3 group cursor-pointer">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Code className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Automated Testing</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Run automated tests using Selenium and other tools to validate your implementation.
                  </p>
                </div>
                <div className="space-y-3 group cursor-pointer">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Zap className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">API Testing</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    Generate and execute API test cases to ensure your backend works correctly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 transform transition-all duration-500 hover:scale-105">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary transition-all duration-300">
                Our Services
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed hover:text-foreground transition-colors duration-300">
                Comprehensive testing solutions for your UI/UX designs and applications
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 group hover:-translate-y-2">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <FileText className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Test Case Generation</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Generate comprehensive test cases from your Figma designs and requirements.
                </p>
                <Link href="/test-cases/generate" className="w-full">
                  <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 group hover:-translate-y-2">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Code className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Functionality Testing</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Validate your implementation against test cases with automated testing tools.
                </p>
                <Link href="/functionality-testing" className="w-full">
                  <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 group hover:-translate-y-2">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Zap className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">API Testing</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Test your API endpoints for reliability, performance, and correctness.
                </p>
                <Link href="/functionality-testing/api-testing" className="w-full">
                  <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 transform transition-all duration-500 hover:scale-105">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary transition-all duration-300">
                How It Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed hover:text-foreground transition-colors duration-300">
                Our simple process to help you test your designs effectively
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                1
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Upload Design</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Share your Figma design link and software requirements with our platform.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                2
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Generate Test Cases</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Our AI analyzes your design and requirements to create comprehensive test cases.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                3
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Run Tests</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Execute automated tests to validate your implementation against the test cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4 transform transition-all duration-500 hover:scale-105">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary transition-all duration-300">
                Ready to Start Testing?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed hover:text-foreground transition-colors duration-300">
                Join our platform today and transform your Figma designs into comprehensive test cases.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row transform transition-all duration-500 hover:scale-105">
              <Link href="/test-cases/generate" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

