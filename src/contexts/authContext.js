import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    token : null,
    login: ()=> {},
    success: false,
    error: false,
    autoLogin: ()=> {}
})


export default authContext