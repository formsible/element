import type { Style, Theme } from '@/types'

// utils/style.ts
export const style: Style = {
  fontFamily: {
    'Playfair Display': 'font-family: Playfair Display, serif',
    'Titillium Web': 'font-family: Titillium Web, sans-serif',
    default: 'font-family: Arial, Helvetica, sans-serif',
    'Bebas Neue': 'font-family: Bebas Neue, cursive',
    'Roboto Slab': 'font-family: Roboto Slab, serif',
    Arvo: 'font-family: Arvo, serif',
    'Slabo 27px': 'font-family: Slabo 27px, serif',
    Roboto: 'font-family: Roboto, sans-serif',
    'Open Sans': 'font-family: Open Sans, sans-serif',
    Montserrat: 'font-family: Montserrat, sans-serif',
    Arial: 'font-family: Arial, Helvetica, sans-serif',
    'Dancing Script': 'font-family: Dancing Script, cursive',
    Pacifico: 'font-family: Pacifico, cursive',
    Caveat: 'font-family: Caveat, cursive',
    'Roboto Mono': 'font-family: Roboto Mono, monospace',
    Inconsolata: 'font-family: Inconsolata, monospace',
    'Source Code Pro': 'font-family: Source Code Pro, monospace',
    Merriweather: 'font-family: Merriweather, serif',
    Lora: 'font-family: Lora, serif',
  },
  formBackground: {
    'Alice Blue': 'background-color: aliceblue',
    'Antique White': 'background-color: antiquewhite',
    White: 'background-color: white',
    'Dark Sea Green': 'background-color: darkseagreen',
    'Light Sky Blue': 'background-color: lightskyblue',
    Lavender: 'background-color: lavender',
    'Floral White': 'background-color: floralwhite',
    'Honey Dew': 'background-color: honeydew',
    'Mint Cream': 'background-color: mintcream',
    'Pale Green': 'background-color: palegreen',
    'Pale Turquoise': 'background-color: paleturquoise',
    Leaves:
      'background-image: url(https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg?w=1060&t=st=1724287789~exp=1724288389~hmac=1e6e83aa08c5d5b938b84afc1f25e39c0d82eb9dcd41b35f3b056b285cf549aa)',
  },
  radius: {
    small: 'border-radius: 0.125rem', // 2px
    medium: 'border-radius: 0.25rem', // 4px
    large: 'border-radius: 0.5rem', // 8px
    'Extra Large': 'border-radius: 1rem', // 16px
    default: 'border-radius: 0.375rem', // 6px
  },
  bg: {
    Fill: 'border-width: 0px; background-color: rgb(241 245 249);',
    Outlined:
      'border: 2px solid rgba(0,0,0, 0.25); background-color: transparent;',
    'Bottom Border':
      'border-bottom: 2px solid rgba(0, 0, 0, 0.25); background-color: transparent',
  },
  color: {
    Background: {
      'Midnight Blue': 'background-color: midnightblue',
      OliveDrab: 'background-color: olivedrab',
      Black: 'background-color: black',
      BurlyWood: 'background-color: burlywood',
      DarkCyan: 'background-color: darkcyan',
      DarkGoldenRod: 'background-color: darkgoldenrod',
      DarkGreen: 'background-color: darkgreen',
      DarkMagenta: 'background-color: darkmagenta',
      DarkOliveGreen: 'background-color: darkolivegreen',
      DarkSlateBlue: 'background-color: darkslateblue',
      DarkRed: 'background-color: darkred',
      DarkSlateGray: 'background-color: darkslategray',
    },
    Outline: {
      'Midnight Blue': 'outline-color: midnightblue',
      OliveDrab: 'outline-color: olivedrab',
      Black: 'outline-color: black',
      BurlyWood: 'outline-color: burlywood',
      DarkCyan: 'outline-color: darkcyan',
      DarkGoldenRod: 'outline-color: darkgoldenrod',
      DarkGreen: 'outline-color: darkgreen',
      DarkMagenta: 'outline-color: darkmagenta',
      DarkOliveGreen: 'outline-color: darkolivegreen',
      DarkSlateBlue: 'outline-color: darkslateblue',
      DarkRed: 'outline-color: darkred',
      DarkSlateGray: 'outline-color: darkslategray',
    },
  },
}

// Theme configuration using the imported style object and reactive state
export const themeStateToCss = (styleState: Theme) => ({
  form: [
    style.fontFamily[styleState.fontFamily],
    style.formBackground[styleState.backgroundColor],
  ],
  input: [
    style.radius[styleState.borderRadius],
    style.bg[styleState.background],
    style.color['Outline'][styleState.primaryColor],
  ],
  button: [
    style.radius[styleState.borderRadius],
    style.fontFamily[styleState.fontFamily],
    style.color['Background'][styleState.primaryColor],
  ],
})

export const defaultTheme: Theme = {
  fontFamily: 'default',
  borderRadius: 'default',
  background: 'Fill',
  primaryColor: 'Black',
  backgroundColor: 'White',
}

export const formPresets: PredefinedPreset[] = [
  defaultTheme,
  {
    name: 'Elegant Minimalism',
    fontFamily: 'Lora',
    borderRadius: 'small',
    background: 'Outlined',
    primaryColor: 'DarkOliveGreen', // Changed to match new color set
    backgroundColor: 'Floral White', // Changed to match new color set
  },
  {
    name: 'Retro Tech',
    fontFamily: 'Roboto Slab',
    borderRadius: 'medium',
    background: 'Fill',
    primaryColor: 'Midnight Blue',
    backgroundColor: 'Light Sky Blue',
  },
  {
    name: 'Urban Chic',
    fontFamily: 'Playfair Display',
    borderRadius: 'large',
    background: 'Bottom Border',
    primaryColor: 'DarkCyan', // Changed to match new color set
    backgroundColor: 'Dark Sea Green',
  },
  {
    name: 'Creative Burst',
    fontFamily: 'Pacifico',
    borderRadius: 'Extra Large',
    background: 'Outlined',
    primaryColor: 'DarkGoldenRod', // Changed to match new color set
    backgroundColor: 'Lavender',
  },
  {
    name: 'Modern Sleek',
    fontFamily: 'Roboto Mono',
    borderRadius: 'default',
    background: 'Fill',
    primaryColor: 'OliveDrab',
    backgroundColor: 'Mint Cream', // Changed to match new color set
  },
  {
    name: 'Sophisticated Charm',
    fontFamily: 'Titillium Web',
    borderRadius: 'medium',
    background: 'Bottom Border',
    primaryColor: 'DarkSlateBlue', // Changed to match new color set
    backgroundColor: 'Alice Blue',
  },
  {
    name: 'Classic Bold',
    fontFamily: 'Bebas Neue',
    borderRadius: 'small',
    background: 'Fill',
    primaryColor: 'DarkRed', // Changed to match new color set
    backgroundColor: 'White',
  },
  {
    name: 'Vintage Script',
    fontFamily: 'Caveat',
    borderRadius: 'large',
    background: 'Outlined',
    primaryColor: 'DarkSlateGray', // Changed to match new color set
    backgroundColor: 'Antique White',
  },
]
