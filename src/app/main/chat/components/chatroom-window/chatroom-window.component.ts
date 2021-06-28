import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.css']
})
export class ChatroomWindowComponent implements OnInit {

  constructor() { }

  // Replace with backend data
  public dummyData = [
    {
      message: 'hi bro',
      createdAt: new Date(),
      sender: {
        firstName: 'gaurav',
        lastName: 'bartwal',
        photoUrl: 'https://via.placeholder.com/50x50'
      }
    },
    {
      message: 'hi',
      createdAt: new Date(),
      sender: {
        firstName: 'sds',
        lastName: 'csca',
        photoUrl: 'https://via.placeholder.com/50x50'
      }
    }
  ];

  ngOnInit(): void {
  }

}
