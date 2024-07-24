import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { GlobalVarsService } from './';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private redirectUri: string = '';
  private clientId: string = '';
  private requestState: string = '';
  private accessToken: string = '';

  constructor(private globalVar: GlobalVarsService, private http: HttpClient) {
    this.globalVar.spotifyRedirectUri$.subscribe((data) => {
      this.redirectUri = data;
    });
    this.globalVar.spotifyClientId$.subscribe((data) => {
      this.clientId = data;
    });
    this.globalVar.spotifyRequestState$.subscribe((data) => {
      this.requestState = data;
    });
  }

  login(): void {
    const endPointUrl =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        scope: 'user-top-read user-read-private user-read-email',
        show_dialog: 'false',
        state: this.requestState,
      }).toString();
    window.location.href = endPointUrl;
  }

  getDisplayName(): Observable<any> {
    const endPointUrl = 'https://api.spotify.com/v1/me';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get<any>(endPointUrl, { headers });
  }

  getUserStatistics(
    type: 'artists' | 'tracks',
    range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit: number = 20,
    offset: number = 0
  ): Observable<any> {
    const endPointUrl = `https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}&offset=${offset}`;
    // type must be 'artists' || 'tracks'
    // range must be short, medium or long_term
    // limit must be 0 - 50
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get<any>(endPointUrl, { headers });
  }

  getMusicRecommendation(
    limit: number = 20,
    seed_genres: string[] = ['pop'],
    seed_artists: string[] = [],
    seed_tracks: string[] = [],
    min_acousticness: number = 0.2,
    max_acousticness: number = 0.8,
    min_energy: number = 0.2,
    max_energy: number = 0.8,
    min_instrumentalness: number = 0.2,
    max_instrumentalness: number = 0.8,
    min_popularity: number = 0,
    max_popularity: number = 100,
    min_tempo: number = 60,
    max_tempo: number = 140
  ): Observable<any> {
    const endPointUrl = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_genres=${seed_genres
      .slice(0, 5)
      .join(',')}&seed_artists=${seed_artists
      .slice(0, 5)
      .join(',')}&seed_tracks=${seed_tracks
      .slice(0, 5)
      .join(
        ','
      )}&min_acousticness=${min_acousticness}&max_acousticness=${max_acousticness}&min_energy=${min_energy}&max_energy=${max_energy}&min_instrumentalness=${min_instrumentalness}&max_instrumentalness=${max_instrumentalness}&min_instumentalness=${min_instrumentalness}&max_instrumentalness=${max_instrumentalness}&min_popularity=${min_popularity}&max_popularity=${max_popularity}&min_tempo=${min_tempo}&max_tempo=${max_tempo}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get<any>(endPointUrl, { headers });
  }
}
