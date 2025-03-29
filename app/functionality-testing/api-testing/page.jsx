"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code, Copy, Loader2, Play, Plus, Send } from "lucide-react"

export default function ApiTestingPage() {
  const [endpoint, setEndpoint] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState([{ key: "", value: "" }])
  const [body, setBody] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }])
  }

  const handleHeaderChange = (index, field, value) => {
    const newHeaders = [...headers]
    newHeaders[index][field] = value
    setHeaders(newHeaders)
  }

  const handleRemoveHeader = (index) => {
    const newHeaders = [...headers]
    newHeaders.splice(index, 1)
    setHeaders(newHeaders)
  }

  const handleSendRequest = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setResponse({
        status: 200,
        statusText: "OK",
        headers: {
          "content-type": "application/json",
          date: new Date().toUTCString(),
        },
        body: {
          success: true,
          data: {
            id: 123,
            name: "Test Product",
            price: 99.99,
          },
        },
      })
    }, 1500)
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">API Testing</h1>
        <p className="text-muted-foreground text-lg">
          Test your API endpoints for reliability, performance, and correctness
        </p>
      </div>

      <Tabs defaultValue="manual">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="manual">Manual Testing</TabsTrigger>
          <TabsTrigger value="automated">Automated Testing</TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="method">Method</Label>
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger id="method">
                          <SelectValue placeholder="Method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor="endpoint">Endpoint</Label>
                      <Input
                        id="endpoint"
                        placeholder="https://api.example.com/endpoint"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Headers</Label>
                      <Button variant="ghost" size="sm" onClick={handleAddHeader}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Header
                      </Button>
                    </div>
                    {headers.map((header, index) => (
                      <div key={index} className="grid grid-cols-5 gap-2">
                        <Input
                          className="col-span-2"
                          placeholder="Header name"
                          value={header.key}
                          onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                        />
                        <Input
                          className="col-span-2"
                          placeholder="Value"
                          value={header.value}
                          onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveHeader(index)}
                          disabled={headers.length === 1 && index === 0}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>

                  {(method === "POST" || method === "PUT" || method === "PATCH") && (
                    <div className="space-y-2">
                      <Label htmlFor="body">Request Body (JSON)</Label>
                      <Textarea
                        id="body"
                        placeholder='{"key": "value"}'
                        className="font-mono min-h-[200px]"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </div>
                  )}

                  <Button className="w-full" onClick={handleSendRequest} disabled={!endpoint || isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Request
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                {response ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {response.status} {response.statusText}
                      </Badge>
                      <div className="text-sm text-muted-foreground">Time: 245ms</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Headers</Label>
                      <div className="rounded-md bg-muted p-4 font-mono text-sm">
                        {Object.entries(response.headers).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-semibold">{key}</span>: {value}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Body</Label>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="rounded-md bg-muted p-4 font-mono text-sm overflow-auto max-h-[300px]">
                        <pre>{JSON.stringify(response.body, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                    <Code className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-medium">No Response Yet</h3>
                    <p className="max-w-[300px] mt-2">
                      Configure your request parameters and click "Send Request" to see the response here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="automated">
          <Card>
            <CardHeader>
              <CardTitle>Automated API Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="test-suite">Select Test Suite</Label>
                  <Select>
                    <SelectTrigger id="test-suite">
                      <SelectValue placeholder="Select a test suite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auth">Authentication API Tests</SelectItem>
                      <SelectItem value="products">Product API Tests</SelectItem>
                      <SelectItem value="users">User API Tests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="environment">Environment</Label>
                  <Select defaultValue="dev">
                    <SelectTrigger id="environment">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dev">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="prod">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="base-url">Base URL</Label>
                  <Input id="base-url" placeholder="https://api.example.com" defaultValue="https://api.example.com" />
                </div>

                <div className="rounded-md border">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Available Tests</h3>
                  </div>
                  <div className="p-0">
                    <div className="divide-y">
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <div className="font-medium">GET /api/products</div>
                          <div className="text-sm text-muted-foreground">Retrieves list of products</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                      </div>
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <div className="font-medium">GET /api/products/:id</div>
                          <div className="text-sm text-muted-foreground">Retrieves a single product</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                      </div>
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <div className="font-medium">POST /api/products</div>
                          <div className="text-sm text-muted-foreground">Creates a new product</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                      </div>
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <div className="font-medium">PUT /api/products/:id</div>
                          <div className="text-sm text-muted-foreground">Updates a product</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                      </div>
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <div className="font-medium">DELETE /api/products/:id</div>
                          <div className="text-sm text-muted-foreground">Deletes a product</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    Run All Tests
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

