<template>
  <div :class="inputClass">
    <label v-if="label" class="label">{{ label }}</label>
    <UserIcon v-if="user" class="input-user-icon" />
    <SearchIcon v-if="search" class="input-search" />
    <input
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :style="{ paddingLeft }"
      :readonly="readonly"
    />
    <CalendarIcon
      v-if="calendar"
      class="input-calendar-action"
      @click="$emit('openCalendar', $event)"
    />
    <TrashIcon v-if="trashAction" class="input-trash-action" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
// @ts-ignore
import TrashIcon from '@/assets/svg/trash.svg?inline'
// @ts-ignore
import SearchIcon from '@/assets/svg/search.svg?inline'
// @ts-ignore
import UserIcon from '@/assets/svg/UserCircle.svg?inline'
// @ts-ignore
import CalendarIcon from '@/assets/svg/calendar.svg?inline'

@Component({
  components: {
    TrashIcon,
    SearchIcon,
    UserIcon,
    CalendarIcon,
  },
})
export default class InputOracle extends Vue {
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: '' }) readonly type!: string
  @Prop({ default: '' }) readonly size!: string
  @Prop({ default: '' }) readonly v!: string
  @Prop({ default: false }) readonly search!: boolean
  @Prop({ default: false }) readonly readonly!: boolean
  @Prop({ default: false }) readonly user!: boolean
  @Prop({ default: false }) readonly calendar!: boolean
  @Prop({ default: null }) readonly trashAction?: Function

  value: string = this.v

  @Watch('value')
  onChildChanged() {
    this.$emit('changed', this.value)
  }

  get computedValue() {
    return this.value
  }

  get inputClass() {
    return ['input', this.size]
  }

  get paddingLeft() {
    return this.search || this.user ? '43px' : '12px'
  }

  created() {
    this.value = this.v
  }

  @Watch('v')
  onVChange(newValue: string) {
    this.value = newValue
  }
}
</script>
<style lang="scss">
.label {
  margin-bottom: 10px;
  font-family: 'Reza Zulmi Alfaizi Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
}

.input {
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  position: relative;

  &-search {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    path {
      stroke: #7a74ba;
    }
  }
  &-user-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  &-calendar-action {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &.big {
    input {
      font-size: 24px;
    }
  }

  &-trash-action {
    position: absolute;
    cursor: pointer;
    bottom: 11px;
    right: 11px;
  }

  input {
    box-sizing: border-box;
    padding: 12px;
    width: 100%;
    height: 44px;
    background: #181720;
    border-radius: 12px;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #fff;
    border: none;
    outline: none;

    &::placeholder {
      font-family: 'Nunito', sans-serif;
      font-weight: 600;
      font-size: 14px;
      line-height: 120%;
      color: #7a74ba;
    }
  }
}
</style>
