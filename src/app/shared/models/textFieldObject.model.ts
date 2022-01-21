import { FormControl, Validators } from "@angular/forms";
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

    // specified data and index if object is unique
    constructor(private _dataOfTextField: string, private _indexOfTextField: number, 
                private _isDataRequired:boolean, private _doesHaveEmail?:boolean,
                private _dataPairValue?:string){}

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
        // let tempData = this._indexOfTextField;
        // console.log("The input status of the object with index "+ tempData.toString() + " is " + this._inputStatus);
        return this._inputStatus;
    }

    getIsRequiredStatusOfTextField(){
        return this._isDataRequired;
    }

    getDoesTextFieldHaveEmailStatus(){
        try{
            return this._doesHaveEmail;
        }
        catch{
            console.log("The object does not have an email prop in constructor");
            return null;
        }
    }

    getDataPairValueTag(){
        try{
            return this._dataPairValue;
        }
        catch{
            console.log("The object does not have a pair tag prop in constructor");
            return null;
        }
    }

    changeColorAndOpacitySwitch(isDefaultTextFieldSetting:boolean,inputStatus:boolean,customColorChosen?:string){
        // if the standard setting is used, the color will be red
        if(isDefaultTextFieldSetting)
            customColorChosen = "#ff0000"
        
        // if ((the data of the text field is empty) and (either the data is empty or the text field is not under the default setting))
        if((inputStatus==false) && ((this._dataOfTextField == "") || !isDefaultTextFieldSetting)){
            // console.log("Changing the color of Text Field to " + customColorChosen);
            this.setColorAndOpacityOfTextField(customColorChosen,0.5);
        }

        // else, the user has inputted nonempty data in the deafault setting, do not indicate invalid input
        else{
            // console.log("Removing the color of Text Field");
            this.setColorAndOpacityOfTextField("#ffffff",1);
        }
    }

    triggerColorAndOpacitySwitch(secondTextFieldObject?:TextFieldObject){
        // get the current data of the two objects and store temporary data
        let firstObjectTempData = this._dataOfTextField;
        this._dataOfTextField = "";
        let secondObjectTempData;

        try{
            secondObjectTempData = secondTextFieldObject._dataOfTextField;
            secondTextFieldObject._dataOfTextField = "";
        }
        catch{
            console.log("Second Object does not have data");
        }

        // set the data of objects to empty to trigger an invalid input indicator for both objects
        this.changeColorAndOpacitySwitch(true,false);
        secondTextFieldObject.changeColorAndOpacitySwitch(true,false);

        // get the data from temporary storage and set the data back to original
        this._dataOfTextField = firstObjectTempData;

        try{
            secondTextFieldObject._dataOfTextField = secondObjectTempData;
        }
        catch{
            console.log("Second Object does not have data");
        }
    }

    compareTextFieldDataOfObjs(secondTextFieldObject:TextFieldObject){
        //if the data assoicated from the called object is not the same as the data associated to the second object that is being compared
        if(this._dataOfTextField != secondTextFieldObject._dataOfTextField){
            this.triggerColorAndOpacitySwitch(secondTextFieldObject);
            console.log("Passwords do not match");
            this._doPasswordsMatch = false;
            secondTextFieldObject._doPasswordsMatch = false;
        }
        // else, the data compared between both objects are the same, do not indicate invalid input
        else{
            this.changeColorAndOpacitySwitch(true,false);
            secondTextFieldObject.changeColorAndOpacitySwitch(true,false);
            console.log("Passwords do match");
            this._doPasswordsMatch = true;
            secondTextFieldObject._doPasswordsMatch = true;
        }
    }

    checkDataWithCriteria(secondTextFieldObject?:TextFieldObject){
        let objPatternControl = new FormControl(this._dataOfTextField, Validators.pattern(this._allCharacterPattern));
        let objMinLengthControl = new FormControl(this._dataOfTextField, Validators.minLength(8));
        // if the object matches the pattern and has a length that is exactly or greater than the min length
        if((objPatternControl.errors && objMinLengthControl.errors) == null){
            // then the data passes the criteria, do not indicate invalid input
            this.changeColorAndOpacitySwitch(true,true);
            this._doesPasswordFitCriteria == true;
            secondTextFieldObject.changeColorAndOpacitySwitch(true,true);
            secondTextFieldObject._doesPasswordFitCriteria = true;
        }
        // else, the data does not pass the criteria, indicate invalid input 
        else{
            this.triggerColorAndOpacitySwitch(secondTextFieldObject);
            this._doesPasswordFitCriteria = false;
            secondTextFieldObject._doesPasswordFitCriteria = false;
        }
    }

    checkEmail(validatorControl:FormControl,object:TextFieldObject){
        // if the email does not have any errors
        if(validatorControl.errors == null){
            // then the email works, do not indicate any invalid input
            object.changeColorAndOpacitySwitch(true,false);
            return true;
        }
        // else, the email does not work, indicate invalid input
        else{
            this.triggerColorAndOpacitySwitch(object);
            return false;
        }
    }

    refreshPagePropsWithObjCollection(someObjCollection:TextFieldObject[],inputMode:boolean,colorChosen?:string){
        let countEmptyFields = 0;
        let isButtonEnabled:boolean;
        let emailWorks:boolean;
        let isUsername:boolean;
        
        // start looping through all objects for any changes
        for (let i= 0; i<someObjCollection.length; i++){
            let objectInCollection = someObjCollection[i];
            let dataRequiredControl = new FormControl(objectInCollection._dataOfTextField, Validators.required);
            let emailCheckControl = new FormControl(objectInCollection._dataOfTextField, Validators.email);
            let objPatternControl = new FormControl(objectInCollection._dataOfTextField, Validators.pattern("(?=.*[@]).+$"));
            
            // if we are just displaying a custom color background to indicate sucessful input, 
            // change all objects to have that specific color background
            if(colorChosen){
                objectInCollection.changeColorAndOpacitySwitch(false,false,colorChosen);
            }
            // else, we are checking input
            else{
                
                // this will be used to check passwords for valid input 
                // if the object chosen has a pair tag, and the user is not inputting data
                if((objectInCollection.getDataPairValueTag() == "pair")&&(inputMode == false)){ 
                    // then...
                    let objPairTag:string;
                    let secondObjPairTag:string;
                    let objectInSecondCollection;
                    objPairTag = objectInCollection.getDataPairValueTag(); // getting the pair tag for comparing
                    
                    // loop the same object collection to see any other objects with the same tag
                    for (let j = 0; j < someObjCollection.length; j++){
                        objectInSecondCollection = someObjCollection[j]; // get the second object
                        secondObjPairTag = objectInSecondCollection.getDataPairValueTag(); // and it's tag
                        
                        // if the tags match, and they are not at the same index (meaning that the object we are comparing tags with is not itself)
                        if((objPairTag == secondObjPairTag) && (objectInCollection.getIndexOfTextField() != objectInSecondCollection.getIndexOfTextField())){
                            
                            // then check it's data with the RegExp pattern and compare data of the first object to the second object's data
                            objectInCollection.checkDataWithCriteria(objectInSecondCollection);
                            objectInCollection.compareTextFieldDataOfObjs(objectInSecondCollection);  
                        }    
                    }
                }
                
                // this will check if the object in question has an email tag
                // if the object does have an email tag
                if(objectInCollection.getDoesTextFieldHaveEmailStatus()){
                    // then, check the data whether it is an email or username

                    // if the data from the object fits the pattern (it has a '@' in it), 
                    // and it is not an empty string, and the user is not inputting data
                    if((objPatternControl.errors==null) && (dataRequiredControl.errors == null)&&(inputMode == false)){
                        // then the user attempted to input an email and not a username
                        isUsername = false;
                        // check whether the email works
                        emailWorks = objectInCollection.checkEmail(emailCheckControl,objectInCollection);
                    }
                    // else, the user put in a username
                    else{
                        isUsername = true;
                    }
                }
                
                // this checks if the user inputted nothing into required fields
                // if the object has a required tag
                if(objectInCollection.getIsRequiredStatusOfTextField()){
                    //then check if the data is empty and change the button access accordingly
                    // if the data is empty
                    if(dataRequiredControl.errors)
                        countEmptyFields++; // count how many fields are empty
                    
                    /* if the:
                        - fields are not empty (zero empty fields)
                        - and the object in question has properties that the passwords match and fit the RegExp pattern
                        - and the user is not inputting data into any text field
                        - and there either exists a working email or username entered
                    */ 
                    if((countEmptyFields==0)&&(objectInCollection.getPasswordsMatchProp())&&(objectInCollection.getPasswordFitCriteriaProp())
                        &&(inputMode == false)&&((emailWorks == true)||(isUsername == true)))
                        // then the button is enabled for user to login/confirm submission
                        isButtonEnabled = true;
                    // else, the user did not enter data correctly in one or more text fields
                    else
                        isButtonEnabled = false;
                }
            }
        }
        // return the status of the button to page calling a random object
        return isButtonEnabled;
    }
}