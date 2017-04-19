export class Dugnad{

  public status:boolean;

  constructor(public uuid,
    public orgUuid,
    public title,
    public description,
    public location,
    public startTime,
    public endTime,
    public maxPartisipants,
    status){
      this.status = true?status=='true':false
	  
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

    getTimeAsHTMLDateFormat(){
      let t = this.getTimesAsObeject();
      let st = t[0].hour + ':' + t[0].min;
      let sd = t[0].year + '-' + t[0].month + '-' + t[0].day;

      let et = t[1].hour + ':' + t[1].min;
      let ed = t[1].year + '-' + t[1].month + '-' +  t[1].day;
      return {start: {time:st, date:sd}, end: {time:et, date:ed}}

    }

    setStartTimeFromDateTimeString(time, date){
      this.startTime = Dugnad.fromStringToTime(time, date);
    }

    setEndTimeFromDateTimeString(time, date){
      this.endTime = Dugnad.fromStringToTime(time, date);
    }


    static fromStringToTime(time, date){
      let sd = date.split('-');
      let st = time.split(':');
      return new Date(+sd[0], +sd[1], +sd[2], +st[0], +st[1]).getTime()
    }

    private pad(toPad){
      let ret = toPad.toString();
      if (ret.length == 1){
        ret = '0' + ret;
      }
      return ret;
    }

}
