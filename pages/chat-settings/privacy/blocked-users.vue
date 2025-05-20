<template>
  <div class="blocked-users">
    <div class="main-container">
      <!-- Header -->
      <div class="blocked-users__header">
        <nuxt-link
          to="/chat-settings/privacy"
          class="blocked-users__header-back"
        >
          <BackIcon />
        </nuxt-link>
        <h1 class="blocked-users__header-title">Group Chats</h1>
        <button
          v-if="!isEditMode"
          class="blocked-users__header-btn blocked-users__header-btn--edit"
          @click="isEditMode = true"
        >
          Edit
        </button>
        <button
          v-else
          class="blocked-users__header-btn blocked-users__header-btn--done"
          @click="isEditMode = false"
        >
          Done
        </button>
      </div>

      <div class="blocked-users__search">
        <span class="blocked-users__search-icon">
          <SearchIcon />
        </span>
        <input
          v-model="searchQuery"
          type="text"
          class="blocked-users__search-input"
          placeholder="Block User..."
        />
      </div>

      <!-- exeptions Body -->
      <div class="blocked-users__exeptions">
        <!-- Exception List -->
        <ul class="blocked-users__exeptions-list">
          <li
            v-for="(user, index) in filteredBlockedUsers"
            :key="index"
            class="blocked-users__exeptions-item"
          >
            <!-- Remove button -->
            <button
              v-if="isEditMode"
              class="blocked-users__exeptions-remove"
              @click="deleteExeption(index)"
            >
              <MinusCircleIcon />
            </button>

            <!-- Avatar + Name -->
            <div class="blocked-users__exeptions-user">
              <img
                :src="require('@/assets/svg/avatar.svg')"
                :alt="user.name"
                class="blocked-users__exeptions-avatar"
              />
              <span class="blocked-users__exeptions-name">{{ user.name }}</span>
            </div>
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
import MinusCircleIcon from '@/assets/svg/minus-circle.svg?inline'
// @ts-ignore
import SearchIcon from '@/assets/svg/emoji-icon.svg?inline'

@Component({
  components: {
    BackIcon,
    MinusCircleIcon,
    SearchIcon,
  },
})
export default class BlockedUsersPage extends Vue {
  searchQuery: string = ''
  isEditMode = false

  blockedUsers = [
    { name: 'Bill', deletable: true },
    { name: 'Julia Work', deletable: true },
  ]

  deleteExeption(index: number) {
    if (!this.blockedUsers[index].deletable) return
    this.blockedUsers.splice(index, 1)
  }

  get filteredBlockedUsers() {
    const query = this.searchQuery.toLowerCase().trim()
    return this.blockedUsers.filter((user) =>
      user.name.toLowerCase().includes(query)
    )
  }
}
</script>

<style lang="scss">
.blocked-users {
  padding-bottom: 32px;
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
  &__search {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    background: var(--secondary-1);
    border-radius: 8px;
    padding: 0 12px 0 14px;
  }
  &__search-input {
    width: 100%;
    min-height: 43px;
    background: transparent;
    border: 0;
    padding: 13px 0 13px 8px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 1);
    &::placeholder {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      color: rgba(255, 255, 255, 0.65);
    }
    &:focus {
      outline: none;
    }
  }
  &__exeptions {
    background: var(--secondary-1);
    border-radius: 8px;
    overflow: hidden;
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
    &:last-child {
      &::after {
        display: none;
      }
    }
    &::after {
      content: '';
      width: calc(100% - 60px);
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
