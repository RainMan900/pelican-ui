import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl }                                                    from "@angular/forms";
import { Subject, takeUntil }                                             from "rxjs";

@Component({
  selector: 'app-kitt-spinner',
  templateUrl: './kitt-spinner.component.html',
  styleUrls: ['./kitt-spinner.component.scss'],
})
export class KittSpinnerComponent implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer2,
  ) {
  }

  readonly defaultSpeed = 50;

  speed = new FormControl(this.defaultSpeed);
  @ViewChild('kitt') kitt?: ElementRef<HTMLInputElement>;
  count: number = 1;
  previousCount?: number;
  secondPreviousCount?: number;
  direction: '<' | '>' = '>';

  timeOut?: number;
  destroy$ = new Subject<boolean>();

  ngOnInit(): void {
    this.kittTimer();
    this.speed.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      clearTimeout(this.timeOut);
      this.kittTimer();
    });
  }

  kittTimer(): void {
    this.timeOut = setInterval(() => {
      this.changeKittBlockCycle();
    }, this.speed.value);
  }

  changeKittBlockCycle(): void {
    this.setCounts();
    if (this.kitt) {
      const currentBlock = this.kitt?.nativeElement.children[this.count - 1];
      this.renderer.setStyle(currentBlock, 'background', 'red');
      if (this.previousCount != null) {
        const previousBlock = this.kitt?.nativeElement.children[this.previousCount];
        this.renderer.setStyle(previousBlock, 'background', '#811010');
        if (this.secondPreviousCount != null) {
          const secondPreviousBlock = this.kitt?.nativeElement.children[this.secondPreviousCount];
          if (secondPreviousBlock) {
            this.renderer.setStyle(secondPreviousBlock, 'background', 'black');
          }
        }
      }
    }
  }

  setCounts(): void {
    if (this.count === 10) {
      this.direction = '<';
      this.secondPreviousCount = this.count + 2;
    } else if (this.count === 1) {
      this.direction = '>';
      this.secondPreviousCount = this.count - 2;
    }
    this.setCountByDirection();
  }

  setCountByDirection(): void {
    this.previousCount = this.count - 1;
    if (this.direction === '>') {
      this.secondPreviousCount = this.previousCount - 1;
      this.count++;
    } else {
      this.secondPreviousCount = this.previousCount + 1;
      this.count--;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
