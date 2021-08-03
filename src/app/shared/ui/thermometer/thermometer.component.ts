import { Component, ElementRef, OnInit, ViewChild, Input } from "@angular/core";
import { AbsoluteLayout, Enums, EventData, isAndroid, Label } from "@nativescript/core";

@Component({
    selector: "ns-thermometer",
    templateUrl: "./thermometer.component.html",
    styleUrls: ["./thermometer.component.scss"]
})
export class ThermometerComponent implements OnInit {
    @ViewChild("absLayout", { read: ElementRef, static: true}) private _absLayout: ElementRef;
    @ViewChild("mainTopThermoLargeTickMarkLabel", { read: ElementRef, static: true}) private _mainTopThermoLargeTickMarkLabel: ElementRef;
    @ViewChild("thermometerLiquid", {read: ElementRef, static: true}) private _thermometerLiquid: ElementRef<Label>;
    private _temperature: number;
    constructor() {}

    ngOnInit() {
        this.temperature = 0;
        this.renderThermoTickMarks(5, 4, 8.8);
    }

    get absLayout(): ElementRef {
        return this._absLayout;
    }

    get mainTopThermoLargeTickMarkLabel(): ElementRef {
        return this._mainTopThermoLargeTickMarkLabel;
    }

    get temperature(): number {
        return this._temperature;
    }

    @Input() set temperature(temp: number) {
        this._temperature = temp;
        this.animateThermometer(this.thermometerLiquid, this._temperature);
    }

    // TODO: dynamically change the temperature units based on backend or user set setting
    getTemperatureText(): string {
        return `${this.temperature.toFixed(0)}°C`;
    }

    get thermometerLiquid(): ElementRef<Label> { return this._thermometerLiquid; }

    /**
     * helper function for renderThermoTickMarks method. top and left values
     * are used in AbsoluteLayout containers might not work with other layout containers.
     * @param className class to add to the Label being created
     * @param topProperty set the top edge distance of the parent AbsoluteLayout area
     * @param leftProperty set the left distance of the parent AbsoluteLayout area
     */
    private createTickMarkLabel(className: string, topProperty: number, leftProperty: number): Label {
        let lbl = new Label();
        lbl.className = className;
        lbl.top = topProperty;
        lbl.left = leftProperty;
        return lbl;
    }

    /**
     * renders the thermometer tick marks. utilizes the main starting Tick mark(Label) in the html,
     * to to line up the rest of the tick marks being generated programmatically. generates tick marks
     * from top to bottom.
     */
    private renderThermoTickMarks(numOfLargeTickMarks: number, numOfSmallTickMarks: number, tickMarkSpacing): void {
        let container = <AbsoluteLayout> this.absLayout.nativeElement;
        let startingTopLabelProperty: number;
        let largeTickMarkLabel = <Label> this.mainTopThermoLargeTickMarkLabel.nativeElement;
        startingTopLabelProperty = +largeTickMarkLabel.top;
        const defaultLabelProperty = +largeTickMarkLabel.left;
        for (let i = 0; i < numOfLargeTickMarks; i++) {
            for (let j = 0; j < numOfSmallTickMarks; j++) {
                startingTopLabelProperty += tickMarkSpacing;
                container.addChild(
                    this.createTickMarkLabel(
                        "thermo-small-tick-marks",
                        startingTopLabelProperty,
                        defaultLabelProperty
                    )
                );
            }
            startingTopLabelProperty += tickMarkSpacing;
            container.addChild(
                this.createTickMarkLabel("thermo-large-tick-marks",
                    startingTopLabelProperty,
                    defaultLabelProperty
                )
            );
        }
    }

    /**
     * function to test the thermometer animation. Might have to use
     * viewChild to get the Label to animate when calling the function without a
     * tap event since the animation should trigger based on when the this.temperature
     * data changes.
     * @param args Label to animate
     */
    testThermometerAnimation(args:EventData): void {
        // generates a random temperature for testing purposes [-20, 115]
        let randTemp =  Math.floor(Math.random() * (115 - (-20) + 1) - 20);
        this.temperature = randTemp;
        // this.animateThermometer(args, randTemp);
    }

    /**
     * will squeeze the temperature number into a value that is in the domain of the animation constraints and output it. This
     * is needed because this current animation can only accept numbers in the range of [0,100]
     * in order to avoid visual bugs. The higher the temperature the lower the output value.
     * The lower the temperature the higher the value will be that is outputted.
     * @param temperature temperature to fit into the animation value ranges
     */
    private calculateThermoAniValue(temperature: number): number {
        let convertedAnimationValue: number;
        if (temperature > 100) {
            convertedAnimationValue = 0;
        } else if (temperature < 0) {
            convertedAnimationValue = 240
        } else {
            convertedAnimationValue = ((temperature / 100) * -240) + 240;
        }
        return convertedAnimationValue;
    }

    /**
     * Handles animating the thermometer based on the temperature.
     * @param labelElement Label to animate
     * @param temperature will determine the height of the thermometer level
     */
    private animateThermometer(labelElement: ElementRef<Label>, temperature: number): void {
        labelElement.nativeElement.animate({
            translate: {x: 0, y: this.calculateThermoAniValue(temperature)},
            duration: 500,
            curve: Enums.AnimationCurve.easeIn
        })
    }

    /**
     * fixes text-align css bug that causes android devices not to center
     * text vertically and horizontally when setting text-align value to center.
     * @param args label event object
     */
    onCircleLabelLoaded(args: EventData): void {
        const lbl = args.object as Label;
        if (isAndroid) {
            lbl.android.setGravity(17);
        }
    }
}
