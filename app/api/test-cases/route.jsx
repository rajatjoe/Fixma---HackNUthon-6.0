import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db("testcraft")

    const testCases = await db.collection("testCases").find({}).limit(20).toArray()

    return NextResponse.json({ testCases })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db("testcraft")

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.project) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await db.collection("testCases").insertOne({
      name: data.name,
      description: data.description || "",
      project: data.project,
      type: data.type || "UI",
      preconditions: data.preconditions || "",
      steps: data.steps || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "Pending",
    })

    return NextResponse.json({
      success: true,
      testCaseId: result.insertedId,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

