import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[rotate]',
  standalone: true,
})
export class RotateImageDirective implements OnInit {
  @Input() rotate?: number;
  @Input() step?: number;

  private defaultInitDegrees: number = 0;
  private defaultStepDegrees: number = 10;
  private shiftPressed: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.rotateImg(this.rotate ?? this.defaultInitDegrees);
  }

  @HostListener('document:keydown.shift') onShiftKeyDown() {
    this.shiftPressed = true;
  }

  @HostListener('document:keyup.shift') onShiftKeyUp() {
    this.shiftPressed = false;
  }

  isShiftPressed(): boolean {
    return this.shiftPressed;
  }

  @HostListener('click') onClick() {
    this.rotateImg(this.step || this.defaultStepDegrees);
  }

  private rotateImg(rotate: number) {
    const el = this.el.nativeElement;
    const elStyles = el.style;

    let currentRotation = elStyles.transform
      ? parseInt(elStyles.transform.replace('rotate(', '').replace('deg)', ''))
      : 0;

    if (this.isShiftPressed()) currentRotation -= rotate;
    else currentRotation += rotate;

    if (currentRotation >= 360) currentRotation -= 360;
    else if (currentRotation < 0) currentRotation += 360;

    elStyles.transform = `rotate(${currentRotation}deg)`;
  }
}
