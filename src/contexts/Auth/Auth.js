import React, {createContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Auth} from "../../api/Endpoints/Auth";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};
const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    }
};

const reducer = (state, action) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);

export const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                if (accessToken) {
                    const user = await Auth.me(accessToken);
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                // console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };
        initialize();
    }, []);


    const login = async (email, password) => {
        const accessToken = await Auth.login({ email, password });
        // const user = await Auth.me();

        if (accessToken.data.status !==  "error"){
            localStorage.setItem('accessToken', accessToken.data.data.auth_token);
            dispatch({
                type: 'LOGIN',
                payload: {
                    // user
                }
            });
            toast.success(accessToken.data.message,{
                position: "top-center"
            })
        }else{
            toast.error(accessToken.data.message,{
                position: "top-center"
            })
        }
    };

    const logout = async () => {
        localStorage.removeItem('accessToken');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}


AuthProvider.protoTypes = {
    children: PropTypes.node.isRequired
}
