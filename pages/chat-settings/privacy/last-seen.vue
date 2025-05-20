<template>
  <div class="last-seen">
    <div class="main-container">
      <!-- Header -->
      <div class="last-seen__header">
        <nuxt-link to="/chat-settings/privacy/" class="last-seen__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="last-seen__header-title">Last Seen & Online</h1>
      </div>

      <!-- Visibility options block -->
      <div class="last-seen__visibility">
        <h2 class="last-seen__title">Who Can See My Last Seen</h2>

        <ul class="last-seen__options">
          <li
            v-for="option in options"
            :key="option"
            class="last-seen__option"
            :class="{ 'last-seen__option--active': selectedOption === option }"
            @click="selectedOption = option"
          >
            <span class="last-seen__checkmark"><CheckmarkIcon /></span>
            {{ option }}
          </li>
        </ul>

        <p class="last-seen__description">
          Unless you are a Premium user, you won't see <br />
          Last Seen or Online statuses for people<br />
          with whom you don't share yours.<br />
          Approximate times will be shown instead <br />
          (recently, within a week, within a month)
        </p>
      </div>

      <!-- Exceptions block -->
      <div class="last-seen__exceptions">
        <h3 class="last-seen__title">Exeptions</h3>

        <nuxt-link to="#" class="last-seen__exceptions-item">
          <span class="last-seen__exceptions-label">Never Share With</span>
          <button class="last-seen__exceptions-action">
            Add Users
            <span class="last-seen__exceptions-arrow">
              <ArrowIcon />
            </span>
          </button>
        </nuxt-link>

        <p class="last-seen__description">
          You can add users or entire groups as exceptions that will override
          the settings above
        </p>
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
export default class LastSeenPage extends Vue {
  selectedOption: string = 'Everybody'

  options = ['Everybody', 'My contacts', 'Nobody']
}
</script>

<style lang="scss">
.last-seen {
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
    margin-bottom: 32px;
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
    .last-seen__checkmark {
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
    .last-seen__checkmark {
      opacity: 1;
    }
  }
  &__exceptions {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 43px;
      gap: 8px;
      margin-bottom: 8px;
      background: var(--secondary-1);
      border-radius: 8px;
      padding: 10px 12px 10px 14px;
      transition: 0.2s;
      &:hover {
        background: var(--secondary-13);
      }
    }
    &-label {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      color: rgba(255, 255, 255, 0.65);
    }
    &-action {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      color: rgba(255, 255, 255, 0.65);
    }
  }
}
</style>
