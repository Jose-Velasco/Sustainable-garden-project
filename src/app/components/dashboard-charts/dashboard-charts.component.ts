import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChartsDataService } from "../../shared/services/charts-data.service";
import { Subscription } from "rxjs";
import { BaseContinuousGraphRequiredProperties } from "../../shared/models/charts-series.model";

// decorator, tells angular and nativescript what component we are talking about
@Component({
    selector: "ns-dashboard-charts", //where in nativescript is this component
    templateUrl: "./dashboard-charts.component.html", // which html doc is this associated to
    styleUrls: ["./dashboard-charts.component.scss"] // which scss styling doc is this associated to
})

// the dashboard charts component "dashboard-charts" has an alias in Typescript: DashboardChartsComponent
// DashboardChartsComponent can be found in app.module.ts, not needed to be touched with Angular CLI working
export class DashboardChartsComponent implements OnInit, OnDestroy {
    // the AuthComponent initializes with the following data
    
    
    //!required --- these next four lines are chart formatting
    private _charts: BaseContinuousGraphRequiredProperties[];
    private _chartsChangedSub: Subscription;
    private _gridLayoutRows: string;
    private _rowsSize: number;

    //uses chartsDataService to grab data for charts, 
    //see src/app/shared/services/charts-data.service.ts for more information
    constructor(private chartsDataService: ChartsDataService) {}

    // where Angular initializes the component, our main() equivalent
    ngOnInit() {
        this.rowsSize = 500 //row size
        this.charts = this.chartsDataService.chartData; // our data going into the charts

        // generates a GridLayout dynamically based on the expected amount of charts
        // and sizes the rows
        this.gridLayoutRows = this.createGrindLayoutRowsString(this.charts.length, this.rowsSize);
        this._chartsChangedSub = this.chartsDataService.chartsDataChanged
            // add data by subscribing and setting a part of the charts with the data
            .subscribe((newChartsData: BaseContinuousGraphRequiredProperties[]) => {
                this.charts = newChartsData;
                console.log("new charts!!!"); // tell us we got new charts
            });
    }

    //get and set our new charts with the required properties, and row and col sizes
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
     * creates the string GridLayout which utilizes the charts layout to be created dynamically based
     * on the number of rows and row size. Check out the NativeScript docs from more info on the specific formatting of this string.
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

    // Angular gets rid of the charts when we leave this page
    ngOnDestroy() {
        if (this._chartsChangedSub) {
            this._chartsChangedSub.unsubscribe();
        }
    }
}
