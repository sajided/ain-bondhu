import React from 'react';

interface BotAvatarProps {
  size?: number;
}

export const BotAvatar: React.FC<BotAvatarProps> = ({ size = 32 }) => {
  return (
    <div
      className="rounded-full bg-secondary flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      আ
    </div>
  );
};
