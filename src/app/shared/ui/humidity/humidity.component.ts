import { Component, ElementRef, Input } from "@angular/core";
import { Enums, Label } from "@nativescript/core";

@Component({
    selector: "ns-humidity",
    templateUrl: "./humidity.component.html",
    styleUrls: ["./humidity.component.scss"]
})
export class HumidityComponent {
    @Input() humidityValue: number;
    constructor() {}
    
    calculateHumidAniValue(humidityValue: number): number {
        let convertedAnimationValue: number;
        if (humidityValue > 100) {
            convertedAnimationValue = 0;
        } else if (humidityValue < 0) {
            convertedAnimationValue = 100
        }
        return convertedAnimationValue;
    }

    private animateDroplet(labelElement: ElementRef<Label>, humidityValue: number): void {
        labelElement.nativeElement.animate({
            translate: {x: 0, y: this.calculateHumidAniValue(humidityValue)},
            duration: 500,
            curve: Enums.AnimationCurve.easeIn
        })
    }
    
}
