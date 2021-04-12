import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        this.drawerSub.unsubscribe();
    }
 }
