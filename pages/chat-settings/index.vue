<template>
  <div class="chat-settings__main">
    <div class="main-container">
      <div class="settings-header">
        <button class="qr-code__btn">
          <QrCodeIcon />
        </button>
        <button class="edit-btn">Edit</button>
      </div>
      <div class="user-profile-card">
        <div class="profile-img">
          <img
            :src="require('@/assets/svg/avatar.svg')"
            alt="User avatar"
            class="profile-avatar"
          />
        </div>
        <div class="profile-name">
          <span>Julia Work</span>
          <span class="logo">
            <img src="@/assets/svg/cat-emoji.svg" alt="" />
          </span>
        </div>
        <div class="profile-meta">
          <p class="profile-id">ID: 90124812</p>
          <p class="circle"></p>
          <p class="profile-nikname">User123User</p>
        </div>
      </div>
      <div class="settings-menu">
        <nuxt-link to="" class="settings-menu__item">
          <div class="settings-menu__icon settings-menu__icon--emoji">
            <PencilIcon />
          </div>
          <div class="settings-menu__label">Change Emoji Status</div>
          <div class="settings-menu__arrow"></div>
        </nuxt-link>
        <div class="settings-menu__section">
          <nuxt-link to="" class="settings-menu__item">
            <div class="settings-menu__icon settings-menu__icon--saved">
              <SavedIcon />
            </div>
            <div class="settings-menu__label">Saved Messages</div>
            <div class="settings-menu__value">3</div>
            <div class="settings-menu__arrow"></div>
          </nuxt-link>

          <nuxt-link to="" class="settings-menu__item">
            <div class="settings-menu__icon settings-menu__icon--catalogue">
              <NotebookIcon />
            </div>
            <div class="settings-menu__label">Catalogue</div>
            <div class="settings-menu__arrow"></div>
          </nuxt-link>

          <nuxt-link to="/chat-settings/folders" class="settings-menu__item">
            <div class="settings-menu__icon settings-menu__icon--folders">
              <FoldersIcon />
            </div>
            <div class="settings-menu__label">Chat Folders</div>
            <div class="settings-menu__arrow"></div>
          </nuxt-link>
        </div>

        <div class="settings-menu__section">
          <nuxt-link
            to="/chat-settings/notifications"
            class="settings-menu__item"
          >
            <div class="settings-menu__icon settings-menu__icon--notifications">
              <NotificationsIcon />
            </div>
            <div class="settings-menu__label">Notifications and Sounds</div>
            <div class="settings-menu__arrow"></div>
          </nuxt-link>

          <nuxt-link to="/chat-settings/language" class="settings-menu__item">
            <div class="settings-menu__icon settings-menu__icon--language">
              <LangIcon />
            </div>
            <div class="settings-menu__label">Language</div>
            <div class="settings-menu__value">English</div>
            <div class="settings-menu__arrow"></div>
          </nuxt-link>
        </div>

        <nuxt-link
          to="/chat-settings/premium"
          class="settings-menu__item settings-menu__item--premium"
        >
          <div class="settings-menu__icon settings-menu__icon--premium">
            <PremiumIcon />
          </div>
          <div class="settings-menu__label">Premium</div>
          <div class="settings-menu__value">Get</div>
          <div class="settings-menu__arrow"></div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// @ts-ignore
import QrCodeIcon from '@/assets/svg/qr-code-icon.svg?inline'
// @ts-ignore
import PencilIcon from '@/assets/svg/pencil-icon.svg?inline'
// @ts-ignore
import SavedIcon from '@/assets/svg/save-icon.svg?inline'
// @ts-ignore
import NotebookIcon from '@/assets/svg/notebook.svg?inline'
// @ts-ignore
import FoldersIcon from '@/assets/svg/chat-folder-icon.svg?inline'
// @ts-ignore
import NotificationsIcon from '@/assets/svg/notifications-icon.svg?inline'
// @ts-ignore
import PrivacyIcon from '@/assets/svg/privacy-icon.svg?inline'
// @ts-ignore
import LangIcon from '@/assets/svg/lang-icon.svg?inline'
// @ts-ignore
import PremiumIcon from '@/assets/svg/premium-icon.svg?inline'

@Component({
  components: {
    QrCodeIcon,
    PencilIcon,
    SavedIcon,
    NotebookIcon,
    FoldersIcon,
    NotificationsIcon,
    PrivacyIcon,
    LangIcon,
    PremiumIcon,
  },
})
export default class ChatSettinsPage extends Vue {}
</script>

<style lang="scss">
.chat-settings__main {
  .settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    margin-bottom: 8px;
    .edit-btn {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-2);
    }
  }
  .user-profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
    .profile-img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 8px;
      .profile-avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .profile-name {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      text-align: center;
      color: #fff;
      .logo {
        line-height: 0;
      }
    }
    .profile-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 17px;
      .profile-id,
      .profile-nikname {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        text-align: center;
        color: #8780cf;
      }
      .circle {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #8780cf;
      }
    }
  }
  .settings-menu {
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__section {
      display: flex;
      flex-direction: column;
      .settings-menu__item {
        position: relative;
        border-radius: 0;
        &:first-child {
          border-radius: 12px 12px 0 0;
        }
        &:last-child {
          border-radius: 0 0 12px 12px;
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
          right: 0;
          bottom: 0;
        }
      }
    }
    &__item {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: #14131b;
      border-radius: 12px;
      padding: 0 16px;
      transition: 0.2s;
      &:hover {
        background: var(--secondary-7);
      }
    }
    &__label {
      width: 100%;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &__value {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #8780cf;
    }
    &__arrow {
      width: 7px;
      height: 12px;
      min-width: 7px;
      background: url('@/assets/svg/shape-icon.svg') no-repeat center/contain;
    }
  }
}
</style>
