import { Component } from '@angular/core';
import { HeaderComponent } from '../../components';
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
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-statify',
  standalone: true,
  imports: [
    HeaderComponent,
    SpotifyIconComponent,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
  ],
  templateUrl: './statify.component.html',
  styleUrls: ['./statify.component.css', './statify.component.scss'],
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
  musicRecLimit: number = 20;
  musicRecGenres: string[] = ['pop'];
  musicRecArtists: string[] = [];
  musicRecTracks: string[] = [];
  musicRecAcoutsticness: number[] = [];
  musicRecEnergy: number[] = [];
  musicRecInstrumental: number[] = [];
  musicRecPopularity: number[] = [];
  musicRecTempo: number[] = [];

  // TODO: ADD ANIMATIONS USING GSAP + PINNING
  // TODO: GET RECOMMENDATIONS PAGE

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

  handleGetMusicRecommendation(props: {
    limit?: number;
    seed_genres?: string[];
    seed_artists?: string[];
    seed_tracks?: string[];
    min_acousticness?: number;
    max_acousticness?: number;
    min_energy?: number;
    max_energy?: number;
    min_instrumentalness?: number;
    max_instrumentalness?: number;
    min_popularity?: number;
    max_popularity?: number;
    min_tempo?: number;
    max_tempo?: number;
  }) {
    const {
      limit = 20,
      seed_genres = ['pop'],
      seed_artists = [],
      seed_tracks = [],
      min_acousticness = 0.2,
      max_acousticness = 0.8,
      min_energy = 0.2,
      max_energy = 0.8,
      min_instrumentalness = 0.2,
      max_instrumentalness = 0.8,
      min_popularity = 0,
      max_popularity = 100,
      min_tempo = 60,
      max_tempo = 140,
    } = props;
    this.spotifyService
      .getMusicRecommendation(
        limit,
        seed_genres,
        seed_artists,
        seed_tracks,
        min_acousticness,
        max_acousticness,
        min_energy,
        max_energy,
        min_instrumentalness,
        max_instrumentalness,
        min_popularity,
        max_popularity,
        min_tempo,
        max_tempo
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

  onLimitChange(event: Event) {
    //
  }

  onAcouticnessChange(event: Event) {
    //
  }

  onEnergyChange(event: Event) {
    //
  }

  onInstrumentalsChange(event: Event) {
    //
  }

  onPopularityChange(event: Event) {
    //
  }

  onTempoChange() {
    //
  }

  tracker(index: number, item: any): any {
    return item.id;
  }
  navigateToMain() {
    this.router.navigate(['/main']);
  }
}
