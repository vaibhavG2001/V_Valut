import { useReducer } from "react";

export default function UsecustomHook() {


    function reducerFunction(state, action) {
        if (action.type == "name") {
            return { ...state, name: action.value }
        }
        else if (action.type == "email") {
            return { ...state, email: action.value }
        }
        else if (action.type == "number") {
            return { ...state, number: action.value }
        }
        else if (action.type == "age") {
            return { ...state, age: action.value }
        }

        else if (action.type == "password") {
            return { ...state, password: action.value }
        }

        else if (action.state == "btn") {
            return state
        }

        return state
    }



    let [state, dispatch] = useReducer(reducerFunction, {
        name: '',
        email: '',
        number: '',
        age: '',
        password: ''
    })


    return { state, dispatch }

}