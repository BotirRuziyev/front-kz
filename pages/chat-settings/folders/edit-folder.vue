<template>
  <div class="edit-folder">
    <div class="main-container">
      <!-- Header -->
      <div class="edit-folder__header">
        <nuxt-link to="/chat-settings" class="edit-folder__header-cancel"
          >Cancel</nuxt-link
        >
        <h2 class="edit-folder__header-title">Edit folder</h2>
        <nuxt-link to="/chat-settings" class="edit-folder__header-done"
          >Done</nuxt-link
        >
      </div>

      <!-- Folder Name -->
      <div class="edit-folder__field">
        <label class="edit-folder__label">Folder Name</label>
        <div class="form-control">
          <input
            v-model="folderName"
            type="text"
            placeholder="Folder Name"
            class="edit-folder__input"
          />
          <button class="emoji-btn">
            <EmojiIcon class="emoji" />
          </button>
        </div>
      </div>

      <!-- Included Chats -->
      <div class="edit-folder__section">
        <label class="edit-folder__label">Included Chats</label>
        <div class="edit-folder__chat-block">
          <nuxt-link
            to="/chat-settings/folders/edit-folder/include"
            class="edit-folder__link"
          >
            <span><PlusIcon /></span> Add Chats
          </nuxt-link>
          <hr class="edit-folder__divider" />
          <div class="edit-folder__chat-item">
            <img
              src="@/assets/svg/avatar.svg"
              alt="Julia Work"
              class="edit-folder__chat-avatar"
            />
            <span class="edit-folder__chat-name">Julia Work</span>
          </div>
        </div>
        <p class="edit-folder__desc">
          Choose chats or types of chats that will appear <br />
          in this folder
        </p>
      </div>

      <!-- Excluded Chats -->
      <div class="edit-folder__section">
        <label class="edit-folder__label">Excluded Chats</label>
        <nuxt-link
          to="/chat-settings/folders/edit-folder/exclude"
          class="edit-folder__link"
        >
          <span><PlusIcon /></span> Add Chats to Exclude
        </nuxt-link>
        <p class="edit-folder__desc">
          Choose chats or types of chats that will not appear in this folder
        </p>
      </div>

      <!-- Folder Color -->
      <div class="edit-folder__field">
        <div class="edit-folder__field-head">
          <label class="edit-folder__label">Folder Color</label>
          <span
            v-if="selectedColor !== null"
            class="folder-color__badge"
            :style="badgeStyle"
            >FRENCH</span
          >
        </div>
        <div class="edit-folder__colors">
          <div
            v-for="color in colors"
            :key="color"
            :class="[
              'edit-folder__color-circle',
              { selected: color === selectedColor },
            ]"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)"
          />
        </div>
        <p class="edit-folder__desc">
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
    PlusIcon,
    EmojiIcon,
  },
})
export default class EditFolderPage extends Vue {
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
.edit-folder {
  background: var(--primary-1);
  min-height: 100vh;
  padding-bottom: 24px;
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
    padding: 16px 12px;
    background: var(--secondary-1);
    width: calc(100% + 24px);
    margin-left: -12px;
    border-radius: 8px 8px 0 0;
    margin-bottom: 26px;
    &-cancel {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-2);
    }
    &-title {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 0.02em;
      color: var(--primary-3);
    }
    &-done {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-2);
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
  &__chat-block {
    margin-bottom: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 16px 20px 4px 18px;
    .edit-folder__link {
      padding: 0 0 17px;
      margin: 0;
    }
  }
  &__chat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 8px;
  }
  &__chat-avatar {
    width: 38px;
    min-width: 38px;
    height: 38px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__chat-name {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.02em;
    color: var(--primary-3);
  }
  &__divider {
    position: relative;
    left: 20px;
    border-color: rgba(255, 255, 255, 0.3);
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 16px 9px 16px 18px;
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
    .edit-folder__label {
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
    .edit-folder__color-circle {
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
