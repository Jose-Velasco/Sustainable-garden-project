import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { UIService } from "../services/ui.service";

@Component({
    selector: "ns-action-bar",
    templateUrl: "./action-bar.component.html",
    styleUrls: ["./action-bar.component.scss"]
})
export class ActionBarComponent implements OnInit {
    @Input() title = "Sustainable Garden Project";
    @Input() hasMenu = false;
    @Input() showBackButton = false;

    constructor(
        private router: RouterExtensions,
        private UIService: UIService) {}

    ngOnInit() { }

    get canGoBack() { return this.router.canGoBack() && this.showBackButton; }

    onToggleMenu() {
        this.UIService.toggleSidedrawer();
    }
}
