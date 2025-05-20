<template>
  <div class="message-permissions">
    <div class="main-container">
      <!-- Header -->
      <div class="message-permissions__header">
        <nuxt-link
          to="/chat-settings/privacy"
          class="message-permissions__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="message-permissions__header-title">Messages</h1>
      </div>

      <!-- Visibility options block -->
      <div class="message-permissions__visibility">
        <h2 class="message-permissions__title">Who Can Send Me Messages</h2>

        <ul class="message-permissions__options">
          <li
            v-for="option in options"
            :key="option"
            class="message-permissions__option"
            :class="{
              'message-permissions__option--active': selectedOption === option,
            }"
            @click="selectedOption = option"
          >
            <span class="message-permissions__checkmark"
              ><CheckmarkIcon
            /></span>
            {{ option }}
          </li>
        </ul>

        <p class="message-permissions__description">
          You can restrict messages from users who are not in your contacts and
          don’t have Premium
        </p>
      </div>

      <div class="premium-wrapper">
        <nuxt-link to="" class="link--highlighted">
          What is Premium?
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import CheckmarkIcon from '@/assets/svg/checkbox.svg?inline'
// @ts-ignore
import ArrowIcon from '@/assets/svg/shape-icon.svg?inline'

@Component({
  components: {
    BackIcon,
    CheckmarkIcon,
    ArrowIcon,
  },
})
export default class MessagesPage extends Vue {
  selectedOption: string = 'Everybody'

  options = ['Everybody', 'My contacts and Premium Users']
}
</script>

<style lang="scss">
.message-permissions {
  padding-bottom: 32px;
  &__header {
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
  &__title {
    padding: 0 0 8px 4px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.02em;
    color: var(--primary-3);
  }
  &__description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
  &__visibility {
    margin-bottom: 24px;
  }
  &__options {
    border-radius: 8px;
    background: var(--secondary-1);
    margin-bottom: 8px;
  }
  &__option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 10px 14px 36px;
    position: relative;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: var(--primary-3);
    .message-permissions__checkmark {
      opacity: 0;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
    &::after {
      content: '';
      width: calc(100% - 60px);
      height: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &__checkmark {
    opacity: 0;
    svg {
      width: 16px;
      height: 14px;
    }
  }
  &__option--active {
    .message-permissions__checkmark {
      opacity: 1;
    }
  }
  .premium-wrapper {
    .link--highlighted {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      color: var(--primary-2);
    }
  }
}
</style>
