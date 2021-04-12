export class Temperature {
    // the time value in milliseconds which is needed for RadChart plugin
    // to plot data on a chart based on the data date
    public timeStamp: number;
    constructor(public temperature: number, public date: Date) {
        this.timeStamp = date.getTime();
    }
}

export enum TemperatureDegreeAbbreviation {
    Celsius = 'C',
    Fahrenheit = 'F',
    Kelvin = 'K'

}
