"use client";
import { useState, useEffect } from 'react';

export default function TestFigmaAPI() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [components, setComponents] = useState([]);

  // Extract components from Figma JSON response
  useEffect(() => {
    if (result) {
      try {
        // Extract components from the JSON response
        const extractedComponents = extractComponentsFromFigma(result);
        setComponents(extractedComponents);
      } catch (err) {
        console.error("Error extracting components:", err);
      }
    }
  }, [result]);

  // Function to extract components from Figma JSON
  const extractComponentsFromFigma = (figmaData) => {
    const components = [];
    
    // Check if document exists
    if (!figmaData.document) {
      return components;
    }
    
    // Main component types we're interested in
    const mainComponentTypes = ['FRAME', 'COMPONENT', 'INSTANCE', 'GROUP'];
    
    // Important UI patterns to look for
    const importantUIPatterns = [
      'button', 'form', 'card', 'menu', 'nav', 'header', 'footer', 
      'modal', 'dialog', 'notification', 'avatar', 'profile', 
      'login', 'register', 'sign', 'dashboard', 'list', 'table',
      'chart', 'graph', 'carousel', 'slider', 'gallery', 'input',
      'field', 'text', 'image', 'icon', 'container', 'section'
    ];
    
    const containsUIKeyword = (name) => {
      if (!name) return false;
      const lowerName = name.toLowerCase();
      return importantUIPatterns.some(keyword => lowerName.includes(keyword));
    };
    
    // Track processed components to avoid duplicates
    const processedIds = new Set();
    
    // Function to recursively find main components (up to 3 levels deep)
    const findMainComponents = (node, depth = 0, parentPath = '') => {
      if (!node || processedIds.has(node.id)) return;
      
      const currentPath = parentPath ? `${parentPath}/${node.name || ''}` : node.name || '';
      
      // Only process up to depth 3 (0, 1, 2, 3)
      if (depth <= 3) {
        // Determine if this is a main component we want to extract
        const isMainComponent = 
          // Is it a main component type?
          (mainComponentTypes.includes(node.type)) ||
          // Does it have an important UI pattern in its name?
          (node.name && containsUIKeyword(node.name)) ||
          // Is it a top-level component (direct child of a page)?
          (depth === 1 && node.type !== 'CANVAS');
        
        if (isMainComponent && node.name) {
          processedIds.add(node.id);
          
          // Add to our components list
          components.push({
            id: node.id,
            name: node.name,
            type: node.type,
            path: currentPath,
            depth: depth,
            childCount: node.children ? node.children.length : 0,
            selected: false
          });
        }
        
        // Continue searching in children (even for main components)
        // This allows us to find nested components up to depth 3
        if (node.children && node.children.length > 0) {
          node.children.forEach(child => findMainComponents(child, depth + 1, currentPath));
        }
      }
    };
    
    // Start from the document and find main components
    if (figmaData.document.children) {
      figmaData.document.children.forEach(page => findMainComponents(page, 0));
    }
    
    // Sort components by depth first, then by name for better organization
    return components.sort((a, b) => {
      if (a.depth !== b.depth) {
        return a.depth - b.depth;
      }
      return a.name.localeCompare(b.name);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setComponents([]);

    try {
      const response = await fetch('/api/testing/fetchjson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ figmaUrl }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch Figma design');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const allSelected = components.every(comp => comp.selected);
    setComponents(components.map(comp => ({...comp, selected: !allSelected})));
  };

  const toggleComponent = (id) => {
    setComponents(components.map(comp => 
      comp.id === id ? {...comp, selected: !comp.selected} : comp
    ));
  };

  const generateTestCasesJson = () => {
    // Create a focused JSON with only selected components and their children
    const selectedComponents = components.filter(comp => comp.selected);
    
    // Function to find a node by ID in the original Figma data
    const findNodeById = (nodeId, rootNode) => {
      if (!rootNode) return null;
      
      if (rootNode.id === nodeId) {
        return rootNode;
      }
      
      if (rootNode.children) {
        for (const child of rootNode.children) {
          const found = findNodeById(nodeId, child);
          if (found) return found;
        }
      }
      
      return null;
    };
    
    // Extract complete component data from original JSON
    const extractedComponents = selectedComponents.map(comp => {
      // Find the complete node data in the original Figma JSON
      const completeNode = findNodeById(comp.id, result.document);
      return {
        id: comp.id,
        name: comp.name,
        type: comp.type,
        path: comp.path,
        depth: comp.depth,
        // Include the complete node data from the original JSON
        originalData: completeNode || {}
      };
    });
    
    const focusedJson = {
      selectedComponents: extractedComponents,
      originalUrl: figmaUrl,
      timestamp: new Date().toISOString()
    };
    
    // Create a download link for the JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(focusedJson, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "selected_components.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Figma JSON Fetcher</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="figmaUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Figma URL:
            </label>
            <input
              type="text"
              id="figmaUrl"
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.figma.com/file/..."
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter a valid Figma design URL (e.g., https://www.figma.com/file/abcdef123456/Design)
            </p>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : 'Fetch Figma JSON'}
          </button>
        </form>

        {error && (
          <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Error: {error}</p>
              </div>
            </div>
          </div>
        )}

        {components.length > 0 && (
          <div className="mt-6 mb-8">
            <div className="bg-gray-800 text-white p-3 rounded-t-md flex justify-between items-center">
              <h2 className="text-lg font-semibold">Main Components ({components.length})</h2>
              <button 
                onClick={toggleSelectAll}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Select All
              </button>
            </div>
            <div className="border border-gray-300 rounded-b-md divide-y divide-gray-300 max-h-[50vh] overflow-y-auto">
              {components.map((component) => (
                <div key={component.id} className="flex items-center p-3 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    id={component.id}
                    checked={component.selected}
                    onChange={() => toggleComponent(component.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex items-center">
                    <div className={`h-6 w-6 ${component.depth === 0 ? 'bg-purple-500' : component.depth === 1 ? 'bg-blue-500' : component.depth === 2 ? 'bg-green-500' : 'bg-yellow-500'} rounded-full flex items-center justify-center text-white text-xs mr-2`}>
                      {component.depth}
                    </div>
                    <div>
                      <label htmlFor={component.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                        {component.name}
                      </label>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">{component.type}</span>
                        {component.childCount > 0 && (
                          <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                            {component.childCount} child elements
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {components.length > 0 && components.some(comp => comp.selected) && (
          <div className="mb-8">
            <button
              onClick={generateTestCasesJson}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Generate Test Cases JSON for Selected Components
            </button>
          </div>
        )}

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">JSON Response:</h2>
            <div className="bg-gray-100 rounded-md p-4 overflow-auto max-h-[60vh]">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}