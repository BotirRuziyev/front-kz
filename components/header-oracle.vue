<template>
  <header class="header">
    <div class="header-left">
      <UserIcon class="header-left-icon" />
      <div>
        <div class="header-left-username">@Username</div>
        <div class="header-left-score">Score: <span>123</span></div>
      </div>
    </div>
    <div class="header-right">
      <div class="header-right-bell">
        <BellIcon />
        <div class="header-right-bell-count">2</div>
      </div>

      <button class="settings-btn">
        <SettingsIcon />
      </button>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import BellIcon from '@/assets/svg/bell.svg?inline'
// @ts-ignore
import UserIcon from '@/assets/svg/user.svg?inline'
// @ts-ignore
import SettingsIcon from '@/assets/svg/settings-icon.svg?inline'

@Component({
  components: {
    BellIcon,
    UserIcon,
    SettingsIcon,
  },
})
export default class HeaderOracle extends Vue {}
</script>
<style lang="scss">
.header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  padding: 24px 16px 10px;
  background: #000;

  &-left,
  &-right {
    display: flex;
    align-items: center;
  }

  &-left {
    &-icon {
      margin-right: 8px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    &-username {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      color: #fff;
    }

    &-score {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
      color: #fff;
      span {
        color: #ffb200;
      }
    }
  }

  &-right {
    display: flex;
    align-items: center;
    gap: 12px;
    &-bell {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: not-allowed;
      background: #181720;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        height: 18px;
        width: 18px;
      }

      &-count {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -2px;
        right: -2px;
        width: 14px;
        height: 14px;
        background: #f64e2a;
        border-radius: 100px;
        font-family: 'Gotham', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;
        color: #ffffff;
      }
    }
    .settings-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
