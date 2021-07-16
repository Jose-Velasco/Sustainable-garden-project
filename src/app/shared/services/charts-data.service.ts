import { Injectable } from "@angular/core";
import { Color } from "@nativescript/core/color";
import { Temperature } from "../models/temperature.model";
import { SplineAreaSeriesRequiredValues, SplineAreaSeriesChartDataItem } from "../models/spline-area-series-required-values.model";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { SensorsReadingsDataService } from "./sensors-readings-data.service";
import { SensorReading } from "../models/sensors-readings.model";

@Injectable({ providedIn: 'root' })
export class ChartsDataService {
    private _humidityData = new BehaviorSubject<SplineAreaSeriesRequiredValues>(null);
    private _temperatureData = new BehaviorSubject<SplineAreaSeriesRequiredValues>(null);
    private _luminosityData = new BehaviorSubject<SplineAreaSeriesRequiredValues>(null);
    private _sensorsReadingsDataChangedSub: Subscription;
    private _chartsDataChanged = new Subject<SplineAreaSeriesRequiredValues[]>();
    private _chartsData: SplineAreaSeriesRequiredValues[];

    testHumidityData: SplineAreaSeriesChartDataItem[] = [
        {
            dataValue: 76,
            date: new Date(2021, 9, 30, 0),
            timeStamp: new Date(2021, 9, 30, 0).getTime()
        },
        {
            dataValue: 66,
            date: new Date(2021, 9, 30, 23),
            timeStamp: new Date(2021, 9, 30, 23).getTime()
        },
        {
            dataValue: 93,
            date: new Date(2021, 10, 1, 5),
            timeStamp: new Date(2021, 10, 1, 5).getTime()
        },
        {
            dataValue: 84,
            date: new Date(2021, 10, 1, 11),
            timeStamp: new Date(2021, 10, 1, 11).getTime()
        },
        {
            dataValue: 50,
            date: new Date(2021, 10, 1, 17),
            timeStamp: new Date(2021, 10, 1, 17).getTime()
        },
        {
            dataValue: 55,
            date: new Date(2021, 10, 1, 23),
            timeStamp: new Date(2021, 10, 1, 23).getTime()
        },
        {
            dataValue: 89,
            date: new Date(2021, 10, 2, 5),
            timeStamp: new Date(2021, 10, 2, 5).getTime()
        },
        {
            dataValue: 21,
            date: new Date(2021, 10, 3, 5),
            timeStamp: new Date(2021, 10, 3, 5).getTime()
        },
        {
            dataValue: 99,
            date: new Date(2021, 10, 4, 5),
            timeStamp: new Date(2021, 10, 4, 5).getTime()
        },
    ];

    constructor(private sensorsReadingsService: SensorsReadingsDataService) {
        this.fetchTemperatureData();
        this.fetchHumidityData();
        this.fetchLuminosityData();
    }

    get temperatureData(): Observable<SplineAreaSeriesRequiredValues>  {
        return this._temperatureData.asObservable();
    }

    get humidityData(): Observable<SplineAreaSeriesRequiredValues> {
        return this._humidityData.asObservable();
    }

    get luminosityData(): Observable<SplineAreaSeriesRequiredValues> {
        return this._luminosityData.asObservable();
    }

    get chartData(): SplineAreaSeriesRequiredValues[] {
        return this._chartsData.slice();
    }

    get chartsDataChanged(): Observable<SplineAreaSeriesRequiredValues[]> {
        return this._chartsDataChanged.asObservable();
    }

    setChartData(newChartsData: SplineAreaSeriesRequiredValues[]): void {
        this._chartsData = newChartsData;
        this._chartsDataChanged.next(this._chartsData.slice());
    }

    initializeChartServiceData(): void {
        this.setChartData(this.parseIncomingSensorData(this.sensorsReadingsService.getSensorsReadingsData()));
        this._sensorsReadingsDataChangedSub = this.sensorsReadingsService.sensorsReadingsDataChanged
        .subscribe((sensorsReadingsData) => {
            this.setChartData(this.parseIncomingSensorData(sensorsReadingsData));
        });
    }

    private parseIncomingSensorData(newSensorsReadingsData: Map<number, Array<SensorReading>>): SplineAreaSeriesRequiredValues[] {
        let charts: SplineAreaSeriesRequiredValues[] = [];
        newSensorsReadingsData.forEach((sensorsReadings) => {
            const individualSensorReadingData = new Map<string, Array<SplineAreaSeriesChartDataItem>>();
            sensorsReadings.forEach(sensorReading => {
                const numberOfReadings = Object.keys(sensorReading.reading).length;
                for (let i = 0; i < numberOfReadings; i++) {
                    const readingKey: string = Object.keys(sensorReading.reading)[i];
                    let date = new Date(sensorReading.time_of_reading);
                    let timestamp = date.getTime();
                    const chartDataItem: SplineAreaSeriesChartDataItem = {
                        dataValue: sensorReading.reading[readingKey],
                        date: date,
                        timeStamp: timestamp
                    };
                    if (individualSensorReadingData.has(readingKey)) {
                        individualSensorReadingData.get(readingKey).push(chartDataItem);
                    } else {
                        individualSensorReadingData.set(readingKey, [chartDataItem]);
                    }
                }
            });
            individualSensorReadingData.forEach((value, key) => {
                const newChart: SplineAreaSeriesRequiredValues = {
                    dataItems: value,
                    unitsSymbol: "",
                    splineAreaProperties: {
                        chartTitle: sensorsReadings[0].sensor.sensor_name,
                        legendTitle: key,
                        CurveBaseColor: new Color("#22b551")
                    }
                };
                charts.push(newChart);
            });
        });
        return charts;
    }

    fetchTemperatureData(): void {
        this._temperatureData.next(this.getDummyTemperatureData());
    }

    fetchHumidityData(): void {
        this._humidityData.next(this.getDummyHumidityData());
    }

    fetchLuminosityData(): void {
        this._luminosityData.next(this.getDummySunData());
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

    private getDummyHumidityData(): SplineAreaSeriesRequiredValues{
        return {
            dataItems: this.testHumidityData,
            unitsSymbol: "％",
            splineAreaProperties: {
                chartTitle: "sensorsONE",
                legendTitle: "Humidity",
                CurveBaseColor: new Color("#1D4985")
            }
        };
    }

    private getDummyTemperatureData(): SplineAreaSeriesRequiredValues{
        return {
            dataItems: this.testHumidityData,
            unitsSymbol: "°F",
            splineAreaProperties: {
                chartTitle: "sensorsTwo",
                legendTitle: "Temperature"
            }
        };
    }

    private getDummySunData(): SplineAreaSeriesRequiredValues {
        return {
            dataItems: this.testHumidityData,
            unitsSymbol: "watts",
            splineAreaProperties: {
                chartTitle: "fake_test_humidity123",
                legendTitle: "luminosity",
                CurveBaseColor: new Color("#EBDB7A")
            }
        }
    }
}
