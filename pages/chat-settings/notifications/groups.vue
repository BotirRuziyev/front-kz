<template>
  <div class="group-chats">
    <div class="main-container">
      <!-- Header -->
      <div class="group-chats__header">
        <nuxt-link
          to="/chat-setttings/notifications"
          class="group-chats__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="group-chats__header-title">Group Chats</h1>
        <button
          v-if="!isEditMode"
          class="group-chats__header-btn group-chats__header-btn--edit"
          @click="isEditMode = true"
        >
          Edit
        </button>
        <button
          v-else
          class="group-chats__header-btn group-chats__header-btn--done"
          @click="isEditMode = false"
        >
          Done</button
        >s
      </div>
      <!-- Show Notifications -->
      <div class="group-chats__toggle-row show-notifications">
        <span class="group-chats__toggle-label">Show Notifications</span>
        <label class="group-chats__toggle">
          <input type="checkbox" class="group-chats__toggle-input" />
          <span class="group-chats__toggle-slider"></span>
        </label>
      </div>
      <!-- Options -->
      <div class="group-chats__options">
        <h3 class="group-chats__section-title">Options</h3>
        <div class="group-chats__toggle-row">
          <span class="group-chats__toggle-label">Message Preview</span>
          <label class="group-chats__toggle">
            <input type="checkbox" class="group-chats__toggle-input" />
            <span class="group-chats__toggle-slider"></span>
          </label>
        </div>
        <div class="group-chats__select-row">
          <nuxt-link to="#" class="group-chats__select-row--link">
            <span class="group-chats__select-label">Sound</span>
            <div class="group-chats__select-value">
              Note
              <span class="group-chats__select-arrow"></span>
            </div>
          </nuxt-link>
        </div>
      </div>

      <!-- exeptions Body -->
      <div class="group-chats__exeptions">
        <!-- Add Exception -->
        <nuxt-link
          to="/notifications/add-exception"
          class="group-chats__exeptions-add"
        >
          <CreateIcon class="group-chats__exeptions-add-icon" />
          <span class="group-chats__exeptions-add-label">Add Exception</span>
        </nuxt-link>

        <!-- Exception List -->
        <ul class="group-chats__exeptions-list">
          <li
            v-for="(exception, index) in exeptions"
            :key="index"
            class="group-chats__exeptions-item"
          >
            <!-- Remove button -->
            <button
              v-if="isEditMode"
              class="group-chats__exeptions-remove"
              @click="deleteExeption(index)"
            >
              <MinusCircleIcon />
            </button>

            <!-- Avatar + Name -->
            <div class="group-chats__exeptions-user">
              <img
                :src="require('@/assets/svg/avatar.svg')"
                :alt="exception.name"
                class="group-chats__exeptions-avatar"
              />
              <span class="group-chats__exeptions-name">{{
                exception.name
              }}</span>
            </div>
          </li>
        </ul>

        <!-- Delete All -->
        <button
          class="group-chats__exeptions-clear"
          @click="clearAllExceptions"
        >
          <TrashIcon class="group-chats__exeptions-clear-icon" />
          <span class="group-chats__exeptions-clear-label"
            >Delete All exeptions</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import CreateIcon from '@/assets/svg/plus.svg?inline'
// @ts-ignore
import MinusCircleIcon from '@/assets/svg/minus-circle.svg?inline'
// @ts-ignore
import TrashIcon from '@/assets/svg/delete-icon.svg?inline'

@Component({
  components: {
    BackIcon,
    CreateIcon,
    MinusCircleIcon,
    TrashIcon,
  },
})
export default class GroupChatsPage extends Vue {
  isEditMode = false

  exeptions = [
    { name: 'Julia Work', deletable: true },
    { name: 'Julia Work', deletable: true },
  ]

  deleteExeption(index: number) {
    if (!this.exeptions[index].deletable) return
    this.exeptions.splice(index, 1)
  }

  clearAllExceptions() {
    this.exeptions = []
  }
}
</script>

<style lang="scss">
.group-chats {
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
  .show-notifications {
    margin-bottom: 32px;
  }
  &__options {
    margin-bottom: 32px;
    .group-chats__toggle-row {
      margin-bottom: 4px;
    }
  }
  &__toggle-row,
  &__select-row--link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 9px 12px 9px 14px;
  }
  &__select-row--link {
    padding: 12px 12px 12px 14px;
  }
  &__toggle-label,
  &__select-label {
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
    &-input:checked + .group-chats__toggle-slider {
      background-color: #00c853;
    }
    &-input:checked ~ .group-chats__toggle-slider::after {
      background: white;
      margin-left: 17px;
    }
  }
  &__select-value {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: rgba(255, 255, 255, 0.65);
  }
  &__select-arrow {
    width: 7px;
    height: 13px;
    background: url('@/assets/svg/shape-icon.svg') no-repeat center/contain;
  }
  &__exeptions {
    background: var(--secondary-1);
    border-radius: 8px;
    overflow: hidden;
  }
  &__exeptions-add {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    padding: 16px 18px;
    cursor: pointer;
    background: var(--secondary-1);
    transition: 0.2s;
    &::after {
      content: '';
      width: calc(100% - 36px);
      height: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      position: absolute;
      bottom: 0;
      right: 0;
    }
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
    &-icon {
      rect {
        fill: var(--primary-2);
      }
    }
  }
  &__exeptions-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    position: relative;
    padding: 8px 14px 8px 14px;
    background: var(--secondary-1);
    transition: 0.2s;
    &::after {
      content: '';
      width: calc(100% - 36px);
      height: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      position: absolute;
      bottom: 0;
      right: 0;
    }
    &:hover {
      background: var(--secondary-7);
    }
  }
  &__exeptions-user {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__exeptions-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
  }
  &__exeptions-name {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: var(--primary-3);
  }
  &__exeptions-clear {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 18px;
  }
  &__exeptions-clear-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: var(--primary-2);
  }
}
</style>
