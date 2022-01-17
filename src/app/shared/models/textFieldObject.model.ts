import { Validators } from "@angular/forms";
/**
 * Class for modifying text field objects
 */
export class TextFieldObject {
    
    //defaults of all objects
    private _colorOfTextField =  "#ffffff"; 
    private _opacityOfTextField =  1;
    private _inputStatus = false;
    private _doPasswordsMatch=true;
    private _doesPasswordFitCriteria=true;
    private _allCharacterPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"); // based on RFC 5521 and 5522 specs
    /*
    usage convention for _pattern:
    if (pattern.test(username))
        ^^^^^^^^^^^^^^^^^^^^^^will return either true or false
    */

    // specified data and index of object is unique
    constructor(private _dataOfTextField: string, private _indexOfTextField: number){}


    setColorAndOpacityOfTextField(textFieldColor, textFieldOpacity){
        this._colorOfTextField = textFieldColor;
        this._opacityOfTextField = textFieldOpacity;
    }

    setDataOfTextField(passedDataFromCall){
        this._dataOfTextField = passedDataFromCall;
    }

    getDataOfTextField(){
        return this._dataOfTextField;
    }

    getIndexOfTextField(){
        return this._indexOfTextField;
    }

    getColorOfTextField(){
        return this._colorOfTextField;
    }

    getOpacityOfTextField(){
        return this._opacityOfTextField;
    }

    getPasswordsMatchProp(){
        return this._doPasswordsMatch;
    }

    getPasswordFitCriteriaProp(){
        return this._doesPasswordFitCriteria;
    }

    getInputStatusOfTextField(){
        let tempData = this._indexOfTextField;
        console.log("The input status of the object with index "+ tempData.toString() + " is " + this._inputStatus);
        return this._inputStatus;
    }

    changeColorAndOpacitySwitch(inputStatus:boolean,customColorChosen:string){
        // if the data of the text field is empty
        if(inputStatus==false){
            if(this._dataOfTextField == ""){
            
                console.log("Changing the color of Text Field to " + customColorChosen);
                this.setColorAndOpacityOfTextField(customColorChosen,0.5);
            }
            else if(customColorChosen == "#008C00"){
                console.log("Changing the color of Text Field to " + customColorChosen);
                this.setColorAndOpacityOfTextField(customColorChosen,0.5);
            }
            
            // else, the user is in input mode of the text field, do not indicate invalid input
            else{
                console.log("Removing the color of Text Field");
                this.setColorAndOpacityOfTextField("#ffffff",1);
            }
        }

        // else, the user has inputted nonempty data, do not indicate invalid input
        else{
            console.log("Removing the color of Text Field");
            this.setColorAndOpacityOfTextField("#ffffff",1);
        }
    }

    compareTextFieldDataOfObjs(secondTextFieldObject:TextFieldObject){

        //if the data assoicated from the called object is not the same as the data associated to the second object that is being compared
        if(this._dataOfTextField != secondTextFieldObject._dataOfTextField){
            // get the current data of the two objects and store temporary data
            let firstObjectTempData = this._dataOfTextField;
            let secondObjectTempData = secondTextFieldObject._dataOfTextField;

            // set the data of objects to empty to trigger an invalid input indicator for both objects
            this._dataOfTextField = "";
            secondTextFieldObject._dataOfTextField = "";
            this.changeColorAndOpacitySwitch(false,"#ff0000");
            secondTextFieldObject.changeColorAndOpacitySwitch(false,"#ff0000");

            // get the data from temporary storage and set the data back to original
            this._dataOfTextField = firstObjectTempData;
            secondTextFieldObject._dataOfTextField = secondObjectTempData;
            console.log("Passwords do not match");
            this._doPasswordsMatch = false;
            secondTextFieldObject._doPasswordsMatch = false;
        }

        // else, the data compared between both objects are the same, do not indicate invalid input
        else{
            this.changeColorAndOpacitySwitch(false,"#ff0000");
            secondTextFieldObject.changeColorAndOpacitySwitch(false,"#ff0000");
            console.log("Passwords do match");
            this._doPasswordsMatch = true;
            secondTextFieldObject._doPasswordsMatch = true;
        }
    }

    checkDataWithCriteria(secondTextFieldObject:TextFieldObject){
        if((this._allCharacterPattern.test(this.getDataOfTextField())) && (this.getDataOfTextField().length >= 8)){
            this.changeColorAndOpacitySwitch(true,"#ff0000");
            secondTextFieldObject.changeColorAndOpacitySwitch(true,"#ff0000");
            this._doesPasswordFitCriteria == true;
            secondTextFieldObject._doesPasswordFitCriteria = true;
        }
            
        else{
            // get the current data of the two objects and store temporary data
            let firstObjectTempData = this._dataOfTextField;
            let secondObjectTempData = secondTextFieldObject._dataOfTextField;

            // set the data of objects to empty to trigger an invalid input indicator for both objects
            this._dataOfTextField = "";
            secondTextFieldObject._dataOfTextField = "";
            this.changeColorAndOpacitySwitch(false,"#ff0000");
            secondTextFieldObject.changeColorAndOpacitySwitch(false,"#ff0000");

            // get the data from temporary storage and set the data back to original
            this._dataOfTextField = firstObjectTempData;
            secondTextFieldObject._dataOfTextField = secondObjectTempData;
            this._doesPasswordFitCriteria = false;
            secondTextFieldObject._doesPasswordFitCriteria = false;
        }
    }

}