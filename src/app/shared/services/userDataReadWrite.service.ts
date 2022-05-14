import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class UserDataReadWriteService {
    // use network address 10.0.2.2 to go to your 127.0.0.1 on you development machine from
    // inside of the android emulator
    // pi IP goes into the BackendBaseURL
    private _sustainableGardenBackendBaseURL = "http://10.0.2.2:8000";
    
    constructor(private http: HttpClient) {}
    
    registerUser(userDataObject): Observable<any>{
        return this.http.post(
            `${this._sustainableGardenBackendBaseURL}/users/`,userDataObject,)
    } 
}
