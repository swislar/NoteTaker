import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalVarsService {
  private spotifyRequestState = new BehaviorSubject<string>('99HapplesFully99');
  private spotifyRedirectUri = new BehaviorSubject<string>(
    'http://localhost:4200/spotify-callback'
  );
  private spotifyClientId = new BehaviorSubject<string>(
    'ef3b5a65856947038adf51a70280d56d'
  );
  private spotifyClientSecret = new BehaviorSubject<string>(
    '6062f256d6c74923b3c24f93621d2691'
  );

  spotifyRequestState$ = this.spotifyRequestState.asObservable();
  spotifyRedirectUri$ = this.spotifyRedirectUri.asObservable();
  spotifyClientId$ = this.spotifyClientId.asObservable();
  spotifyClientSecret$ = this.spotifyClientSecret.asObservable();

  constructor() {}
}
