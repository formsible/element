<script setup lang="ts">
import { defineProps, ref, onMounted, watch } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
})

const paypalScriptLoaded = ref(false)

const loadPaypalScript = () => {
  if (!paypalScriptLoaded.value) {
    const script = document.createElement('script')
    script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID'
    script.async = true
    script.onload = () => {
      paypalScriptLoaded.value = true
      renderPayPalButton()
    }
    document.body.appendChild(script)
  } else {
    renderPayPalButton()
  }
}

const renderPayPalButton = () => {
  if (paypalScriptLoaded.value && (window as any).paypal) {
    ;(window as any).paypal
      .Buttons({
        createOrder: function (data: any, actions: any) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: props.currency,
                  value: props.amount.toFixed(2),
                },
              },
            ],
          })
        },
        onApprove: function (data: any, actions: any) {
          return actions.order.capture().then(function (details: any) {
            console.log(details)
          })
        },
        onError: function (err: any) {
          console.error(err)
        },
      })
      .render('#paypal-button-container')
  }
}

onMounted(() => {
  loadPaypalScript()
})

watch(
  () => [props.amount, props.currency],
  () => {
    renderPayPalButton()
  }
)
</script>

<template>
  <div id="paypal-button-container" class="paypal-button-container"/>
</template>

<style scoped>
.paypal-button-container {
  /* Style your PayPal button container if needed */
}
</style>
