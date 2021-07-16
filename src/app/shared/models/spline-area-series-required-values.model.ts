import { Color } from "@nativescript/core/color";

export interface SplineAreaSeriesChartDataItem {
    // the data value to be plotted on the graph
    // This basically is the Y-coordinate.
    dataValue: number,
    date: Date,
    // The time value in milliseconds which is needed for RadChart plugin
    // to plot data on a chart based on the data date.
    // This basically is the X-coordinate.
    timeStamp: number
}

/**
 * Use this interface when reusing splineAreaSeriesChartComponent in other parts of the app
 * in order to reuse the component with different data
 */
export interface SplineAreaSeriesRequiredValues {
    dataItems: SplineAreaSeriesChartDataItem[],
    // The unit symbol of the data to be presented in the chart ui
    // example ％, °F, °C
    unitsSymbol: string,
    splineAreaProperties: {
        chartTitle: string,
        legendTitle: string,
        // if no color is provided then a default color is set when used
        // for a splineAreaSeries. This logic is handled in the splineAreaSeriesChartComponent.ts file
        CurveBaseColor?: Color
    }
}
