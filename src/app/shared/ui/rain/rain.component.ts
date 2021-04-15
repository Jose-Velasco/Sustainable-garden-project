import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-rain",
    templateUrl: "./rain.component.html",
    styleUrls: ["./rain.component.scss"]
})
export class RainComponent implements OnInit {
    // set this property to true when it is raining
    private _isRaining: boolean;
    readonly iconColors = {
        notRain: "#DEDEDE",
        rainCloud: "#C7C7C7",
        rainDrops: "#91E7EB"
    };

    constructor() {}

    ngOnInit() {
        this.isRaining = true;
    }

    get isRaining(): boolean { return this._isRaining; }
    set isRaining(isRaining: boolean) { this._isRaining = isRaining; }

    public testRainColor(): void {
        this.isRaining = !this.isRaining;
    }
}
