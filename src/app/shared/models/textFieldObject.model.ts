/**
 * Class for modifying text field objects
 */
export class TextFieldObject {
    private _colorOfTextField: "white"; 
    private _opacityOfTextField: 1;
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
}