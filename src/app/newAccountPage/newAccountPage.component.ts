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
    colorAndOpacityCollection:number[] = new Array();

    newUsername = ""; // placeholder for string newUsername
    newUsernameFieldColor:string;
    newUsernameFieldOpacity:number;
    UsernameTextFieldObj = new TextFieldObject(this.newUsername,0,true,"newAccountPage");

    newPassword = ""; // placeholder for string newPassword
    newPasswordFieldColor:string;
    newPasswordFieldOpacity:number;
    PasswordTextFieldObj = new TextFieldObject(this.newPassword,1,true,"newAccountPage");

    verifyNewPassword = ""; // placeholder for verifying string newPassword
    verifyNewPasswordFieldColor:string;
    verifyNewPasswordFieldOpacity:number;
    VerifyPasswordTextFieldObj = new TextFieldObject(this.verifyNewPassword,2,true,"newAccountPage");
    
    classCode = ""; // placeholder for string classCode
    classCodeFieldColor:string;
    classCodeFieldOpacity:number;
    ClassCodeTextFieldObj = new TextFieldObject(this.classCode,3,false,"newAccountPage");

    buttonEnabled = false;

    constructor(private router: RouterExtensions,) {}

    ngOnInit() {
        this.textFieldObjCollection.push(this.UsernameTextFieldObj);
        this.textFieldObjCollection.push(this.PasswordTextFieldObj);
        this.textFieldObjCollection.push(this.VerifyPasswordTextFieldObj);
        this.textFieldObjCollection.push(this.ClassCodeTextFieldObj);
    }
    
    newAccountPageDataRefresh(){ // every page has a set of objects to change color from
        this.newUsernameFieldColor = this.UsernameTextFieldObj.getColorOfTextField();
        this.newUsernameFieldOpacity = this.UsernameTextFieldObj.getOpacityOfTextField();
        this.newPasswordFieldColor = this.PasswordTextFieldObj.getColorOfTextField();
        this.newPasswordFieldOpacity = this.PasswordTextFieldObj.getOpacityOfTextField();
        this.verifyNewPasswordFieldColor = this.VerifyPasswordTextFieldObj.getColorOfTextField();
        this.verifyNewPasswordFieldOpacity = this.VerifyPasswordTextFieldObj.getOpacityOfTextField();
    }

    // could be used elsewhere in the future for other places in the app
    refreshPagePropsWithObjCollection(someObjCollection:TextFieldObject[],colorChosen:string,inputMode:boolean){
        let countEmptyFields = 0;
        let isButtonEnabled:boolean;

        for (let i= 0; i<someObjCollection.length-1; i++){
            let objectInCollection = someObjCollection[i];
            
            if(colorChosen == "#008C00")
                objectInCollection.changeColorAndOpacitySwitch(false,"#008C00");
            
            if(objectInCollection.getIsRequiredStatusOfTextField()){
                if(objectInCollection.getDataOfTextField() == "")
                    countEmptyFields++;
            }
            
            this.newAccountPageDataRefresh();

            if((countEmptyFields==0)&&(objectInCollection.getPasswordsMatchProp())&&(objectInCollection.getPasswordFitCriteriaProp())&&(inputMode == false))
                isButtonEnabled = true;
            
            else
                isButtonEnabled = false;
        }

        return isButtonEnabled;
    }
    
    newUsernameEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.UsernameTextFieldObj.changeColorAndOpacitySwitch(true,"#ff0000");
        this.buttonEnabled = this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,"#ff0000",true);
    }

    newUsernameExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;
        this.newUsername = textField.text;
        this.UsernameTextFieldObj.setDataOfTextField(this.newUsername);
        console.log("The newUsername is " + textField.text);
        
        this.UsernameTextFieldObj.changeColorAndOpacitySwitch(false,"#ff0000");
        this.buttonEnabled = this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,"#ff0000",false);
        
        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }
    
    newPasswordEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,"#ff0000");
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,"#ff0000");
        this.buttonEnabled = this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,"#ff0000",true);
    }
    
    newPasswordExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.newPassword = textField.text;
        this.PasswordTextFieldObj.setDataOfTextField(this.newPassword);
        console.log("The newPassword is " + textField.text);
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(false,"#ff0000");
        this.PasswordTextFieldObj.checkDataWithCriteria(this.VerifyPasswordTextFieldObj);
        this.PasswordTextFieldObj.compareTextFieldDataOfObjs(this.VerifyPasswordTextFieldObj);
        this.buttonEnabled = this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,"#ff0000",false);

        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }

    verifyNewPasswordEnterField(args){
        let textField = <TextField>args.object;
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,"#ff0000");
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,"#ff0000");
        this.buttonEnabled = this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,"#ff0000",true);
    }
    
    verifyNewPasswordExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.verifyNewPassword = textField.text;
        this.VerifyPasswordTextFieldObj.setDataOfTextField(this.verifyNewPassword);
        console.log("The verifyNewPassword is " + textField.text);
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(false,"#ff0000");        
        this.VerifyPasswordTextFieldObj.checkDataWithCriteria(this.PasswordTextFieldObj);
        this.VerifyPasswordTextFieldObj.compareTextFieldDataOfObjs(this.PasswordTextFieldObj);
        this.buttonEnabled = this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,"#ff0000",false);

        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }
    
    classCodeEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
    }
    
    classCodeExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.classCode = textField.text;
        this.ClassCodeTextFieldObj.setDataOfTextField(this.classCode);
        console.log("The classCode is " + textField.text);
        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }

    AccountConfirmButton() {
        // and that pressing the button creates a dialog that the account was
        // successfully created and goes to the tabs
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("accountCreated");
        console.log("newUsername = " + this.newUsername + " newPassword = " + this.newPassword + " verifyNewPassword = " 
                    + this.verifyNewPassword + " classCode = " + this.classCode);
        this.refreshPagePropsWithObjCollection(this.textFieldObjCollection,"#008C00",false);
    }
}

