import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { isAndroid, Label, EventData, Color } from "@nativescript/core";

@Injectable({ providedIn: 'root'})
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);

    constructor() {}

    get drawerState() { return this._drawerState.asObservable(); }

    toggleSidedrawer() {
        this._drawerState.next(null);
    }

    /**
     * fixes text-align css bug that causes android devices not to center
     * text vertically and horizontally when setting text-align value to center.
     * @param args label event object, the label that is to be centered
     * @deprecated Use the LblCenterDirective instead.
     */
    centerAndroidTextVerticallyAndHorizontally(args: EventData): void {
        const lbl = args.object as Label;
        if (isAndroid) {
            lbl.android.setGravity(android.view.Gravity.CENTER);
        }
    }

    /**
     * Generates a random hex color string to instantiate a Color
     * object
     * @returns returns a random Color object
     */
    generateRandomColor(): Color {
        let hexChars = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += hexChars[Math.floor(Math.random() * 16)];
        }
        return new Color(color);
    }
}
