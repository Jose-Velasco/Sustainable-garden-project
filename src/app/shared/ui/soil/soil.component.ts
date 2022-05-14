import { Component, Input } from "@angular/core";

@Component({
    selector: "ns-soil",
    templateUrl: "./soil.component.html",
    styleUrls: ["./soil.component.scss"]
})
export class SoilComponent {
    @Input() soilValue: number;
    constructor() {}


}
