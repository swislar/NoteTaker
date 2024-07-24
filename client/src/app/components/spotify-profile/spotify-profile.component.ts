import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, Input } from '@angular/core';
import { URLSearchParams } from 'url';
import { SpotifyService } from '../../services/spotify.service';
// import dotenv from 'dotenv';
// dotenv.config({ path: '../../../../.env' });

@Component({
  selector: 'app-spotify-profile',
  standalone: true,
  imports: [],
  templateUrl: './spotify-profile.component.html',
  styleUrl: './spotify-profile.component.css',
  providers: [SpotifyService],
})
@Injectable({ providedIn: 'root' })
export class SpotifyProfileComponent {
  // @Input({ required: true }) endPoint!: string;
  constructor(private spotifyService: SpotifyService) {}

  userLogin() {
    this.spotifyService.login();
  }
}
