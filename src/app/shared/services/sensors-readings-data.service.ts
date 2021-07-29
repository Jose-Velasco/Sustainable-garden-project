import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ContinuousGraphDataItem } from "../models/charts-series.model";
import { SensorReading } from "../models/sensors-readings.model";

@Injectable({providedIn: "root"})
export class SensorsReadingsDataService {
    private _sensorsReadingsDataChanged = new Subject <Array<SensorReading>>();
    private _sensorsReadingsData: SensorReading[] = [];
    private _pSTHoursOffset: number = 7;

    constructor() {}

    get sensorsReadingsDataChanged(): Observable<Array<SensorReading>> {
        return this._sensorsReadingsDataChanged.asObservable();
    }

    getSensorsReadingsData(): SensorReading[] {
        return this._sensorsReadingsData.slice();
    }

    setSensorsReadingsData(sensorsReadingsData: Array<SensorReading>): void {
        this._sensorsReadingsData = sensorsReadingsData;
        this._sensorsReadingsDataChanged.next(this._sensorsReadingsData);
    }

    get pSTHoursOffset(): number { return this._pSTHoursOffset; }

    /**
     * Attempts to manually handle UTC to PST hours offsets
     * @param dateString UTC date string Usually from the backend server
     * @param hoursToOffset number of hours to offset
     * @returns returns a new Date object with the calculated offsets hours
     */
    private dateOffsetHours(dateString: string, hoursToOffset: number): Date {
        const date: Date = new Date(dateString);
        return new Date(date.getTime() + (hoursToOffset * 60 * 60 * 1000));
    }

    /**
     * Creates a the ContinuousGraphDataItem abstract type
     * @param dateString string representation of a date
     * @param dataValue graph data value
     * @returns
     */
    generateContinuosGraphDataItem(dateString: string, dataValue: number): ContinuousGraphDataItem {
        let date = this.dateOffsetHours(dateString, this.pSTHoursOffset);
        let timestamp = date.getTime();
        return {
            dataValue: dataValue,
            date: date,
            timeStamp: timestamp
        };
    }

    /**
     * Organizes incoming sensors readings responses by their unique id
     * @param newSensorsReadingsData
     * @returns returns a map of SensorsReadings where the key is the sensor's id
     */
    organizeNewSensorReadingsDataBySensorID(newSensorsReadingsData: SensorReading[]): Map<number, SensorReading[]> {
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
