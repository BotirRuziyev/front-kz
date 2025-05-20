<template>
  <div class="bio">
    <div class="main-container">
      <!-- Header -->
      <div class="bio__header">
        <nuxt-link to="/chat-settings/privacy" class="bio__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="bio__header-title">Bio</h1>
      </div>

      <!-- Visibility options block -->
      <div class="bio__visibility">
        <h2 class="bio__title">Who Can See My Bio</h2>

        <ul class="bio__options">
          <li
            v-for="option in options"
            :key="option"
            class="bio__option"
            :class="{ 'bio__option--active': selectedOption === option }"
            @click="selectedOption = option"
          >
            <span class="bio__checkmark"><CheckmarkIcon /></span>
            {{ option }}
          </li>
        </ul>

        <p class="bio__description">
          You can restrict who can see the bio on your profile with granular
          prescription
        </p>
      </div>

      <!-- Exceptions block -->
      <div class="bio__exceptions">
        <h3 class="bio__title">Exeptions</h3>

        <nuxt-link to="#" class="bio__exceptions-item">
          <span class="bio__exceptions-label">Never Share With</span>
          <button class="bio__exceptions-action">
            Add Users
            <span class="bio__exceptions-arrow">
              <ArrowIcon />
            </span>
          </button>
        </nuxt-link>
        <nuxt-link to="#" class="bio__exceptions-item">
          <span class="bio__exceptions-label">Always Share With</span>
          <button class="bio__exceptions-action">
            Add Users
            <span class="bio__exceptions-arrow">
              <ArrowIcon />
            </span>
          </button>
        </nuxt-link>

        <p class="bio__description">
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
export default class BioPage extends Vue {
  selectedOption: string = 'Everybody'

  options = ['Everybody', 'My contacts', 'Nobody']
}
</script>

<style lang="scss">
.bio {
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
    .bio__checkmark {
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
    .bio__checkmark {
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
