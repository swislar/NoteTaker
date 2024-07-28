import { Component } from '@angular/core';
import {
  HeaderComponent,
  SliderComponent,
  StatifyMenuComponent,
} from '../../components';
import { SpotifyService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyIconComponent } from '../../icons';
import { HttpClient } from '@angular/common/http';
import {
  NgIf,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-statify',
  standalone: true,
  imports: [
    HeaderComponent,
    SpotifyIconComponent,
    StatifyMenuComponent,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    SliderComponent,
    ButtonModule,
  ],
  templateUrl: './statify.component.html',
  styleUrl: './statify.component.css',
  providers: [SpotifyService],
})
export class StatifyComponent {
  topListenTracks: any;
  topListenArtists: any;
  musicRecommendationTracks: any;
  userLoggedIn: boolean = false;
  userSpotifyDisplayName: string = '';
  userSpotifyProfilePicture: string = '';
  displayContent: string = '';
  musicLimit: number = 20;
  musicGenres: string[] = ['pop'];
  musicArtists: string[] = [];
  musicTracks: string[] = [];
  musicAcousticness: number[] = [0, 100];
  musicEnergy: number[] = [0, 100];
  musicInstrumentals: number[] = [0, 100];
  musicPopularity: number[] = [0, 100];
  musicTempo: number[] = [90, 120];

  // TODO: ADD ANIMATIONS USING GSAP + PINNING
  // TODO: GET RECOMMENDATIONS PAGE
  // TODO: IF ERROR ACCESS TOKEN EXPIRED -> REQUEST FOR A NEW TOKEN

  constructor(private spotifyService: SpotifyService, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('spotifyLoggedIn') !== 'true') {
        localStorage.setItem('spotifyLoggedIn', 'false');
        this.userLoggedIn = false;
      } else {
        this.userLoggedIn = true;
        this.getSpotifyUserInfo();
      }
    }
  }

  spotifyLogin() {
    this.spotifyService.login();
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('spotifyLoggedIn', 'true');
    }
  }

  getSpotifyUserInfo(): void {
    this.spotifyService.getDisplayName().subscribe((data: any) => {
      this.userSpotifyDisplayName = data.display_name;
      this.userSpotifyProfilePicture = data.images[0].url;
    });
  }

  getUserTopListens(
    type: 'artists' | 'tracks',
    range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit: number = 20,
    offset: number = 0
  ) {
    this.spotifyService
      .getUserStatistics(type, range, limit, offset)
      .subscribe({
        next: (data) => {
          if (type === 'tracks') {
            this.topListenTracks = data.items;
            this.topListenArtists = undefined;
          }
          if (type === 'artists') {
            this.topListenArtists = data.items;
            this.topListenTracks = undefined;
          }
          console.log(data.items);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Request complete!');
        },
      });
    this.displayContent = 'userTopListens';
  }

  handleTopListensByArtist() {
    this.getUserTopListens('artists', 'medium_term', 10);
  }

  handleTopListensByTrack() {
    this.getUserTopListens('tracks', 'medium_term');
  }

  capitaliseFirst(genre: string): string {
    return genre.slice(0, 1).toUpperCase() + genre.slice(1);
  }

  handleTracksLast3Months() {
    this.getUserTopListens('tracks', 'short_term');
  }

  handleTracksLast6Months() {
    this.getUserTopListens('tracks', 'medium_term');
  }

  handleTracksLast12Months() {
    this.getUserTopListens('tracks', 'long_term');
  }

  handleArtistsLast3Months() {
    this.getUserTopListens('artists', 'short_term');
  }

  handleArtistsLast6Months() {
    this.getUserTopListens('artists', 'medium_term');
  }

  handleArtistsLast12Months() {
    this.getUserTopListens('artists', 'long_term');
  }

  handleGetMusicRecommendation(): void {
    this.spotifyService
      .getMusicRecommendation(
        this.musicLimit,
        this.musicGenres,
        this.musicArtists,
        this.musicTracks,
        this.musicAcousticness[0] / 100,
        this.musicAcousticness[1] / 100,
        this.musicEnergy[0] / 100,
        this.musicEnergy[1] / 100,
        this.musicInstrumentals[0] / 100,
        this.musicInstrumentals[1] / 100,
        this.musicPopularity[0],
        this.musicPopularity[1],
        this.musicTempo[0],
        this.musicTempo[1]
      )
      .subscribe({
        next: (data) => {
          this.musicRecommendationTracks = data.tracks;
          console.log(data.tracks);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Request complete!');
        },
      });
    this.displayContent = 'getMusicRecommendation';
  }

  updateLimit(event: Event) {
    //
  }

  updateAcousticness(newValue: number[]) {
    this.musicAcousticness = newValue;
    console.log('Acousticness updated:', newValue);
  }
  updateEnergy(newValue: number[]) {
    this.musicEnergy = newValue;
    console.log('Energy updated:', newValue);
  }
  updateInstrumentals(newValue: number[]) {
    this.musicInstrumentals = newValue;
    console.log('Instrumentals updated:', newValue);
  }
  updatePopularity(newValue: number[]) {
    this.musicPopularity = newValue;
    console.log('Popularity updated:', newValue);
  }
  updateTempo(newValue: number[]) {
    this.musicTempo = newValue;
    console.log('Tempo updated:', newValue);
  }

  menuExpanded(showSliders: boolean) {
    console.log('Sliders expanded: ', showSliders);
  }

  tracker(index: number, item: any): any {
    return item.id;
  }
  navigateToMain() {
    this.router.navigate(['/main']);
  }
}
