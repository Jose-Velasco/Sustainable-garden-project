import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";
import { TextFieldObject } from "../shared/models/textFieldObject.model";

@Component({
    selector: "ns-newAccountPage",
    templateUrl: "./newAccountPage.component.html",
    styleUrls: ["newAccountPage.component.scss"]
})

export class NewAccountPage implements OnInit {

    textFieldCollection = [];

    newUsername = ""; // placeholder for string newUsername
    newUsernameFieldColor:string;
    newUsernameFieldOpacity:number;
    UsernameTextFieldObj = new TextFieldObject(this.newUsername,0);

    newPassword = ""; // placeholder for string newPassword
    newPasswordFieldColor:string;
    newPasswordFieldOpacity:number;
    PasswordTextFieldObj = new TextFieldObject(this.newPassword,1);

    verifyNewPassword = ""; // placeholder for verifying string newPassword
    verifyNewPasswordFieldColor:string;
    verifyNewPasswordFieldOpacity:number;
    VerifyPasswordTextFieldObj = new TextFieldObject(this.verifyNewPassword,2);
    
    classCode = ""; // placeholder for string classCode
    classCodeFieldColor:string;
    classCodeFieldOpacity:number;
    ClassCodeTextFieldObj = new TextFieldObject(this.classCode,3);

    subtitleInvalidInput:string; //placeholder for the string subtitleInvalidInput
    inputStatusOfTextField = true;
    countingNullFields = 0;
    constructor(private router: RouterExtensions,) {}

    ngOnInit() {

    }

    changeColorAndOpacityOfTextField(object:TextFieldObject, currentInputStatus:boolean){ 
        if(object.getDataOfTextField() == ""){
            if(this.inputStatusOfTextField != currentInputStatus){
                console.log("Changing the color of Text Field to red");
                object.setColorAndOpacityOfTextField("red",0.5);
            }
            else{
                console.log("Removing the color of Text Field");
                object.setColorAndOpacityOfTextField("white",1);
            }
        }
        else{
            console.log("Removing the color of Text Field");
            object.setColorAndOpacityOfTextField("white",1);
        }
        
    }
    
    newUsernameOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        // Gets or sets the placeholder text.
        //console.log(textField.hint);
        // Gets or sets the input text.
        this.newUsername = textField.text;
        this.UsernameTextFieldObj.setDataOfTextField(this.newUsername);
        //this.UsernameTextFieldObj.setDataOfObject = this.newUsername;
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
        //console.log(textField.maxLength)

        this.changeColorAndOpacityOfTextField(this.UsernameTextFieldObj,!this.inputStatusOfTextField);
        this.newUsernameFieldColor = this.UsernameTextFieldObj.getColorOfTextField();
        this.newUsernameFieldOpacity = this.UsernameTextFieldObj.getOpacityOfTextField();

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    newUsernameOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.changeColorAndOpacityOfTextField(this.UsernameTextFieldObj,this.inputStatusOfTextField);
        this.newUsernameFieldColor = this.UsernameTextFieldObj.getColorOfTextField();
        this.newUsernameFieldOpacity = this.UsernameTextFieldObj.getOpacityOfTextField();
    }

    newUsernameOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.newUsername = textField.text;
        this.UsernameTextFieldObj.setDataOfTextField(this.newUsername);
        console.log("The newUsername is " + textField.text);
        this.changeColorAndOpacityOfTextField(this.UsernameTextFieldObj,!this.inputStatusOfTextField);
        this.newUsernameFieldColor = this.UsernameTextFieldObj.getColorOfTextField();
        this.newUsernameFieldOpacity = this.UsernameTextFieldObj.getOpacityOfTextField();
    }

    newPasswordOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.newPassword = textField.text;
        console.log("The newPassword is " + textField.text);
        
        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    newPasswordOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
    }

    newPasswordOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.newPassword = textField.text;
        console.log("The newPassword is " + textField.text);
        
    }

    verifyNewPasswordOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.verifyNewPassword = textField.text;
        console.log("The verifyNewPassword is " + textField.text);

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    verifyNewPasswordOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.verifyNewPasswordFieldColor = "";
    }

    verifyNewPasswordOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.verifyNewPassword = textField.text;
        console.log("The verifyNewPassword is " + textField.text);
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