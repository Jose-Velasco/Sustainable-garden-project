import { Component, ElementRef, Input } from "@angular/core";
import { Color, Enums, Label } from "@nativescript/core";

@Component({
    selector: "ns-soil",
    templateUrl: "./soil.component.html",
    styleUrls: ["./soil.component.scss"]
})
export class SoilComponent {

    private _soilValue: number;
    constructor() { }

    soilColor = new Color(100,165,75,0);

    ngOnInit() {
        this.soilValue = 0;
    }

    dropletColor = new Color(100,50,200,245);

    get soilValue(): number {
        return this._soilValue;
    }

    @Input() set soilValue(soilVal: number) {
        this._soilValue = soilVal;
        this.animateSoil(this._soilValue);
    }

    // TODO: dynamically change the temperature units based on backend or user set setting
    getSoilText(): string {
        return `${this.soilValue.toFixed(0)}%`;
    }

    private animateSoil( soilValue: number): void {
        let halfSoil = 0.5 * soilValue
        let redValue = 165 - soilValue;
        let greenValue = 75 - halfSoil;
        
        this.soilColor = new Color(100,redValue,greenValue,0);
    }
 
}
