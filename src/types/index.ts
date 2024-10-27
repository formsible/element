// ==============================
// File Handling
// ==============================
/**
 * Represents a file object with optional properties for ID, URL, duration, and status.
 */
export interface IFile {
    id?: string; // Optional unique identifier for the file
    url?: string; // Optional URL of the file
    readonly file: File; // The actual File object
    duration?: number; // Optional duration for media files
    status?: 'queued' | 'pending' | 'uploaded' | 'error'; // Current status of the file
}

// ==============================
// Input Choices
// ==============================
/**
 * Describes choices available for inputs, containing a label, value, and source.
 */
interface InputChoice {
    label: string; // Display label for the choice
    value: string; // Value associated with the choice
    src: string; // Source path or URL related to the choice
}

// ==============================
// Component Types
// ==============================
/**
 * Different types of display components.
 */
export type DisplayComponentType =
    | 'html'
    | 'icon'
    | 'video'
    | 'slide'
    | 'document'
    | 'locale_selector'
    | 'page_break';

/**
 * Different types of input components.
 */
export type InputComponentType =
    | 'address'
    | 'captcha'
    | 'checkboxes'
    | 'date_picker'
    | 'dropdown'
    | 'email'
    | 'file_upload'
    | 'image_choice'
    | 'likert_scale'
    | 'long_text'
    | 'matrix'
    | 'multiple_choice'
    | 'net_promoter_score'
    | 'number'
    | 'password'
    | 'phone_number'
    | 'ranking'
    | 'rating_scale'
    | 'short_text'
    | 'signature'
    | 'slider'
    | 'time_picker'
    | 'website';

// ==============================
// Validation
// ==============================
/**
 * Defines rules for input validation, such as required fields or maximum length.
 */
export interface Validation {
    rule: 'required' | 'maxLength' | string; // Validation rule type
    params?: string[]; // Optional parameters for the rule
}

// ==============================
// Input Properties
// ==============================
/**
 * Properties for input components in the form.
 */
export interface InputProperties {
    key: string; // Unique key for the input
    repeatable?: boolean; // Indicates if the input can be repeated
    component?: InputComponentType; // Type of input component
    label: string; // Display label for the input
    description?: string; // Optional description for the input
    placeholder?: string; // Placeholder text for the input
    scale?: number; // Optional scale value
    choices?: InputChoice[]; // Optional choices for the input
    validations?: Validation[]; // Optional validations for the input
    props?: Record<string, any>; // Additional properties for the input
}

// ==============================
// Display Properties
// ==============================
/**
 * Properties for display components.
 */
export interface DisplayProperties {
    component: DisplayComponentType; // Type of display component
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

// ==============================
// Element Manifest
// ==============================
/**
 * Represents the metadata and initial properties for a UI component.
 */
export interface ElementManifest {
    meta: {
        name: string; // Name of the component
        enabled: boolean; // Indicates if the component is enabled
        description: string; // Description of the component
        icon: string; // Icon for the component
    };
    init: {
        type: 'input' | 'display'; // Type of the component
        properties: {
            input: InputProperties; // Input properties
            display: DisplayProperties; // Display properties
        };
    };
}