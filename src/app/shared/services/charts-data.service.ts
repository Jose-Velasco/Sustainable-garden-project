import { Injectable } from "@angular/core";
import { Temperature } from "../models/temperature.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ChartsDataService {
    private _temperatureData = new BehaviorSubject<Temperature[]>(null);
    constructor() {
        this.fetchTemperatureData();
    }

    get temperatureData(): Observable<Temperature[]>  {
        return this._temperatureData.asObservable();
    }

    fetchTemperatureData(): void {
        this._temperatureData.next(this.getDummyTempDataArray());
    }

    private getDummyTempDataArray(): Temperature[] {
        return [
            // the horus for dummy data 0-18 in increments of 6 hours(times here are offsets b/c timezone diff)
            new Temperature(81, new Date(2021, 9, 30, 0)),
            new Temperature(81, new Date(2021, 9, 30, 23)),
            new Temperature(81, new Date(2021, 10, 1, 5)),
            new Temperature(65, new Date(2021, 10, 1, 11)),
            new Temperature(55, new Date(2021, 10, 1, 17)),
            new Temperature(74, new Date(2021, 10, 1, 23)),
            new Temperature(110, new Date(2021, 10, 2, 5)),
            new Temperature(36, new Date(2021, 10, 2, 11)),
            new Temperature(94, new Date(2021, 10, 2, 17)),
            new Temperature(100, new Date(2021, 10, 2, 23)),
            new Temperature(73, new Date(2021, 10, 3, 5)),
            new Temperature(70, new Date(2021, 10, 3, 11)),
            new Temperature(50, new Date(2021, 10, 3, 17)),
            new Temperature(65, new Date(2021, 10, 3, 23)),
            new Temperature(65, new Date(2021, 10, 4, 5)),
        ];
    }
}
