import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { isAndroid, Label, EventData } from "@nativescript/core";

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
     */
    centerAndroidTextVerticallyAndHorizontally(args: EventData): void {
        const lbl = args.object as Label;
        if (isAndroid) {
            lbl.android.setGravity(android.view.Gravity.CENTER);
        }
    }
}
