import { NextResponse } from 'next/server';

// Figma API Token
const FIGMA_API_TOKEN = "figd_6wWgkoTn-oST522A4G6IyOcweCqPCeKyS8a6CQoj";

// Extract file key from Figma URL
function extractFileKey(figmaUrl) {
  const match = figmaUrl.match(/https:\/\/www\.figma\.com\/(?:file|design)\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

export async function POST(request) {
  try {
    const { figmaUrl } = await request.json();
    
    if (!figmaUrl) {
      return NextResponse.json({ error: "Figma URL is required" }, { status: 400 });
    }

    const fileKey = extractFileKey(figmaUrl);
    
    if (!fileKey) {
      return NextResponse.json({ error: "Invalid Figma URL format" }, { status: 400 });
    }

    const url = `https://api.figma.com/v1/files/${fileKey}`;
    const headers = { "X-Figma-Token": FIGMA_API_TOKEN };

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ 
        error: "Failed to fetch Figma design", 
        details: errorData 
      }, { status: response.status });
    }

    const figmaJson = await response.json();
    
    return NextResponse.json(figmaJson);
  } catch (error) {
    console.error("Error fetching Figma design:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      message: error.message 
    }, { status: 500 });
  }
}