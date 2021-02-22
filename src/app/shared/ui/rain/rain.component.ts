import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-rain",
    templateUrl: "./rain.component.html",
    styleUrls: ["./rain.component.scss"]
})
export class RainComponent implements OnInit {
    private _isRaining: boolean;
    readonly iconColors = {
        notRain: "#DEDEDE",
        rainCloud: "#D1D1D1",
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
