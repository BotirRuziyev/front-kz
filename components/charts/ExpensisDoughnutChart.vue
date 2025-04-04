<template>
  <div class="chart-wrapper">
    <button
      v-if="step === 1"
      class="chart-back__btn"
      :class="{ active: back }"
      @click="backChart"
    >
      <div class="icon">
        <img :src="require('@/assets/svg/arrow-back.svg')" alt="" />
      </div>
      Back
    </button>
    <div class="chart-container">
      <canvas ref="chartCanvas" class="chart-doughnut"></canvas>
      <div class="chart-content" :class="{ show: chartText }">
        <h3 v-if="data.title" class="chart-title">{{ data.title }}</h3>
        <h3 v-if="data.price" class="chart-price">{{ data.price }}</h3>
        <h3 v-if="data.percent" class="chart-percent">{{ data.percent }}</h3>
        <h3 v-if="data.date" class="chart-date">{{ data.date }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Chart, ChartConfiguration, Plugin, ArcElement } from 'chart.js'
import { DoughnutController, Title, Tooltip, Legend } from 'chart.js'

Chart.register(DoughnutController, ArcElement, Title, Tooltip, Legend)

interface Text {
  title?: string
  price?: string
  date?: string
  percent?: string
}

interface ChartData {
  labels?: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
  }[]
}

@Component
export default class ExpensesDoughnutChart extends Vue {
  @Prop({ default: null }) readonly step!: number | null
  @Prop({ default: null }) readonly activeExpensisType!: string | null
  @Prop({ default: null }) readonly activeCreatedType!: string | null
  @Prop({ default: () => ({} as Text) }) data!: Text
  @Prop({ default: () => ({} as Text) }) chartData!: ChartData

  private chart: Chart<'doughnut', number[], string> | null = null
  private shadowColors = this.chartData.datasets[0].backgroundColor

  chartText = false
  back = false

  mounted() {
    this.initChart()
    if (this.chart !== null) {
      ;(this.chart as any).$doughnutChart = this
    }
  }

