import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Output()public newMessageText: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  public submit(message: string): void {
    // todo to save text to backend

    console.log('New Message:', message);

    this.newMessageText = '';
  }
}
