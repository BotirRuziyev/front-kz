<template>
  <div class="calendar-container">
    <button class="calendar-btn" @click="openCalendar">
      <CalendarIcon />
    </button>
    <div
      ref="calendarInput"
      class="calendar-oracle"
      :class="{ show: isOpen }"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
// @ts-ignore
import CalendarIcon from '@/assets/svg/calendar-icon.svg?inline'

@Component({
  components: {
    CalendarIcon,
  },
})
export default class CalendarOracle extends Vue {
  // @Prop({ default: false }) isOpen!: boolean

  isOpen = false
  private calendarInstance: any = null
  private selectedDates: string = ''

  mounted() {
    this.initCalendar()
    document.addEventListener('click', this.ClickOutside)
    window.addEventListener('resize', this.adjustDayCells)
    this.adjustDayCells()
  }

  initCalendar() {
    this.calendarInstance = flatpickr(
      this.$refs.calendarInput as HTMLInputElement,
      {
        mode: 'range',
        dateFormat: 'Y-m-d',
        closeOnSelect: false,
        onClose: this.onDateSelect,
        appendTo: document.body,
      }
    )

    this.addApplyButton()
  }

  private adjustDayCells = () => {
    this.$nextTick(() => {
      document.querySelectorAll('.flatpickr-day').forEach((e) => {
        const el = e as HTMLElement
        const widthPx = el.offsetWidth + 'px'
        el.style.height = widthPx
      })
    })
  }

  onDateSelect(selectedDates: Date[], dateStr: string) {
    this.selectedDates = dateStr
    console.log('Tanlangan sana:', selectedDates)
  }

  addApplyButton() {
    setTimeout(() => {
      const calendarContainer = document.querySelector('.flatpickr-calendar')
      if (calendarContainer) {
        const applyBtn = document.createElement('button')
        applyBtn.innerText = 'Apply'
        applyBtn.className = 'apply-button'
        applyBtn.onclick = () => this.applyDate()
        calendarContainer.appendChild(applyBtn)
      }
    }, 100)
  }

  applyDate() {
    if (this.calendarInstance) {
      this.calendarInstance.close()
      this.$emit('close')
      this.isOpen = false
    }
  }

  openCalendar() {
    if (this.calendarInstance) {
      this.isOpen = true
      this.calendarInstance.open()
      this.adjustDayCells()
    }
  }

  beforeDestroy() {
    document.removeEventListener('click', this.ClickOutside)
  }

  ClickOutside(event: Event) {
    const target = event.target as HTMLElement
    const calendarInput = this.$refs.calendarInput as HTMLElement | null

    if (calendarInput && calendarInput.contains(target)) {
      this.applyDate()
      this.$emit('close')
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss">
.calendar-container {
  .calendar-btn {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    &:hover {
      svg {
        path {
          stroke: #f64e2a;
          &:nth-child(2) {
            fill: #f64e2a;
          }
        }
      }
    }
    svg {
      path {
        transition: 0.3s;
      }
    }
  }
  .calendar-oracle {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0);
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    transition: 0.3s;
    &.show {
      background: rgba(0, 0, 0, 0.6);
      visibility: visible;
    }
  }
}
.flatpickr-calendar {
  max-width: 343px;
  width: 100%;
  position: fixed;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(80px) !important;
  box-shadow: 0 10px 60px 0 rgba(0, 0, 0, 0.1) !important;
  background: #1d1c27 !important;
  border-radius: 13px !important;
  padding: 5px 0px 12px 0px !important;
  height: auto !important;
  &.animate.open {
    animation: none;
  }
  &::before,
  &::after {
    display: none !important;
  }
  .flatpickr-months {
    .flatpickr-prev-month {
      width: 15px !important;
      height: 17px !important;
      right: 60px !important;
      left: auto !important;
      top: 14px !important;
      padding: 0 !important;
      svg {
        display: none;
      }
      &::before {
        content: '';
        display: block;
        width: 15px;
        height: 17px;
        background-image: url('@/assets/svg/arrow-back.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        font-family: var(--font4);
        font-weight: 500;
        font-size: 20px;
        text-align: center;
        color: #fff;
      }
    }
    .flatpickr-next-month {
      width: 15px !important;
      height: 17px !important;
      right: 16px !important;
      left: auto !important;
      top: 14px;
      padding: 0;
      svg {
        display: none;
      }
      &::before {
        content: '';
        display: block;
        width: 15px;
        height: 17px;
        transform: rotate(180deg);
        background-image: url('@/assets/svg/arrow-back.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        font-family: var(--font4);
        font-weight: 500;
        font-size: 20px;
        text-align: center;
        color: #fff;
      }
    }
    .flatpickr-current-month {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 10px 12px;
      left: 0;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 17px;
      line-height: 129%;
      letter-spacing: -0.03em;
      color: #fff;
      .flatpickr-monthDropdown-months {
        background: #1d1c27 !important;
        width: fit-content !important;
        padding: 0;
        option {
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 17px;
          line-height: 129%;
          letter-spacing: -0.03em;
          color: #fff;
        }
      }
    }
  }
  .flatpickr-rContainer {
    width: 100%;
    .flatpickr-weekdays {
      height: auto;
      .flatpickr-weekdaycontainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 16px;
        .flatpickr-weekday {
          font-family: var(--second-family);
          font-weight: 700;
          font-size: 10px;
          line-height: 180%;
          text-transform: uppercase;
          text-align: center;
          color: rgba(235, 235, 245, 0.3);
        }
      }
    }
    .flatpickr-days {
      width: 100%;
      margin-bottom: 12px;
      .dayContainer {
        width: 100%;
        max-width: 100%;
        padding: 0 16px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        .flatpickr-day {
          width: 100%;
          // max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          box-shadow: none;
          border-radius: 50%;
          font-family: var(--font-family);
          font-weight: 400;
          font-size: 20px;
          line-height: 125%;
          letter-spacing: -0.02em;
          text-align: center;
          color: #fff;
          &:hover {
            background: #f64e2a;
            border-color: #f64e2a;
          }
          &.selected,
          &.startRange,
          &.endRange {
            background: #f64e2a;
            border-color: #f64e2a;
          }
          &.inRange {
            background: transparent;
            color: #f64e2a;
            border-color: transparent;
          }
          &.prevMonthDay {
            opacity: 0;
            visibility: hidden;
          }
          &.nextMonthDay {
            display: none;
          }
        }
      }
    }
  }
  .apply-button {
    background: #f64e2a;
    border-radius: 8px;
    padding: 16px 43px;
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
  }
}
</style>