  private initChart() {
    const ctx = (this.$refs.chartCanvas as HTMLCanvasElement).getContext('2d')
    if (!ctx) return

    const shadowPlugin: Plugin<'doughnut'> = {
      id: 'shadowPlugin',
      afterDraw: (chart: Chart) => {
        const component = (chart as any).$doughnutChart || this
        component.addShadows()
      },
    }

    const config: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: this.chartData,
      options: {
        cutout: '84%',
        responsive: true,
        layout: {
          padding: {
            top: 7,
            left: 7,
            right: 7,
            bottom: 7,
          },
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart',
          animateRotate: true,
          onComplete: () => {
            this.chartText = true
          },
        },
        plugins: {
          legend: {
            position: 'center',
          },
          tooltip: {
            enabled: false,
            callbacks: {
              label: (context) => {
                const label = context.label || ''
                const value = context.parsed || 0
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
      },
      plugins: [shadowPlugin],
    }

    this.chart = new Chart(ctx, config)
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy()
    }
  }

  @Watch('activeCreatedType')
  onCreatedTypeChanged() {
    this.updateChartBackground()
  }

  private updateChartBackground() {
    const activeItem = this.chartData?.labels?.find(
      (label: string) =>
        typeof label === 'string' &&
        typeof this.activeCreatedType === 'string' &&
        label.toLocaleLowerCase() === this.activeCreatedType.toLocaleLowerCase()
    )

    const activeIndex = this.chartData?.labels?.findIndex(
      (label: string) =>
        typeof label === 'string' &&
        typeof this.activeCreatedType === 'string' &&
        label.toLowerCase() === this.activeCreatedType.toLowerCase()
    )

    if (activeItem && activeIndex !== undefined) {
      if (this.chart) {
        this.shadowColors = [...this.shadowColors.slice(activeIndex)]

        this.chart.data = {
          labels: [activeItem],
          datasets: [
            {
              data: [100],
              backgroundColor: [
                ...this.chartData?.datasets[0].backgroundColor.slice(
                  activeIndex
                ),
              ],
              borderWidth: 0,
            },
          ],
        }
        this.chart.update()
      }
    }
  }

  @Watch('activeExpensisType')
  onExpensisTypeChanged() {
    this.updateChartOpacity()
  }

  private updateChartOpacity() {
    if (!this.chart?.data?.datasets?.[0]) return
    this.chartText = false

    const dataset = this.chart.data.datasets[0]
    const meta = this.chart.getDatasetMeta(0)
    const originalColors: string[] = [
      '#f6c32a',
      '#f64e2a',
      '#902af6',
      '#2af653',
    ]

    if (!dataset.backgroundColor) {
      dataset.backgroundColor = [...originalColors]
    }

    const bgColors = dataset.backgroundColor as string[]

    meta.data.forEach((_arc: any, index: number) => {
      const label = this.chart?.data?.labels?.[index]?.toString().toLowerCase()
      const isActive = this.activeExpensisType
        ? label === this.activeExpensisType?.toLowerCase()
        : false

      const newOpacity = isActive ? 1 : 0.05
      bgColors[index] = this.adjustColorOpacity(
        originalColors[index],
        newOpacity
      )
    })

    this.chart.options.animation = {
      duration: 500,
      easing: 'easeOutQuart',
      animateRotate: true,
      onComplete: () => {
        this.chartText = true
        this.back = true
      },
    }

    this.chart.update()
  }

  private adjustColorOpacity(color: string, opacity: number): string {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
    return color.replace(/,\s*\d*\.?\d+\)$/, `, ${opacity})`)
  }

  private addShadows() {
    if (!this.chart) return

    const meta = this.chart.getDatasetMeta(0)
    const arcs = meta.data as unknown as ArcElement[]
    const ctx = this.chart.ctx

    // Original sozlamalarni saqlab qolish
    const originalSettings = {
      shadowColor: ctx.shadowColor,
      shadowBlur: ctx.shadowBlur,
      shadowOffsetX: ctx.shadowOffsetX,
      shadowOffsetY: ctx.shadowOffsetY,
      fillStyle: ctx.fillStyle,
    }

    // Shadow bilan chizish
    arcs.forEach((arc, index) => {
      ctx.save()
      ctx.shadowColor = this.shadowColors[index] || 'rgba(0, 0, 0, 0.5)'
      ctx.shadowBlur = 7
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      arc.draw(ctx)
      ctx.restore()
    })

    // Shadowsiz qayta chizish
    arcs.forEach((arc) => {
      ctx.save()
      ctx.shadowColor = 'transparent'
      arc.draw(ctx)
      ctx.restore()
    })

    // Original sozlamalarni tiklash
    Object.assign(ctx, originalSettings)
  }

  private backChart() {
    this.$emit('chartBack')
    if (this.chart) {
      this.chart.destroy()
    }
    this.$nextTick(() => {
      this.initChart()
    })
  }
}
</script>

<style lang="scss">
.chart-wrapper {
  position: relative;
  .chart-back__btn {
    display: flex;
    align-items: center;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    &.active {
      opacity: 1;
      visibility: visible;
    }
    .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }
  }
}
.chart-container {
  max-width: 212px;
  max-height: 212px;
  min-height: 212px;
  width: 100%;
  height: 100%;
  margin: 0 auto 25px;
  .chart-doughnut {
    width: 100%;
    height: 100%;
  }
  .chart-content {
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
    transition: 0.3s;
    &.show {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    .chart-title {
      margin-bottom: 12px;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      text-align: center;
      line-height: 10px;
      color: rgba(255, 255, 255, 0.3);
    }
    .chart-price {
      margin-bottom: 12px;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 22px;
      text-align: center;
      line-height: 15px;
      text-transform: uppercase;
      color: #fff;
    }
    .chart-date {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 13px;
      line-height: 9px;
      text-align: center;
      color: #fff;
    }
    .chart-percent {
      margin-bottom: 12px;
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      text-align: center;
      color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
