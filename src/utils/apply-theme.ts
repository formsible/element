import type { Ref} from 'vue';
import { watch, onMounted } from 'vue'
import type { ThemeData } from '../types/theme'

export function useTheme(themeRef: Ref<ThemeData>) {
  const apply = () => {
    const theme = themeRef.value
    const root = document.documentElement

    // Apply CSS variable values
    root.style.setProperty(
      '--background-color',
      theme.variables.container.backgroundColor,
      '#00ff00'
    )
    root.style.setProperty('--text-color', theme.variables.container.textColor)
    root.style.setProperty('--font-size', theme.variables.container.fontSize)

    root.style.setProperty(
      '--button-background-color',
      theme.variables.button.backgroundColor
    )
    root.style.setProperty(
      '--button-text-color',
      theme.variables.button.textColor
    )
    root.style.setProperty(
      '--button-border-radius',
      theme.variables.button.borderRadius
    )

    root.style.setProperty(
      '--input-border-color',
      theme.variables.input.borderColor
    )
    root.style.setProperty(
      '--input-border-radius',
      theme.variables.input.borderRadius
    )
    root.style.setProperty(
      '--input-background-color',
      theme.variables.input.backgroundColor
    )
    root.style.setProperty(
      '--input-text-color',
      theme.variables.input.textColor
    )

    root.style.setProperty(
      '--error-text-color',
      theme.variables.error.textColor
    )

    // Apply Tailwind classes dynamically
    const applyTailwindClasses = (element: HTMLElement, classes: string) => {
      element.className = classes
    }

    // Apply container styles (you can extend this to other elements as well)
    const containerElements = document.querySelectorAll('.container-class')
    containerElements.forEach((element) => {
      applyTailwindClasses(
        element as HTMLElement,
        `${theme.tailwind.container.padding} ${theme.tailwind.container.baseBackground} ${theme.tailwind.container.baseTextColor} ${theme.tailwind.container.baseFontSize}`
      )
    })

    // Apply button styles
    const buttonElements = document.querySelectorAll('.button-class')
    buttonElements.forEach((element) => {
      applyTailwindClasses(
        element as HTMLElement,
        `${theme.tailwind.button.padding} ${theme.tailwind.button.baseBackground} ${theme.tailwind.button.baseTextColor} ${theme.tailwind.button.borderRadius}`
      )
    })

    // Apply input styles
    const inputElements = document.querySelectorAll('.input-class')
    inputElements.forEach((element) => {
      applyTailwindClasses(
        element as HTMLElement,
        `${theme.tailwind.input.baseBorder} ${theme.tailwind.input.basePadding} ${theme.tailwind.input.borderColor} ${theme.tailwind.input.borderRadius}`
      )
    })
  }

  watch(themeRef, apply, { immediate: true, deep: true })

  // Ensure the theme is applied on component mount
  onMounted(() => {
    apply()
  })
}
