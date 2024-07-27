import { Component } from '@angular/core';
import { RotateImageDirective } from '../../shared/directives/rotate-image.directive';

@Component({
  selector: 'app-rotate',
  standalone: true,
  imports: [RotateImageDirective],
  templateUrl: './rotate.component.html',
  styleUrl: './rotate.component.scss'
})
export class RotateComponent {

}
