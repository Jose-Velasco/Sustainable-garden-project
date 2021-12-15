import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ContinuousGraphDataItem } from "../models/charts-series.model";
import { SensorReading } from "../models/sensors-readings.model";

@Injectable({providedIn: "root"})
export class SensorsReadingsDataService {
    private _sensorsReadingsDataChanged = new Subject <Array<SensorReading>>();
    private _sensorsReadingsData: SensorReading[] = [];
    private _currentTemperatureChanged = new Subject<number>();
    private _currentHumidityChanged = new Subject<number>();
    private _currentRainStatusChanged = new Subject<number>();
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

    get currentTemperature(): Observable<number> { return this._currentTemperatureChanged.asObservable(); }
    setCurrentTemperature(newTemperatureValue: number): void {
        this._currentTemperatureChanged.next(newTemperatureValue);
    }

    get currentHumidity(): Observable<number> { return this._currentHumidityChanged.asObservable(); }
    setCurrentHumidity(newHumidityValue: number): void {
        this._currentHumidityChanged.next(newHumidityValue);
    }
    get currentRainStatus(): Observable<number> { return this._currentRainStatusChanged.asObservable(); }
    setCurrentRainStatus(newRainStatus: number): void {
        this._currentRainStatusChanged.next(newRainStatus);
    }

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

    /**
     * TODO: dynamically change which sensors to read data outputs from based on user selected sensors in settings?
     * Hard coded for two sensors with properties such as:
     *  [
     *       {
     *           "sensor": {
     *               "id": 1,
     *               "created": "2021-08-03T00:12:15.545294Z",
     *               "sensor_name": "Humidity and Temp",
     *               "sensor_type": "DHT11 - Humidity/Temperature",
     *               "pin": 1,
     *               "usb_port": "/dev/ttyUSB0",
     *               "in_use": true
     *           },
     *           "reading": {
     *               "Humidity": 31.25,
     *               "Temperature": 26.44
     *           },
     *           "time_of_reading": "2021-08-03T08:24:45.570769Z"
     *       },
     *       {
     *           "sensor": {
     *               "id": 2,
     *               "created": "2021-08-03T00:12:15.552478Z",
     *               "sensor_name": "Rain",
     *               "sensor_type": "Rain Sensor",
     *               "pin": 2,
     *               "usb_port": "/dev/ttyUSB0",
     *               "in_use": true
     *           },
     *           "reading": {
     *               "Rain": 1
     *           },
     *           "time_of_reading": "2021-08-03T08:24:45.571852Z"
     *       }
     *   ]
     * Takes in new current(realtime?) sensor reading values and processes them
     * to be consumed by the Dashboard view
     * @param currentSensorReadings new sensor Reading values
     */
    processSensorValues(currentSensorReadings: SensorReading[]) {
        currentSensorReadings.forEach(currentSensorReading => {
            for (var singleReadingKey in currentSensorReading.reading) {
                const newTemp = new Map<string, number>([
                    [singleReadingKey, currentSensorReading.reading[singleReadingKey]]
                ]);
                this.dispatchCurrentSensorReadingValue(newTemp);
            }

        });
    }

    /**
     * A single key value pair where key points to the data stream to be updated
     * and the value is the value that will be pushed to the observers
     * @param newSingleReading a single key value pair
     */
    private dispatchCurrentSensorReadingValue(newSingleReading: Map<string, number>): void {
        const currentOverviewInputActions = new Map([
            ["Temperature", (e:number)=>this.setCurrentTemperature(e)],
            ["Humidity", (e:number)=>this.setCurrentHumidity(e)],
            ["Rain", (e:number)=>this.setCurrentRainStatus(e)],
        ]);
        const readingKey = newSingleReading.keys().next().value;
        const readingValue = newSingleReading.get(readingKey)
        currentOverviewInputActions.get(readingKey)(readingValue);
        //console.log("The Temp is: " + readingValue);
    }
}
