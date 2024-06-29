import {AsyncPipe, NgStyle} from '@angular/common';
import {Component, Signal, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {toObservable} from '../../helpers/toObservable';
import {CustomInputComponent} from "../../common-ui/cusotom-input/custom-input.component";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  imports: [ProfileHeaderComponent, AsyncPipe, CustomInputComponent, NgStyle, ImgUrlPipe, SvgIconComponent, ReactiveFormsModule]
})
export class ProfilePageComponent {

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    aboutMe: new FormControl('', Validators.required),

  })

  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = toObservable(this.profileService.me);
  stacks = ['JS', 'CSS', 'React', 'Next JS', 'Angular'];

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
}
