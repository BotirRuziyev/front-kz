<template>
  <div class="exclude-chats">
    <div class="main-container">
      <!-- Header -->
      <div class="exclude-chats__header">
        <nuxt-link
          to="/chat-settings/folders/new"
          class="exclude-chats__header-cancel"
          >Cancel</nuxt-link
        >
        <h2 class="exclude-chats__header-title">Exclude chats</h2>
      </div>

      <!-- Filter / Selected Info -->
      <div class="exclude-chats__filter-info">
        <input-oracle
          :search="true"
          placeholder="Search"
          @changed="searchUpdate"
        />
      </div>

      <div class="exclude-chats__types">
        <!-- title -->
        <h2 class="exclude-chats__types-title">Chat Types</h2>

        <!-- Types List -->
        <ul class="exclude-chats__types-list">
          <!-- Item -->
          <li
            class="exclude-chats__types-item exclude-chats__types-item--selected"
          >
            <label for="Muted" class="exclude-chats__types-item--label">
              <div class="exclude-chats__types-icon">
                <Muted />
              </div>
              <span class="exclude-chats__types-label">Saved Messages</span>
              <input
                id="Muted"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                :checked="true"
                class="form-check"
              />
              <span class="exclude-chats__types-check"><CheckIcon /></span>
            </label>
          </li>
          <li class="exclude-chats__types-item">
            <label for="Read" class="exclude-chats__types-item--label">
              <div class="exclude-chats__types-icon">
                <Read />
              </div>
              <span class="exclude-chats__types-label">Catalogue</span>
              <input
                id="Read"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                class="form-check"
              />
              <span class="exclude-chats__types-check"><CheckIcon /></span>
            </label>
          </li>
          <li class="exclude-chats__types-item">
            <label for="Archived" class="exclude-chats__types-item--label">
              <div class="exclude-chats__types-icon">
                <Archived />
              </div>
              <span class="exclude-chats__types-label">Archived</span>
              <input
                id="Archived"
                type="checkbox"
                name="chatTypes"
                style="display: none"
                class="form-check"
              />
              <span class="exclude-chats__types-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>

      <div class="exclude-chats__chats">
        <!-- title -->
        <h2 class="exclude-chats__chats-title">Chats</h2>

        <!-- Types List -->
        <ul v-if="filteredChats.length >= 1" class="exclude-chats__chats-list">
          <!-- Item -->
          <li
            v-for="chat of filteredChats"
            :key="chat.id"
            class="exclude-chats__chats-item"
          >
            <label :for="`${chat.id}`" class="exclude-chats__chats-item--label">
              <div class="exclude-chats__chats-avatar">
                <img :src="chat.avatar" :alt="chat.avatar" />
              </div>
              <span class="exclude-chats__chats-label">{{ chat.name }}</span>
              <input
                :id="`${chat.id}`"
                type="checkbox"
                name="chats"
                style="display: none"
                class="form-check"
                :checked="chat.id == 1"
              />
              <span class="exclude-chats__chats-check"><CheckIcon /></span>
            </label>
          </li>
        </ul>
      </div>

      <!-- Done Button -->
      <div class="new-folder__button">
        <new-oracle-button
          :to="selectedCheck ? '/chat-settings/folders/new' : ''"
          text="Done"
          :color="selectedCheck ? 'yellow' : 'black'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import SearchIcon from '@/assets/svg/new-search.svg?inline'
// @ts-ignore
import Muted from '@/assets/svg/muted.svg?inline'
// @ts-ignore
import Read from '@/assets/svg/read.svg?inline'
// @ts-ignore
import Archived from '@/assets/svg/archived.svg?inline'
// @ts-ignore
import CheckIcon from '@/assets/svg/check-icon.svg?inline'

@Component({
  components: {
    SearchIcon,
    Muted,
    Read,
    Archived,
    CheckIcon,
  },
})
export default class excludePage extends Vue {
  search: string | null = ''

  // chatlar
  chats = [
    { id: 1, avatar: require('@/assets/svg/avatar.svg'), name: 'Julia Work' },
    { id: 2, avatar: require('@/assets/svg/avatar.svg'), name: 'Bill' },
    { id: 3, avatar: require('@/assets/svg/avatar.svg'), name: 'Megan' },
    { id: 4, avatar: require('@/assets/svg/avatar.svg'), name: 'Fred' },
    { id: 5, avatar: require('@/assets/svg/avatar.svg'), name: 'Oliver' },
    { id: 6, avatar: require('@/assets/svg/avatar.svg'), name: 'Amelia' },
    { id: 7, avatar: require('@/assets/svg/avatar.svg'), name: 'Harry' },
  ]

  initialCheckedTypes: string[] = []
  initialCheckedChats: number[] = []

  selectedCheck: boolean = false

  mounted() {
    this.initialCheckedTypes = this.getCheckedTypes()
    this.initialCheckedChats = this.getCheckedChats()

    setInterval(() => {
      const nowTypes = this.getCheckedTypes()
      const nowChats = this.getCheckedChats()

      const typesChanged =
        JSON.stringify(nowTypes.sort()) !==
        JSON.stringify(this.initialCheckedTypes.sort())

      const chatsChanged =
        JSON.stringify(nowChats.sort()) !==
        JSON.stringify(this.initialCheckedChats.sort())

      this.selectedCheck = typesChanged || chatsChanged
    }, 200)
  }

  getCheckedTypes(): string[] {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="chatTypes"]:checked'
    )
    return Array.from(checkboxes).map((el) => el.id)
  }

  getCheckedChats(): number[] {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="chats"]:checked'
    )
    return Array.from(checkboxes).map((el) => Number(el.id))
  }

  get filteredChats() {
    if (!this.search) return this.chats
    return this.chats.filter((chat) =>
      chat.name.toLowerCase().includes(this.search!.toLowerCase())
    )
  }

  searchUpdate(val: string) {
    this.search = val
  }
}
</script>

<style lang="scss">
.exclude-chats {
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 24px;
  border-radius: 8px 8px 0 0;
  padding-bottom: 96px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    position: relative;
    margin-bottom: 12px;

    &-cancel {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 130%;
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
  }
  &__filter-info {
    margin-bottom: 24px;
  }
  &__types {
    margin-bottom: 16px;
  }
  &__types,
  &__chats {
    &-title {
      padding: 0 8px 8px;
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
    &-icon {
      svg {
        width: 24px;
        height: 24px;
      }
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
        .exclude-chats__chats-item--label,
        .exclude-chats__types-item--label {
          &::after {
            display: none;
          }
        }
      }
    }
    &-item--label {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 12px 0 16px;
      position: relative;
      cursor: pointer;
      &::after {
        content: '';
        width: calc(100% - 12px);
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
      width: 20px;
      min-width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #60578e;
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
      &:checked + .exclude-chats__types-check,
      &:checked + .exclude-chats__chats-check {
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
