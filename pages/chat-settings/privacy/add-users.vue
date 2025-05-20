<template>
  <div class="chat-add-users">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-add-users__header">
        <nuxt-link to="/chat-settings" class="chat-add-users__header-cancel"
          >Cancel</nuxt-link
        >
        <h2 class="chat-add-users__header-title">Add Users</h2>
        <nuxt-link to="/chat-settings" class="chat-add-users__header-done"
          >Done</nuxt-link
        >
      </div>

      <!-- Filter / Selected Info -->
      <div class="chat-add-users__filter-info">
        <div class="form-control">
          <input
            v-model="search"
            type="search"
            placeholder="Search"
            class="form-input"
          />
          <button class="search-btn" :class="{ noactive: search !== '' }">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div class="chat-add-users__chats">
        <!-- Types List -->
        <ul v-if="filteredChats.length >= 1" class="chat-add-users__chats-list">
          <!-- Item -->
          <li
            v-for="chat of filteredChats"
            :key="chat.id"
            class="chat-add-users__chats-item"
          >
            <label
              :for="`${chat.id}`"
              class="chat-add-users__chats-item--label"
            >
              <div class="chat-add-users__chats-avatar">
                <img :src="chat.avatar" :alt="chat.avatar" />
              </div>
              <span class="chat-add-users__chats-label">{{ chat.name }}</span>
              <input
                :id="`${chat.id}`"
                type="checkbox"
                name="chats"
                style="display: none"
                class="form-check"
                :checked="chat.id == 1"
              />
              <span class="chat-add-users__chats-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import SearchIcon from '@/assets/svg/new-search.svg?inline'
// @ts-ignore
import CheckIcon from '@/assets/svg/check-icon.svg?inline'

@Component({
  components: {
    SearchIcon,
    CheckIcon,
  },
})
export default class excludePage extends Vue {
  search: string | null = ''

  chats = [
    {
      id: 1,
      avatar: require('@/assets/svg/avatar.svg'),
      name: 'Julia Work',
    },
    {
      id: 2,
      avatar: require('@/assets/svg/avatar.svg'),
      name: 'Bill',
    },
    {
      id: 3,
      avatar: require('@/assets/svg/avatar.svg'),
      name: 'Megan',
    },
    {
      id: 4,
      avatar: require('@/assets/svg/avatar.svg'),
      name: 'Fred',
    },
    {
      id: 5,
      avatar: require('@/assets/svg/avatar.svg'),
      name: 'Oliver',
    },
    {
      id: 6,
      avatar: require('@/assets/svg/avatar.svg'),
      name: 'Amelia',
    },
    {
      id: 7,
      avatar: require('@/assets/svg/avatar.svg'),
      name: 'Harry',
    },
  ]

  get filteredChats() {
    if (!this.search) return this.chats
    return this.chats.filter((chat) =>
      chat.name.toLowerCase().includes(this.search!.toLowerCase())
    )
  }
}
</script>

<style lang="scss">
.chat-add-users {
  background: var(--primary-1);
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 24px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 12px;
    background: var(--secondary-1);
    width: calc(100% + 24px);
    margin-left: -12px;
    border-radius: 8px 8px 0 0;

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
  &__filter-info {
    background: var(--secondary-1);
    width: calc(100% + 24px);
    margin-left: -12px;
    padding: 0 12px 16px;
    .form-control {
      position: relative;
      background: var(--primary-1);
      border-radius: 10px;
      &:focus-within {
        .search-btn {
          left: 15px;
          transform: translate(0, -50%);
        }
      }
      .form-input {
        width: 100%;
        height: 36px;
        background: transparent;
        border: 0;
        padding: 0 15px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 120%;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        &::placeholder {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 120%;
          text-align: center;
          color: rgba(255, 255, 255, 0.65);
        }
        &:focus {
          outline: none;
        }
      }
      .search-btn {
        position: absolute;
        top: 50%;
        left: calc(50% - 40px);
        transform: translate(-50%, -50%);
        transition: 0.2s;
        &.noactive {
          left: 15px;
          transform: translate(0, -50%);
        }
      }
    }
  }
  &__types,
  &__chats {
    &-title {
      background: var(--secondary-1);
      width: calc(100% + 24px);
      margin-left: -12px;
      padding: 5px 12px;
      user-select: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 16px;
      letter-spacing: 0.02em;
      color: var(--primary-3);
    }
    &-list {
      width: 100vw;
      background: var(--primary-1);
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      padding: 0;
    }
    &-avatar {
      width: 38px;
      min-width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-item {
      &:last-child {
        .chat-add-users__chats-item--label,
        .chat-add-users__types-item--label {
          border: 0;
        }
      }
    }
    &-item--label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      max-width: 375px;
      margin: 0 auto;
      padding: 6px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      cursor: pointer;
    }
    &-label {
      width: 100%;
      text-align: left;
      user-select: none;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.02em;
      color: var(--primary-3);
    }
    &-check {
      width: 21px;
      min-width: 21px;
      height: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.65);
      border-radius: 100%;
      line-height: 0;
      transition: 0.2s;
      svg {
        opacity: 0;
        path {
          stroke: var(--primary-1);
        }
      }
    }
    .form-check {
      &:checked + .chat-add-users__types-check,
      &:checked + .chat-add-users__chats-check {
        background: var(--primary-2);
        border-color: var(--primary-2);
        svg {
          opacity: 1;
        }
      }
    }
  }
}
</style>
