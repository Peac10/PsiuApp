import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Message } from 'src/app/_models/message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodeToken.nameid;
    this.userService.getMessageThread(this.authService.decodeToken.nameid, this.recipientId)
     .pipe(
       tap(messages => {
         for (let i = 0; i < messages.length; i++) {
           if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
             this.userService.markAsRead(currentUserId, messages[i].id);
           }
         }
       })
     )
    .subscribe(messages => {
        this.messages = messages.reverse();
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodeToken.nameid, this.newMessage)
        .subscribe((message: Message) => {
          this.messages.push(message);
          this.newMessage.content = '';
        }, error => {
          this.alertify.error(error);
        });
  }

}
