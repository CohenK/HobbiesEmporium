import { Observable, Subject } from "rxjs";

class EventService{
    private subjsect = new Subject();

    emit(eventName: string, payload: any){
        this.subjsect.next({eventName, payload});
    }

    listen(eventName:string, callback:(event:any)=>void){
        this.subjsect.asObservable().subscribe((nextObj: any)=>{
            if(eventName === nextObj.eventName){
                callback(nextObj.payload);
            }
        })
    }
}

export default new EventService;