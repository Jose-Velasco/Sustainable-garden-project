import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Temperature, TemperatureDegreeAbbreviation } from "../../models/temperature.model";
import { ChartsDataService } from "../../services/charts-data.service";
import { ChartEventData } from "nativescript-ui-chart/index";

@Component({
    selector: "ns-thermometer-chart",
    templateUrl: "./thermometer-chart.component.html",
    styleUrls: ["./thermometer-chart.component.scss"]
})
export class ThermometerChartComponent implements OnInit, OnDestroy {
    private _temperatureDataSub: Subscription;
    // The Temperature array needs to be sorted by dates in ascending order
    // to avoid overlapping lines
    private _temperatureData: Temperature[];
    private _linearAxisLabelFormatForTemperature: string;

    constructor(private chartsDataService: ChartsDataService) { }

    ngOnInit() {
        this._temperatureDataSub = this.chartsDataService.temperatureData.subscribe((temperatureData) => {
            // this.temperatureData = temperatureData;
        });
        this.setLinearAxisLabelTemperatureFormat(TemperatureDegreeAbbreviation.Fahrenheit);
    }

    get temperatureData(): Temperature[] {
        return this._temperatureData;
    }

    set temperatureData(tempData: Temperature[]) {
        this._temperatureData = tempData;
    }

    get linearAxisLabelFormatForTemperature(): string {
        return this._linearAxisLabelFormatForTemperature;
    }

    /**
     *
     * @param degreeUnitAbbreviation degree abbreviation to be used in label text
     */
    setLinearAxisLabelTemperatureFormat(degreeUnitAbbreviation: TemperatureDegreeAbbreviation) {
        this._linearAxisLabelFormatForTemperature = `%.0f°${degreeUnitAbbreviation}`;
    }

    /**
     * formats the Date string into a string that can be parsed by the minimum/maximum property
     * of the DateTimeContinuousAxis tag in the html of this component
     * @param dateToFormat Date object that will be used to extract the year, month, day
     * @param isMinDate is the Date passed the min date else its the max date
     * @returns the formatted date string
     */
    private formatDateToPropertyRequirementsHelper(dateToFormat: Date, isMinDate: boolean): string {
        let year = dateToFormat.getFullYear();
        // since the Date object numbers month from 0-11 increment the month
        // by one. This numbers months from 1-12, the property uses this formatting.
        let month = dateToFormat.getMonth() + 1;
        let day = dateToFormat.getDate();
        if (isMinDate) {
            day++;
        }
        return `${day}/${month}/${year}`;
    }

    getMinDate(): string {
        return this.formatDateToPropertyRequirementsHelper(this.temperatureData[0].date, true);
    }

    getMaxDate(): string {
        let lastElemIndex = this.temperatureData.length - 1;
        return this.formatDateToPropertyRequirementsHelper(this.temperatureData[lastElemIndex].date, false);
    }

    onClickChart(event: ChartEventData) {
        event.series.showLabels = true;
    }

    onDeselectedChart(event: ChartEventData) {
        event.series.showLabels = false;
    }

    ngOnDestroy() {
        this._temperatureDataSub.unsubscribe();
    }
}
