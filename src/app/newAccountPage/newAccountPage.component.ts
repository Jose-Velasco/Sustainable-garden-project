import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";

@Component({
    selector: "ns-newAccountPage",
    templateUrl: "./newAccountPage.component.html",
    styleUrls: ["newAccountPage.component.scss"]
})
export class NewAccountPage implements OnInit {

    constructor(private router: RouterExtensions,) {}

    ngOnInit() {
    }

    AccountConfirmButton() {
        
        //TODO, make logic so that the creditals to make an account make sense
        // and that pressing the button creates a dialog that the accout was
        // successfully created and goes to the tabs
        
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("accountCreated");
    }
}