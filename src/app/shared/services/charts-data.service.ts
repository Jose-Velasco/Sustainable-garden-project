import { Injectable } from "@angular/core";
import { Color } from "@nativescript/core/color";
import { Temperature } from "../models/temperature.model";
import { SplineAreaSeriesRequiredValues, SplineAreaSeriesChartDataItem } from "../models/spline-area-series-required-values.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ChartsDataService {
    private _humidityData = new BehaviorSubject<SplineAreaSeriesRequiredValues>(null);
    private _temperatureData = new BehaviorSubject<SplineAreaSeriesRequiredValues>(null);
    private _luminosityData = new BehaviorSubject<SplineAreaSeriesRequiredValues>(null);

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


    constructor() {
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
                legendTitle: "Temperature"
            }
        };
    }

    private getDummySunData(): SplineAreaSeriesRequiredValues {
        return {
            dataItems: this.testHumidityData,
            unitsSymbol: "watts",
            splineAreaProperties: {
                legendTitle: "luminosity",
                CurveBaseColor: new Color("#EBDB7A")
            }
        }
    }
}
