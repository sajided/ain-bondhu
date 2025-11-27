import React from 'react';

interface HomeLandingProps {
  value: string;
  isSubmitting: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  canContinue?: boolean;
  onContinue?: () => void;
}


export const HomeLanding: React.FC<HomeLandingProps> = ({
  value,
  isSubmitting,
  onChange,
  onSubmit,
  canContinue,
  onContinue
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center font-bengali">
      <div className="max-w-2xl w-full space-y-10">
        <div className="space-y-4">
          <p className="text-primary text-lg font-semibold tracking-wide uppercase">আসসালামু আলাইকুম</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-heading leading-tight">
           <span className="text-primary">আমি আইন বন্ধু</span>
          </h1>
          <p className="text-lg text-muted">
          আপনার আইনি সহায়ক, আপনি কি ধরনের আইনি সমস্যার মুখোমুখি?
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-full shadow-lg p-2 pl-6 flex items-center gap-3 border border-transparent focus-within:border-primary/40 transition"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="কোন দ্বিধা নেই, বলতে পারেন..."
            className="flex-1 bg-transparent outline-none text-base sm:text-lg text-heading placeholder:text-muted"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl shadow-md disabled:opacity-60 transition"
            aria-label="Start chatting"
          >
            →
          </button>
        </form>

        

        {canContinue && onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="mx-auto inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary font-medium hover:bg-primary/5 transition"
          >
            আগের আলোচনা চালিয়ে যান →
          </button>
        )}
      </div>
    </div>
  );
};

