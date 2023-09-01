import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringServiceService {
  constructor() {}

  textFirstletterupper(text: string): string {
    const firstletter = text[0].toUpperCase();
    let restofcontent: string = '';
    if (text[1] != null) {
      for (let i = 1; i < text.length; i++) {
        restofcontent += text[i];
      }
    }

    return firstletter + restofcontent;
  }
}
