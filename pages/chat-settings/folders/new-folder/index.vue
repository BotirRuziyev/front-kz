<template>
  <div class="new-folder">
    <div class="main-container">
      <!-- Header -->
      <div class="new-folder__header">
        <nuxt-link to="/chat-settings/folders" class="new-folder__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="new-folder__header-title">New Folder</h1>
        <nuxt-link
          :to="isCreateActive ? '/chat-settings/folders' : ''"
          class="new-folder__header-btn new-folder__header-btn--create"
          :class="{ active: isCreateActive }"
        >
          Create
        </nuxt-link>
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
        <label class="new-folder__label">Folder Name</label>
        <div class="form-control">
          <input
            v-model="folderName"
            type="text"
            placeholder="Folder Name"
            class="new-folder__input"
          />
          <button class="emoji-btn">
            <EmojiIcon class="emoji" />
          </button>
        </div>
      </div>

      <!-- Included Chats -->
      <div class="new-folder__section">
        <label class="new-folder__label">Included Chats</label>
        <nuxt-link
          to="/chat-settings/folders/new-folder/include"
          class="new-folder__link"
        >
          <span><PlusIcon /></span> Add Chats
        </nuxt-link>
        <p class="new-folder__desc">
          Choose chats or types of chats that will appear <br />
          in this folder
        </p>
      </div>

      <!-- Excluded Chats -->
      <div class="new-folder__section">
        <label class="new-folder__label">Excluded Chats</label>
        <nuxt-link
          to="/chat-settings/folders/new-folder/exclude"
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
          <label class="new-folder__label">Folder Color</label>
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
          This color will be used for the folder’s tag <br />
          in the chat list
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
  &__label {
    display: block;
    margin-bottom: 8px;
    margin-left: 4px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.02em;
    color: var(--primary-3);
  }
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
      color: rgba(255, 255, 255, 0.65);
      cursor: not-allowed;
      transition: 0.2s;
      &.active {
        cursor: pointer;
        color: var(--primary-2);
      }
    }
  }
  &__intro {
    margin-bottom: 32px;
    &-image {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
  }
  &__field {
    margin-bottom: 32px;
    .form-control {
      display: flex;
      align-items: center;
      gap: 20px;
      background: var(--secondary-1);
      border-radius: 8px;
      padding: 0 9px 0 0;
    }
  }
  &__input {
    width: 100%;
    height: 42px;
    background: transparent;
    border: 0;
    padding: 13px 0 13px 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 1);
    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      color: rgba(255, 255, 255, 0.65);
    }
    &:focus {
      outline: none;
    }
  }
  &__section {
    margin-bottom: 32px;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 16px 9px 16px 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: var(--primary-2);
    svg {
      rect {
        fill: var(--primary-2);
      }
    }
  }
  &__desc {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
  &__field-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
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
    border-radius: 8px;
    background: var(--secondary-1);
    padding: 5px;
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
}
</style>
