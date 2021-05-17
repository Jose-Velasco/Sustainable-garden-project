import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { EventData } from "@nativescript/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { UIService } from "./shared/services/ui.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy  {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    @ViewChild("profileIconLabel", { read: ElementRef, static: true }) private _profileIconLabel: ElementRef;
    private drawer: RadSideDrawer;
    private drawerSub: Subscription;

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private UIService: UIService) {}

    ngOnInit() {
        this.drawerSub = this.UIService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
    }

    get profileIconLabel(): ElementRef { return this._profileIconLabel; }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        this.drawerSub.unsubscribe();
    }

    onProfileIconLabelLoaded(args: EventData): void {
        this.UIService.centerAndroidTextVerticallyAndHorizontally(args);
    }
 }
