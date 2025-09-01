import React from "react";

// Simple test component to isolate the issue
const App = () => {
  console.log("App component rendering...");
  
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-[#10B981] mb-4">VOIDMAIL</h1>
        <p className="text-xl text-gray-300 mb-6">Testing Basic Rendering</p>
        <div className="bg-[#151517] p-6 rounded-xl border border-[#ffffff08]">
          <p className="text-gray-400 mb-4">If you can see this, React is working!</p>
          <p className="text-[#10B981] text-sm">Current time: {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="mt-6 text-xs text-gray-500">
          <p>Debug Info:</p>
          <p>React Router: Disabled</p>
          <p>Components: Disabled</p>
          <p>Error Boundaries: Disabled</p>
        </div>
      </div>
    </div>
  );
};

export default App;
