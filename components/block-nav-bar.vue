<template>
  <div class="block-nav-bar">
    <nuxt-link :to="to" class="back-btn">
      <BackIcon />
    </nuxt-link>
    <span class="block-nav-bar__text">
      {{ text }}
    </span>
    <button v-if="search" class="search-btn" @click="$emit('openSearch', true)">
      <SearchIcon />
    </button>
    <button v-if="time" class="time-btn" @click="$emit('openTime', true)">
      <ClockIcon />
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore
import BackIcon from '@/assets/svg/arrow-back.svg?inline'
// @ts-ignore
import SearchIcon from '@/assets/svg/search.svg?inline'
// @ts-ignore
import ClockIcon from '@/assets/svg/clock-circle.svg?inline'
@Component({
  components: {
    BackIcon,
    SearchIcon,
    ClockIcon,
  },
})
export default class BlockNavBack extends Vue {
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: '' }) readonly to!: string
  @Prop({ default: false }) readonly search!: boolean
  @Prop({ default: false }) readonly time!: boolean
}
</script>
<style lang="scss" scoped>
.block-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 0;
  margin-bottom: 4px;
  position: relative;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #fff;
  .back-btn {
    min-width: 22px;
    min-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    z-index: 3;
    svg {
      path {
        stroke: #fff;
      }
    }
  }
  .search-btn,
  .time-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: 3;
    cursor: pointer;
  }
  &__text {
    width: 100%;
    text-align: center;
  }
  .search-btn {
    cursor: pointer;
    svg {
      path {
        stroke: #fff;
      }
    }
  }
}
</style>
