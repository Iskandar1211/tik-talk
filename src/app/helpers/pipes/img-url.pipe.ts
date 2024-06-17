import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  imgUrl = 'https://icherniakov.ru/yt-course/';
  transform(value?: string): string | null {
    if (!value) return null;
    return `${this.imgUrl}${value}`;
  }
}
