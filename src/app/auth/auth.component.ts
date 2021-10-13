import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";
import { BackendService } from "../shared/services/backend.service";
import { ChartsDataService } from "../shared/services/charts-data.service";

// decorator, tells angular and nativescript what component we are talking about
@Component({
    selector: "ns-auth", //where in nativescript is this componet
    templateUrl: "./auth.component.html", // which html doc is this associated to
    styleUrls: ["auth.component.scss"] // which scss styling doc is this associated to
})
// the auth component "auth" has an alias in Typescript: AuthComponent
// AuthComponent can be found in app.module.ts, not needed to be touched with Angular CLI working  
export class AuthComponent implements OnInit { // the AuthComponent initializes...
    //...with the following data
    testNum: number; //! is this used?
    username = ""; // placeholder for string username
    password = ""; // placeholder for string password
    exisitngUser = "JosephC12"; // an exisiting user for testing
    existingPassword = "somePassword"; // an exisiting password for testing
    
    // TODO: need to set up a server for the exisitng password verification
    // TODO: need to allow sending data to such server
    // TODO: use the logic found in the Login() method inside the server code to verfiy username and password 
    
    // constructing the object
    constructor(
        private router: RouterExtensions, // nativescript's navigation internally, needed to 
                                          // navigate to the main portion of the program, see bottom of Login() method
        private backendService: BackendService, // see src/app/shared/services/backend.service.ts for more information
                                                // used to get the data from the backend service, see (1)
        private chartsDataService: ChartsDataService) {} // see src/app/shared/services/charts-data.service.ts for more information
                                                         // used to get the charts data, see (2)

    // where Angular initializes the component, our main() equivalent
    ngOnInit() {
        this.testNum = 15; //! is this used?

        this.backendService.fetchAllSensorsReadings(); // (1)
        this.chartsDataService.initializeChartServiceData(); //! (2)
        // TODO: "this.chartsDataService.initializeChartServiceData();" has been added here for charts view testing purposes only
        //!needs to be changed
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
            // TODO, connect a server with data to check the password with HTTP request
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
        // uses the RouterExtentions from constructor to navigate to tabs, see "tabs" in
        // src/app/app-routing.module.ts
        // clearHistory clears the data to be ready for any data in the next component
        console.log("loggedIn"); // tell us we logged in
    }

    // go to newAccount page, same process as previous method but to newAccountPage
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
