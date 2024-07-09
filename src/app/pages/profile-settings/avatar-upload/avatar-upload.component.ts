import {Component, Input, signal} from '@angular/core';
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {DndDirective} from "../../../common-ui/directives/dnd.directive";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  @Input({required: true}) avatarUrl!: string
  preview = signal<string>('/assets/imgs/user-default.png')

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
  }
}
