import React from "react";

interface KeyValueDisplayProps {
  data: Record<string, any>;
  className?: string;
  onItemClick?: (key: string, value: any) => void;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ 
  data, 
  className = "",
  onItemClick 
}) => {
  const isUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleItemClick = (key: string, value: any) => {
    if (onItemClick) {
      onItemClick(key, value);
    }
  };

  const renderValue = (key: string, value: any) => {
    // Array values - render as tags
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[var(--color-primary)] bg-opacity-20 text-[var(--tag-text)] rounded text-sm hover:bg-opacity-30 cursor-pointer transition-colors"
              onClick={() => handleItemClick(key, item)}
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    // URL values - render as links
    if (typeof value === "string" && isUrl(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] underline transition-colors"
        >
          {value}
        </a>
      );
    }

    // Comma-separated values - render as clickable items
    if (typeof value === "string" && value.includes(",")) {
      const items = value.split(",").map(item => item.trim());
      return (
        <span>
          {items.map((item, index) => (
            <span key={index}>
              <span 
                className="hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                onClick={() => handleItemClick(key, item)}
              >
                {item}
              </span>
              {index < items.length - 1 && ", "}
            </span>
          ))}
        </span>
      );
    }

    // Default string/number values
    return (
      <span 
        className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
        onClick={() => handleItemClick(key, value)}
      >
        {String(value)}
      </span>
    );
  };

  return (
    <div className={`text-justify ${className}`}>
      {Object.entries(data).map(([key, value], index) => (
        <span key={key}>
          <span 
            className="font-medium text-[var(--foreground)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
            onClick={() => handleItemClick(key, value)}
          >
            {key.replace(/_/g, ' ')}
          </span>
          : {renderValue(key, value)}
          {index < Object.entries(data).length - 1 && "; "}
        </span>
      ))}
    </div>
  );
};

export default KeyValueDisplay;