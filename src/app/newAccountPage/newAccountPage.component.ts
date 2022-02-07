import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core/ui/text-field";
import { TextFieldObject } from "../shared/models/textFieldObject.model";
import { UserDataReadWriteService } from "../shared/services/userDataReadWrite.service";

@Component({
    selector: "ns-newAccountPage",
    templateUrl: "./newAccountPage.component.html",
    styleUrls: ["newAccountPage.component.scss"],
    providers: [UserDataReadWriteService]
})

export class NewAccountPage implements OnInit {

    textFieldObjCollection:TextFieldObject[] = new Array();
    colorAndOpacityCollection:number[] = new Array();

    newUsername = ""; // placeholder for string newUsername
    newUsernameFieldColor:string;
    newUsernameFieldOpacity:number;
    UsernameTextFieldObj = new TextFieldObject(this.newUsername,0,true,true);

    newPassword = ""; // placeholder for string newPassword
    newPasswordFieldColor:string;
    newPasswordFieldOpacity:number;
    PasswordTextFieldObj = new TextFieldObject(this.newPassword,1,true,false,"pair");

    verifyNewPassword = ""; // placeholder for verifying string newPassword
    verifyNewPasswordFieldColor:string;
    verifyNewPasswordFieldOpacity:number;
    VerifyPasswordTextFieldObj = new TextFieldObject(this.verifyNewPassword,2,true,false,"pair");
    
    classCode = ""; // placeholder for string classCode
    classCodeFieldColor:string;
    classCodeFieldOpacity:number;
    ClassCodeTextFieldObj = new TextFieldObject(this.classCode,3,false);

    buttonEnabled = false;

    newUserRegisterObj;

    constructor(private router: RouterExtensions,private userDataReadWriteService:UserDataReadWriteService) {}

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
        this.classCodeFieldColor = this.ClassCodeTextFieldObj.getColorOfTextField();
        this.classCodeFieldOpacity = this.ClassCodeTextFieldObj.getOpacityOfTextField();
    }
    
    newUsernameEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.UsernameTextFieldObj.changeColorAndOpacitySwitch(true,true);
        this.buttonEnabled = this.UsernameTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,true);
        this.newAccountPageDataRefresh();
    }

    newUsernameExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;
        this.newUsername = textField.text;
        this.UsernameTextFieldObj.setDataOfTextField(this.newUsername);
        
        this.UsernameTextFieldObj.changeColorAndOpacitySwitch(true,false);
        this.buttonEnabled = this.UsernameTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false);
        this.newAccountPageDataRefresh();
        
        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }
    
    newPasswordEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,true);
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,true);
        this.buttonEnabled = this.PasswordTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,true);
        this.newAccountPageDataRefresh();
    }
    
    newPasswordExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.newPassword = textField.text;
        this.PasswordTextFieldObj.setDataOfTextField(this.newPassword);
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,false);
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,false);
        this.buttonEnabled = this.PasswordTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false);
        this.newAccountPageDataRefresh();

        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }

    verifyNewPasswordEnterField(args){
        let textField = <TextField>args.object;
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,true);
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,true);
        this.buttonEnabled = this.VerifyPasswordTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,true);
        this.newAccountPageDataRefresh();
    }
    
    verifyNewPasswordExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.verifyNewPassword = textField.text;
        this.VerifyPasswordTextFieldObj.setDataOfTextField(this.verifyNewPassword);
        this.VerifyPasswordTextFieldObj.changeColorAndOpacitySwitch(true,false);
        this.PasswordTextFieldObj.changeColorAndOpacitySwitch(true,false);
        this.buttonEnabled = this.VerifyPasswordTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false);
        this.newAccountPageDataRefresh();

        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }
    
    classCodeEnterField(args){
        // focus event will be triggered when the users enters the TextField
        let textField = <TextField>args.object;
        //this.ClassCodeTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false);
        //this.newAccountPageDataRefresh();
    }
    
    classCodeExitField(args,timeoutEnabled:boolean){
        // returnPress event will be triggered when user submits a value
        let textField = <TextField>args.object;

        this.classCode = textField.text;
        this.ClassCodeTextFieldObj.setDataOfTextField(this.classCode);
        //this.ClassCodeTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false);
        //this.newAccountPageDataRefresh();

        if(timeoutEnabled){
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
        }
    }

    AccountConfirmButton() {
        // and that pressing the button creates a dialog that the account was
        // successfully created and goes to the tabs
        this.VerifyPasswordTextFieldObj.refreshPagePropsWithObjCollection(this.textFieldObjCollection,false,"#008C00");
        this.newAccountPageDataRefresh();
        this.router.navigate(["tabs"], { clearHistory: true});
        console.log("accountCreated");
        console.log("newUsername = " + this.newUsername + " newPassword = " + this.newPassword + " verifyNewPassword = " 
                    + this.verifyNewPassword + " classCode = " + this.classCode);

        this.newUserRegisterObj = {
            username: this.newUsername,
            password: this.newPassword,
            email: this.newUsername
        };

        this.userDataReadWriteService.registerUser(this.newUserRegisterObj).subscribe(
            responce => {
                console.log("User " + this.newUserRegisterObj.username + " has been created.")
            },
            error => console.log("Error, user was not created:", error) // fix error handling for if user exists, or account can't be created if server gives error
        );
    }
}

