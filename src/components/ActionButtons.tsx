import React from 'react';
import { Sparkles, Palette, Zap, SunMedium } from 'lucide-react';

interface ActionButtonsProps {
  onAction: (prompt: string) => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAction, disabled }) => {
  const actions = [
    { icon: <Sparkles size={14} />, label: 'Improve Detail', prompt: 'Improve the level of detail and sharpness in this image.' },
    { icon: <Palette size={14} />, label: 'Cinematic Style', prompt: 'Apply a cinematic, professional photography style to this image.' },
    { icon: <Zap size={14} />, label: 'Vibrant Colors', prompt: 'Make the colors more vibrant and punchy.' },
    { icon: <SunMedium size={14} />, label: 'Soft Lighting', prompt: 'Adjust the lighting to be soft and atmospheric.' },
  ];

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {actions.map((action, idx) => (
        <button
          key={idx}
          disabled={disabled}
          onClick={() => onAction(action.prompt)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full glass hover:bg-white/20 text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
