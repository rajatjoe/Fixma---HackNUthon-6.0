// here create a route to get the response from the chatbot 
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch('https://hack-nu-thon-6-0-multi-agent.onrender.com/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message,
        history: body.history || []
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from chatbot');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chatbot request' },
      { status: 500 }
    );
  }
}