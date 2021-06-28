import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chatroom-titlebar',
  templateUrl: './chatroom-titlebar.component.html',
  styleUrls: ['./chatroom-titlebar.component.css']
})
export class ChatroomTitlebarComponent implements OnInit {

  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
