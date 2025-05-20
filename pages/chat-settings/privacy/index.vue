<template>
  <div class="privacy-settings">
    <div class="main-container">
      <!-- Header -->
      <div class="privacy-settings__header">
        <nuxt-link to="/chat-settings" class="privacy-settings__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="privacy-settings__header-title">Privacy</h1>
      </div>

      <!-- Pin code-->
      <div class="privacy-settings__account-security">
        <ul class="privacy-settings__account-security-list">
          <li>
            <nuxt-link
              to="/chat-settings/privacy/blocked-users"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <span
                  class="privacy-settings__account-security-icon privacy-settings__account-security-icon--private"
                >
                  <BlockedUsersIcon />
                </span>
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title"
                    >Blocked Users</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >1912</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/chat-settings/privacy/pin-code"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <span
                  class="privacy-settings__account-security-icon privacy-settings__account-security-icon--group"
                >
                  <PinCodeIcon />
                </span>
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title"
                    >Pin Code</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >On</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- privacys -->
      <div class="privacy-settings__account-security">
        <h3 class="privacy-settings__section-title">Privacy</h3>
        <ul class="privacy-settings__account-security-list">
          <li>
            <nuxt-link
              to="/chat-settings/privacy/last-seen"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title"
                    >Last Seen & Online</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >My contacts</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/chat-settings/privacy/bio"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title"
                    >Bio</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >Nobody (+14)</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/chat-settings/privacy/forwarded-messages"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title"
                    >Forwarded Messages</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >Everybody</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/chat-settings/privacy/messages"
              class="privacy-settings__account-security--item"
            >
              <div class="privacy-settings__account-security-left">
                <div class="privacy-settings__account-security-text">
                  <span class="privacy-settings__account-security-title">
                    Messages</span
                  >
                </div>
              </div>
              <div class="privacy-settings__account-security-right">
                <span class="privacy-settings__account-security-status"
                  >Nobody (+7)</span
                >
                <span class="privacy-settings__account-security-arrow"></span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import BlockedUsersIcon from '@/assets/svg/blocked-users.svg?inline'
// @ts-ignore
import PinCodeIcon from '@/assets/svg/pin-code.svg?inline'

@Component({
  components: {
    BackIcon,
    BlockedUsersIcon,
    PinCodeIcon,
  },
})
export default class PrivacySettingsPage extends Vue {}
</script>

<style lang="scss">
.privacy-settings {
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
  &__section-title {
    padding: 0 0 8px 4px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.02em;
    color: var(--primary-3);
  }
  &__account-security {
    margin-bottom: 32px;
  }
  &__account-security-list,
  &__in-app-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  &__account-security--item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 43px;
    gap: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 10px 12px 10px 14px;
    transition: 0.2s;
    &:hover {
      background: var(--secondary-13);
    }
  }
  &__account-security-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__account-security-icon {
    svg {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
    }
  }
  &__account-security-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 11px;
    color: rgba(255, 255, 255, 0.65);
  }
  &__account-security-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__account-security-status {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
  &__account-security-arrow {
    width: 7px;
    height: 13px;
    background: url('@/assets/svg/shape-icon.svg') no-repeat center/contain;
  }
  &__in-app-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 10px 12px 10px 14px;
  }
  &__in-app-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
  &__toggle {
    &-input {
      display: none;
    }
    &-slider {
      display: block;
      width: 40px;
      height: 25px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 41px;
      cursor: pointer;
      transition: 0.2s;
      &::after {
        content: '';
        display: inline-block;
        padding: 10.5px;
        border-radius: 50%;
        background: var(--primary-3);
        margin-left: 2px;
        margin-top: 2px;
        line-height: 0;
        transition: 0.2s;
      }
    }
    &-input:checked + .privacy-settings__toggle-slider {
      background-color: #00c853;
    }
    &-input:checked ~ .privacy-settings__toggle-slider::after {
      background: white;
      margin-left: 17px;
    }
  }
}
</style>
