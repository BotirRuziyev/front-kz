<template>
  <div class="new-folder">
    <div class="main-container">
      <!-- Header -->
      <div class="new-folder__header">
        <nuxt-link to="/chat-settings/folders" class="new-folder__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="new-folder__header-title">Chat Folders</h1>
      </div>

      <!-- Intro -->
      <div class="new-folder__intro">
        <div class="new-folder__intro-image">
          <img
            src="@/assets/png/create-file.png"
            alt="Chat folders illustration"
          />
        </div>
      </div>

      <!-- Folder Name -->
      <div class="new-folder__field">
        <div class="form-control">
          <input
            v-model="folderName"
            type="text"
            placeholder="Folder Name"
            class="new-folder__input"
          />
        </div>
      </div>

      <!-- Included Chats -->
      <div class="new-folder__section">
        <label class="new-folder__label">Included Chats</label>
        <nuxt-link
          to="/chat-settings/folders/new/include"
          class="new-folder__link"
        >
          <span><PlusIcon /></span> Add Chats
        </nuxt-link>
        <p class="new-folder__desc">
          Choose chats or types of chats that will appear in this folder
        </p>
      </div>

      <!-- Excluded Chats -->
      <div class="new-folder__section">
        <label class="new-folder__label">Excluded Chats</label>
        <nuxt-link
          to="/chat-settings/folders/new/exclude"
          class="new-folder__link"
        >
          <span><PlusIcon /></span> Add Chats to Exclude
        </nuxt-link>
        <p class="new-folder__desc">
          Choose chats or types of chats that will not appear in this folder
        </p>
      </div>

      <!-- Folder Color -->
      <div class="new-folder__field">
        <div class="new-folder__field-head">
          <label class="new-folder__label">Color</label>
          <span
            v-if="selectedColor !== null"
            class="folder-color__badge"
            :style="badgeStyle"
            >FRENCH</span
          >
        </div>
        <div class="new-folder__colors">
          <div
            v-for="color in colors"
            :key="color"
            :class="[
              'new-folder__color-circle',
              { selected: color === selectedColor },
            ]"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)"
          />
        </div>
        <p class="new-folder__desc">
          This color will be used for the folder’s tag in the chat list
        </p>
      </div>

      <!-- Create Button -->
      <div class="new-folder__button">
        <new-oracle-button
          :to="folderName.length != 0 ? '/chat-settings/folders' : ''"
          text="Create"
          :color="folderName.length != 0 ? 'yellow' : 'black'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import EmojiIcon from '@/assets/svg/emoji.svg?inline'
// @ts-ignore
import PlusIcon from '@/assets/svg/plus.svg?inline'

@Component({
  components: {
    BackIcon,
    EmojiIcon,
    PlusIcon,
  },
})
export default class CreateFolderPage extends Vue {
  folderName: string = ''
  selectedColor: string | null = null

  colors: string[] = [
    '#fff',
    '#3faa20',
    '#d57624',
    '#cc5048',
    '#955ddc',
    '#309dba',
    '#c7508a',
    '#74899a',
  ]

  get isCreateActive(): boolean {
    return this.folderName.trim().length > 0 || this.selectedColor !== null
  }

  selectColor(color: string) {
    this.selectedColor = color
  }

  get badgeStyle() {
    if (!this.selectedColor) return {}
    return {
      backgroundColor: this.hexToRgba(this.selectedColor, 0.2),
      color: this.selectedColor,
    }
  }

  hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
}
</script>

<style lang="scss">
.new-folder {
  padding-bottom: 72px;
  &__label {
    display: block;
    margin-bottom: 8px;
    margin-left: 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    margin-bottom: 24px;
    position: relative;
    &-back {
      width: 22px;
      height: 22px;
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
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      color: #fff;
    }
  }
  &__intro {
    margin-bottom: 24px;
    &-image {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      img {
        width: 125px;
        height: 125px;
      }
    }
  }
  &__field {
    margin-bottom: 16px;
    .form-control {
      background: var(--secondary-1);
      border-radius: 8px;
    }
  }
  &__input {
    width: 100%;
    height: 44px;
    background: transparent;
    border: 0;
    padding: 13px 0 13px 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
    }
    &:focus {
      outline: none;
    }
  }
  &__section {
    margin-bottom: 16px;
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    background: #14131b;
    border-radius: 12px;
    padding: 12px 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #f64e2a;
    svg {
      rect {
        fill: var(--primary-2);
      }
    }
  }
  &__desc {
    padding: 0 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    color: #7873b4;
  }
  &__field-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .new-folder__label {
      margin-bottom: 0;
    }
    .folder-color__badge {
      border-radius: 8px;
      padding: 6px 8px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 10px;
      transition: 0.2s;
    }
  }
  &__colors {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 0 8px;
    margin-bottom: 8px;
    .new-folder__color-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      &.selected {
        &::after {
          opacity: 1;
        }
      }

      &::after {
        content: '';
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid var(--secondary-1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: 0.2s;
      }
    }
  }
  &__button {
    width: 100%;
    background: #14131b;
    border-top: 1px solid #2b2741;
    padding: 12px 16px 24px 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    .new-oracle-button {
      max-width: 345px;
      margin: 0 auto;
      border-radius: 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
      &.black {
        border: 2px solid #2b2741;
        background: #13121b;
        cursor: no-drop;
        &:hover {
          box-shadow: none;
        }
      }
      &.yellow {
        color: #fff;
      }
    }
  }
}
</style>
