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
        this.setChartData(this.parseIncomingSensorsDataToForCharts(this.sensorsReadingsService.getSensorsReadingsData()));
        this._sensorsReadingsDataChangedSub = this.sensorsReadingsService.sensorsReadingsDataChanged
        .subscribe((sensorsReadingsData) => {
            this.setChartData(this.parseIncomingSensorsDataToForCharts(sensorsReadingsData));
        });
    }

    private parseIncomingSensorsDataToForCharts(newSensorsReadingsData: SensorReading[]): BaseContinuousGraphRequiredProperties[] {
        const charts: BaseContinuousGraphRequiredProperties[] = [];
        // string referencing a chart's index in charts array
        const keyToIndexInChartsArray = new Map<string, number>();
        let rearIndex = 0;
        newSensorsReadingsData.forEach(sensorReading => {
            const numberOfReadings = Object.keys(sensorReading.reading).length;
            
            for (let i = 0; i < numberOfReadings; i++) {
                // the key and name of the current reading
                const currentReadingKey = Object.keys(sensorReading.reading)[i];
                // unique key to reference the chart
                // utilize sensor's id and the reading output name of sensor because
                // sensors names are not unique
                const chartKey = `${sensorReading.sensor.id}${currentReadingKey}`;
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
}
