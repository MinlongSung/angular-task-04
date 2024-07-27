/// <reference types="node" />
import { Component, OnInit, inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  GaleryPhotos,
  ListPositions,
  PhotoSize,
} from '../../shared/interfaces/gallery.interace';
import { GalleryService } from '../../shared/services/gallery.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgFor],
  animations: [
    trigger('openClose', [
      state('small', style({
        height: '200px',
      })),
      state('medium', style({
        height: '250px',
      })),
      state('large', style({
        height: '300px',
      })),

      transition('small <=> medium, medium <=> large, large <=> small', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss',
})
export class GaleryComponent implements OnInit {
  photos: GaleryPhotos[] = [];
  galleryService = inject(GalleryService);

  currentPhoto: number = 0;
  async ngOnInit(): Promise<void> {
    try {
      this.photos = await this.galleryService.getPhotos();
      this.changeCurrentPhoto(0);
    } catch (e) {
      console.log(e);
    }
  }

  isPlaying: boolean = false;
  interval: NodeJS.Timeout | undefined;
  togglePlay() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.interval = setInterval(() => {
        this.changeCurrentPhoto(++this.currentPhoto);
      }, 2000);
    } else {
      clearInterval(this.interval);
    }
  }

  PhotoSize = PhotoSize;
  selectedPhotoSize: PhotoSize = PhotoSize.Medium;
  switchPhotoSize(size: PhotoSize): void {
    if (
      (this.selectedPhotoSize === PhotoSize.Large && size === PhotoSize.Large) ||
      (this.selectedPhotoSize === PhotoSize.Small && size === PhotoSize.Small)
    ) {
      this.selectedPhotoSize = PhotoSize.Medium;
      return;
    }

    this.selectedPhotoSize = size;
  }

  changeCurrentPhoto(nextCurrPhoto: number) {
    if (nextCurrPhoto > this.photos.length - 1) {
      this.currentPhoto = 0;
      // this.changeVisiblePhotos(false, { start: this.currentPhoto, end: this.photosBySection });
      return;
    }

    if (nextCurrPhoto < 0) {
      this.currentPhoto = this.photos.length - 1;
      /**
       * si el resto es 0, significa que el número de fotos visibles nunca cambia
       * con lo que podemos sólo restar las visibles a las totales para obtener el indice inical
       * en caso contario calcularemos el número de fotos visibles en la última iteración del listado y se lo restaremos al total
       */

      // this.changeVisiblePhotos(false, {
      //   start: this.photos.length % this.photosBySection === 0 ? this.photos.length - this.photosBySection : this.photos.length - (this.photos.length % this.photosBySection),
      //   end: this.photos.length
      // });
      return;
    }

    this.currentPhoto = nextCurrPhoto;
    // if (this.currentPhoto < this.currentIndex.start) this.changeVisiblePhotos();
    // else if (this.currentPhoto > this.currentIndex.end - 1) this.changeVisiblePhotos(true);
  }

  photosBySection: number = 3;
  currentIndex: ListPositions = {
    start: 0,
    end: this.photosBySection,
  };
  //* If want the below list to follow the current selected photo, uncomment related lines on changeCurrentPhoto
  changeVisiblePhotos(forward?: boolean, forcedPositions?: ListPositions): void {
    if (forcedPositions) {
      this.currentIndex = forcedPositions;
      return;
    }

    if (forward) {
      if ((this.currentIndex.end + this.photosBySection) > this.photos.length) {
        this.currentIndex.start = this.currentIndex.end;
        this.currentIndex.end = this.photos.length;
        return;
      }

      this.currentIndex.start += this.photosBySection;
      this.currentIndex.end += this.photosBySection;
      return;
    }

    if ((this.currentIndex.end - this.currentIndex.start) < this.photosBySection) {
      this.currentIndex.end -= (this.currentIndex.end - this.currentIndex.start);
      this.currentIndex.start -= this.photosBySection;
      return;
    }

    this.currentIndex.start -= this.photosBySection;
    this.currentIndex.end -= this.photosBySection;
  }
}
