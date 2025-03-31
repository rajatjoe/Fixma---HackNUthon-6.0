// create a route here to generate test cases 
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const figmaLink = formData.get('figmaLink');
    const srsDocument = formData.get('srsDocument');
    
    if (!figmaLink) {
      return NextResponse.json({ error: 'Figma link is required' }, { status: 400 });
    }
    
    // Create a new FormData to send to the model API
    const modelFormData = new FormData();
    modelFormData.append('figma_url', figmaLink);
    
    if (srsDocument) {
      modelFormData.append('requirement_pdf', srsDocument);
    }
    
    // Call the model API
    const modelResponse = await fetch('https://hack-nu-thon-6-0-multi-agent.onrender.com/process', {
      method: 'POST',
      body: modelFormData,
    });
    
    if (!modelResponse.ok) {
      const errorText = await modelResponse.text();
      console.error('Model API error:', errorText);
      return NextResponse.json({ 
        error: 'Failed to generate test cases from model' 
      }, { status: modelResponse.status });
    }
    
    const modelData = await modelResponse.json();
    console.log(modelData)
    
    return NextResponse.json(modelData);
    
  } catch (error) {
    console.error('Error generating test cases:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}

// Handle manual input generation
export async function PUT(request) {
  try {
    const { uiDescription, requirements } = await request.json();
    
    if (!uiDescription || !requirements) {
      return NextResponse.json({ 
        error: 'UI description and requirements are required' 
      }, { status: 400 });
    }
    
    // Call the model API with manual inputs
    const response = await fetch('https://hack-nu-thon-6-0-multi-agent.onrender.com/manual_input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ui_description: uiDescription,
        requirements: requirements,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Model API error:', errorText);
      return NextResponse.json({ 
        error: 'Failed to generate test cases from model' 
      }, { status: response.status });
    }
    
    const modelData = await response.json();
    
    return NextResponse.json(modelData);
    
  } catch (error) {
    console.error('Error generating test cases:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}