import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";

@Component({
    selector: "ns-newAccountPage",
    templateUrl: "./newAccountPage.component.html",
    styleUrls: ["newAccountPage.component.scss"]
})
export class NewAccountPage implements OnInit {

    newUsername = ""; // placeholder for string newUsername
    newPassword = ""; // placeholder for string newPassword
    verifyNewPassword = ""; // placeholder for verifying string newPassword
    subtitleInvalidInput = ""; //placeholder for the string subtitleInvalidInput
    classCode = ""; // placeholder for string classCode
    buttonIsDisabled = true;
    countingNullFields = 0;
    newUsernameFieldColor = "";
    newPasswordFieldColor = "";
    verifyNewPasswordFieldColor = "";
    classCodeFieldColor = "";
    newUsernameFieldsetOpacity = 1;
    newPasswordFieldsetOpacity =1;
    verifyNewPasswordFieldsetOpacity = 1;
    classCodeFieldsetOpacity = 1;

    constructor(private router: RouterExtensions,) {}


    ngOnInit() {
    }

    newUsernameOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        // Gets or sets the placeholder text.
        //console.log(textField.hint);
        // Gets or sets the input text.
        this.newUsername = textField.text;
        console.log("The newUsername is " + textField.text);
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

        if(this.newUsername == ""){
            this.newUsernameFieldColor = "red";
            this.newUsernameFieldsetOpacity = 0.5;
        }
        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    newUsernameOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.newUsernameFieldColor = "";
        this.newUsernameFieldsetOpacity = 1;

    }

    newUsernameOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.newUsername = textField.text;
        console.log("The newUsername is " + textField.text);
        if(this.newUsername == ""){
            this.newUsernameFieldColor = "red";
            this.newUsernameFieldsetOpacity = 0.5;
        }
    }

    newPasswordOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.newPassword = textField.text;
        console.log("The newPassword is " + textField.text);

        if(this.newPassword == ""){
            this.newPasswordFieldColor = "red";
            this.newPasswordFieldsetOpacity = 0.5;
        }

        if(this.verifyNewPassword != this.newPassword){
            this.verifyNewPasswordFieldColor = "red";
            this.verifyNewPasswordFieldsetOpacity = 0.5;
            this.newPasswordFieldColor = "red";
            this.newPasswordFieldsetOpacity = 0.5;
        }
        
        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    newPasswordOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.newPasswordFieldColor = "";
        this.newPasswordFieldsetOpacity = 1;
        this.verifyNewPasswordFieldColor = "";
        this.verifyNewPasswordFieldsetOpacity = 1;
    }

    newPasswordOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.newPassword = textField.text;
        console.log("The newPassword is " + textField.text);
        if(this.newPassword == ""){
            this.newPasswordFieldColor = "red";
            this.newPasswordFieldsetOpacity = 0.5;
        }
        if(this.verifyNewPassword != this.newPassword){
            this.verifyNewPasswordFieldColor = "red";
            this.verifyNewPasswordFieldsetOpacity = 0.5;
            this.newPasswordFieldColor = "red";
            this.newPasswordFieldsetOpacity = 0.5;
        }
    }

    verifyNewPasswordOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.verifyNewPassword = textField.text;
        console.log("The verifyNewPassword is " + textField.text);

        if(this.verifyNewPassword == ""){
            this.verifyNewPasswordFieldColor = "red";
            this.verifyNewPasswordFieldsetOpacity = 0.5;
        }
        if(this.verifyNewPassword != this.newPassword){
            this.newPasswordFieldColor = "red";
            this.newPasswordFieldsetOpacity = 0.5;
        }

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    verifyNewPasswordOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.verifyNewPasswordFieldColor = "";
        this.verifyNewPasswordFieldsetOpacity = 1;
        this.newPasswordFieldColor = "";
        this.newPasswordFieldsetOpacity = 1;
    }

    verifyNewPasswordOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.verifyNewPassword = textField.text;
        console.log("The verifyNewPassword is " + textField.text);

        if(this.verifyNewPassword == ""){
            this.verifyNewPasswordFieldColor = "red";
            this.verifyNewPasswordFieldsetOpacity = 0.5;
        }
        if(this.verifyNewPassword != this.newPassword){
            this.verifyNewPasswordFieldColor = "red";
            this.verifyNewPasswordFieldsetOpacity = 0.5;
            this.newPasswordFieldColor = "red";
            this.newPasswordFieldsetOpacity = 0.5;
        }
    }

    classCodeOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.classCode = textField.text;
        console.log("The classCode is " + textField.text);
        
        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    classCodeOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
    }

    classCodeOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.classCode = textField.text;
        console.log("The classCode is " + textField.text);
    }


    AccountConfirmButton() {
        // and that pressing the button creates a dialog that the account was
        // successfully created and goes to the tabs

        if(this.newPasswordFieldColor != ""){
            this.router.navigate(["tabs"], { clearHistory: true});
            console.log("accountCreated");
            console.log("newUsername = " + this.newUsername + "newPassword = " + this.newPassword + "verifyNewPassword = " 
                        + this.verifyNewPassword + "classCode = " + this.classCode);
        }
    }
}