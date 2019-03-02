import React, { Component } from 'react';
import { string } from 'prop-types';

import { Routes, userTypes } from '../../../settings';

/**
 * Components
 */
import Login from './Login';
import Reg from './Registration';
import RegMe from './Registration/regMe';
import Reset from './Reset';

const AuthContainer = ({ type, user, api, userId, resetCode, originalHost, lang }) => {
  switch(type) {
    case Routes.auth.login: return <Login api={api} routes={Routes.auth} />;
    case Routes.auth.reg: return <Reg api={api} routes={Routes.auth} types={userTypes} user={user} originalHost={originalHost} lang={lang}/>;
    case Routes.auth.regMe: return <RegMe api={api} routes={Routes.auth} types={userTypes} user={user} originalHost={originalHost} lang={lang}/>;
    case Routes.auth.reset: return <Reset userId={userId} resetCode={resetCode} api={api} />;
    default: return null;
  }
}

AuthContainer.propTypes = {
  type: string.isRequired
};


export default AuthContainer;
