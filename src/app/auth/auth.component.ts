import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";
import { BackendService } from "../shared/services/backend.service";
import { ChartsDataService } from "../shared/services/charts-data.service";

@Component({
    selector: "ns-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["auth.component.scss"]
})
export class AuthComponent implements OnInit {
    testNum: number;
    username = "";
    password = "";
    exisitngUser = "JosephC12";
    existingPassword = "somePassword";
    
    constructor(
        private router: RouterExtensions,
        private backendService: BackendService,
        private chartsDataService: ChartsDataService) {}

    ngOnInit() {
        this.testNum = 15;

        this.backendService.fetchAllSensorsReadings();
        this.chartsDataService.initializeChartServiceData();
        // TODO: this has been added here for charts view testing purposes only
        // needs to be changed
        // end TODO
    }

    
    Login() {
        // TODO, create a server with docker to verfiy usernames and passwords
        /*
        let options = {
            title: "Invalid Login",
            message: "Username/Email was not found in database.",
            okButtonText: "OK"
        };
        
        alert(options).then(() => {
            console.log("Race chosen!");
        });

        for dialog component in ui under shared
        */
        // the user's username input does not match any username in the database
        /*if (this.username != this.exisitngUser){
            // TODO, connect a server with data to check the users with HTTP request and docker
            console.log(this.username);
            console.log("Invalid input: username/email was not found in database");

            // dialog, invalid input: username/email was not found in database
        }
        
        // the user has a username in the database, but the password doesnt match
        else if (this.username == this.exisitngUser && this.existingPassword != this.password) {
            // TODO, connect a server with data to check the password with HTTP request and docker
            console.log("Invalid input: password was not found in database")
        }

        // else, the user that has a username in the database and has matched with their password, login
        else {
            this.router.navigate(["tabs"], { clearHistory: true});
            this.backendService.fetchAllSensorsReadings();
            this.chartsDataService.initializeChartServiceData();
            console.log("loggedIn");
        }
        */
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("loggedIn");
    }

    createNewAccount(){
        this.router.navigate(["newAccountPage"], { clearHistory: true});
        console.log("creatingAccount");
    }

    usernameOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        // Gets or sets the placeholder text.
        //console.log(textField.hint);
        // Gets or sets the input text.
        console.log("The username is " + textField.text);
        textField.text = this.username;
        // Gets or sets the secure option (e.g. for passwords).
        //console.log(textField.secure);

        // Gets or sets the soft keyboard type. Options: "datetime" | "phone" | "number" | "url" | "email"
        //console.log(textField.keyboardType);
        // Gets or sets the soft keyboard return key flavor. Options: "done" | "next" | "go" | "search" | "send"
        //console.log(textField.returnKeyType);
        // Gets or sets the autocapitalization type. Options: "none" | "words" | "sentences" | "allcharacters"
        //console.log(textField.autocapitalizationType);

        // Gets or sets a value indicating when the text property will be updated.
        //console.log(textField.updateTextTrigger);
        // Gets or sets whether the instance is editable.
        //console.log(textField.editable);
        // Enables or disables autocorrection.
        //console.log(textField.autocorrect);
        // Limits input to a certain number of characters.
        //console.log(textField.maxLength);

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    usernameOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
    }

    usernameOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
    }

    onReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        // Gets or sets the placeholder text.
        //console.log(textField.hint);
        // Gets or sets the input text.
        console.log("The password is " + textField.text);
        textField.text = this.password;
        // Gets or sets the secure option (e.g. for passwords).
        //console.log(textField.secure);

        // Gets or sets the soft keyboard type. Options: "datetime" | "phone" | "number" | "url" | "email"
        //console.log(textField.keyboardType);
        // Gets or sets the soft keyboard return key flavor. Options: "done" | "next" | "go" | "search" | "send"
        //console.log(textField.returnKeyType);
        // Gets or sets the autocapitalization type. Options: "none" | "words" | "sentences" | "allcharacters"
        //console.log(textField.autocapitalizationType);

        // Gets or sets a value indicating when the text property will be updated.
        //console.log(textField.updateTextTrigger);
        // Gets or sets whether the instance is editable.
        //console.log(textField.editable);
        // Enables or disables autocorrection.
        //console.log(textField.autocorrect);
        // Limits input to a certain number of characters.
        //console.log(textField.maxLength);

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    onFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
    }

    onBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
    }
}
