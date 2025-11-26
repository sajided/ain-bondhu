import React from 'react';

export const EmergencyBar: React.FC = () => {
  return (
    <div className="bg-urgent text-white px-4 py-2 text-center text-sm font-bold sticky top-0 z-50 shadow-md flex justify-center items-center gap-4">
      <span>জরুরি:</span>
      <div className="flex gap-3">
        <a href="tel:999" className="underline hover:text-gray-200 font-bold">৯৯৯ (জাতীয়)</a>
        <span className="opacity-50">|</span>
        <a href="tel:10921" className="underline hover:text-gray-200 font-bold">১০৯২১ (নারী ও শিশু)</a>
      </div>
    </div>
  );
};

