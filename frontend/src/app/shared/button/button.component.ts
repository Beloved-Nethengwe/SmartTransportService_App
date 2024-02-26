import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'smartTransport-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit {

  @Input() isBig = false
  @Input() isTileButton = false
  constructor() { }

  ngOnInit(): void {
  }
}
