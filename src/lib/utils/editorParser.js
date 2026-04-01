import edjsHTML from 'editorjs-html';

// Initialize the parser safely (handles both ESM and CJS imports)
const initParser = (typeof edjsHTML === 'function') ? edjsHTML : (edjsHTML?.default ? edjsHTML.default : null);

// 🔥 Add custom parsers for tools used in RichTextEditor (like 'raw', 'table', 'image')
const edjsParser = initParser ? initParser({
  raw: (block) => block.data.html,
  htmlTable: (block) => `<div class="table-wrapper">${block.data.html}</div>`,
  image: (block) => {
    const url = block.data.file?.url || '';
    const caption = block.data.caption || '';
    const withBorder = block.data.withBorder ? 'image-tool--withBorder' : '';
    const withBackground = block.data.withBackground ? 'image-tool--withBackground' : '';
    const stretched = block.data.stretched ? 'image-tool--stretched' : '';

    return `
      <figure class="image-tool ${withBorder} ${withBackground} ${stretched}">
        <div class="image-tool__image">
          <img src="${url}" alt="${caption}" />
        </div>
        ${caption ? `<figcaption class="image-tool__caption">${caption}</figcaption>` : ''}
      </figure>
    `;
  },
  header: (block) => {
    const align = block.tunes?.alignmentTool?.alignment || 'left';
    return `<h${block.data.level} style="text-align: ${align}">${block.data.text}</h${block.data.level}>`;
  },
  paragraph: (block) => {
    const align = block.tunes?.alignmentTool?.alignment || 'left';
    return `<p style="text-align: ${align}">${block.data.text}</p>`;
  },
  list: (block) => {
    const type = block.data.style === 'ordered' ? 'ol' : 'ul';
    const align = block.tunes?.alignmentTool?.alignment || 'left';
    
    const parseItems = (items) => {
      return items.map(item => {
        // Handle EditorJS List v2 structure (object with content and nested items)
        if (typeof item === 'object' && item !== null) {
          const content = item.content || '';
          const nested = item.items && item.items.length > 0 ? `<${type}>${parseItems(item.items)}</${type}>` : '';
          return `<li>${content}${nested}</li>`;
        }
        // Handle EditorJS List v1 structure (simple string)
        return `<li>${item}</li>`;
      }).join('');
    };

    return `<${type} style="text-align: ${align}">${parseItems(block.data.items)}</${type}>`;
  },
  table: (block) => {
    const { content, withHeadings } = block.data;
    const hasHeader = withHeadings && content.length > 0;
    
    let thead = '';
    let startIdx = 0;

    if (hasHeader) {
      const headerRow = content[0].map(cell => `<th>${cell}</th>`).join('');
      thead = `<thead><tr>${headerRow}</tr></thead>`;
      startIdx = 1;
    }

    const rows = content.slice(startIdx).map(row => {
      const cells = row.map(cell => `<td>${cell}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `
      <div class="table-wrapper">
        <table>
          ${thead}
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }
}) : null;

export function parseEditorContent(content) {
  if (!content) return '';

  try {
    // 1. Identify if it's already an object or a JSON string (with recursive check)
    let parsedData = content;
    let isJson = typeof content === 'object' && content !== null;
    
    // Recursively parse if it's a double-stringified JSON
    while (typeof parsedData === 'string') {
      const trimmed = parsedData.trim();
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        try {
          parsedData = JSON.parse(trimmed);
          isJson = true;
        } catch (e) {
          break; // Stop if it's not valid JSON
        }
      } else {
        break;
      }
    }
    
    // 2. Validate it's Editor.js format (has blocks)
    if (isJson && parsedData && parsedData.blocks && Array.isArray(parsedData.blocks) && edjsParser) {
      const htmlResult = edjsParser.parse(parsedData);
      
      // Industrial parser returns a string, but we handle both just in case
      return Array.isArray(htmlResult) ? htmlResult.join('') : htmlResult;
    }
    
    // 3. If it's not Editor.js JSON, return original content (HTML or String)
    return typeof content === 'string' ? content : JSON.stringify(content);
  } catch (e) {
    // 4. FALLBACK: Error hone par original content return karo
    return typeof content === 'string' ? content : '';
  }
}