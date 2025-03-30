import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

// Define simplified TestCase Schema based on the required structure
const TestCaseSchema = new mongoose.Schema({
  priority: String,
  summary: String,
  tags: [String],
  test_cases: [{
    step: String,
    expected_result: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use existing model or create a new one
const TestCase = mongoose.models.TestCase || mongoose.model('TestCase', TestCaseSchema);

export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    console.log("Received data:", JSON.stringify(data, null, 2));
    
    if (!data.testCases) {
      return NextResponse.json({ 
        error: 'Test cases are required' 
      }, { status: 400 });
    }
    
    // More flexible extraction logic to handle different data structures
    let testCasesObj;
    
    // Try different possible paths to find the test case data
    if (data.testCases.test_cases?.test_cases) {
      testCasesObj = data.testCases.test_cases.test_cases;
    } else if (data.testCases.test_cases) {
      testCasesObj = data.testCases.test_cases;
    } else {
      testCasesObj = data.testCases;
    }
    
    console.log("Extracted test cases object:", JSON.stringify(testCasesObj, null, 2));
    
    // Create a new test case document with the properly structured data
    const testCase = new TestCase({
      priority: testCasesObj.priority || '',
      summary: testCasesObj.summary || '',
      tags: testCasesObj.tags || [],
      test_cases: testCasesObj.test_cases || [],
    });
    
    console.log("Saving test case:", JSON.stringify(testCase, null, 2));
    
    // Save to MongoDB
    const savedTestCase = await testCase.save();
    
    return NextResponse.json({
      success: true,
      id: savedTestCase._id.toString(),
      message: 'Test cases saved successfully',
    });
    
  } catch (error) {
    console.error('Error saving test cases:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}

// Get all test cases
export async function GET() {
  try {
    await dbConnect();
    
    const testCases = await TestCase.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(testCases.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    })));
    
  } catch (error) {
    console.error('Error fetching test cases:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}