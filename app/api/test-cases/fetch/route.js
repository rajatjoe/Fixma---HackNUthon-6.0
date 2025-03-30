import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

// Define TestCase Schema to match your MongoDB structure
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

// Use existing model or create a new one with the collection name
const TestCase = mongoose.models.TestCase || 
  mongoose.model('TestCase', TestCaseSchema);

export async function GET() {
  try {
    await dbConnect();
    
    const testCases = await TestCase.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    // Format the data for the frontend - keeping original structure but adding formatted fields
    const formattedTestCases = testCases.map(doc => {
      return {
        id: doc._id.toString(),
        priority: doc.priority,
        summary: doc.summary,
        tags: doc.tags || [],
        test_cases: doc.test_cases || [],
        createdAt: new Date(doc.createdAt).toISOString().split('T')[0]
      };
    });
    
    return NextResponse.json(formattedTestCases);
    
  } catch (error) {
    console.error('Error fetching test cases:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}