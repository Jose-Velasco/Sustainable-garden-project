import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "ns-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["auth.component.scss"]
})
export class AuthComponent implements OnInit {
    testNum: number;
    constructor(
        private router: RouterExtensions) {}

    ngOnInit() {
        this.testNum = 15;
    }

    Login() {
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("loggedIn");
    }
}
