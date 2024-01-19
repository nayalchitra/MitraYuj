import { userReducer} from "./userReducer";
import { counterReducer } from "./counterReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({users:userReducer,count:counterReducer});

export default rootReducer;