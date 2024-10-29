// ==============================
// Component Types
// ==============================
/**
 * Different types of display components.
 */
/**
 * Different types of input components.
 */
export type DisplayComponentType =
    | 'html_block_content'
    | 'html_block_list'
    | 'html_block_media'
    | 'embed_slide'
    | 'embed_document'
    | 'locale_selector'
    | 'action_redirect'


// ==============================
// Display Properties
// ==============================
/**
 * Properties for display components.
 */
export interface DisplayProperties {
    component?: DisplayComponentType; // Type of display component
    icon?: string; // Optional icon name or path
}

// ==============================
// Embedded Document Properties
// ==============================
/**
 * Properties for embedded documents.
 */
export interface EmbedProperties extends DisplayProperties {
    src: string; // Source URL of the embedded document
    width?: number; // Optional width for the embedded document
    height?: number; // Optional height for the embedded document
}


// ==============================
// Redirect Properties
// ==============================
/**
 * Properties for redirect.
 */
export interface ActionRedirectProperties extends DisplayProperties {
    src: string; // Source URL of the embedded document
}

// ==============================
// HTML Content Blocks
// ==============================
/**
 * Different types of HTML block content.
 */
type HTMLBlockContentType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'pre' | 'code';

/**
 * Properties for HTML content blocks.
 */
export interface HtmlBlockContentProperties extends DisplayProperties {
    type: HTMLBlockContentType; // Type of HTML block
    content: string; // Content of the HTML block
}

// ==============================
// HTML List Blocks
// ==============================
/**
 * Different types of HTML lists.
 */
type HTMLBlockListType = 'ordered' | 'unordered';

/**
 * Properties for HTML list blocks.
 */
export interface HTMLBlockListProperties extends DisplayProperties {
    type: HTMLBlockListType; // Type of HTML list
    items: string[]; // Array of items in the list
}

// ==============================
// HTML Media Blocks
// ==============================
/**
 * Different types of HTML media.
 */
type HTMLBlockMediaType = 'video' | 'audio' | 'img';

/**
 * Attributes for media sources.
 */
interface HTMLSourceAttributes {
    src: string; // Source URL for the media
    type?: string; // Optional media type (e.g., "video/mp4")
    media: string; // Media query for the source
}

/**
 * Properties for HTML media blocks.
 */
export interface HTMLBlockMediaProperties {
    type: HTMLBlockMediaType; // Type of media block
    sources?: HTMLSourceAttributes[]; // Optional sources for the media
    src?: string; // Optional source URL for the media
    alt: string; // Alternative text for the media
    width?: number; // Optional width for the media
    controls?: boolean; // Indicates if media controls are available
    height?: number; // Optional height for the media
}