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

    textFieldObjCollection:TextFieldObject[] = new Array();

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

    buttonEnabled = false;

    constructor(private router: RouterExtensions,) {}

    ngOnInit() {
        this.textFieldObjCollection.push(this.UsernameTextFieldObj);
        this.textFieldObjCollection.push(this.PasswordTextFieldObj);
        this.textFieldObjCollection.push(this.VerifyPasswordTextFieldObj);
        this.textFieldObjCollection.push(this.ClassCodeTextFieldObj);
    }
    
    // could be used elsewhere in the future for other places in the app
    refreshPagePropsWithObjCollection(someObjCollection:TextFieldObject[],checkAllIfEmpty:boolean,colorChosen:string,inputMode:boolean){
        let countEmptyFields = 0;

        for (let i= 0; i<someObjCollection.length-1; i++){
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

            if((countEmptyFields==0)&&(this.buttonEnabled ==true)&&(inputMode == false)){
                this.buttonEnabled = true;
            }
            else{
                this.buttonEnabled = false;
            }
        }
    }

    pageDataRefresh(object:TextFieldObject){
        if(object == this.UsernameTextFieldObj){
            this.newUsernameFieldColor = object.getColorOfTextField();
            this.newUsernameFieldOpacity = object.getOpacityOfTextField();
        }
        else if(object == this.PasswordTextFieldObj){
            this.newPasswordFieldColor = object.getColorOfTextField();
            this.newPasswordFieldOpacity = object.getOpacityOfTextField();
        }
        else if(object == this.VerifyPasswordTextFieldObj){
            this.verifyNewPasswordFieldColor = object.getColorOfTextField();
            this.verifyNewPasswordFieldOpacity = object.getOpacityOfTextField();
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
        this.UsernameTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    newUsernameOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.UsernameTextFieldObj.changeColorAndOpacitySwitch(true,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",true);
        
    }

    newUsernameOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.newUsername = textField.text;
        this.UsernameTextFieldObj.setDataOfTextField(this.newUsername);
        console.log("The newUsername is " + textField.text);
        this.UsernameTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
    }

    newPasswordOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.newPassword = textField.text;
        this.PasswordTextFieldObj.setDataOfTextField(this.newPassword);
        console.log("The newPassword is " + textField.text);
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
        this.PasswordTextFieldObj.compareTextFieldDataOfObjs(this.VerifyPasswordTextFieldObj);
        this.buttonEnabled = this.PasswordTextFieldObj.getPasswordsMatchProp();
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
        this.PasswordTextFieldObj.checkDataWithCriteria(this.VerifyPasswordTextFieldObj);
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
        
        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    newPasswordOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,"red");
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",true);
        
    }

    newPasswordOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.newPassword = textField.text;
        this.PasswordTextFieldObj.setDataOfTextField(this.newPassword);
        console.log("The newPassword is " + textField.text);
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
        this.PasswordTextFieldObj.compareTextFieldDataOfObjs(this.VerifyPasswordTextFieldObj);
        this.buttonEnabled = this.PasswordTextFieldObj.getPasswordsMatchProp();
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);

        this.PasswordTextFieldObj.checkDataWithCriteria(this.VerifyPasswordTextFieldObj);
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
    }

    verifyNewPasswordOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.verifyNewPassword = textField.text;
        this.VerifyPasswordTextFieldObj.setDataOfTextField(this.verifyNewPassword);
        console.log("The verifyNewPassword is " + textField.text);
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
        this.VerifyPasswordTextFieldObj.compareTextFieldDataOfObjs(this.PasswordTextFieldObj);
        this.buttonEnabled = this.VerifyPasswordTextFieldObj.getPasswordsMatchProp();
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
        this.VerifyPasswordTextFieldObj.checkDataWithCriteria(this.PasswordTextFieldObj);
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }

    verifyNewPasswordOnFocus(args) {
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,"red");
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",true);
    }

    verifyNewPasswordOnBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <TextField>args.object;
        this.verifyNewPassword = textField.text;
        this.VerifyPasswordTextFieldObj.setDataOfTextField(this.verifyNewPassword);
        console.log("The verifyNewPassword is " + textField.text);
        
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(false,"red");
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
        
        this.VerifyPasswordTextFieldObj.compareTextFieldDataOfObjs(this.PasswordTextFieldObj);
        this.buttonEnabled = this.VerifyPasswordTextFieldObj.getPasswordsMatchProp();
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);

        this.VerifyPasswordTextFieldObj.checkDataWithCriteria(this.PasswordTextFieldObj);
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"red",false);
    }

    classCodeOnReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.classCode = textField.text;
        this.ClassCodeTextFieldObj.setDataOfTextField(this.classCode);
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
        this.ClassCodeTextFieldObj.setDataOfTextField(this.classCode);
        console.log("The classCode is " + textField.text);
    }

    AccountConfirmButton() {
        // and that pressing the button creates a dialog that the account was
        // successfully created and goes to the tabs
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("accountCreated");
        console.log("newUsername = " + this.newUsername + " newPassword = " + this.newPassword + " verifyNewPassword = " 
                    + this.verifyNewPassword + " classCode = " + this.classCode);
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"green",false);
    }
}

