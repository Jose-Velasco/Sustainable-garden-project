import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { SensorsReadingsDataService } from "./sensors-readings-data.service";
import { SensorReading } from "../models/sensors-readings.model";
import { ObservableArray } from "@nativescript/core";
import { BaseContinuousGraphRequiredProperties, ContinuousGraphDataItem} from "../models/charts-series.model";

@Injectable({ providedIn: 'root' })
export class ChartsDataService implements OnDestroy {
    private _sensorsReadingsDataChangedSub: Subscription;
    private _chartsDataChanged = new Subject<BaseContinuousGraphRequiredProperties[]>();
    private _chartsData: BaseContinuousGraphRequiredProperties[];

    constructor(private sensorsReadingsService: SensorsReadingsDataService) {}

    ngOnDestroy() {
        if (this._sensorsReadingsDataChangedSub) {
            this._sensorsReadingsDataChangedSub.unsubscribe();
        }
    }

    get chartData(): BaseContinuousGraphRequiredProperties[] {
        return this._chartsData.slice();
    }

    get chartsDataChanged(): Observable<BaseContinuousGraphRequiredProperties[]> {
        return this._chartsDataChanged.asObservable();
    }

    setChartData(newChartsData: BaseContinuousGraphRequiredProperties[]): void {
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

    // private parseIncomingSensorData(newSensorsReadingsData: SensorReading[]): BaseContinuousGraphRequiredProperties[] {
    //     let charts: BaseContinuousGraphRequiredProperties[] = [];
    //     const testCharts = new Map<string, Record<string, any>>();
    //     newSensorsReadingsData.forEach(sensorReading => {
    //         const numberOfReadings = Object.keys(sensorReading.reading).length;
    //         for (let i = 0; i < numberOfReadings; i++) {
    //             const currentReadingKey = Object.keys(sensorReading.reading)[i];
    //             const chartKey = `${sensorReading.sensor.id}${currentReadingKey}`;
    //             if (testCharts.has(chartKey)) {
    //                 // let date = this.dateOffsetHours(sensorReading.time_of_reading, 7);
    //                 // let timestamp = date.getTime();
    //                 const newContinuosGraphDataItem = this.sensorsReadingsService.generateContinuosGraphDataItem(
    //                     sensorReading.time_of_reading, sensorReading.reading[currentReadingKey]
    //                 );
    //                 testCharts.get(chartKey).dataItems.push(newContinuosGraphDataItem);
    //             } else {
    //                 const chart: {
    //                     chartTitle: string,
    //                     legendTitle: string,
    //                     unitsSymbol:string,
    //                     dataItems: ObservableArray<ContinuousGraphDataItem>[]
    //                 } = {
    //                     chartTitle: sensorReading.sensor.sensor_name,
    //                     legendTitle: currentReadingKey,
    //                     // change once done with test
    //                     unitsSymbol: "",
    //                     dataItems: []
    //                 };
    //                 testCharts.set(chartKey, chart);
    //             }
    //         }
    //     });

    //     testCharts.forEach((chartData: {
    //         chartTitle: string,
    //         legendTitle: string,
    //         unitsSymbol:string,
    //         dataItems: ObservableArray<ContinuousGraphDataItem>[]
    //         }) => {
    //         const newChart: BaseContinuousGraphRequiredProperties = {
    //             dataItems: chartData.dataItems,
    //             unitsSymbol: chartData.unitsSymbol,
    //             splineAreaProperties: {
    //                 chartTitle: chartData.chartTitle,
    //                 legendTitle: chartData.legendTitle
    //             }
    //         };
    //         charts.push(newChart);
    //     });

    //     return charts;
    // }
    private parseIncomingSensorData(newSensorsReadingsData: SensorReading[]): BaseContinuousGraphRequiredProperties[] {
        const charts: BaseContinuousGraphRequiredProperties[] = [];
        // This maps a chart's index position in the charts array
        const keyToIndexInChartsArray = new Map<string, number>();
        let rearIndex = 0;
        newSensorsReadingsData.forEach(sensorReading => {
            const numberOfReadings = Object.keys(sensorReading.reading).length;
            for (let i = 0; i < numberOfReadings; i++) {
                // the key and name of the current reading
                const currentReadingKey = Object.keys(sensorReading.reading)[i];
                // unique key to reference the chart
                // utilize sensor's id and the user given name of sensor because
                // sensors names are not unique
                const chartKey = `${sensorReading.sensor.id}${currentReadingKey}`;
                // check if chart already has been already added
                // if (keyToIndexInChartsArray.has(chartKey)) {
                //     const newContinuosGraphDataItem = this.sensorsReadingsService.generateContinuosGraphDataItem(
                //         sensorReading.time_of_reading, sensorReading.reading[currentReadingKey]
                //     );
                //     charts[keyToIndexInChartsArray.get(chartKey)].dataItems.push(newContinuosGraphDataItem);
                // // adds chart
                // } else {
                //     // This maps a new chart's index position in the charts array
                //     // to have a reference to it chart by a key
                //     keyToIndexInChartsArray.set(chartKey, rearIndex);
                //     // updates the reference to the rear index in the charts array
                //     rearIndex++;
                //     const chart: BaseContinuousGraphRequiredProperties = {
                //         dataItems: new ObservableArray<ContinuousGraphDataItem>(),
                //         // change once done with test
                //         unitsSymbol: "",
                //         splineAreaProperties: {
                //             chartTitle: sensorReading.sensor.sensor_name,
                //             legendTitle: currentReadingKey,
                //         }
                //     };
                //     // add new chart
                //     charts.push(chart);
                // }

                // adds chart
                if (!keyToIndexInChartsArray.has(chartKey)) {
                    // This maps a new chart's index position in the charts array
                    // to have a reference to it chart by a key
                    keyToIndexInChartsArray.set(chartKey, rearIndex);
                    // updates the reference to the rear index in the charts array
                    rearIndex++;
                    const chart: BaseContinuousGraphRequiredProperties = {
                        dataItems: new ObservableArray<ContinuousGraphDataItem>(),
                        // change once done with test
                        unitsSymbol: "",
                        splineAreaProperties: {
                            chartTitle: sensorReading.sensor.sensor_name,
                            legendTitle: currentReadingKey,
                        }
                    };
                    // add new chart
                    charts.push(chart);
                }
                const newContinuosGraphDataItem = this.sensorsReadingsService.generateContinuosGraphDataItem(
                    sensorReading.time_of_reading, sensorReading.reading[currentReadingKey]
                );
                charts[keyToIndexInChartsArray.get(chartKey)].dataItems.push(newContinuosGraphDataItem);
            }
        });
        return charts;
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
}
