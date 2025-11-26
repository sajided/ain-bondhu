export const detectUrgency = (text: string): boolean => {
  const urgentKeywords = [
    'ধর্ষণ', 'rape', '৭২ ঘণ্টা', 'DNA',
    'জরুরি', 'emergency', 'বিপদ', 'danger',
    'হত্যা', 'kill', 'আত্মহত্যা', 'suicide',
    'ছুরি', 'knife', 'মারবে', 'will kill'
  ];

  return urgentKeywords.some(keyword =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );
};

