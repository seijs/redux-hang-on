import { ILetter } from "../interfaces/Letter.interface";
import { ILettersState } from "../letters.config";



export const saveLetterReducer = (state: ILettersState, payload: ILetter) => {
    state.lettersList.data.push(payload)
}