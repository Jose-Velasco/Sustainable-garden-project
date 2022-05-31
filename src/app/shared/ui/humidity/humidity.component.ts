import { Component, ElementRef, OnInit, ViewChild, Input } from "@angular/core";
import { AbsoluteLayout, Enums, EventData, isAndroid, Label } from "@nativescript/core";
import { Color } from "@nativescript/core";
@Component({
    selector: "ns-humidity",
    templateUrl: "./humidity.component.html",
    styleUrls: ["./humidity.component.scss"]
})
export class HumidityComponent {
    private _humidityValue: number;
    constructor() { }

    ngOnInit() {
        this.humidityValue = 0;
    }

    dropletColor = new Color(100,50,200,245);

    get humidityValue(): number {
        return this._humidityValue;
    }

    @Input() set humidityValue(humidityVal: number) {
        this._humidityValue = humidityVal;
        this.animateDroplet(this._humidityValue);
    }

    // TODO: dynamically change the temperature units based on backend or user set setting
    getHumidText(): string {
        return `${this.humidityValue.toFixed(0)}%`;
    }

    /**
     * Handles animating the droplet based on the humidity.
     * @param humidityValue will determine the height of the humidity level
     */
    private animateDroplet( humidityValue: number): void {
        let humidityRange = 0;
        let redValue = 0;
        let greenValue = 0;
        let doubleHumidity;
        if (humidityValue <= 50) {
            humidityRange = 150;
            greenValue = 200;
            doubleHumidity = 2 * humidityValue;
            redValue = humidityRange - doubleHumidity;
        }
        else if (humidityValue > 50) {
            humidityRange = 300;
            doubleHumidity = 2 * humidityValue;
            redValue = 50;
            greenValue = humidityRange - doubleHumidity;
        }
        else {
            redValue = 50;
            greenValue=200;
        }
        
        this.dropletColor = new Color(100,redValue,greenValue,245);
    }

}
