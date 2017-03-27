import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { AuthService} from './auth.service';
import { Organization, User, Message } from '../models/models';

@Injectable()
export class MessageService {

  constructor(private http: Http,
              private authService: AuthService) { }


  // TODO add error handling
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
          return this.getMyMessageFormatter(res);
        })
    }

    // TODO add error handling
    getMyMessages(myType, myId){
      let headers = new Headers();
      headers.append('authorization', 'Bearer ' + this.authService.getToken());
      return this.http
        .get(
          'http://localhost:8888/api/msg/'+myType+'/'+myId,
          { headers }
        )
        .map(res => res.json())
        .map((res) => {
          if (res) {
            console.log(res);
          }
          return this.getMyMessageFormatter(res);
        })
    }

    getMyMessageFormatter(res){
      let ret = []
      for (let i=0;i<res.length;i++){
        ret.push(new Message(res[i].message.uuid,
          res[i].message.body, res[i].message.time_sent,
          res[i].sender));
      }
      return ret;
    }

}
