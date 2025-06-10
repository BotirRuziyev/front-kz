<template>
  <div class="chat-folders">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-folders__header">
        <nuxt-link to="/chat-settings" class="chat-folders__header-back">
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
              <span></span>
            </button>
            <nuxt-link
              :to="isEditMode ? '' : '/chat-settings/folders/edit'"
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
        <!-- Create button -->
        <nuxt-link to="/chat-settings/folders/new" class="chat-folders__create">
          <span class="chat-folders__create-btn">
            <CreateIcon />
          </span>
          <span class="chat-folders__create-label">Create a Folder</span>
        </nuxt-link>
      </div>

      <!-- Hint -->
      <div v-if="!isEditMode" class="chat-folders__hint">
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

@Component({
  components: {
    draggable,
    BackIcon,
    CreateIcon,
    ShapeIcon,
    BurgerIcon,
  },
})
export default class ChatFoldersPage extends Vue {
  isEditMode = false

  folders = [
    { name: 'All Chats', deletable: true },
    { name: 'French', deletable: true },
    { name: 'China', deletable: true },
  ]

  deleteFolder(index: number) {
    const folder = this.folders[index]

    if (!folder.deletable) return

    if (folder.name === 'All Chats') {
      this.folders = []
      return
    }

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
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 0.02em;
      text-align: center;
      color: var(--primary-3);
    }
    &-btn {
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: #f64e2a;
      transition: 0.2s;
      &:hover {
        color: var(--oranzhevyy750);
      }
    }
  }
  &__intro {
    margin-bottom: 24px;
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
      line-height: 130%;
      text-align: center;
      color: #8780cf;
    }
  }
  &__body {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  &__create {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    background: #14131b;
    transition: 0.2s;
    &:hover {
      background: var(--secondary-7);
    }
    &-label {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #f64e2a;
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
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 16px;
      background: #14131b;
      position: relative;
      transition: 0.2s;
      &::after {
        content: '';
        width: calc(100% - 12px);
        height: 0;
        border-bottom: 1px solid #2b2741;
        position: absolute;
        right: 0;
        bottom: 0;
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
        font-size: 14px;
        line-height: 130%;
        color: #fff;
      }
      &-drag {
        cursor: grab;
      }
      &-delete {
        width: 16px;
        height: 16px;
        span {
          display: block;
          width: 16px;
          height: 3px;
          background: #f64e2a;
          border-radius: 3px;
        }
      }
    }
  }
  &__hint {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #8780cf;
  }
}
</style>
