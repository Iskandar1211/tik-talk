import {Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {canActivateAuth} from './auth/access.guard';
import {ProfileSettingsComponent} from "./pages/profile-settings/profile-settings.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: SearchPageComponent},
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'profile/settings/:id', component: ProfileSettingsComponent},
    ],
    canActivate: [canActivateAuth],
  },
  {path: 'login', component: LoginPageComponent},
];
