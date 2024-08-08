import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyIconComponent } from '../../icons';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-statify-nav',
  standalone: true,
  imports: [NgIf, NgFor, SpotifyIconComponent, PanelMenuModule],
  templateUrl: './statify-nav.component.html',
  styleUrl: './statify-nav.component.css',
})
export class StatifyNavComponent implements OnInit {
  @Input() userSpotifyDisplayName!: String;
  @Input() userSpotifyProfilePicture!: String;
  @Input() userLoggedIn!: boolean;
  @Input() spotifyLogin!: () => void;
  @Input() getUserTopListens!: (
    type: 'artists' | 'tracks',
    range: 'short_term' | 'medium_term' | 'long_term'
    // limit: number,
    // offset: number
  ) => void;
  @Input() handleGetMusicRecommendation!: () => void;
  @Input() navigateToMain!: () => void;
  @Input() updateAcousticness!: (event: any) => void;
  @Input() updateEnergy!: (event: any) => void;
  @Input() updateInstrumentals!: (event: any) => void;
  @Input() updatePopularity!: (event: any) => void;
  @Input() updateTempo!: (event: any) => void;
  @Input() musicGenreList!: string[];
  @Output() viewSpotifyDataClass = new EventEmitter<
    'streams' | 'recommendations'
  >();
  @Output() viewSpotifyDataType = new EventEmitter<'artists' | 'tracks'>();
  @Output() viewSpotifyDataRange = new EventEmitter<
    'short_term' | 'medium_term' | 'long_term'
  >();

  navbarItems: MenuItem[] = [];
  inputListenType: 'artists' | 'tracks' = 'tracks';
  inputListenRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term';
  dataClass: 'streams' | 'recommendations' = 'streams';
  dataType: 'artists' | 'tracks' = 'tracks';
  dataRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term';

  ngOnInit(): void {
    this.navbarItems = [
      {
        id: '0',
        label: 'Top Streams',
        icon: 'pi pi-trophy',
        command: () => {
          this.navbarItems.forEach((item) => {
            if (item.id === '0' && !item.expanded) {
              this.handleSpotifyDataClass('streams');
              return;
            }
          });
        },
        items: [
          {
            id: '0.0',
            label: 'Type',
            icon: 'pi pi-headphones',
            items: [
              {
                id: '0.0.0',
                label: 'Artists',
                command: () => {
                  this.inputListenType = 'artists';
                  this.handleSpotifyDataType('artists');
                },
              },
              {
                id: '0.0.1',
                label: 'Tracks',
                command: () => {
                  this.inputListenType = 'tracks';
                  this.handleSpotifyDataType('tracks');
                },
              },
            ],
          },
          {
            id: '0.1',
            label: 'Range',
            icon: 'pi pi-calendar-clock',
            items: [
              {
                id: '0.1.0',
                label: 'Last 3 months',
                command: () => {
                  this.inputListenRange = 'short_term';
                  this.handleSpotifyDataRange('short_term');
                },
              },
              {
                id: '0.1.1',
                label: 'Last 6 months',
                command: () => {
                  this.inputListenRange = 'medium_term';
                  this.handleSpotifyDataRange('medium_term');
                },
              },
              {
                id: '0.1.2',
                label: 'Last year',
                command: () => {
                  this.inputListenRange = 'long_term';
                  this.handleSpotifyDataRange('long_term');
                },
              },
            ],
          },
          {
            id: '0.2',
            label: 'Get streaming data',
            icon: 'pi pi-send',
            command: () => {
              this.getUserTopListens(
                this.inputListenType,
                this.inputListenRange
              );
            },
          },
        ],
      },
      {
        id: '1',
        label: 'Recommendations',
        icon: 'pi pi-thumbs-up',
        command: () => {
          this.navbarItems.forEach((item) => {
            if (item.id === '1' && !item.expanded) {
              this.handleSpotifyDataClass('recommendations');
              return;
            }
          });
        },
        items: [
          {
            id: '1.0',
            label: 'Trending',
            icon: 'pi pi-chart-line',
            items: [
              {
                id: '1.0.0',
                label: 'Yes',
                command: () => {
                  this.updatePopularity('high');
                },
              },
              {
                id: '1.0.1',
                label: 'No',
                command: () => {
                  this.updatePopularity('low');
                },
              },
            ],
          },
          {
            id: '1.1',
            label: 'Acousticness',
            icon: 'pi pi-headphones',
            items: [
              {
                id: '1.1.0',
                label: 'Low',
                command: () => {
                  this.updateAcousticness('low');
                },
              },
              {
                id: '1.1.1',
                label: 'Medium',
                command: () => {
                  this.updateAcousticness('medium');
                },
              },
              {
                id: '1.1.2',
                label: 'High',
                command: () => {
                  this.updateAcousticness('high');
                },
              },
            ],
          },
          {
            id: '1.2',
            label: 'Energy',
            icon: 'pi pi-bolt',
            items: [
              {
                id: '1.2.0',
                label: 'Low',
                command: () => {
                  this.updateEnergy('low');
                },
              },
              {
                id: '1.2.1',
                label: 'Medium',
                command: () => {
                  this.updateEnergy('medium');
                },
              },
              {
                id: '1.2.2',
                label: 'High',
                command: () => {
                  this.updateEnergy('high');
                },
              },
            ],
          },
          {
            id: '1.3',
            label: 'Tempo',
            icon: 'pi pi-heart-fill',
            items: [
              {
                id: '1.3.0',
                label: 'Low',
                command: () => {
                  this.updateTempo('low');
                },
              },
              {
                id: '1.3.1',
                label: 'Medium',
                command: () => {
                  this.updateTempo('medium');
                },
              },
              {
                id: '1.3.2',
                label: 'High',
                command: () => {
                  this.updateTempo('high');
                },
              },
            ],
          },
          {
            id: '1.4',
            label: 'Instrumentalness',
            icon: 'pi pi-volume-down',
            items: [
              {
                id: '1.3.0',
                label: 'Low',
                command: () => {
                  this.updateInstrumentals('low');
                },
              },
              {
                id: '1.3.1',
                label: 'Medium',
                command: () => {
                  this.updateInstrumentals('medium');
                },
              },
              {
                id: '1.3.2',
                label: 'High',
                command: () => {
                  this.updateInstrumentals('high');
                },
              },
            ],
          },
          {
            id: '1.5',
            label: 'Get Recommendations',
            icon: 'pi pi-send',
            command: () => {
              this.handleGetMusicRecommendation();
            },
          },
        ],
      },
    ];
  }

  handleSpotifyDataClass(
    spotifyDataClass: 'streams' | 'recommendations'
  ): void {
    this.dataClass = spotifyDataClass;
    this.viewSpotifyDataClass.emit(this.dataClass);
  }

  handleSpotifyDataType(spotifyDataType: 'artists' | 'tracks'): void {
    this.dataType = spotifyDataType;
    this.viewSpotifyDataType.emit(this.dataType);
  }

  handleSpotifyDataRange(
    spotifyDataRange: 'short_term' | 'medium_term' | 'long_term'
  ): void {
    this.dataRange = spotifyDataRange;
    this.viewSpotifyDataRange.emit(this.dataRange);
  }
}
