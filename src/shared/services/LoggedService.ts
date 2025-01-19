import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggedService{
    private loggedState = new BehaviorSubject<boolean>(false);
    state = this.loggedState.asObservable();

    setLoggedState(current: boolean){
        this.loggedState.next(current);
    }
}