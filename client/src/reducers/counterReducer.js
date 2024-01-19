
const initialState = {
    counter :0
}

//enum
const ACTIONS = {
    INCREMENT:'INCREMENT',
    DECREMENT:'DECREMENT'
}

//action creators = return an object
export const incrementActionCreator = (payload = 1)=>{
    const action = {
        type:ACTIONS.INCREMENT ,
        payload

    }
    return action; 
}

export const decrementActionCreator = (payload = 1)=>{
    const action = {
        type:ACTIONS.DECREMENT ,
        payload
    }
    return action;
}


export const counterReducer = (state = initialState, action)=>{
    const {payload} = action;
    console.log({payload})
    switch(action.type){

        case ACTIONS.INCREMENT:

        // state.counter ++; // mutable update as it updates the object directly.
        // immutably updating the state
        
            return {...state, counter: state.counter+payload};
        
        case ACTIONS.DECREMENT:
        
            return {
                ...state,
                counter : state.counter-payload
            }
          //  break;
        default:
            return state;
    }
}