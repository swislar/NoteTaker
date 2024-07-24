import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVarsService } from '../../services';
import { Buffer } from 'buffer';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'app-spotify-callback',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './spotify-callback.component.html',
  styleUrl: './spotify-callback.component.css',
})
export class SpotifyCallbackComponent implements OnInit {
  private code: string = '';
  private state: string = '';
  private error: string = '';
  private requestState: string = '';
  private redirectUri: string = '';
  private clientId: string = '';
  private clientSecret: string = '';
  private tokenUrl: string = 'https://accounts.spotify.com/api/token';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private globalVar: GlobalVarsService
  ) {}

  ngOnInit(): void {
    this.globalVar.spotifyRedirectUri$.subscribe((data) => {
      this.redirectUri = data;
    });
    this.globalVar.spotifyClientId$.subscribe((data) => {
      this.clientId = data;
    });
    this.globalVar.spotifyClientSecret$.subscribe((data) => {
      this.clientSecret = data;
    });
    this.globalVar.spotifyRequestState$.subscribe((data) => {
      this.requestState = data;
    });
    this.route.queryParams.subscribe((params) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('code', params['code']);
        localStorage.setItem('state', params['state']);
        localStorage.setItem('error', params['error']);
        this.code = params['code'];
        this.state = params['state'];
        this.error = params['error'];
      }
    });
    this.getAccessToken();
  }

  getAccessToken() {
    if (this.requestState !== this.state || !this.code || this.error) {
      console.log('Authentication error occured!');
    } else {
      const headers = new HttpHeaders()
        .set('content-type', 'application/x-www-form-urlencoded')
        .set(
          'Authorization',
          'Basic ' +
            Buffer.from(this.clientId + ':' + this.clientSecret).toString(
              'base64'
            )
        );
      const body = new HttpParams()
        .set('code', String(localStorage.getItem('code')))
        .set('redirect_uri', this.redirectUri)
        .set('grant_type', 'authorization_code');

      console.log('Sending post request...');
      console.log('Post url: ', this.tokenUrl, body.toString(), { headers });
      this.http
        .post<any>(this.tokenUrl, body.toString(), { headers })
        .subscribe((data) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
        });
    }
    this.router.navigate(['/statify']);
  }
}
