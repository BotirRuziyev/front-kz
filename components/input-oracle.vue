<template>
  <div :class="inputClass">
    <label v-if="label" class="label">{{ label }}</label>
    <UserIcon v-if="user" class="input-user-icon" />
    <SearchIcon v-if="search" class="input-search" />
    <div v-if="ispin" class="input-group">
      <input
        v-for="(value, index) in values"
        :key="index"
        :ref="`input${index}`"
        v-model="values[index]"
        type="tel"
        inputmode="numeric"
        :disabled="disabled[index]"
        :class="{ error_input: error }"
        maxlength="1"
        :placeholder="placeholder"
        @input="onInputChange(index)"
        @keydown.backspace="onBackspacePress(index, $event)"
      />
    </div>
    <input
      v-else
      v-model="value"
      :type="computedType"
      :placeholder="placeholder"
      :style="{ paddingLeft }"
      :readonly="readonly"
    />
    <div
      v-if="type === 'password'"
      class="input-eye"
      type="button"
      @click="togglePassword"
    >
      <EyeIcon />
    </div>
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
// @ts-ignore
import EyeIcon from '@/assets/svg/eye.svg?inline'

@Component({
  components: {
    TrashIcon,
    SearchIcon,
    UserIcon,
    CalendarIcon,
    EyeIcon,
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
  @Prop({ default: false }) readonly ispin!: boolean
  @Prop({ default: false }) error!: boolean

  value: string = this.v
  values: string[] = ['', '', '', '', '', '']
  disabled: boolean[] = [false, true, true, true, true, true]
  isPasswordVisible: boolean = false

  get computedType(): string {
    return this.isPasswordVisible ? 'text' : this.type
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
    console.log(this.isPasswordVisible)
  }

  onInputChange(index: number) {
    const val = this.values[index].replace(/\D/g, '').slice(0, 1)
    this.values[index] = val

    this.$emit('openPinCode', this.values)

    // Agar input bo‘sh bo‘lmasa va oxirgi inputga yetilmagan bo‘lsa
    if (val !== '' && index < this.values.length - 1) {
      this.disabled[index + 1] = false

      this.$nextTick(() => {
        const nextInput = this.$refs[`input${index + 1}`] as
          | HTMLInputElement
          | HTMLInputElement[]

        if (Array.isArray(nextInput)) {
          nextInput[0]?.focus()
        } else {
          nextInput?.focus()
        }
      })
    }
  }

  onBackspacePress(index: number, event: KeyboardEvent) {
    if (
      event &&
      event.key === 'Backspace' &&
      this.values[index] === '' &&
      index > 0
    ) {
      this.disabled[index] = true
      this.$nextTick(() => {
        const prevInput = this.$refs[`input${index - 1}`] as
          | HTMLInputElement
          | HTMLInputElement[]
        if (Array.isArray(prevInput)) {
          prevInput[0]?.focus()
        } else {
          prevInput?.focus()
        }
      })
    }
  }

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
  &-eye {
    height: 20px;
    line-height: 0;
    position: absolute;
    cursor: pointer;
    top: 12px;
    right: 12px;
    z-index: 2;
  }
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
.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
  input {
    width: 100%;
    height: 50px;
    background: transparent;
    border-radius: 12px;
    padding: 0;
    border: 1px solid #2b2741;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 28px;
    text-align: center;
    line-height: 135%;
    color: #fff;
    &.error_input {
      border-color: #f64e2a;
      color: #f64e2a;
      margin-bottom: 100px;
    }
    &:focus {
      border-color: #f64e2a;
    }
    &::placeholder {
      font-family: var(--font3);
      font-weight: 700;
      font-size: 24px;
      color: #464452;
    }
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }
  .error-text {
    left: 50%;
    top: calc(100% - 50px);
    transform: translateX(-50%);
    font-weight: 500;
  }
}
</style>
