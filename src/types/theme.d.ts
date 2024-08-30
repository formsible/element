export interface ThemeData {
  tailwind: {
    container: {
      padding: string
      baseBackground: string
      baseTextColor: string
      baseFontSize: string
    }
    button: {
      padding: string
      baseBackground: string
      baseTextColor: string
      borderRadius: string
    }
    input: {
      baseBorder: string
      basePadding: string
      borderColor: string
      borderRadius: string
    }
  }
  variables: {
    container: {
      backgroundColor: string
      textColor: string
      fontSize: string
    }
    button: {
      backgroundColor: string
      textColor: string
      borderRadius: string
    }
    input: {
      borderColor: string
      borderRadius: string
      backgroundColor: string
      textColor: string
    }
    error: {
      textColor: string
    }
  }
  values: {
    container: {
      backgroundColor: string
      textColor: string
      fontSize: string
    }
    button: {
      backgroundColor: string
      textColor: string
      borderRadius: string
    }
    input: {
      borderColor: string
      borderRadius: string
    }
  }
}
