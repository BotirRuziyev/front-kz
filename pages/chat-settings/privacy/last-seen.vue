<template>
  <div class="last-seen">
    <div class="main-container">
      <!-- Header -->
      <div class="last-seen__header">
        <nuxt-link to="/chat-settings/privacy/" class="last-seen__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="last-seen__header-title">Privacy</h1>
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
            {{ option }}
            <span class="last-seen__checkmark"><CheckmarkIcon /></span>
          </li>
        </ul>

        <p class="last-seen__description">
          Unless you are a Premium user, you won't see Last Seen or Online
          statuses for people with whom you don't share yours. Approximate times
          will be shown instead (recently, within a week, within a month)
        </p>
      </div>

      <!-- Exceptions block -->
      <div class="last-seen__exceptions">
        <h3 class="last-seen__title">Exeptions</h3>

        <nuxt-link
          to="/chat-settings/privacy/add-users"
          class="last-seen__exceptions-item"
        >
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
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import CheckmarkIcon from '@/assets/svg/check-icon.svg?inline'
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
    padding: 10px 0;
    gap: 4px;
    margin-bottom: 24px;
    position: relative;
    &-back {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path {
          stroke: #fff;
        }
      }
    }
    &-title {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      text-align: center;
      color: #fff;
    }
  }
  &__title {
    padding: 0 8px 8px 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7873b4;
  }
  &__visibility {
    margin-bottom: 24px;
  }
  &__options {
    border-radius: 12px;
    background: #14131b;
    margin-bottom: 8px;
  }
  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 16px;
    min-height: 44px;
    position: relative;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    &:last-child {
      &::after {
        display: none;
      }
    }
    &::after {
      content: '';
      width: calc(100% - 12px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &__checkmark {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #60578e;
    border-radius: 50%;
    svg {
      opacity: 0;
    }
  }
  &__option--active {
    .last-seen__checkmark {
      background: #f64e2a;
      border-color: #f64e2a;
      svg {
        opacity: 1;
      }
    }
  }
  &__exceptions {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      gap: 8px;
      margin-bottom: 8px;
      background: #14131b;
      border-radius: 12px;
      padding: 0 16px;
      transition: 0.2s;
      &:hover {
        background: #2b2741;
      }
    }
    &-label {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-action {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #8780cf;
    }
  }
}
</style>
