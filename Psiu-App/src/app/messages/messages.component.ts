import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].results;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodeToken.nameid,
       this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
         .subscribe((res: PaginatedResult<Message[]>) => {
            this.messages = res.results;
            this.pagination = res.pagination;
         }, error => {
           this.alertify.error(error);
         });
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Tem certeza que deseja deletar essa mensagem?', () => {
      this.userService.deleteMessage(id, this.authService.decodeToken.nameid)
        .subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
          this.alertify.success('A mensagem foi deletada');
        }, error => {
          this.alertify.error(error);
        });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
