<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  onMounted,
  type PropType,
  watch,
} from 'vue'

const emit = defineEmits(['onVerify'])

defineProps({
  input: {
    type: Object as PropType<{ key: string }>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: 'flex flex-col gap-2',
      label: 'w-full text-lg font-semibold text-gray-900 dark:text-gray-100',
      description: 'text-sm text-gray-700 dark:text-gray-300',
      error: 'text-red-600 dark:text-red-400',
      recaptchaContainer: 'relative w-full h-auto',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const recaptchaLoaded = ref(false)

const onVerify = (response: string) => {
  emit('onVerify', response)
}

onMounted(() => {
  const loadReCaptcha = () => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit`
    script.async = true
    script.defer = true
    script.onload = () => {
      recaptchaLoaded.value = true
      // ;(window as any).grecaptcha?.render('recaptcha-container', {
      //   sitekey: 'YOUR_RECAPTCHA_SITE_KEY',
      //   callback: onVerify,
      // })
    }
    document.head.appendChild(script)
  }

  if (!(window as any).grecaptcha) {
    loadReCaptcha()
  } else {
    recaptchaLoaded.value = true
  }
})

watch(recaptchaLoaded, (loaded) => {
  if (loaded) {
    // ;(window as any).grecaptcha?.render('recaptcha-container', {
    //   sitekey: 'YOUR_RECAPTCHA_SITE_KEY',
    //   callback: onVerify,
    // })
  }
})
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label" :for="input.key"> CAPTCHA Verification </label>
    <div :class="theme.description">Please verify that you are a human.</div>
    <div id="recaptcha-container"/>
    <!-- Display error message if any -->
    <small v-if="error" :class="theme.error">{{ error }}</small>
  </div>
</template>
