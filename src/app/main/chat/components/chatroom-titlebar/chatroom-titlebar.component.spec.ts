import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomTitlebarComponent } from './chatroom-titlebar.component';

describe('ChatroomTitlebarComponent', () => {
  let component: ChatroomTitlebarComponent;
  let fixture: ComponentFixture<ChatroomTitlebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomTitlebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
