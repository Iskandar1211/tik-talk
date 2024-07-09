import {Component, effect, inject, ViewChild} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {ProfileService} from "../../data/services/profile.service";
import {ActivatedRoute} from "@angular/router";
import {toObservable} from "../../helpers/toObservable";
import {firstValueFrom, switchMap} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ImgUrlPipe,
    ProfileHeaderComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    AvatarUploadComponent
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss'
})
export class ProfileSettingsComponent {
  formBuilder = inject(FormBuilder)

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = toObservable(this.profileService.me);
  stacks:string[] = []

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );

  constructor() {
    effect(() => {
      const currentUser = this.profileService.me()
      const skills = currentUser?.stack ? currentUser.stack : ['React','Typescript']
      this.stacks.push(...skills)
      if (currentUser) {
        this.profileForm.patchValue({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          username: currentUser.username,
          description: currentUser.description,
          stack: currentUser.stack.join(',')
        });
      }
    })
  }

  onSave(){
    this.profileForm.markAsTouched()
    this.profileForm.updateValueAndValidity()

    if(this.profileForm.invalid) return

    if(this.avatarUploader.avatar){
     firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    firstValueFrom(this.profileService.pathProfile({
      // @ts-ignore
      firstName: this.profileForm.value.firstName,
      // @ts-ignore
      lastName: this.profileForm.value.lastName,
      // @ts-ignore
      username: this.profileForm.value.username,
      // @ts-ignore
      description: this.profileForm.value.description,
      stack: this.profileForm.value.stack?.split(','),
    }))



  }
}
