import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { EventData } from "@nativescript/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { UIService } from "./shared/services/ui.service";
import { RouterExtensions } from "@nativescript/angular";

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
        private uiService: UIService,
        private router: RouterExtensions) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
    }

    ngOnDestroy() {
        this.drawerSub.unsubscribe();
    }

    get profileIconLabel(): ElementRef { return this._profileIconLabel; }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    onProfileIconLabelLoaded(args: EventData): void {
        this.uiService.centerAndroidTextVerticallyAndHorizontally(args);
    }

    /**
     * Opens a social media website based on what the user clicked on.
     * The socialMedia argument passed must be one of that in the web-viewer.models.ts.
     *
     * @param socialMedia name of social media to view must be on in enum SocialMedia already
     */
    onClickSocialMediaIcon(socialMedia: string): void {
        // Closes the nav bar
        this.uiService.toggleSidedrawer();
        this.router.navigate(["/web-viewer", socialMedia], { transition: {name: "slideLeft"}, });
    }
 }
