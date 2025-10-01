import React from 'react';

const DebugPanel: React.FC = () => {
  const checkLocalStorage = () => {
    const savedContent = localStorage.getItem('fresh-richie-content');
    if (savedContent) {
      const data = JSON.parse(savedContent);
      console.log('🔍 Debug: localStorage content:', data);
      console.log('🔍 Debug: videos section:', data.videos);
      console.log('🔍 Debug: videos array:', data.videos?.videos);
      return data;
    } else {
      console.log('🔍 Debug: No content in localStorage');
      return null;
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('fresh-richie-content');
    console.log('🗑️ Debug: localStorage cleared');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 p-4 rounded-lg border border-gray-700 z-50">
      <h3 className="text-white font-bold mb-2">Debug Panel</h3>
      <div className="space-y-2">
        <button
          onClick={checkLocalStorage}
          className="block w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Check localStorage
        </button>
        <button
          onClick={clearLocalStorage}
          className="block w-full px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Clear localStorage
        </button>
      </div>
    </div>
  );
};

export default DebugPanel;
