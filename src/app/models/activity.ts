export class Activity {

  constructor(public uuid, public title, public startTime,
    public endTime, public description, public maxPartisipants){

  }

  getTimesAsObeject(){
    let st = new Date(+this.startTime);
    let et = new Date(+this.endTime);

    let startTime:any = {};
    let endTime:any = {};

    startTime.year = this.pad(st.getFullYear());
    startTime.month = this.pad(st.getMonth()+1);
    startTime.day = this.pad(st.getDate());
    startTime.hour = this.pad(st.getHours());
    startTime.min = this.pad(st.getMinutes());

    endTime.year = this.pad(et.getFullYear());
    endTime.month = this.pad(et.getMonth()+1);
    endTime.day = this.pad(et.getDate());
    endTime.hour = this.pad(et.getHours());
    endTime.min = this.pad(et.getMinutes());

    return [startTime, endTime];
  }

  private pad(toPad){
    let ret = toPad.toString();
    if (ret.length == 1){
      ret = '0' + ret;
    }
    return ret;
  }

}
