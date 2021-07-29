import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChartsDataService } from "../../shared/services/charts-data.service";
import { Subscription } from "rxjs";
import { BaseContinuousGraphRequiredProperties } from "src/app/shared/models/charts-series.model";

@Component({
    selector: "ns-dashboard-charts",
    templateUrl: "./dashboard-charts.component.html",
    styleUrls: ["./dashboard-charts.component.scss"]
})
export class DashboardChartsComponent implements OnInit, OnDestroy {
    private _charts: BaseContinuousGraphRequiredProperties[];
    private _chartsChangedSub: Subscription;
    private _gridLayoutRows: string;
    private _rowsSize: number;

    constructor(private chartsDataService: ChartsDataService) {}

    ngOnInit() {
        this.rowsSize = 500
        this.charts = this.chartsDataService.chartData;
        // generates a GridLayout dynamically based on the expected amount of charts
        // and sizes the rows
        this.gridLayoutRows = this.createGrindLayoutRowsString(this.charts.length, this.rowsSize);
        this._chartsChangedSub = this.chartsDataService.chartsDataChanged
            .subscribe((newChartsData: BaseContinuousGraphRequiredProperties[]) => {
                this.charts = newChartsData;
                console.log("new charts!!!");
            });
    }

    get charts(): BaseContinuousGraphRequiredProperties[] { return this._charts; }
    set charts(newCharts) { this._charts = newCharts; }

    get gridLayoutRows(): string { return this._gridLayoutRows; }
    set gridLayoutRows(newGrindLayoutRows: string) { this._gridLayoutRows = newGrindLayoutRows; }

    get rowsSize(): number { return this._rowsSize; }
    set rowsSize(pixelNumberSize: number) {
        if (pixelNumberSize < 0) {
            this._rowsSize = 0;
        } else {
            this._rowsSize = pixelNumberSize;
        }
    }

    /**
     * creates the string GrindLayout utilizes to make the up the layout dynamically based
     * on the number of rows and row size. Check out the NativeScript docs from more info on
     * the specific formatting of this string.
     * @param numberOfRows number of GridLayout rows
     * @param rowSize size of the rows in pixels
     * @returns
     */
    private createGrindLayoutRowsString(numberOfRows: number, rowSize: number): string {
        let rowsString = "";
        for (let row = 0; row < numberOfRows; row++) {
            rowsString = `${rowsString}${rowSize}`;
            if (row != numberOfRows - 1) {
                rowsString += ","
            }
        }
        return rowsString;
    }

    ngOnDestroy() {
        if (this._chartsChangedSub) {
            this._chartsChangedSub.unsubscribe();
        }
    }
}
