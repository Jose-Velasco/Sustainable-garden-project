import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";
import { BackendService } from "../shared/services/backend.service";
import { ChartsDataService } from "../shared/services/charts-data.service";
import { TextFieldObject } from "../shared/models/textFieldObject.model";

// decorator, tells angular and nativescript what component we are talking about
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
    LoginUsernameTextFieldObj = new TextFieldObject(this.username,0);

    password= "";
    passwordFieldColor: string;
    passwordFieldOpacity: number;
    LoginPasswordTextFieldObj = new TextFieldObject(this.password,1);
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
        // TODO: "this.chartsDataService.initializeChartServiceData();" has been added here for charts view testing purposes only

        this.loginTextFieldObjCollection.push(this.LoginUsernameTextFieldObj);
        this.loginTextFieldObjCollection.push(this.LoginPasswordTextFieldObj);
        
    }

    
    // refactor into TextFieldObject model to be reused everywhere, see new account page for the whole method
    refreshPagePropsWithObjCollection(someObjCollection:TextFieldObject[],checkAllIfEmpty:boolean,colorChosen:string,inputMode:boolean){
        let countEmptyFields = 0;

        for (let i= 0; i<someObjCollection.length; i++){
            let objectInCollection = someObjCollection[i];
            //let nextObjectInCollection;
            if(colorChosen == "green"){
                objectInCollection.changeColorAndOpacitySwitch(false,"green");
            }
            //if(someObjCollection[i+1])
                //nextObjectInCollection = someObjCollection[i+1];
            if(objectInCollection.getDataOfTextField() == ""){
                countEmptyFields++;
                if(checkAllIfEmpty)
                    objectInCollection.changeColorAndOpacitySwitch(inputMode,colorChosen);
            }
            
            this.pageDataRefresh(objectInCollection);

            if(countEmptyFields==0){
                this.buttonEnabled = true;
            }
            else{
                this.buttonEnabled = false;
            }
            
        }
    }

    pageDataRefresh(object:TextFieldObject){
        if(object == this.LoginUsernameTextFieldObj){
            console.log("The username on login is changing color");
            this.usernameFieldColor = object.getColorOfTextField();
            this.usernameFieldOpacity = object.getOpacityOfTextField();
        }
        else if(object == this.LoginPasswordTextFieldObj){
            console.log("The password on login is changing color");
            this.passwordFieldColor = object.getColorOfTextField();
            this.passwordFieldOpacity = object.getOpacityOfTextField();
        }
    }

    usernameOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        // Gets or sets the placeholder text.
        //console.log(textField.hint);
        // Gets or sets the input text.
        this.username = textField.text;
        this.LoginUsernameTextFieldObj.setDataOfTextField(this.username);
        
        console.log("The username is " + textField.text);
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

        this.LoginUsernameTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"red",false);

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    usernameOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.LoginUsernameTextFieldObj.changeColorAndOpacitySwitch(true,"red");
        this.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"red",true);
    }

    usernameOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.username = textField.text;
        this.LoginUsernameTextFieldObj.setDataOfTextField(this.username);
        
        console.log("The username is " + textField.text);

        this.LoginUsernameTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"red",false);
    }

    passwordOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.password = textField.text;
        this.LoginPasswordTextFieldObj.setDataOfTextField(this.password);
        
        console.log("The password is " + textField.text);

        this.LoginPasswordTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"red",false);

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    passwordOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.LoginPasswordTextFieldObj.changeColorAndOpacitySwitch(true,"red");
        this.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"red",true);
    }

    passwordOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.password = textField.text;
        this.LoginPasswordTextFieldObj.setDataOfTextField(this.password);
        
        console.log("The password is " + textField.text);

        this.LoginPasswordTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"red",false);

    }

    Login() {
        this.refreshPagePropsWithObjCollection(this.loginTextFieldObjCollection,false,"green",false);
        
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
}
