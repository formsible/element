interface IFile {
    id?: string
    url?: string
    readonly file: File
    duration?: number
    status?: 'queued' | 'pending' | 'uploaded' | 'error'
}

interface InputChoice {
    label: string
    value: string
    src: string
}
type DisplayComponentType =
    | 'html'
    | 'icon'
    | 'video'
    | 'slide'
    | 'document'
    | 'locale_selector'
    | 'page_break'
type InputComponentType =
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
    | 'website'
interface Validation {
    rule: 'required' | 'maxLength' | string
    params?: string[]
}
export interface InputProperties {
    key: string
    repeatable?: boolean
    component?: InputComponentType
    label: string
    description?: string
    placeholder?: string
    scale?: number
    choices?: InputChoice[]
    validations?: Validation[]
    props?: Record<string, any>
}

// Display
export interface DisplayProperties {
    component: DisplayComponentType
    icon?: string // Icon name or path
}


// Embed document properties
interface EmbedPropeties extends DisplayProperties {
    src: string
    width?: number
    height?: number
}

// Redirect component
interface ActionRedirectProperties extends DisplayProperties {
    src: string
}

// HTML content block
type HTMLBlockContentType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'pre' | 'code'
interface HtmlBlockContentProperties extends DisplayProperties {
    type: HTMLBlockContentType
    content: string
}

// HTML list block
type HTMLBlockListType = 'ordered' | 'unordered'
// interface DescriptionItem {
//     term: string
//     descriptions: (string | DescriptionItem)[]
// }
interface HTMLBlockListProperties extends DisplayProperties {
    type: HTMLBlockListType
    items: string[]
}

//HTML media block
type HTMLBlockMediaType = 'video' | 'audio' | 'img'
interface HTMLSourceAttributes {
    src: string,
    type?: string,
    media: string
}
interface HTMLBlockMediaProperties {
    type: HTMLBlockMediaType
    sources?: HTMLSourceAttributes[]
    src?: string
    alt: string
    width?: number
    controls?: boolean
    height?: number
}


export interface ElementPropertes extends DisplayProperties, InputProperties { }

export interface ElementManifest {
    meta: {
        name: string
        enabled: boolean
        description: string
        icon: string
    }
    init: {
        type: 'input' | 'display'
        properties: {
            input: InputProperties
            display: DisplayProperties
        }
    }
}

export type FontFamily =
    // Display
    | 'Playfair Display'
    | 'Titillium Web'
    | 'Bebas Neue'
    // Handwriting
    | 'Dancing Script'
    | 'Pacifico'
    | 'Caveat'
    // Monospace
    | 'Roboto Mono'
    | 'Inconsolata'
    | 'Source Code Pro'
    // Serif
    | 'Merriweather'
    | 'Lora'
    // Slab Serif
    | 'Roboto Slab'
    | 'Arvo'
    | 'Slabo 27px'
    // Sans serif
    | 'Roboto'
    | 'Open Sans'
    | 'Montserrat'
    | 'Arial'
    | 'default'
export type FontClassification =
    | 'Serif'
    | 'Slab Serif'
    | 'Sans Serif'
    | 'Display'
    | 'Handwriting'
    | 'Monospace'

export type Size = 'small' | 'medium' | 'large' | 'default' | 'Extra Large'
export type FillType = 'Fill' | 'Outlined' | 'Bottom Border'
export type Color =
    | 'Midnight Blue'
    | 'OliveDrab'
    | 'Black'
    | 'BurlyWood'
    | 'DarkCyan'
    | 'DarkGoldenRod'
    | 'DarkGreen'
    | 'DarkMagenta'
    | 'DarkOliveGreen'
    | 'DarkSlateBlue'
    | 'DarkRed'
    | 'DarkSlateGray'
export type BgColor =
    | 'Alice Blue'
    | 'Antique White'
    | 'Dark Sea Green'
    | 'Light Sky Blue'
    | 'White'
    | 'Lavender'
    | 'Floral White'
    | 'Honey Dew'
    | 'Mint Cream'
    | 'Pale Green'
    | 'Pale Turquoise'

export type ColorApplicationArea = 'Outline' | 'Background'
export type BackgroundType = 'Image' | 'Color'

// Conditional type for formBackground
export interface Style {
    fontFamily: Record<FontFamily, string>
    formBackground: Record<string | BgColor, string>
    radius: Record<Size, string>
    bg: Record<FillType, string>
    color: Record<ColorApplicationArea, Record<Color, string>>
}

// Configuration for font groups in the style options
interface FontGroupConfiguration {
    optionLabel: string
    optionGroupLabel: string
    optionGroupChildren: string
}

// Represents an option for a specific style property
export interface StylePropertyOption {
    availableOptions: any[] // Consider specifying a more explicit type instead of 'any' if possible
    label: string // Descriptive label for the property
    modelKey: ThemePropertyKey // Key to map this option to the theme state
    filter?: boolean // Option to enable filtering of the options
    group?: FontGroupConfiguration // Grouping configuration, if applicable
}

// Configuration for the overall theme
export interface ThemeConfiguration {
    form: {
        fontFamily: string
        backgroundColor: string
    }
    input: {
        borderRadius: string
        background: string
        textColor: string
    }
    button: {
        borderRadius: string
        fontFamily: string
        textColor: string
    }
}

// Define keys for properties that can be used in theme state
export type ThemePropertyKey =
    | 'fontFamily'
    | 'borderRadius'
    | 'background'
    | 'primaryColor'
    | 'backgroundColor'

// Preset for themes, could be a custom or predefined, used in forms
export interface Theme
    extends Record<
        ThemePropertyKey,
        string | FontFamily | Size | FillType | Color | BgColor
    > {
    fontFamily: FontFamily
    borderRadius: Size
    background: FillType
    primaryColor: Color
    backgroundColor: BgColor | string
}

export interface PredefinedPreset extends Theme {
    name: string
}
