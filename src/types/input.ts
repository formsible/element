// ==============================
// File Handling
// ==============================
/**
 * Represents a file object with optional properties for ID, URL, duration, and status.
 */
export interface IFile {
    id?: string // Optional unique identifier for the file
    url?: string // Optional URL of the file
    readonly file: File // The actual File object
    duration?: number // Optional duration for media files
    status?: 'queued' | 'pending' | 'uploaded' | 'error' // Current status of the file
}

// ==============================
// Input Choices
// ==============================
/**
 * Describes choices available for inputs, containing a label, value, and source.
 */
export interface InputChoice {
    label: string // Display label for the choice
    value: string // Value associated with the choice
    src: string // Source path or URL related to the choice
}

// ==============================
// Component Types
// ==============================
/**
 * Different types of display components.
 */
/**
 * Different types of input components.
 */
export type InputComponentType =
    | 'address'
    | 'captcha'
    | 'checkboxes'
    | 'date_picker'
    | 'list'
    | 'dropdown'
    | 'email'
    | 'file_upload'
    | 'image_choice'
    | 'likert_scale'
    | 'long_text'
    | 'multiple_choice'
    | 'net_promoter_score'
    | 'number'
    | 'password'
    | 'phone_number'
    | 'ranking'
    | 'rating_scale'
    | 'short_text'
    | 'signature'
    | 'data_table'
    | 'slider'
    | 'time_picker'
    | 'website'
    | 'audio_recorder'
    | 'code_javascript'
    | 'code_json'

// ==============================
// Validation
// ==============================
/**
 * Defines rules for input validation, such as required fields or maximum length.
 */
export interface Validation {
    rule: 'required' | 'maxLength' | string // Validation rule type
    params?: string[] // Optional parameters for the rule
}

// ==============================
// Input Properties
// ==============================
/**
 * Properties for input components in the form.
 */
export interface InputProperties {
    key: string // Unique key for the input
    component?: InputComponentType // Type of input component
    label: string // Display label for the input
    description?: string // Optional description for the input
    validations?: Validation[] // Optional validations for the input
    props?: Record<string, any> // Additional properties for the input
    placeholder?: string
}

// ==============================
// List Input Field
// ==============================
/**
 * Input list, add remove sort items in list.
 */
export interface InputListProperties extends InputProperties {
    items: string[]
}

// ==============================
// Ratings input field
// ==============================
/**
 * Rate stars component.
 */
export interface InputRatingProperties extends InputProperties {
    stars: number
}

// ==============================
// Choice Input Field
// ==============================
/**
 * Input field with multiple choices.
 */
export interface InputChoiceProperties extends InputProperties {
    choices: InputChoice[]
}
