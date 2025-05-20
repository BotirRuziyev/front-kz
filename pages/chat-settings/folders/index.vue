<template>
  <div class="chat-folders">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-folders__header">
        <nuxt-link to="#" class="chat-folders__header-back">
          <BackIcon />
        </nuxt-link>
        <h1 class="chat-folders__header-title">Chat Folders</h1>
        <button
          v-if="!isEditMode"
          class="chat-folders__header-btn chat-folders__header-btn--edit"
          @click="isEditMode = true"
        >
          Edit
        </button>
        <button
          v-else
          class="chat-folders__header-btn chat-folders__header-btn--done"
          @click="isEditMode = false"
        >
          Done
        </button>
      </div>

      <!-- Intro -->
      <div class="chat-folders__intro">
        <div class="chat-folders__intro-image">
          <img
            src="@/assets/png/file-img.png"
            alt="Chat folders illustration"
          />
        </div>
        <p class="chat-folders__intro-description">
          Create folders for different groups of chats and quickly switch
          between them
        </p>
      </div>

      <!-- Body (Create + List) -->
      <div class="chat-folders__body">
        <!-- Create button -->
        <nuxt-link
          to="/chat-settings/folders/new-folder"
          class="chat-folders__create"
        >
          <span class="chat-folders__create-label">Create a Folder</span>
          <span class="chat-folders__create-btn">
            <CreateIcon />
          </span>
        </nuxt-link>

        <!-- Folder list -->
        <draggable
          v-model="folders"
          handle=".chat-folders__list-item-drag"
          :animation="500"
          tag="ul"
          ghost-class="drag-ghost"
          chosen-class="drag-chosen"
          drag-class="drag-dragging"
          class="chat-folders__list"
        >
          <li
            v-for="(folder, index) in folders"
            :key="index"
            class="chat-folders__list-item"
          >
            <button
              v-if="isEditMode && folder.deletable"
              class="chat-folders__list-item-delete"
              @click="deleteFolder(index)"
            >
              <MinusCircleIcon />
            </button>
            <nuxt-link
              :to="isEditMode ? '' : '/chat-settings/folders/edit-folder'"
              class="chat-folders__list-item-link"
            >
              <span class="chat-folders__list-item-label">{{
                folder.name
              }}</span>
              <button v-if="!isEditMode" class="chat-folders__list-item-arrow">
                <ShapeIcon />
              </button>
            </nuxt-link>
            <button v-if="isEditMode" class="chat-folders__list-item-drag">
              <BurgerIcon />
            </button>
          </li>
        </draggable>
      </div>

      <!-- Hint -->
      <div class="chat-folders__hint">
        Tap ‘edit’ to change the order or delete folders
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import draggable from 'vuedraggable'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import CreateIcon from '@/assets/svg/plus.svg?inline'
// @ts-ignore
import ShapeIcon from '@/assets/svg/shape-icon.svg?inline'
// @ts-ignore
import BurgerIcon from '@/assets/svg/burger-icon.svg?inline'
// @ts-ignore
import MinusCircleIcon from '@/assets/svg/minus-circle.svg?inline'

@Component({
  components: {
    draggable,
    BackIcon,
    CreateIcon,
    ShapeIcon,
    BurgerIcon,
    MinusCircleIcon,
  },
})
export default class ChatFoldersPage extends Vue {
  isEditMode = false

  folders = [
    { name: 'All Chats', deletable: false },
    { name: 'French', deletable: true },
    { name: 'China', deletable: true },
    { name: 'Bots', deletable: true },
    { name: 'Russia', deletable: true },
    { name: 'Others', deletable: true },
  ]

  deleteFolder(index: number) {
    if (!this.folders[index].deletable) return
    this.folders.splice(index, 1)
  }
}
</script>

<style lang="scss">
.chat-folders {
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
  &__intro {
    margin-bottom: 32px;
    &-image {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    &-description {
      max-width: 290px;
      margin: 0 auto;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      text-align: center;
      color: rgba(255, 255, 255, 0.65);
    }
  }
  &__body {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  &__create {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px 9px 10px 10px;
    background: var(--secondary-1);
    transition: 0.2s;
    &:hover {
      background: var(--secondary-7);
    }
    &-label {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      color: var(--primary-2);
    }
    &-btn {
      svg {
        rect {
          fill: var(--primary-2);
        }
      }
    }
  }
  &__list {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      padding: 10px 12px 10px 10px;
      background: var(--secondary-1);
      transition: 0.2s;
      &:last-child {
        border: 0;
      }
      &:hover {
        background: var(--secondary-7);
      }
      &-link {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      &-label {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 120%;
        color: var(--primary-3);
      }
      &-drag {
        cursor: grab;
      }
    }
  }
  &__hint {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>
