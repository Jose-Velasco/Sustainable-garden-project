import { Color } from "@nativescript/core/color";

export interface SplineAreaSeriesChartDataItem {
    dataValue: number,
    date: Date,
    // the time value in milliseconds which is needed for RadChart plugin
    // to plot data on a chart based on the data date
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
        legendTitle: string,
        // if no color is provided then a default color is set when used
        // for a splineAreaSeries
        CurveBaseColor?: Color
    }
}
