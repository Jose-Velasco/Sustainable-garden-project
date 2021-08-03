import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageRoute } from "@nativescript/angular";
import { Subscription } from "rxjs";
import { SocialMedia } from "../../shared/models/web-viewer.model";

@Component({
    selector: "ns-web-viewer",
    templateUrl: "./web-viewer.component.html",
    styleUrls: ["./web-viewer.component.scss"]
})
export class WebViewerComponent implements OnInit, OnDestroy {
    webViewSrc: SocialMedia;
    pageRouteSub: Subscription;
    constructor(private pageRoute: PageRoute) {}

    ngOnInit() {
        this.pageRouteSub = this.pageRoute.activatedRoute
            .subscribe(activatedRoute => {
                activatedRoute.paramMap.subscribe(paramMap => {
                    // sets url for Src in webview html that is restricted to the
                    // to available social medias urls
                    this.webViewSrc = SocialMedia[paramMap.get("socialMedia")];
                })
            });
    }

    ngOnDestroy() {
        if (this.pageRouteSub) {
            this.pageRouteSub.unsubscribe();
        }
    }
}
