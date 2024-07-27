export interface GaleryPhotos {
  id: number;
  src: string;
  title: string;
}

export enum PhotoSize {
  Small,
  Medium,
  Large,
}

export interface ListPositions {
  start: number;
  end: number;
}
