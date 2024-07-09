import {Component, Input, signal} from '@angular/core';
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {DndDirective} from "../../../common-ui/directives/dnd.directive";
import {FormsModule} from "@angular/forms";
import {ImgUrlPipe} from "../../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective, FormsModule, ImgUrlPipe],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  @Input({required: true}) avatarUrl!: string
  preview = signal<string>('/assets/imgs/user-default.png')
  avatar:File | null = null

  fileBrouserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file)
  }

  onFileDroped(file: File) {
    this.processFile(file)
  }
  processFile(file?: File | null) {
    if (!file || !file.type.match('image')) return

    const reader = new FileReader();
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }
    reader.readAsDataURL(file);
    this.avatar = file
  }

  ngOnInit(): void {
    this.preview.set(this.avatarUrl)
  }
}
