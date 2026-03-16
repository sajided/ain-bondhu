import React, { useState } from 'react';
import { BotAvatar } from '../chat/BotAvatar';

interface HomeLandingProps {
  isSubmitting: boolean;
  onSubmit: (value: string) => void;
  canContinue?: boolean;
  onContinue?: () => void;
  error?: string | null;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  isSubmitting,
  onSubmit,
  canContinue,
  onContinue,
  error
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center font-bengali">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center gap-3">
          <BotAvatar size={80} />
          <h1 className="text-2xl font-bold text-textPrimary">পারিবারিক আইন সহায়ক</h1>
          <p className="text-sm text-gray-500">
            আপনি কি ধরনের আইনি সমস্যার মুখোমুখি?
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-full shadow-lg p-1.5 pl-5 flex items-center gap-2 border border-transparent focus-within:border-primary/40 transition"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="কোন দ্বিধা নেই, বলতে পারেন..."
            className="flex-1 bg-transparent outline-none text-[16px] text-textPrimary placeholder:text-gray-400"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-lg shadow-md disabled:opacity-60 transition flex-shrink-0"
            aria-label="Start chatting"
          >
            →
          </button>
        </form>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        {canContinue && onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="mx-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition"
          >
            আগের আলোচনা চালিয়ে যান →
          </button>
        )}

        <p className="text-xs text-gray-400">জরুরি: ৯৯৯ | নারী সহায়তা: ১০৯২১</p>
      </div>
    </div>
  );
};
