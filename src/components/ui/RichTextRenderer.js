'use client';

import React from 'react';

/**
 * RichTextRenderer
 * 
 * A simple, lightweight renderer for EditorJS JSON content.
 * Used across course specialization pages to display content saved
 * from the admin's RichTextEditor.
 */
export default function RichTextRenderer({ content, className = "" }) {
  if (!content) return null;

  let data = null;
  
  // Handle both JSON string and already parsed object
  if (typeof content === 'string') {
    try {
      data = JSON.parse(content);
    } catch (e) {
      // If it's not JSON, render it as raw text/html safely
      return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
    }
  } else {
    data = content;
  }

  // If it's a simple string after all that, just return it
  if (typeof data !== 'object' || !data.blocks) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: String(data) }} />;
  }

  return (
    <div className={`rich-text-content space-y-4 ${className}`}>
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p 
                key={index} 
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.data.text }} 
              />
            );
          
          case 'header':
            const HeaderTag = `h${block.data.level || 2}`;
            const headerClasses = {
              h1: "text-2xl font-bold mt-6 mb-2",
              h2: "text-xl font-bold mt-5 mb-2",
              h3: "text-lg font-bold mt-4 mb-1",
              h4: "text-base font-bold mt-3 mb-1",
            };
            return (
              <HeaderTag 
                key={index} 
                className={headerClasses[HeaderTag] || headerClasses.h2}
                dangerouslySetInnerHTML={{ __html: block.data.text }} 
              />
            );

          case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={index} className={`list-outside pl-5 ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'} space-y-1`}>
                {block.data.items.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ListTag>
            );

          case 'table':
            return (
              <div key={index} className="overflow-x-auto my-4">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <tbody>
                    {block.data.content.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td 
                            key={j} 
                            className="border border-gray-200 p-2"
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'htmlTable':
            return (
              <div 
                key={index} 
                className="overflow-x-auto my-4 university-prose"
                dangerouslySetInnerHTML={{ __html: block.data.html }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
