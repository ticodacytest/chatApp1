import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  public newMessageText: string = '';
  @Output() sendText = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  public submit(message: string): void {
    this.sendText.emit(this.newMessageText);
  }
}
