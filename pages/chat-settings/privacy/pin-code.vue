<template>
  <div class="chat-pin__code">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-pin__code-header">
        <nuxt-link
          to="/chat-setttings/privacy"
          class="chat-pin__code-header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="chat-pin__code-header-title">Pin Code</h1>
      </div>

      <!-- Main content block -->
      <div v-if="!useCustomCode" class="chat-pin__code-body">
        <!-- Illustration image -->
        <div class="chat-pin__code-body--image">
          <img
            src="@/assets/png/pin-code.png"
            alt="Pin Code Lock Illustration"
          />
        </div>

        <!-- Title -->
        <h2 class="chat-pin__code-body--title">Pin code lock</h2>

        <!-- Description -->
        <p class="chat-pin__code-body--description">
          When a pin code is set, a lock icon appears above your chat list. Tap
          it to lock your app
        </p>

        <!-- Action button -->
        <new-oracle-button text="Turn Pin Code On" color="yellow" />
        <!-- Informational hint -->
        <p class="chat-pin__code-body--hint">
          If you forget your pin code, you'll need to log out or reinstall the
          app
        </p>
      </div>
      <div v-if="useCustomCode" class="pin-step--enter">
        <div class="pin-step">
          <!-- Title -->
          <p class="chat-pin__code-enter--title">Enter a pin code</p>

          <!-- Dots (PIN input preview) -->
          <input
            v-if="alphaNumeric"
            id="dots-input"
            v-model="pin"
            type="text"
            class="form-input"
            @input="onInput('number', $event)"
            @keypress="allowDecimalNumbers"
            @paste="blockInvalidDecimalPaste"
          />
          <div v-if="alphaNumeric" class="chat-pin__code-enter--dots">
            <label
              v-for="dot in 6"
              :key="dot"
              for="dots-input"
              class="chat-pin__code-enter--dot"
              :class="{ active: pin.length >= dot }"
            ></label>
          </div>
          <div v-if="!alphaNumeric" class="form-control">
            <input
              v-model="confirmPin"
              type="text"
              class="form-pin__input"
              @input="onInput('text', $event)"
            />
          </div>
        </div>
        <!-- Options button -->
        <button class="chat-pin__code-enter--options" @click="isModal = true">
          Pin code options
        </button>
      </div>

      <div
        v-if="useCustomCode"
        class="chat-pin__modal"
        :class="{ show: isModal }"
      >
        <div class="chat-pin__modal-backdrop"></div>

        <div class="chat-pin__modal-content">
          <!-- 4-digit button -->
          <button
            class="chat-pin__modal-button chat-pin__modal-button--primary"
            @click=";(alphaNumeric = false), (isModal = false)"
          >
            4-Digit Numeric Code
          </button>

          <!-- Alphanumeric button -->
          <button
            class="chat-pin__modal-button chat-pin__modal-button--secondary"
            @click=";(alphaNumeric = true), (isModal = false)"
          >
            Custom Alphanumeric Code
          </button>

          <!-- Cancel button -->
          <button
            class="chat-pin__modal-button chat-pin__modal-button--cancel"
            @click="isModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'

@Component({
  components: {
    BackIcon,
  },
})
export default class PinCodePage extends Vue {
  alphaNumeric = true
  isModal = false
  pin: string = ''
  confirmPin: string = ''
  useCustomCode: boolean = true

  onInput(type: String, event: Event) {
    const input = event.target as HTMLInputElement
    if (type === 'Number' && input.value.length > 6) {
      input.value = input.value.slice(0, 6)
      this.pin = input.value
    } else if (type === 'text' && input.value.length > 4) {
      input.value = input.value.slice(0, 4)
      this.confirmPin = input.value
    }
  }

  allowDecimalNumbers(event: KeyboardEvent): void {
    const key = event.key
    const isNumber = /^\d$/.test(key)
    const isDot = key === '.' || key === ','

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const alreadyHasDot =
      currentValue.includes('.') || currentValue.includes(',')
    if (!isNumber && isDot && !alreadyHasDot && this.pin.length < 6) {
      event.preventDefault()
    }
  }

