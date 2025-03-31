"use client";
import { useState, useEffect } from 'react';
import { Code2, Download, Loader2, RefreshCw } from "lucide-react";

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
    <div className="container py-12 md:py-16 space-y-12 px-4 md:px-6">
      <div className="space-y-4 text-center max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Figma Component Extractor
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Extract and analyze components from your Figma design files
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="figmaUrl" className="text-lg font-semibold text-primary">
                Figma Design URL
              </label>
              <input
                type="text"
                id="figmaUrl"
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                className="w-full p-4 rounded-lg border border-primary/20 bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                placeholder="https://www.figma.com/file/..."
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter the URL of your Figma design file to extract components
              </p>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Code2 className="w-5 h-5" />
                  <span>Extract Components</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-destructive/10 border-l-4 border-destructive rounded-md">
              <div className="flex items-center gap-3 text-destructive">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {components.length > 0 && (
            <div className="mt-8 space-y-6">
              <div className="bg-primary/5 rounded-lg p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Components ({components.length})
                </h2>
                <button 
                  onClick={toggleSelectAll}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors duration-300 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Toggle All
                </button>
              </div>

              <div className="border border-primary/10 rounded-lg divide-y divide-primary/10 max-h-[60vh] overflow-y-auto">
                {components.map((component) => (
                  <div 
                    key={component.id} 
                    className="flex items-center p-4 hover:bg-primary/5 transition-colors duration-300 group"
                  >
                    <input
                      type="checkbox"
                      id={component.id}
                      checked={component.selected}
                      onChange={() => toggleComponent(component.id)}
                      className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary/30 transition-all duration-300"
                    />
                    <div className="ml-4 flex items-center flex-1">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-primary-foreground
                        ${component.depth === 0 ? 'bg-purple-500' : 
                          component.depth === 1 ? 'bg-blue-500' : 
                          component.depth === 2 ? 'bg-green-500' : 'bg-amber-500'} 
                        transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        {component.depth}
                      </div>
                      <div className="ml-3">
                        <label htmlFor={component.id} className="font-medium cursor-pointer group-hover:text-primary transition-colors duration-300">
                          {component.name}
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{component.type}</span>
                          {component.childCount > 0 && (
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                              {component.childCount} children
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {components.some(comp => comp.selected) && (
                <button
                  onClick={generateTestCasesJson}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Generate Test Cases JSON
                </button>
              )}
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-primary">Raw JSON Response</h2>
              <div className="bg-slate-950 rounded-lg p-6 overflow-auto max-h-[40vh]">
                <pre className="text-slate-50 text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}