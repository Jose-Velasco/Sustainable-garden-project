import { Component, Input } from "@angular/core";

@Component({
    selector: "ns-humidity",
    templateUrl: "./humidity.component.html",
    styleUrls: ["./humidity.component.scss"]
})
export class HumidityComponent {
    @Input() humidityValue: number;
    constructor() {}
}
