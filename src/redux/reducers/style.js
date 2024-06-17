import {TOGGLE_MODE} from "../constant";
import {getSystemTheme} from "../../utils/index";
import {DARK_MODE, LIGHT_MODE, SYSTEM_MODE} from "@/theme";


const initState = {
    mode: SYSTEM_MODE, // system, light, dark
    currentTheme: "light"
}

export default function style(preState = initState, {type, data}) {
    switch (type) {
        case TOGGLE_MODE:
            if(data === SYSTEM_MODE){
                return {currentTheme: getSystemTheme(), mode: SYSTEM_MODE}
            }else if(data === LIGHT_MODE){
                return {currentTheme: "light", mode: LIGHT_MODE}
            }else if(data === DARK_MODE){
                return {currentTheme: "dark", mode: DARK_MODE}
            }else{
                return {...preState}
            }
        default:
            return preState
    }
}
