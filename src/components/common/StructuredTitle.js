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
    return <span className={className} dangerouslySetInnerHTML={{ __html: title }} />;
  }

  // Case 2: Structured Object
  if (typeof title === 'object' && title.main) {
    const { main, highlight, skyHighlight } = title;
    
    // If the main title itself contains HTML, we prefer the simple rendering
    if (main.includes('<') && main.includes('>')) {
       return <span className={className} dangerouslySetInnerHTML={{ __html: main }} />;
    }

    // Handle highlight logic if it's plain text
    if (highlight && main.includes(highlight)) {
      const parts = main.split(highlight);
      return (
        <span className={className}>
          <span dangerouslySetInnerHTML={{ __html: parts[0] }} />
          <span className={highlightClass} dangerouslySetInnerHTML={{ __html: highlight }} />
          {parts.slice(1).map((part, i) => {
            if (skyHighlight && part.includes(skyHighlight)) {
              const subParts = part.split(skyHighlight);
              return (
                <React.Fragment key={i}>
                  <span dangerouslySetInnerHTML={{ __html: subParts[0] }} />
                  <span className={skyHighlightClass} dangerouslySetInnerHTML={{ __html: skyHighlight }} />
                  <span dangerouslySetInnerHTML={{ __html: subParts[1] }} />
                </React.Fragment>
              );
            }
            return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
          })}
        </span>
      );
    }

    // Fallback for objects without highlight match
    return <span className={className} dangerouslySetInnerHTML={{ __html: main }} />;
  }

  // Case 3: Error fallback
  return <span className={className}>Untitled</span>;
}
