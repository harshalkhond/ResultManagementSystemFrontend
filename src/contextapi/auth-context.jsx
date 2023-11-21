import React from 'react';

// Creating the context object and passing the default values.
const authContext = React.createContext({status:null,access:null,refresh:null,login:(value)=>{},setAccessToken:(acc,ref)=>{} , getToken:()=>{}});

export default authContext;
