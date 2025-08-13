/**
 * Utility functions to clean and transform malformed HTML from Quill editor
 */

/**
 * Cleans and transforms Quill HTML output to proper HTML
 * @param html - Raw HTML string from Quill editor
 * @returns Clean, properly formatted HTML string
 */
export const cleanQuillHTML = (html: string): string => {
    if (!html || typeof html !== 'string') {
        return '';
    }

    let cleanHtml = html;

    // Fix malformed headers where each character is in a separate <h2> tag
    cleanHtml = fixMalformedHeaders(cleanHtml);
    
    // Convert Quill list format to standard HTML lists
    cleanHtml = convertQuillLists(cleanHtml);
    
    // Remove Quill UI elements
    cleanHtml = removeQuillUIElements(cleanHtml);
    
    // Clean up extra whitespace and empty tags
    cleanHtml = cleanupWhitespace(cleanHtml);
    
    // Add Tailwind CSS classes for proper styling
    cleanHtml = addTailwindClasses(cleanHtml);
    
    return cleanHtml;
};

/**
 * Fixes malformed headers where each character is wrapped in separate header tags
 */
const fixMalformedHeaders = (html: string): string => {
    // Pattern to match consecutive header tags with single characters or short content
    const headerPattern = /(<h([1-6])[^>]*>)([^<]{1,3})(<\/h\2>)(\s*<h\2[^>]*>[^<]{1,3}<\/h\2>)*/gi;
    
    return html.replace(headerPattern, (match, openTag, level, firstContent) => {
        // Extract all consecutive header content
        const headerRegex = new RegExp(`<h${level}[^>]*>([^<]*)<\/h${level}>`, 'gi');
        const matches = match.match(headerRegex) || [];
        
        // Combine all the content from consecutive headers
        const combinedContent = matches
            .map(headerMatch => {
                const contentMatch = headerMatch.match(new RegExp(`<h${level}[^>]*>([^<]*)<\/h${level}>`, 'i'));
                return contentMatch ? contentMatch[1] : '';
            })
            .join('');
        
        // Return a single properly formatted header
        return `<h${level}>${combinedContent}</h${level}>`;
    });
};

/**
 * Converts Quill's custom list format to standard HTML lists
 */
const convertQuillLists = (html: string): string => {
    let result = html;
    
    // Convert bullet lists
    result = convertQuillListType(result, 'bullet', 'ul');
    
    // Convert ordered lists
    result = convertQuillListType(result, 'ordered', 'ol');
    
    return result;
};

/**
 * Converts a specific Quill list type to standard HTML
 */
const convertQuillListType = (html: string, quillType: string, htmlTag: string): string => {
    // Find all paragraphs with data-list attribute
    const listPattern = new RegExp(`<p[^>]*data-list="${quillType}"[^>]*>(.*?)<\/p>`, 'gi');
    
    if (!listPattern.test(html)) {
        return html;
    }
    
    // Group consecutive list items
    let result = html;
    const matches = Array.from(html.matchAll(listPattern));
    
    if (matches.length === 0) {
        return result;
    }
    
    // Process matches in reverse order to avoid position shifts
    for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        let startIndex = i;
        
        // Find consecutive list items
        while (startIndex > 0 && 
               matches[startIndex - 1] && 
               matches[startIndex - 1].index !== undefined &&
               matches[startIndex].index !== undefined &&
               matches[startIndex - 1].index + matches[startIndex - 1][0].length >= matches[startIndex].index - 100) {
            startIndex--;
        }
        
        if (startIndex < i) {
            // We have consecutive items, group them
            const consecutiveMatches = matches.slice(startIndex, i + 1);
            const listItems = consecutiveMatches.map(m => `<li>${m[1]}</li>`).join('');
            const wrappedList = `<${htmlTag}>${listItems}</${htmlTag}>`;
            
            // Replace all consecutive matches with the wrapped list
            const firstMatch = consecutiveMatches[0];
            const lastMatch = consecutiveMatches[consecutiveMatches.length - 1];
            const startPos = firstMatch.index!;
            const endPos = lastMatch.index! + lastMatch[0].length;
            
            result = result.substring(0, startPos) + wrappedList + result.substring(endPos);
            
            // Skip the processed items
            i = startIndex;
        } else {
            // Single item, wrap it
            const listItem = `<${htmlTag}><li>${match[1]}</li></${htmlTag}>`;
            result = result.replace(match[0], listItem);
        }
    }
    
    return result;
};

/**
 * Removes Quill UI elements that shouldn't be rendered
 */
