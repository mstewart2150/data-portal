import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

@Component({
  selector: 'app-jess-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jess-dashboard.component.html',
  styleUrls: ['./jess-dashboard.component.css']
})
export class JessDashboardComponent implements OnInit, OnDestroy {
  jsonData: any = null;
  private refreshInterval: any;

  @ViewChild('dashboardChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData();
    this.refreshInterval = setInterval(() => {
      this.fetchData();
    }, 30000);
  }

  fetchData() {
    this.dataService.getData('jess').subscribe(response => {
      if (response && response.length > 0) {
        this.jsonData = response;
        this.updateChart();
      } else {
        console.warn('No data received.');
      }
    });
  }

  updateChart() {
    if (!this.jsonData || this.jsonData.length === 0) return;

    const timestamps = this.jsonData.map((item: any) => item.timestamp).reverse();
    const temperatures = this.jsonData.map((item: any) => item.temperature).reverse();
    const humidities = this.jsonData.map((item: any) => item.humidity).reverse();

    if (!this.chart) {
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [
            {
              label: 'Temperature (°F)',
              data: temperatures,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              fill: false,
              pointRadius: 0,
              yAxisID: 'yTemp'  // assign to temperature axis
            },
            {
              label: 'Humidity (%)',
              data: humidities,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              fill: false,
              pointRadius: 0,
              yAxisID: 'yHumidity'  // assign to humidity axis
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 500
          },
          scales: {
            x: {
              ticks: { maxTicksLimit: 10 }
            },
            yTemp: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Temperature (°F)'
              },
              min: 65,
              max: 80
            },
            yHumidity: {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Humidity (%)'
              },
              grid: {
                drawOnChartArea: false  // prevents overlapping grid lines
              },
              min: 10,
              max: 60
            }
          },
          plugins: {
            annotation: {
              annotations: {
                redZone: {
                  type: 'box',
                  yScaleID: 'yTemp',
                  yMin: 73,
                  yMax: 80,
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  borderWidth: 0
                },
                blueZone: {
                  type: 'box',
                  yScaleID: 'yTemp',
                  yMin: 65,
                  yMax: 67,
                  backgroundColor: 'rgba(0, 0, 255, 0.1)',
                  borderWidth: 0
                }
              }
            }
          }
        }
      });
    } else {
      const chart = this.chart;
      const labels = chart.data.labels as string[] | undefined;
      const tempDataset = chart.data.datasets[0].data as number[] | undefined;
      const humidityDataset = chart.data.datasets[1].data as number[] | undefined;

      if (labels && tempDataset && humidityDataset && labels.length > 0) {
        const lastTimestamp = timestamps[timestamps.length - 1];
        const lastTemp = temperatures[temperatures.length - 1];
        const lastHumidity = humidities[humidities.length - 1];

        if (lastTimestamp !== labels[labels.length - 1]) {
          labels.shift();
          labels.push(lastTimestamp);

          tempDataset.shift();
          tempDataset.push(lastTemp);

          humidityDataset.shift();
          humidityDataset.push(lastHumidity);

          chart.update();
        }
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
