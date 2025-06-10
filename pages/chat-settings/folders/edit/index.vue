<template>
  <div class="edit-folder">
    <div class="main-container">
      <!-- Header -->
      <div class="edit-folder__header">
        <nuxt-link to="/chat-settings/folders" class="edit-folder__header-back">
          <BackIcon />
        </nuxt-link>
        <h2 class="edit-folder__header-title">Chat Folders</h2>
      </div>

      <!-- Intro -->
      <div class="edit-folder__intro">
        <div class="edit-folder__intro-image">
          <img
            src="@/assets/png/create-file.png"
            alt="Chat folders illustration"
          />
        </div>
      </div>

      <!-- Folder Name -->
      <div class="edit-folder__field">
        <div class="form-control">
          <input
            v-model="folderName"
            type="text"
            placeholder="Folder Name"
            class="edit-folder__input"
          />
        </div>
      </div>

      <!-- Included Chats -->
      <div class="edit-folder__section">
        <label class="edit-folder__label">Included Chats</label>
        <div class="edit-folder__chat-block">
          <div
            v-for="(i, index) in include"
            :key="index"
            class="edit-folder__chat-item"
          >
            <img
              src="@/assets/svg/avatar.svg"
              alt="Julia Work"
              class="edit-folder__chat-avatar"
            />
            <span class="edit-folder__chat-name">{{ i.name }}</span>
            <button
              class="edit-folder__chat-delete--btn"
              @click="deleteInclude(index)"
            >
              <DeleteIcon />
            </button>
          </div>
          <nuxt-link
            to="/chat-settings/folders/edit/include"
            class="edit-folder__link"
          >
            <span><PlusIcon /></span> Add Chats
          </nuxt-link>
        </div>
        <p class="edit-folder__desc">
          Choose chats or types of chats that will appear in this folder
        </p>
      </div>

      <!-- Excluded Chats -->
      <div class="edit-folder__section">
        <label class="edit-folder__label">Excluded Chats</label>
        <div class="edit-folder__chat-block">
          <div
            v-for="(i, index) in exclude"
            :key="index"
            class="edit-folder__chat-item"
          >
            <img
              src="@/assets/svg/avatar.svg"
              alt="Julia Work"
              class="edit-folder__chat-avatar"
            />
            <span class="edit-folder__chat-name">Julia Work</span>
            <button
              class="edit-folder__chat-delete--btn"
              @click="deleteExclude(index)"
            >
              <DeleteIcon />
            </button>
          </div>
          <nuxt-link
            to="/chat-settings/folders/edit/exclude"
            class="edit-folder__link"
          >
            <span><PlusIcon /> </span> Add Chats to Exclude
          </nuxt-link>
        </div>
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
            >{{ folderName }}</span
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

      <!-- Create Button -->
      <div class="edit-folder__button">
        <new-oracle-button
          to="/chat-settings/folders"
          text="Create"
          color="yellow"
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
// @ts-ignore
import DeleteIcon from '@/assets/svg/delete-img.svg?inline'

@Component({
  components: {
    BackIcon,
    PlusIcon,
    EmojiIcon,
    DeleteIcon,
  },
})
export default class EditFolderPage extends Vue {
  folderName: string = 'News'
  selectedColor: string | null = '#955ddc'

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

  include = [{ name: 'Bill' }, { name: 'Julia Work' }, { name: 'Bill' }]

  exclude = [{ name: 'Bill' }]

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

  deleteInclude(index: number) {
    this.include.splice(index, 1)
  }

  deleteExclude(index: number) {
    this.exclude.splice(index, 1)
  }
}
</script>

<style lang="scss">
.edit-folder {
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
    margin-bottom: 24px;
    .form-control {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #13121b;
      border-radius: 12px;
      padding: 0 9px 0 0;
      border: 1px solid #13121b;
      &:focus-within {
        border-color: #f64e2a;
      }
    }
  }
  &__input {
    width: 100%;
    height: 44px;
    background: transparent;
    border: 0;
    padding: 0 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 1);
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      color: rgba(255, 255, 255, 0.65);
    }
  }
  &__section {
    margin-bottom: 32px;
  }
  &__chat-block {
    margin-bottom: 4px;
    background: #14131b;
    border-radius: 12px;
    .edit-folder__link {
      height: 44px;
      padding: 0 16px;
      margin: 0;
    }
  }
  &__chat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    position: relative;
    &::after {
      content: '';
      width: calc(100% - 16px);
      height: 0;
      border-bottom: 1px solid #2b2741;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &__chat-avatar {
    width: 28px;
    min-width: 28px;
    height: 28px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__chat-name {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
  }
  &__divider {
    position: relative;
    left: 20px;
    border-color: rgba(255, 255, 255, 0.3);
  }
  &__chat-delete--btn {
    cursor: pointer;
  }
  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 0 16px;
    background: #14131b;
    border-radius: 12px;
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
    padding: 0 8px;
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
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #67639a;
      &.yellow {
        color: #fff;
      }
    }
  }
}
</style>
