import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { SensorReading } from "../models/sensors-readings.model";

@Injectable({providedIn: "root"})
export class SensorsReadingsDataService {
    // private _sensorsReadingsDataChanged = new Subject <Map<number, Array<SensorReading>>>();
    private _sensorsReadingsDataChanged = new Subject <Array<SensorReading>>();
    // private _sensorsReadingsData: Map<number, Array<SensorReading>>;
    private _sensorsReadingsData: SensorReading[] = [];

    constructor() {}

    // get sensorsReadingsDataChanged(): Observable<Map<number, Array<SensorReading>>> {
    //     return this._sensorsReadingsDataChanged.asObservable();
    // }
    get sensorsReadingsDataChanged(): Observable<Array<SensorReading>> {
        return this._sensorsReadingsDataChanged.asObservable();
    }

    // getSensorsReadingsData(): Map<number, Array<SensorReading>> {
    //     return new Map(this._sensorsReadingsData);
    // }
    getSensorsReadingsData(): SensorReading[] {
        return this._sensorsReadingsData.slice();
    }

    // setSensorsReadingsData(sensorsReadingsData: Map<number, Array<SensorReading>>): void {
    //     this._sensorsReadingsData = sensorsReadingsData;
    //     this._sensorsReadingsDataChanged.next(this._sensorsReadingsData);
    // }
    setSensorsReadingsData(sensorsReadingsData: Array<SensorReading>): void {
        this._sensorsReadingsData = sensorsReadingsData;
        this._sensorsReadingsDataChanged.next(this._sensorsReadingsData);
    }

    organizeNewSensorReadingsData(newSensorsReadingsData: []): Map<number, SensorReading[]> {
        let incomingSensorsReadingsData = new Map<number, SensorReading[]>();

        newSensorsReadingsData.forEach((sensorReading: SensorReading) => {
            let sensorId = sensorReading.sensor.id;
            if (incomingSensorsReadingsData.has(sensorId)) {
                incomingSensorsReadingsData.get(sensorId).push(sensorReading);
            } else {
                incomingSensorsReadingsData.set(sensorId, [sensorReading]);
            }
        });
        return incomingSensorsReadingsData;
    }
}
