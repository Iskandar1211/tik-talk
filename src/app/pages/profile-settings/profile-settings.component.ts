import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {ProfileService} from "../../data/services/profile.service";
import {ActivatedRoute} from "@angular/router";
import {toObservable} from "../../helpers/toObservable";
import {switchMap} from "rxjs";
import {Profile} from "../../data/services/interfaces/profile.interface";

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ImgUrlPipe,
    ProfileHeaderComponent,
    ReactiveFormsModule,
    SvgIconComponent
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss'
})
export class ProfileSettingsComponent {
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),

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

  ngOnInit() {
    const profile = this.profileService.me()
    this.profileForm.patchValue({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      username: profile?.username,
      description:profile?.description
    })

  }
}