const removeQuillUIElements = (html: string): string => {
    let result = html;
    
    // Remove ql-ui spans
    result = result.replace(/<span[^>]*class="[^"]*ql-ui[^"]*"[^>]*>.*?<\/span>/gi, '');
    
    // Remove empty ql-cursor spans
    result = result.replace(/<span[^>]*class="[^"]*ql-cursor[^"]*"[^>]*><\/span>/gi, '');
    
    // Clean up other Quill-specific attributes
    result = result.replace(/\s*data-list="[^"]*"/gi, '');
    result = result.replace(/\s*class="[^"]*ql-[^"]*"/gi, '');
    
    return result;
};

/**
 * Cleans up extra whitespace and empty tags
 */
const cleanupWhitespace = (html: string): string => {
    let result = html;
    
    // Remove empty paragraphs
    result = result.replace(/<p[^>]*>\s*<\/p>/gi, '');
    
    // Remove empty headers
    result = result.replace(/<h[1-6][^>]*>\s*<\/h[1-6]>/gi, '');
    
    // Clean up multiple consecutive line breaks
    result = result.replace(/(<br\s*\/?>)\s*(<br\s*\/?>)+/gi, '$1');
    
    // Clean up extra whitespace between tags
    result = result.replace(/>\s+</g, '><');
    
    // Trim leading/trailing whitespace
    result = result.trim();
    
    return result;
};

/**
 * Adds Tailwind CSS classes to HTML elements for proper styling
 */
const addTailwindClasses = (html: string): string => {
    let result = html;
    
    // Add classes to headers
    result = result.replace(/<h1(?![^>]*class)/gi, '<h1 class="text-4xl font-bold mb-4 text-gray-900"');
    result = result.replace(/<h2(?![^>]*class)/gi, '<h2 class="text-3xl font-bold mb-3 text-gray-900"');
    result = result.replace(/<h3(?![^>]*class)/gi, '<h3 class="text-2xl font-semibold mb-3 text-gray-800"');
    result = result.replace(/<h4(?![^>]*class)/gi, '<h4 class="text-xl font-semibold mb-2 text-gray-800"');
    result = result.replace(/<h5(?![^>]*class)/gi, '<h5 class="text-lg font-medium mb-2 text-gray-700"');
    result = result.replace(/<h6(?![^>]*class)/gi, '<h6 class="text-base font-medium mb-2 text-gray-700"');
    
    // Add classes to paragraphs
    result = result.replace(/<p(?![^>]*class)/gi, '<p class="mb-4 text-gray-600 leading-relaxed"');
    
    // Add classes to lists
    result = result.replace(/<ul(?![^>]*class)/gi, '<ul class="list-disc list-inside mb-4 text-gray-600 space-y-2"');
    result = result.replace(/<ol(?![^>]*class)/gi, '<ol class="list-decimal list-inside mb-4 text-gray-600 space-y-2"');
    result = result.replace(/<li(?![^>]*class)/gi, '<li class="ml-4"');
    
    // Add classes to blockquotes
    result = result.replace(/<blockquote(?![^>]*class)/gi, '<blockquote class="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700"');
    
    // Add classes to code blocks
    result = result.replace(/<pre(?![^>]*class)/gi, '<pre class="bg-gray-100 rounded-md p-4 mb-4 overflow-x-auto"');
    result = result.replace(/<code(?![^>]*class)/gi, '<code class="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm"');
    
    // Add classes to links
    result = result.replace(/<a(?![^>]*class)/gi, '<a class="text-blue-600 hover:text-blue-800 underline"');
    
    // Add classes to tables
    result = result.replace(/<table(?![^>]*class)/gi, '<table class="min-w-full divide-y divide-gray-200 mb-4"');
    result = result.replace(/<thead(?![^>]*class)/gi, '<thead class="bg-gray-50"');
    result = result.replace(/<tbody(?![^>]*class)/gi, '<tbody class="bg-white divide-y divide-gray-200"');
    result = result.replace(/<th(?![^>]*class)/gi, '<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"');
    result = result.replace(/<td(?![^>]*class)/gi, '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"');
    
    // Add classes to horizontal rules
    result = result.replace(/<hr(?![^>]*class)/gi, '<hr class="my-6 border-gray-300"');
    
    // Add classes to strong and em tags
    result = result.replace(/<strong(?![^>]*class)/gi, '<strong class="font-semibold text-gray-900"');
    result = result.replace(/<em(?![^>]*class)/gi, '<em class="italic"');
    
    // Add classes to images
    result = result.replace(/<img(?![^>]*class)/gi, '<img class="max-w-full h-auto rounded-lg shadow-md mb-4"');
    
    return result;
};

/**
 * Safely renders HTML content with basic sanitization
 * @param html - HTML string to render
 * @returns Sanitized HTML string safe for dangerouslySetInnerHTML
 */
export const sanitizeHTML = (html: string): string => {
    if (!html) return '';
    
    // First clean the Quill HTML
    let sanitized = cleanQuillHTML(html);
    
    // Basic sanitization - remove script tags and dangerous attributes
    sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    
    return sanitized;
};