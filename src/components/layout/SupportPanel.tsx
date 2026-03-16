import React from 'react';
import { EMERGENCY_CONTACTS } from '../../constants/emergencyContacts';

interface SupportPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportPanel: React.FC<SupportPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-80 bg-white h-full shadow-xl p-4 overflow-y-auto animate-slide-in">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-primary">সহায়ক সংস্থা</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="বন্ধ করুন">
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-urgent mb-3 flex items-center gap-2">
              <span>🆘</span> জরুরি সেবা
            </h3>
            <div className="space-y-2">
              {EMERGENCY_CONTACTS.filter(c => c.category === 'emergency').map((contact) => (
                <div key={contact.number} className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <div className="font-medium text-gray-800">{contact.nameBengali}</div>
                  <a href={`tel:${contact.number}`} className="text-xl font-bold text-urgent block mt-1">
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
              <span>⚖️</span> আইনি সহায়তা
            </h3>
            <div className="space-y-2">
              {EMERGENCY_CONTACTS.filter(c => c.category === 'legal_aid').map((contact) => (
                <div key={contact.number} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="font-medium text-gray-800">{contact.nameBengali}</div>
                  <div className="text-sm text-gray-500 mb-1">{contact.name}</div>
                  <a href={`tel:${contact.number}`} className="text-primary font-bold block">
                    কল করুন: {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
