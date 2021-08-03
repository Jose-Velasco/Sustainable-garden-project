import { ObservableArray } from "@nativescript/core";
import { Color } from "@nativescript/core/color";

export interface ContinuousGraphDataItem {
    // the data value to be plotted on the graph
    // This basically is the Y-coordinate.
    dataValue: number,
    date: Date,
    // The time value in milliseconds which is needed for RadChart plugin
    // to plot data on a chart based on the data date.
    // This basically is the X-coordinate.
    timeStamp: number,
}

/**
 * Use this interface when reusing continuous graph components in other parts of the app
 * in order to reuse the component with different data.
 *
 * Possibly extend for adding more
 * custom properties per continuous chart series.
 */
export interface BaseContinuousGraphRequiredProperties {
    dataItems: ObservableArray<ContinuousGraphDataItem>,
    // The unit symbol of the data to be presented in the chart ui
    // example ％, °F, °C
    unitsSymbol: string,
    splineAreaProperties: {
        chartTitle: string,
        legendTitle: string,
        // if no color is provided then a random color is set when chart component created
        // This logic is handled in the respective ts files if one is created
        CurveBaseColor?: Color
    }
}
