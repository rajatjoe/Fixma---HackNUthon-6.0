// here i want to create a route that will fetch the response that is the seleniums script from the AI model that is running on this URL https://hack-nu-thon-6-0-multi-agent.onrender.com/generate_test_script  and then the input format is this test_cases and
// website_url and then the response is going to be the selenium script and then the user can run the script for a particular website

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';

export async function POST(request) {
  try {
    const { testCase, websiteUrl } = await request.json();

    if (!testCase || !websiteUrl) {
      return NextResponse.json(
        { error: 'Test case data and website URL are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const { db } = await dbConnect();

    // Call the AI model to generate the Selenium script
    const response = await fetch('https://hack-nu-thon-6-0-multi-agent.onrender.com/generate_test_script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test_cases: testCase,
        website_url: websiteUrl
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('AI model error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate script from AI model' },
        { status: 500 }
      );
    }

    const scriptData = await response.json();
    console.log(scriptData)

    // Store the generated script in MongoDB
    const result = await db.collection('scripts').insertOne({
      testCaseId: testCase._id,
      websiteUrl,
      script: scriptData.script,
      testCaseSummary: testCase.summary,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      scriptId: result.insertedId.toString(),
      script: scriptData.script // Return the script to the frontend
    });
  } catch (error) {
    console.error('Script generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}