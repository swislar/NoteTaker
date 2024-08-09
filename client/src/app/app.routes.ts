import { Routes } from '@angular/router';
import {
  MainComponent,
  LoginComponent,
  HomeComponent,
  SummaryComponent,
  AboutComponent,
  StatifyComponent,
  SpotifyCallbackComponent,
  TestComponent,
} from './pages';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'statify', component: StatifyComponent },
  { path: 'spotify-callback', component: SpotifyCallbackComponent },
  { path: 'test', component: TestComponent },
];
