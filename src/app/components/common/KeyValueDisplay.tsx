import React from "react";

interface KeyValueDisplayProps {
  data: Record<string, any>;
  className?: string;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ data, className = "" }) => {
  const isUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const isArray = (value: any): boolean => {
    return Array.isArray(value);
  };

  const renderValue = (key: string, value: any) => {
    if (isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:text-[var(--color-primary)] cursor-pointer transition-colors"
              onClick={() => console.log(`Clicked: ${item}`)}
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    if (typeof value === "string" && isUrl(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
        >
          {value}
        </a>
      );
    }

    // Handle comma-separated values
    if (typeof value === "string" && value.includes(",")) {
      const items = value.split(",").map(item => item.trim());
      return (
        <span>
          {items.map((item, index) => (
            <span key={index}>
              <span 
                className="hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                onClick={() => console.log(`Clicked item: ${item}`)}
              >
                {item}
              </span>
              {index < items.length - 1 && ", "}
            </span>
          ))}
        </span>
      );
    }

    return (
      <span className="text-gray-700 hover:text-[var(--color-primary)] cursor-pointer transition-colors text-justify">
        {String(value)}
      </span>
    );
  };

  return (
    <div className={`text-justify ${className}`}>
      {Object.entries(data).map(([key, value], index) => (
        <span key={key}>
          <span 
            className="font-medium text-gray-900 hover:text-[var(--color-primary)] cursor-pointer transition-colors"
            onClick={() => console.log(`Clicked key: ${key}`, value)}
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