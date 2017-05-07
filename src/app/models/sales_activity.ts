import { Activity } from './activity';


export class SalesActivity extends Activity {

  public type = 'SalesActivity';

  constructor(public uuid, public title, public startTime,
    public endTime, public description, public maxPartisipants,
    public productName, public isActive) {
      super(uuid, title, startTime, endTime, description,
        maxPartisipants, isActive)
    }

}
