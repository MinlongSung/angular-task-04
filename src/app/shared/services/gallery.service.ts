import { Injectable } from '@angular/core';

import { GaleryPhotos } from '../interfaces/gallery.interace';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  constructor() {}

  async getPhotos(): Promise<GaleryPhotos[]> {
    return new Promise((resolve) => {
      const photos: GaleryPhotos[] = [
        {
          id: 1,
          src: '../../../assets/coliseo-romano.jpg',
          title: 'romanian coliseum',
        },
        {
          id: 2,
          src: '../../../assets/estatua-de-la-libertad.jpg',
          title: 'statue of liberty',
        },
        {
          id: 3,
          src: '../../../assets/eye-of-london.jpg',
          title: 'eye of london',
        },
        {
          id: 4,
          src: '../../../assets/gran-muralla-china.jpg',
          title: 'greate chinese wall',
        },
        {
          id: 5,
          src: '../../../assets/monte-fuji.jpg',
          title: 'mount fuji',
        },
        {
          id: 6,
          src: '../../../assets/park-guell.jpg',
          title: 'park guell',
        },
        {
          id: 7,
          src: '../../../assets/piramides-de-egipto.jpg',
          title: 'pyramids of egypt',
        },
        {
          id: 8,
          src: '../../../assets/torre-eiffel.jpg',
          title: 'eiffel tower',
        },
      ];


      setTimeout(() => {
        resolve(photos);
      }, 300);
    });
  }
}
