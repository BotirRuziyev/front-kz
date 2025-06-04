<template>
  <div class="chat-add-users">
    <div class="main-container">
      <!-- Header -->
      <div class="chat-add-users__header">
        <nuxt-link to="/chat-settings" class="chat-add-users__header-cancel"
          >Cancel</nuxt-link
        >
        <h2 class="chat-add-users__header-title">Add Users</h2>
      </div>

      <!-- Filter / Selected Info -->
      <div class="chat-add-users__filter-info">
        <input-oracle :search="true" placeholder="Search" />
      </div>

      <div class="chat-add-users__chats">
        <h2 class="chat-add-users__chats-title">Users</h2>
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
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 24px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    position: relative;
    margin-bottom: 12px;

    &-cancel {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
      color: #f64e2a;
    }
    &-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 140%;
      color: #fff;
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
    margin-bottom: 24px;
  }
  &__types,
  &__chats {
    &-title {
      padding: 0 8px 8px 8px;
      user-select: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
    }
    &-list {
      background: #14131b;
      border-radius: 12px;
    }
    &-avatar {
      width: 28px;
      min-width: 28px;
      height: 28px;
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
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 16px;
      cursor: pointer;
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
    &-label {
      width: 100%;
      text-align: left;
      user-select: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
      color: #fff;
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
