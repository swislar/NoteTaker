import { Component, OnInit } from '@angular/core';
import {
  HeaderComponent,
  StatifyNavComponent,
  StatifyGraphComponent,
} from '../../components';
import { SpotifyService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyIconComponent } from '../../icons';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  NgIf,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-statify',
  standalone: true,
  imports: [
    HeaderComponent,
    SpotifyIconComponent,
    StatifyNavComponent,
    StatifyGraphComponent,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    ButtonModule,
    FieldsetModule,
    FormsModule,
    AutoCompleteModule,
    FloatLabelModule,
  ],
  templateUrl: './statify.component.html',
  styleUrl: './statify.component.css',
  providers: [SpotifyService],
})
export class StatifyComponent implements OnInit {
  topListenTracks: any;
  topListenArtists: any;
  musicStreamedReleaseDate: string[] = [];
  musicStreamedPopularityScore: number[] = [];
  musicStreamedDurationMs: number[] = [];
  musicStreamedName: string[] = [];
  artistFollowerCount: number[] = [];
  musicRecommendationTracks: any;
  userLoggedIn: boolean = false;
  userSpotifyDisplayName: string = '';
  userSpotifyProfilePicture: string = '';
  displayContent: 'streams' | 'recommendations' | null = null;
  displayStreamType: 'artists' | 'tracks' = 'tracks';
  displayStreamRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term';
  musicLimit: number = 20;
  musicGenres: string[] = ['Pop'];
  musicArtists: string[] = [];
  musicTracks: string[] = [];
  musicAcousticness: number[] = [0, 100];
  musicEnergy: number[] = [0, 100];
  musicInstrumentals: number[] = [0, 100];
  musicPopularity: number[] = [0, 100];
  musicTempo: number[] = [90, 120];
  musicGenreList: string[] = [];
  filteredGenre: string[] = [];
  selectedGenre: string = '';
  fieldsetLegend: string = '';

  // TODO: ADD ANIMATIONS USING GSAP + PINNING
  // TODO: GET RECOMMENDATIONS PAGE
  // TODO: IF ERROR ACCESS TOKEN EXPIRED -> REQUEST FOR A NEW TOKEN

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
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
      console.log('Profile picture url: ', data.images[0].url);
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
            this.musicStreamedReleaseDate = data.items.map((music: any) => {
              return music.album.release_date;
            });
            this.musicStreamedPopularityScore = data.items.map((music: any) => {
              return music.popularity;
            });
            this.musicStreamedDurationMs = data.items.map((music: any) => {
              return music.duration_ms;
            });
            this.musicStreamedName = data.items.map((music: any) => {
              return music.name;
            });
            this.topListenArtists = undefined;
          }
          if (type === 'artists') {
            this.topListenArtists = data.items;
            this.musicStreamedName = data.items.map((music: any) => {
              return music.name;
            });
            this.musicStreamedPopularityScore = data.items.map((music: any) => {
              return music.popularity;
            });
            this.artistFollowerCount = data.items.map((music: any) => {
              return music.followers.total;
            });
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
    this.displayContent = 'streams';
    this.fieldsetLegend =
      'Top streamed ' +
      this.capitaliseFirst(type) +
      ' of ' +
      this.handleDataRangeDisplayStatus(range);
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
    // this.musicRecommendationTracks = undefined;
    if (this.musicGenreList.length === 0) {
      this.spotifyService.getMusicGenres().subscribe((data) => {
        console.log(data);
        data.genres.map((genre: string) => {
          this.musicGenreList.push(this.capitaliseFirst(genre));
        });
      });
    }
    if (this.musicGenres.length === 0) {
      this.musicGenres = ['Pop'];
    }
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
    this.displayContent = 'recommendations';
    this.fieldsetLegend = 'Recommendations';
  }

  updateLimit(event: Event) {
    //
  }

  updateAcousticness(level: 'low' | 'medium' | 'high') {
    switch (level) {
      case 'low':
        this.musicAcousticness = [0, 33];
        return;
      case 'medium':
        this.musicAcousticness = [34, 66];
        return;
      case 'high':
        this.musicAcousticness = [67, 100];
        return;
      default:
        return;
    }
  }
  updateEnergy(level: 'low' | 'medium' | 'high') {
    switch (level) {
      case 'low':
        this.musicEnergy = [0, 33];
        return;
      case 'medium':
        this.musicEnergy = [34, 66];
        return;
      case 'high':
        this.musicEnergy = [67, 100];
        return;
      default:
        return;
    }
  }
  updateInstrumentals(level: 'low' | 'medium' | 'high') {
    switch (level) {
      case 'low':
        this.musicInstrumentals = [0, 33];
        return;
      case 'medium':
        this.musicInstrumentals = [34, 66];
        return;
      case 'high':
        this.musicInstrumentals = [67, 100];
        return;
      default:
        return;
    }
  }
  updatePopularity(level: 'low' | 'high') {
    switch (level) {
      case 'low':
        this.musicPopularity = [0, 50];
        return;
      case 'high':
        this.musicPopularity = [51, 100];
        return;
      default:
        return;
    }
  }

  updateTempo(level: 'low' | 'medium' | 'high') {
    switch (level) {
      case 'low':
        this.musicTempo = [0, 80];
        return;
      case 'medium':
        this.musicTempo = [81, 119];
        console.log(this.musicTempo);
        return;
      case 'high':
        this.musicTempo = [120, 160];
        return;
      default:
        return;
    }
  }

  updateMusicGenreList(genreList: string[]) {
    this.musicGenres = genreList;
    console.log(genreList);
  }

  tracker(index: number, item: any): any {
    return item.id;
  }

  navigateToMain() {
    this.router.navigate(['/main']);
  }

  updateDisplayStreamClass(newClass: 'streams' | 'recommendations') {
    this.displayContent = newClass;
  }

  updateDisplayStreamType(newType: 'artists' | 'tracks') {
    this.displayStreamType = newType;
  }

  updateDisplayStreamRange(
    newRange: 'short_term' | 'medium_term' | 'long_term'
  ) {
    this.displayStreamRange = newRange;
  }

  handleDataRangeDisplayStatus(
    range: 'short_term' | 'medium_term' | 'long_term'
  ) {
    switch (range) {
      case 'short_term':
        return 'Last 3 months';
      case 'medium_term':
        return 'Last 6 months';
      case 'long_term':
        return 'Last year';
    }
  }

  filterGenre(event: AutoCompleteCompleteEvent) {
    let filteredResult: string[] = [];
    let query = event.query;

    for (let i = 0; i < this.musicGenreList.length; i++) {
      let genre = this.musicGenreList[i];
      if (genre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filteredResult.push(genre);
      }
    }
    this.filteredGenre = filteredResult;
  }

  querySelectedGenre(event: any) {
    this.musicGenres = [this.selectedGenre];
    this.handleGetMusicRecommendation();
  }

  identifyStreamingType(): 'tracks' | 'artists' {
    if (this.topListenArtists) {
      return 'artists';
    } else return 'tracks';
  }
}
