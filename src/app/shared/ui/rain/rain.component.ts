import { Component, OnInit, Input } from "@angular/core";

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
        rainCloud: "#b1b1b1",
        rainDrops: "#91E7EB"
    };

    constructor() {}

    ngOnInit() { }

    get isRaining(): boolean { return this._isRaining; }
    @Input() set isRaining(isRaining: boolean) { this._isRaining = isRaining; }
}
