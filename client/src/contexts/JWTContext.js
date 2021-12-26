/* eslint-disable */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode'
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

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
    const { msg } = action.payload;

    return {
      ...state,
      // isAuthenticated: true,
      msg
    };
  },
  FORGET_PASSWORD: (state, action) => {
    const { msg } = action.payload;

    return {
      ...state,
      // isAuthenticated: true,
      msg
    };
  },
  CHANGE_PASSWORD: (state, action) => {
    const { msg } = action.payload;

    return {
      ...state,
      // isAuthenticated: true,
      msg
    };
  }, 
  UPDATE_PROFILE: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      // isAuthenticated: true,
      user
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  forgetPassword: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.post('/api/my-account', {accessToken});
          const { user } = response.data;

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
        console.error(err);
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
    const response = await axios.post('/api/login', {
      email,
      password
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const register = async (userObj) => {
    const response = await axios.post('/api/signup', userObj);
    const { msg } = response.data;

    // window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        msg
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const forgetPassword = async (email) => {
    const response = await axios.post('/api/forget-password', {
      email
    });
    const { msg } = response.data;
    dispatch({
      type: 'FORGET_PASSWORD',
      payload: {
        msg
      }
    });
  };

  const resetPassword = async(passwordObj) => {
    const response = await axios.post('/api/reset-password', passwordObj);  
    const { msg } = response.data;

    dispatch({
      type: 'CHANGE_PASSWORD',
      payload: {
        msg
      }
    });
  };
  

  const updateProfile = async (profileObj) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const decode = jwt(accessToken);
    const response = await axios.post(`/api/update-profile/${decode.id}`, profileObj);
    const { user } = response.data;

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        user
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        forgetPassword,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