  blockInvalidDecimalPaste(event: ClipboardEvent): void {
    event.preventDefault()
    let pasted = event.clipboardData?.getData('text') || ''

    pasted = pasted.replace(/,/g, '.')

    pasted = pasted.replace(/[^\d.]/g, '')

    const firstDotIndex = pasted.indexOf('.')
    if (firstDotIndex !== -1) {
      const beforeDot = pasted.slice(0, firstDotIndex + 1)
      const afterDot = pasted.slice(firstDotIndex + 1).replace(/\./g, '')
      pasted = beforeDot + afterDot
    }

    const target = event.target as HTMLInputElement
    const currentValue = target.value
    const selectionStart = target.selectionStart || 0
    const selectionEnd = target.selectionEnd || 0

    const newValue =
      currentValue.slice(0, selectionStart) +
      pasted +
      currentValue.slice(selectionEnd)

    target.value = newValue
  }
}
</script>

<style lang="scss">
.chat-pin__code {
  padding-bottom: 32px;
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 56px);
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    margin-bottom: 24px;
    &-back {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-title {
      width: 100%;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 0.02em;
      text-align: left;
      color: var(--primary-3);
    }
    &-btn {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-2);
      transition: 0.2s;
      &:hover {
        color: var(--oranzhevyy750);
      }
    }
  }
  &-body {
    flex: 1 1 calc(100% - 22px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &--image {
      margin-bottom: 32px;
    }
    &--title {
      margin-bottom: 8px;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      text-align: center;
      color: rgba(255, 255, 255, 0.65);
    }
    &--description {
      margin-bottom: 40px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      text-align: center;
      color: rgba(255, 255, 255, 0.65);
    }
    .new-oracle-button {
      margin-bottom: 8px;
      padding: 13px;
      box-shadow: 0 0 10px 2px rgba(246, 78, 42, 0.25);
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-3);
    }
    &--hint {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      text-align: center;
      color: rgba(255, 255, 255, 0.65);
    }
  }
  &-enter--title {
    margin-bottom: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.02em;
    text-align: center;
    color: var(--primary-3);
  }
  .pin-step--enter {
    flex: 1 1 calc(100% - 22px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .form-input {
      height: 0;
      border: 0;
      opacity: 0;
    }
  }
  .pin-step {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 100%;
  }
  &-enter--dots {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &-enter--dot {
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    transition: 0.2s;
    &.active {
      border-color: var(--primary-2);
    }
  }
  &-enter--options {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    text-align: center;
    color: var(--primary-2);
  }
  .form-control {
    width: calc(100% + 24px);
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 12px;
    .form-pin__input {
      width: 100%;
      height: 48px;
      background: #181720;
      border: 1px solid var(--primary-2);
      border-radius: 16px;
      padding: 0 16px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      color: rgba(255, 255, 255, 1);
      &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 120%;
        color: rgba(255, 255, 255, 0.65);
      }
      &:focus {
        outline: none;
      }
    }
  }

  .chat-pin__modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    visibility: hidden;
    &.show {
      visibility: visible;
      .chat-pin__modal-backdrop {
        opacity: 1;
      }
    }
    &-backdrop {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      filter: blur(6.400000095367432px);
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
    }
    &-content {
      max-width: 375px;
      padding: 0 12px 16px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: end;
      position: relative;
      z-index: 2;
    }
    &-button {
      background: var(--secondary-1);
      border-radius: 8px;
      padding: 16px 0px;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-2);
      transition: 0.2s;
      &:hover {
        background: var(--primary-1);
      }
    }
    &-button--primary {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px 8px 0 0;
    }
    &-button--secondary {
      border-radius: 0 0 8px 8px;
      margin-bottom: 15px;
    }
  }
}
</style>
