import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-statify-graph',
  standalone: true,
  imports: [FieldsetModule, ChartModule],
  templateUrl: './statify-graph.component.html',
  styleUrl: './statify-graph.component.css',
})
export class StatifyGraphComponent implements OnInit, OnChanges {
  @Input() musicReleaseDate: string[] = [];
  @Input() musicPopularityScore: number[] = [];
  @Input() musicDurationMs: number[] = [];
  @Input() musicStreamedName: string[] = [];
  @Input() artistFollowerCount: number[] = [];
  @Input() streamType: 'tracks' | 'artists' = 'tracks';
  musicAge: number[] = [];
  musicDurationMins: number[] = [];
  computedPolarChartData: any;
  polarChartData: any;
  polarChartOptions: any;
  barChartData: any;
  barChartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.streamType) {
      case 'tracks':
        this.computeMusicAge();
        this.computeMusicMinutes();
        this.barChartData = {
          labels: this.musicStreamedName,
          datasets: [
            {
              label: 'Trendiness',
              fill: true,
              color: 'blue',
              yAxisID: 'y1',
              data: this.musicPopularityScore,
            },
            {
              label: 'Age (Months)',
              fill: true,
              color: 'purple',
              yAxisID: 'y2',
              data: this.musicAge,
            },
          ],
        };
        this.barChartOptions = {
          stacked: false,
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: true,
            },
          },
          scales: {
            y1: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                min: 0,
                max: 100,
              },
            },
            y2: {
              type: 'linear',
              display: true,
              position: 'right',
            },
          },
        };
        return;

      case 'artists':
        this.barChartData = {
          labels: this.musicStreamedName,
          datasets: [
            {
              label: 'Followers',
              fill: true,
              color: 'blue',
              yAxisID: 'y1',
              data: this.artistFollowerCount,
            },
            {
              label: 'Popularity',
              fill: true,
              color: 'purple',
              yAxisID: 'y2',
              data: this.musicPopularityScore,
            },
          ],
        };
        this.barChartOptions = {
          stacked: false,
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: true,
            },
          },
          scales: {
            y1: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y2: {
              type: 'linear',
              display: true,
              position: 'right',
            },
          },
        };
        return;

      default:
        return;
    }
  }

  ngOnInit(): void {
    switch (this.streamType) {
      case 'tracks':
        this.computeMusicAge();
        this.computeMusicMinutes();
        this.barChartData = {
          labels: this.musicStreamedName,
          datasets: [
            {
              label: 'Trendiness',
              fill: true,
              color: 'blue',
              yAxisID: 'y1',
              data: this.musicPopularityScore,
            },
            {
              label: 'Age (Months)',
              fill: true,
              color: 'purple',
              yAxisID: 'y2',
              data: this.musicAge,
            },
          ],
        };
        this.barChartOptions = {
          stacked: false,
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: true,
            },
          },
          scales: {
            y1: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                min: 0,
                max: 100,
              },
            },
            y2: {
              type: 'linear',
              display: true,
              position: 'right',
            },
          },
        };
        return;

      case 'artists':
        this.barChartData = {
          labels: this.musicStreamedName,
          datasets: [
            {
              label: 'Followers',
              fill: true,
              color: 'blue',
              yAxisID: 'y1',
              data: this.artistFollowerCount,
            },
            {
              label: 'Popularity',
              fill: true,
              color: 'purple',
              yAxisID: 'y2',
              data: this.musicPopularityScore,
            },
          ],
        };
        this.barChartOptions = {
          stacked: false,
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: true,
            },
          },
          scales: {
            y1: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y2: {
              type: 'linear',
              display: true,
              position: 'right',
            },
          },
        };
        return;

      default:
        return;
    }
  }

  computeMusicAge() {
    this.musicAge = this.musicReleaseDate.map((date) => {
      const releaseMonth = new Date(date).getMonth();
      const releaseYear = new Date(date).getFullYear();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const ageInMonths =
        (currentYear - releaseYear) * 12 + (currentMonth - releaseMonth);
      return Number(ageInMonths.toString());
    });
  }

  computeMusicMinutes() {
    this.musicDurationMins = this.musicDurationMs.map((duration) => {
      return duration / 60000;
    });
  }

  average(array: number[]) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i];
    }
    return total / array.length;
  }

  computePolarChartData() {
    const avgAge = this.average(this.musicAge);
    const avgPopularity = this.average(this.musicPopularityScore);
    const avgDuration = this.average(this.musicDurationMins);
    this.computedPolarChartData = [avgAge, avgPopularity, avgDuration];
  }
}
