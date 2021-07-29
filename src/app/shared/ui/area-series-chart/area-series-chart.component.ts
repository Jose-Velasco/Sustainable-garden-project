import { Component, Input, OnInit } from "@angular/core";
import { ObservableArray } from "@nativescript/core";
import { Color } from "@nativescript/core/color";
import { ChartEventData } from "nativescript-ui-chart/index";
import { BaseContinuousGraphRequiredProperties, ContinuousGraphDataItem } from "../../models/charts-series.model";
import { UIService } from "../../services/ui.service";

@Component({
    selector: "ns-area-series-chart",
    templateUrl: "./area-series-chart.component.html",
    styleUrls: ["./area-series-chart.component.scss"]
})
export class AreaSeriesChart implements OnInit {
    // pass the required data for the chart component to work from the parent component
    @Input() splineAreaProperties: BaseContinuousGraphRequiredProperties;
    // The dataItems array needs to be sorted by dates in ascending order
    // to avoid overlapping lines
    private _dataItems: ObservableArray<ContinuousGraphDataItem>;
    private _linearAxisLabelFormatForDataItem: string;
    // _curveColor acts as the base color for the chart in the curve and the shaded area under the curve
    private _curveColor: Color;
    private _areaColor: Color;

    constructor(private UIService: UIService) {}

    ngOnInit() {
        this.dataItems = this.splineAreaProperties.dataItems;
        this.setLinearAxisLabelDataItemFormat();
        this.initializeAreaAndCurveColors();
    }

    get dataItems() { return this._dataItems; }

    set dataItems(newDataItems: ObservableArray<ContinuousGraphDataItem>) { this._dataItems = newDataItems; }

    get linearAxisLabelFormatForDataItem(): string { return this._linearAxisLabelFormatForDataItem; }

    /**
     * Formats the text of the vertical axis. Concatenates the data on the vertical axis with the unit/symbol of the data to be displayed
     * Uses % operator as a placeholder to put where and how the float values should be placed. This looks
     * similar to how one formats string with % in python.
     */
    setLinearAxisLabelDataItemFormat(): void {
        this._linearAxisLabelFormatForDataItem = `%.1f${this.splineAreaProperties.unitsSymbol}`;
    }

    get curveColor(): Color { return this._curveColor; }

    set curveColor(newColor: Color) { this._curveColor = newColor; }

    get areaColor(): Color { return this._areaColor; }

    set areaColor(newColor: Color) { this._areaColor = newColor; }

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
            // generates a random color if one is not given
            this.curveColor = this.UIService.generateRandomColor();
        } else {
            this.curveColor = this.splineAreaProperties.splineAreaProperties.CurveBaseColor;
        }
        this.createCurveAreaColor();
    }
}
