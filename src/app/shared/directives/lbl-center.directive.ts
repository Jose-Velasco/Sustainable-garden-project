import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { isAndroid, EventData, Label, Color } from "@nativescript/core"

@Directive({
    selector: "[lblCenter]",
})
export class LblCenterDirective implements OnInit, OnDestroy {
    listener: () => void;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    private get nativeView(): Label { return this.elRef.nativeElement }

    /**
     * fixes text-align css bug that causes android devices not to center
     * text vertically and horizontally when setting text-align value to center.
     */
    ngOnInit() {
        // the label that is to be centered
        const nativeView = this.nativeView;

        if (nativeView instanceof Label) {
            this.listener = this.renderer
                .listen(nativeView, Label.loadedEvent, (event: EventData)=> {
                    if (isAndroid) {
                        nativeView.android.setGravity(android.view.Gravity.CENTER);
                    }
                }
            );
        }
    }

    ngOnDestroy() {
        if (this.listener) {
            this.listener();
        }
    }
}
