import {AsyncPipe, NgStyle} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink, Router} from '@angular/router';
import {switchMap} from 'rxjs';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {toObservable} from '../../helpers/toObservable';
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  imports: [ProfileHeaderComponent, AsyncPipe, NgStyle, ImgUrlPipe, SvgIconComponent, ReactiveFormsModule, RouterLink]
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router)
  me$ = toObservable(this.profileService.me);



  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
}
