import { Component, ElementRef, Input } from "@angular/core";
import { Enums, Label } from "@nativescript/core";

@Component({
    selector: "ns-soil",
    templateUrl: "./soil.component.html",
    styleUrls: ["./soil.component.scss"]
})
export class SoilComponent {
    @Input() soilValue: number;
    soilColor: number;
    constructor() {}

    
    calculateSoilMoistureValue(soilValue: number): number {
        let convertedAnimationValue: number;
        if (soilValue > 100) {
            convertedAnimationValue = 0;
        } else if (soilValue < 0) {
            convertedAnimationValue = 100;
        }

        return convertedAnimationValue
    }

    private animateDroplet(labelElement: ElementRef<Label>, soilValue: number): void {
        labelElement.nativeElement.animate({
            translate: {x: 0, y: this.calculateSoilMoistureValue(soilValue)},
            duration: 500,
            curve: Enums.AnimationCurve.easeIn
        })
    }
 
}
