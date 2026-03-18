'use client';
import React from 'react';

/**
 * Renders a title that can be either:
 * 1. A simple string: "Regular Title"
 * 2. A structured object: { main: "Main Title with Highlight", highlight: "Highlight", skyHighlight: "Sky" }
 */
export default function StructuredTitle({ title, className = "", highlightClass = "text-[#00588b]", skyHighlightClass = "text-sky-300" }) {
  if (!title) return null;

  // Case 1: Simple String
  if (typeof title === 'string') {
    return <span className={className}>{title}</span>;
  }

  // Case 2: Structured Object
  if (typeof title === 'object' && title.main) {
    const { main, highlight, skyHighlight } = title;
    
    let rendered = main;

    // Handle highlight
    if (highlight && main.includes(highlight)) {
      const parts = rendered.split(highlight);
      return (
        <span className={className}>
          {parts[0]}
          <span className={highlightClass}>{highlight}</span>
          {parts.slice(1).map((part, i) => {
            // Check if this part contains skyHighlight
            if (skyHighlight && part.includes(skyHighlight)) {
              const subParts = part.split(skyHighlight);
              return (
                <React.Fragment key={i}>
                  {subParts[0]}
                  <span className={skyHighlightClass}>{skyHighlight}</span>
                  {subParts[1]}
                </React.Fragment>
              );
            }
            return part;
          })}
        </span>
      );
    }

    // Fallback for objects without highlight match
    return <span className={className}>{main}</span>;
  }

  // Case 3: Error fallback
  return <span className={className}>Untitled</span>;
}
