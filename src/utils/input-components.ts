import { Component } from "vue";
import type { InputComponentType } from "~/types";
import {
    // Text Input Components
    ShortText,
    LongText,
    Email,
    Password,
    Website,
    PhoneNumber,
    Address,

    // Numeric Input Components
    Number,
    Slider,
    RatingScale,
    NetPromoterScore,
    LikertScale,

    // Selection Components
    Dropdown,
    MultipleChoice,
    Checkboxes,
    ImageChoice,
    Ranking,

    // Date & Time Components
    DatePicker,
    TimePicker,

    // Media & File Components
    FileUpload,
    Signature,
    AudioRecorder,

    // Verification Components
    Captcha,
    List,
    DataTable,
    CodeJavascript,
    CodeJson,
} from '..';

/**
 * A collection of input components organized by type and functionality.
 * Each component is mapped to its corresponding InputComponentType.
 * 
 * Components are grouped into the following categories:
 * - Text Input: Components for collecting various types of text data
 * - Numeric Input: Components for collecting numerical data and ratings
 * - Selection: Components for choosing from predefined options
 * - Date & Time: Components for temporal data collection
 * - Media & File: Components for handling file uploads and media recording
 * - Verification: Components for user verification
 */
export const inputComponents: Record<InputComponentType, Component> = {
    // Text Input Components
    short_text: ShortText,      // Single-line text input
    long_text: LongText,        // Multi-line text input
    email: Email,               // Email address input with validation
    password: Password,         // Secure password input field
    website: Website,           // URL input with validation
    phone_number: PhoneNumber,  // Phone number input with formatting
    address: Address,           // Structured address input
    code_javascript: CodeJavascript,
    code_json: CodeJson,

    // Numeric Input Components
    number: Number,             // Basic number input
    slider: Slider,             // Range selection using a slider
    rating_scale: RatingScale,  // Numeric rating (e.g., 1-5 stars)
    net_promoter_score: NetPromoterScore,  // 0-10 satisfaction score
    likert_scale: LikertScale,  // Agreement scale (e.g., strongly disagree to strongly agree)

    // Selection Components
    dropdown: Dropdown,         // Single selection from dropdown
    multiple_choice: MultipleChoice,  // Single selection from radio buttons
    checkboxes: Checkboxes,    // Multiple selection from checkboxes
    image_choice: ImageChoice,  // Selection from image options
    ranking: Ranking,          // Ordered ranking of options

    // List Components
    list: List,
    data_table: DataTable,

    // Date & Time Components
    date_picker: DatePicker,    // Date selection calendar
    time_picker: TimePicker,    // Time selection input

    // Media & File Components
    file_upload: FileUpload,    // File upload functionality
    signature: Signature,       // Digital signature capture
    audio_recorder: AudioRecorder,  // Audio recording functionality

    // Verification Components
    captcha: Captcha,          // CAPTCHA verification
};

export default inputComponents;