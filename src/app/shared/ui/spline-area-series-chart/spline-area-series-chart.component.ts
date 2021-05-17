import { Component, Input, OnInit } from "@angular/core";
import { Color } from "@nativescript/core/color";
import { ChartEventData } from "nativescript-ui-chart/index";
import { SplineAreaSeriesRequiredValues, SplineAreaSeriesChartDataItem } from "../../models/spline-area-series-required-values.model";

@Component({
    selector: "ns-spline-area-series-chart",
    templateUrl: "./spline-area-series-chart.component.html",
    styleUrls: ["./spline-area-series-chart.component.scss"]
})
export class SplineAreaSeriesChart implements OnInit {
    // pass the required data for the chart component to work from the parent component
    @Input() splineAreaProperties: SplineAreaSeriesRequiredValues;
    // The dataItems array needs to be sorted by dates in ascending order
    // to avoid overlapping lines
    private _dataItems: SplineAreaSeriesChartDataItem[];
    private _linearAxisLabelFormatForDataItem: string;
    // _curveColor acts as the base color for the chart in the curve and the shaded area under the curve
    private _curveColor: Color;
    private _areaColor: Color;

    constructor() {}

    ngOnInit() {
        this.dataItems = this.splineAreaProperties.dataItems;
        this.setLinearAxisLabelDataItemFormat();
        this.initializeAreaAndCurveColors();
    }

    get dataItems() { return this._dataItems; }

    set dataItems(newDataItems: SplineAreaSeriesChartDataItem[]) { this._dataItems = newDataItems; }

    get linearAxisLabelFormatForDataItem(): string { return this._linearAxisLabelFormatForDataItem; }

    /**
     * Formats the text of the vertical axis. Concatenates the data on the vertical axis with the unit/symbol of the data to be displayed
     * Uses % operator as a placeholder to put where and how the float values should be placed. This looks
     * similar to how one formats string with % in python.
     */
    setLinearAxisLabelDataItemFormat(): void {
        this._linearAxisLabelFormatForDataItem = `%.0f${this.splineAreaProperties.unitsSymbol}`;
    }

    get curveColor(): Color { return this._curveColor; }

    set curveColor(newColor: Color) {
        this._curveColor = newColor;
    }

    get areaColor(): Color { return this._areaColor; }

    set areaColor(newColor: Color) {
        this._areaColor = newColor;
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
        return this.formatDateToPropertyRequirementsHelper(this.dataItems[0].date, true);
    }

    getMaxDate(): string {
        let lastElemIndex = this.dataItems.length - 1;
        return this.formatDateToPropertyRequirementsHelper(this.dataItems[lastElemIndex].date, false);
    }

    onClickChart(event: ChartEventData) {
        event.series.showLabels = true;
    }

    onDeselectedChart(event: ChartEventData) {
        event.series.showLabels = false;
    }

    /**
     * Programmatically creates and sets the color of the area under the curve, so
     * it has a transparent look... Uses color in _curveColor rgba values but cuts the alpha
     * value by half.
     */
    private createCurveAreaColor(): void {
        let adjustedColor: Color = new Color(
            // decrease alpha of the color so the area color somewhat transparent
            this.curveColor.a * 0.5,
            this.curveColor.r,
            this.curveColor.g,
            this.curveColor.b
        );
        this.areaColor = adjustedColor;
    }

    /**
     * initializes the curve and area color of the chart. If no curveBaseColor is provided
     * the base color of the app is used.
     * TODO: Make component responsive to changes in base color of the app by not hard codding
     *       a color.
     */
    private initializeAreaAndCurveColors(): void {
        if (this.splineAreaProperties.splineAreaProperties.CurveBaseColor == null) {
            // default base color for the chart's area and cure color if one is not given
            this.curveColor = new Color("#529A9E");
        } else {
            this.curveColor = this.splineAreaProperties.splineAreaProperties.CurveBaseColor;
        }
        this.createCurveAreaColor();
    }
}
