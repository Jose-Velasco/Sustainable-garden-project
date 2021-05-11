import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChartsDataService } from "../../shared/services/charts-data.service";
import { Subscription } from "rxjs";
import { SplineAreaSeriesRequiredValues } from "../../shared/models/spline-area-series-required-values.model";

@Component({
    selector: "ns-dashboard-charts",
    templateUrl: "./dashboard-charts.component.html",
    styleUrls: ["./dashboard-charts.component.scss"]
})
export class DashboardChartsComponent implements OnInit, OnDestroy {
    private _humidityDataSub: Subscription;
    private _humidityChartData: SplineAreaSeriesRequiredValues;
    private _temperatureDataSub: Subscription;
    private _temperatureChartData: SplineAreaSeriesRequiredValues;
    private _luminosityDataSub: Subscription;
    private _luminosityChartData: SplineAreaSeriesRequiredValues;
    constructor(private chartsDataService: ChartsDataService) {}

    ngOnInit() {
        this._humidityDataSub = this.chartsDataService.humidityData
            .subscribe((humidityData) => {
                this.humidityChartData = humidityData;
        });
        this._temperatureDataSub = this.chartsDataService.temperatureData
            .subscribe((temperatureData) => {
                this.temperatureChartData = temperatureData;
        });
        this._luminosityDataSub = this.chartsDataService.luminosityData
            .subscribe((luminosityData) => {
                this.luminosityChartData = luminosityData;
            });
    }

    get humidityChartData(): SplineAreaSeriesRequiredValues { return this._humidityChartData; }
    set humidityChartData(newValues: SplineAreaSeriesRequiredValues) {
        this._humidityChartData = newValues;
    }

    get temperatureChartData(): SplineAreaSeriesRequiredValues { return this._temperatureChartData; }
    set temperatureChartData(newPropertyValues: SplineAreaSeriesRequiredValues) {
        this._temperatureChartData = newPropertyValues;
    }

    get luminosityChartData(): SplineAreaSeriesRequiredValues { return this._luminosityChartData; }
    set luminosityChartData(newPropertyValues: SplineAreaSeriesRequiredValues) {
        this._luminosityChartData = newPropertyValues;
    }

    ngOnDestroy() {
        this._humidityDataSub.unsubscribe();
        this._temperatureDataSub.unsubscribe();
        this._luminosityDataSub.unsubscribe();
    }
}
