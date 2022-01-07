/**
 * Class for modifying text field objects
 */
export class TextFieldObject {
    
    //defaults of all objects
    private _colorOfTextField =  "white"; 
    private _opacityOfTextField =  1;
    private _inputStatus = true;

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

    changeColorAndOpacitySwitch(inputStatus:boolean){
        // if the data of the text field is empty
        if(this._dataOfTextField == ""){
            
            // and if the user is not inputting data into the Text Field
            if(this._inputStatus != inputStatus){

                // then the user inputted invalid data and indicate it to the user
                console.log("Changing the color of Text Field to red");
                this.setColorAndOpacityOfTextField("red",0.5);
            }
            // else, the user is in input mode of the text field, do not indicate invalid input
            else{
                console.log("Removing the color of Text Field");
                this.setColorAndOpacityOfTextField("white",1);
            }
        }

        // else, the user has inputted nonempty data, do not indicate invalid input
        else{
            console.log("Removing the color of Text Field");
            this.setColorAndOpacityOfTextField("white",1);
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
            this.changeColorAndOpacitySwitch(false);
            secondTextFieldObject.changeColorAndOpacitySwitch(false);

            // get the data from temporary storage and set the data back to original
            this._dataOfTextField = firstObjectTempData;
            secondTextFieldObject._dataOfTextField = secondObjectTempData;
        }

        // else, the data compared between both objects are the same, do not indicate invalid input
        else{
            this.changeColorAndOpacitySwitch(false);
            secondTextFieldObject.changeColorAndOpacitySwitch(false);
        }
    }

    checkDataWithCriteria(){

    }
}