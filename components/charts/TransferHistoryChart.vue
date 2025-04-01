<template>
  <div class="chart-container">
    <canvas ref="chartCanvas" class="chart-doughnut"></canvas>
    <div class="chart-content">
      <h3 class="chart-title">EXPENSES</h3>
      <h3 class="chart-price">1,923$</h3>
      <h3 class="chart-date">01.01.25 - 01.02.25</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js'
import {
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Title, Tooltip, Legend)

@Component
export default class DoughnutChart extends Vue {
  private chart: Chart<'doughnut', number[], string> | null = null
  private shadowColors = ['#f64e2a', '#902af6', '#f6c32a', '#2af653']

  mounted() {
    this.initChart()
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy()
    }
  }

  private initChart() {
    const ctx = (this.$refs.chartCanvas as HTMLCanvasElement).getContext('2d')
    if (!ctx) return

    const config: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [28, 25, 28, 19],
            backgroundColor: ['#f64e2a', '#902af6', '#f6c32a', '#2af653'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '80%',
        responsive: true,
        animation: {
          duration: 2000,
          easing: 'easeOutQuart',
          animateRotate: true,
          onComplete: () => {
            this.addShadows()
          },
        },
        plugins: {
          legend: {
            position: 'center',
          },
          tooltip: {
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
    }

    this.chart = new Chart(ctx, config)
  }

  private addShadows() {
    if (!this.chart) return

    const meta = this.chart.getDatasetMeta(0)
    const arcs = meta.data as any[]
    const ctx = this.chart.ctx

    ctx.clearRect(0, 0, this.chart.width, this.chart.height)

    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 1)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // 3. Har bir arc uchun alohida shadow
    arcs.forEach((arc, index) => {
      ctx.beginPath()
      ctx.shadowColor = this.shadowColors[index]

      // Arc parametrlari
      const { x, y, outerRadius, innerRadius, startAngle, endAngle } = arc

      // Tashqi aylana
      ctx.arc(x, y, outerRadius, startAngle, endAngle)

      // Ichki aylana (cutout uchun)
      ctx.arc(x, y, innerRadius, endAngle, startAngle, true)

      ctx.closePath()
      ctx.fillStyle = arc.options.backgroundColor
      ctx.fill()
    })

    ctx.restore()

    // 4. Asosiy chartni qayta chizish
    this.chart.draw()
  }
}
</script>

<style lang="scss">
.chart-container {
  position: relative;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  }
}
</style>
