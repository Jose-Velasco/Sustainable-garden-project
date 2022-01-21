import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";
import { BackendService } from "../shared/services/backend.service";
import { ChartsDataService } from "../shared/services/charts-data.service";
import { TextFieldObject } from "../shared/models/textFieldObject.model";

// decorator, tells angular and nativescript what component we are talking abou
@Component({
    selector: "ns-auth", //where in nativescript is this component
    templateUrl: "./auth.component.html", // which html doc is this associated to
    styleUrls: ["auth.component.scss"] // which scss styling doc is this associated to
})
// the auth component "auth" has an alias in Typescript: AuthComponent
// AuthComponent can be found in app.module.ts, not needed to be touched with Angular CLI working  
export class AuthComponent implements OnInit {
    loginTextFieldObjCollection:TextFieldObject[] = new Array();

    username= "";
    usernameFieldColor: string;
    usernameFieldOpacity: number;
    LoginUsernameTextFieldObj = new TextFieldObject(this.username,0,true,true);

    password= "";
    passwordFieldColor: string;
    passwordFieldOpacity: number;
    LoginPasswordTextFieldObj = new TextFieldObject(this.password,1,true);
    buttonEnabled = false;


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

        this.backendService.fetchAllSensorsReadings(); // (1)
        this.chartsDataService.initializeChartServiceData(); 
        // "this.chartsDataService.initializeChartServiceData();" has been added here for charts view testing purposes only

        this.loginTextFieldObjCollection.push(this.LoginUsernameTextFieldObj);
        this.loginTextFieldObjCollection.push(this.LoginPasswordTextFieldObj);
        
    }

    loginPageDataRefresh(){
        this.usernameFieldColor = this.LoginUsernameTextFieldObj.getColorOfTextField();
        this.usernameFieldOpacity = this.LoginUsernameTextFieldObj.getOpacityOfTextField();
        this.passwordFieldColor = this.LoginPasswordTextFieldObj.getColorOfTextField();
        this.passwordFieldOpacity = this.LoginPasswordTextFieldObj.getOpacityOfTextField();
    }

    usernameEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.LoginUsernameTextFieldObj.changeColorAndOpacitySwitch(true,true);
        this.buttonEnabled = this.LoginUsernameTextFieldObj.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,true);
        this.loginPageDataRefresh();
    }

    usernameExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        // Gets or sets the placeholder text.
        //console.log(textField.hint);
        // Gets or sets the input text.
        this.username = textField.text;
        this.LoginUsernameTextFieldObj.setDataOfTextField(this.username);
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

        this.LoginUsernameTextFieldObj.changeColorAndOpacitySwitch(true,false);
        this.buttonEnabled = this.LoginUsernameTextFieldObj.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false);
        this.loginPageDataRefresh();

        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }

    passwordEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.LoginPasswordTextFieldObj.changeColorAndOpacitySwitch(true,true);
        this.buttonEnabled = this.LoginPasswordTextFieldObj.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,true);
        this.loginPageDataRefresh();

    }

    passwordExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.password = textField.text;
        this.LoginPasswordTextFieldObj.setDataOfTextField(this.password);

        this.LoginPasswordTextFieldObj.changeColorAndOpacitySwitch(true,false);
        this.buttonEnabled = this.LoginPasswordTextFieldObj.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false);
        this.loginPageDataRefresh();

        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }

    Login() {
        this.LoginPasswordTextFieldObj.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"#008C00");
        this.loginPageDataRefresh();
        this.router.navigate(["tabs"], { clearHistory: true});  
        
        console.log("loggedIn"); // tell us we logged in
        console.log("this.username = "+this.username+", this.password = "+this.password);
    }

    // go to newAccount page, same process as previous method but to newAccountPage
    createNewAccount(){
        this.router.navigate(["newAccountPage"], { clearHistory: true});
        console.log("creatingAccount");
    }
}
