// actions/userActions.js
export const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user,
    };
};

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER",
    };
};

// reducers/userReducer.js
const initialState = {
    user: null,
    isdone: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                isdone: true,
            };
        case "LOGOUT_USER":
            return {
                ...state,
                user: null,
                isdone: false,
            };
        default:
            return state;
    }
};
