import React from 'react';

export const EmergencyAlert: React.FC = () => {
  return (
    <div className="my-4 p-4 bg-red-50 border-2 border-urgent rounded-lg animate-pulse">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">⚠️</span>
        <span className="font-bold text-urgent text-lg">জরুরি নির্দেশনা</span>
      </div>
      <p className="mb-3 text-gray-800 font-medium">
        আপনি যদি এখন বিপদে থাকেন, অবিলম্বে ৯৯৯ নম্বরে কল করুন।
      </p>
      <a 
        href="tel:999" 
        className="block w-full bg-urgent text-white text-center py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
      >
        ৯৯৯ তে কল করুন
      </a>
    </div>
  );
};

