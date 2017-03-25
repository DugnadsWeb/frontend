import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';
import { Organization, User, Message } from '../models/models';

@Injectable()
export class MessageService {

  constructor(private http: Http,
              private authService: AuthService) { }

  sendMessage(senderType:string, senderId:string,
    receiverType:string, receiverId:string, message:string){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('authorization', 'Bearer ' + this.authService.getToken());
      let body = JSON.stringify({ sender: {
          type: senderType,
          id: senderId
        },
        receiver: {
          type: receiverType,
          id: receiverId
        },
        message: message
      });
      console.log(body);
      return this.http
        .post(
          'http://localhost:8888/api/msg/',
          body,
          { headers }
        )
        .map(res => res.json())
        .map((res) => {
          if (res) {
            console.log("message sent");
          }
          return res;
        })

    }

}
