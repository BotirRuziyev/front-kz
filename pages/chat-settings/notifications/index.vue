<template>
  <div class="notification-settings">
    <div class="main-container">
      <!-- Header -->
      <div class="notification-settings__header">
        <nuxt-link
          to="/chat-settings"
          class="notification-settings__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="notification-settings__header-title">
          Notifications and Sounds
        </h1>
      </div>

      <!-- Message Notifications -->
      <div class="notification-settings__message-section">
        <h3 class="notification-settings__section-title">
          Message Notifications
        </h3>

        <ul class="notification-settings__message-list">
          <li>
            <nuxt-link to="" class="notification-settings__message-item">
              <div class="notification-settings__message-left">
                <span
                  class="notification-settings__message-icon notification-settings__message-icon--private"
                >
                  <PrivateIcon />
                </span>
                <div class="notification-settings__message-text">
                  <span class="notification-settings__message-title"
                    >Private Chats</span
                  >
                  <span class="notification-settings__message-subtext"
                    >2 exceptions</span
                  >
                </div>
              </div>
              <div class="notification-settings__message-right">
                <span class="notification-settings__message-status">Off</span>
                <span class="notification-settings__message-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/chat-settings/notifications/groups"
              class="notification-settings__message-item"
            >
              <div class="notification-settings__message-left">
                <span
                  class="notification-settings__message-icon notification-settings__message-icon--group"
                >
                  <ChatsGroupIcon />
                </span>
                <div class="notification-settings__message-text">
                  <span class="notification-settings__message-title"
                    >Group Chats</span
                  >
                  <span class="notification-settings__message-subtext"
                    >376 exceptions</span
                  >
                </div>
              </div>
              <div class="notification-settings__message-right">
                <span class="notification-settings__message-status">On</span>
                <span class="notification-settings__message-arrow"></span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="" class="notification-settings__message-item">
              <div class="notification-settings__message-left">
                <span
                  class="notification-settings__message-icon notification-settings__message-icon--channel"
                >
                  <ChannelsIcon />
                </span>
                <div class="notification-settings__message-text">
                  <span class="notification-settings__message-title"
                    >Channels</span
                  >
                  <span class="notification-settings__message-subtext"
                    >7 exceptions</span
                  >
                </div>
              </div>
              <div class="notification-settings__message-right">
                <span class="notification-settings__message-status">On</span>
                <span class="notification-settings__message-arrow"></span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- In-App Notifications -->
      <div class="notification-settings__in-app-section">
        <h3 class="notification-settings__section-title">
          In-App Notifications
        </h3>

        <ul class="notification-settings__in-app-list">
          <li class="notification-settings__in-app-item">
            <span class="notification-settings__in-app-label"
              >In-App Sounds</span
            >
            <label class="notification-settings__toggle">
              <input
                type="checkbox"
                class="notification-settings__toggle-input"
              />
              <span class="notification-settings__toggle-slider"></span>
            </label>
          </li>
          <li class="notification-settings__in-app-item">
            <span class="notification-settings__in-app-label"
              >In-App Vibrate</span
            >
            <label class="notification-settings__toggle">
              <input
                type="checkbox"
                class="notification-settings__toggle-input"
              />
              <span class="notification-settings__toggle-slider"></span>
            </label>
          </li>
          <li class="notification-settings__in-app-item">
            <span class="notification-settings__in-app-label"
              >In-App Preview</span
            >
            <label class="notification-settings__toggle">
              <input
                type="checkbox"
                class="notification-settings__toggle-input"
              />
              <span class="notification-settings__toggle-slider"></span>
            </label>
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
import PrivateIcon from '@/assets/svg/privacy-icon.svg?inline'
// @ts-ignore
import ChatsGroupIcon from '@/assets/svg/groups.svg?inline'
// @ts-ignore
import ChannelsIcon from '@/assets/svg/channels.svg?inline'

@Component({
  components: {
    BackIcon,
    PrivateIcon,
    ChatsGroupIcon,
    ChannelsIcon,
  },
})
export default class NotificationSettingsPage extends Vue {}
</script>

<style lang="scss">
.notification-settings {
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
  &__message-section {
    margin-bottom: 32px;
  }
  &__message-list,
  &__in-app-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  &__message-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 10px 12px 10px 14px;
    transition: 0.2s;
    &:hover {
      background: var(--secondary-13);
    }
  }
  &__message-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__message-icon {
    svg {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
    }
  }
  &__message-text {
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
  &__message-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__message-status {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
  &__message-arrow {
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
    &-input:checked + .notification-settings__toggle-slider {
      background-color: #00c853;
    }
    &-input:checked ~ .notification-settings__toggle-slider::after {
      background: white;
      margin-left: 17px;
    }
  }
}
</style>
