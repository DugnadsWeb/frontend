import { Activity } from './activity';


export class SalesActivity extends Activity {


  constructor(public uuid, public title, public startTime,
    public endTime, public description, public maxPartisipants, public productName) {
      super(uuid, title, startTime, endTime, description, maxPartisipants)
    }

}
