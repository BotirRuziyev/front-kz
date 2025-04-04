<template>
  <div ref="select" class="form-select form__select">
    <button
      class="select-btn"
      :class="{ active: isOpen }"
      @click="isOpen = !isOpen"
    >
      <div class="select-value">
        <span v-if="selectedItems.length == 0" class="default-value">
          {{ label }}
        </span>
        <template v-else>
          <span
            v-for="(name, i) in selectedItems"
            :key="i"
            class="selected-values"
          >
            {{ name }},
          </span>
        </template>
      </div>
      <span class="arrown-icon">
        <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
      </span>
    </button>
    <div class="select-menu" :class="{ show: isOpen }">
      <div v-for="option in data" :key="option.id" class="select-option">
        <button class="option-button" @click="addSelected(option.name)">
          <div class="icon">
            <img :src="option.img" alt="" />
          </div>
          <p class="option-text">
            {{ option.name }}
          </p>
          <div class="form-control">
            <checkbox-oracle :checked="option.selected" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

interface Item {
  id: number
  img: string
  name: string
  selected: boolean
}

@Component
export default class FormSelect extends Vue {
  @Prop({ default: () => [] }) data!: Item[]
  @Prop({ default: '' }) label!: string

  isOpen = false
  selectedItems: string[] = []

  localData: Item[] = []

  created() {
    this.localData = [...this.data]
  }

  @Watch('data', { deep: true })
  onDataChange(newVal: Item[]) {
    this.localData = [...newVal]
  }

  addSelected(name: string) {
    this.localData.forEach((item) => {
      if (item.name === name) {
        this.$set(item, 'selected', !item.selected)
      }
    })
    const index = this.selectedItems.indexOf(name)
    if (index !== -1) {
      this.selectedItems.splice(index, 1)
    } else {
      this.selectedItems.push(name)
    }

    this.$emit('update', this.localData)
  }

  mounted() {
    document.addEventListener('click', this.ClickOutside)
  }

  beforeDestroy() {
    document.removeEventListener('click', this.ClickOutside)
  }

  ClickOutside(event: Event) {
    const target = event.target as HTMLElement
    const select = this.$refs.select as HTMLElement | null

    if (select && !select.contains(target)) {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">
.form__select {
  width: 100%;
  position: relative;
  border: 0;
  z-index: 2;
  .select-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #121119;
    border-bottom: 1px solid #252334;
    border-radius: 10px;
    padding: 10px 12px 10px 14px;
    cursor: pointer;
    transition: 0.3s;
    &.active {
      border-radius: 10px 10px 0 0;
      .arrown-icon {
        transform: rotate(-270deg);
      }
    }
    .select-value {
      display: flex;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      gap: 6px;
      &::-webkit-scrollbar {
        display: none;
      }
      span {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        color: #fff;
      }
    }
    .arrown-icon {
      width: 21px;
      height: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-90deg);
      transition: 0.3s;

      img {
        height: 15px;
      }
    }
  }
  .select-menu {
    width: 100%;
    background: #121119;
    border-radius: 0 0 10px 10px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: calc(100% + 15px);
    left: 0;
    transition: 0.3s;
    &.show {
      top: 100%;
      opacity: 1;
      visibility: visible;
    }
    .select-option {
      width: 100%;
      &:last-child {
        .option-button {
          border: 0;
        }
      }
      .option-button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid #252334;
        user-select: none;
        cursor: pointer;
        padding: 10px 12px 10px 10px;
      }
      .icon {
        img {
          height: 23px;
        }
      }
      .option-text {
        width: 100%;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 16px;
        text-align: left;
        color: #fff;
      }
      .form-control {
        .form-checkbox {
          padding: 0;
          gap: 0;
          input {
            &:checked + span {
              border-color: #f64e2a;
              &::after {
                content: url('@/assets/svg/checkbox.svg');
              }
            }
          }
          span {
            width: 21px;
            min-width: 21px;
            height: 21px;
            border-radius: 4px;
            border: 1px solid #242232;
            background: transparent;
            &::after {
              content: '';
              left: 4px;
              top: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
