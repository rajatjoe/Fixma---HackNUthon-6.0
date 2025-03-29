import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("testcraft")

    const testCase = await db.collection("testCases").findOne({
      _id: new ObjectId(params.id),
    })

    if (!testCase) {
      return NextResponse.json({ error: "Test case not found" }, { status: 404 })
    }

    return NextResponse.json({ testCase })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("testcraft")

    const data = await request.json()

    const result = await db.collection("testCases").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Test case not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      updated: result.modifiedCount > 0,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db("testcraft")

    const result = await db.collection("testCases").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Test case not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

