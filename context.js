import React from 'react';
import { locStrings } from './static/localization'
// import { parseCookies } from 'nookies';

import { parseCookies } from './libs/cookies';

let cookies = parseCookies();
let lang = cookies['culture'] ? cookies['culture'] : 'en';

export const LocalizationContext = React.createContext({
  localization: locStrings[lang]
});
