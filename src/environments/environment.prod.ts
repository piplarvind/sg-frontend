// `.env.ts` is generated by the `npm run env` command
// import env from '@env/.env';
import { env } from './.env';

export const environment = {
  production: true,
  version: env.npm_package_version,

  //serverUrl: 'http://192.168.2.35:8000/api/v2/vb/',
  //imageUrl: 'http://localhost:8000/v2/vb/',

  // dev
  //serverUrl: 'http://staging.sportgrit.com/api/v2/vb/',
  //imageUrl: 'http://staging.sportgrit.com/v2/vb/',
  //resetpasswordurl: 'http://staging.sportgrit.com/manage/forgotPassword',

  //resetpasswordurl: 'http://vb.sportgrit.innovatily.net/forgotPassword',


  // production
  // serverUrl: 'http://54.185.76.175:8000/api/v2/',
  // imageUrl: 'http://54.185.76.175:8000/',
  // resetpasswordurl: 'http://54.185.76.175:8000/manage/forgotPassword',

  serverUrl: 'https://api.sportgrit.com/api/v2/',
  imageUrl: 'https://api.sportgrit.com/',
  resetpasswordurl: 'https://api.sportgrit.com/manage/forgotPassword',

  Platform_Admin: 'Platform Admin',
  General_User: 'Family-Friends-Fans',
  Club_Admin: 'Club Admin',
  Super_Admin: 'Super Admin',
  Coach: 'Coach',
  Parent: 'Parent',
  Recruiter: 'Recruiter',
  Athlete: 'Athlete',
  match: 'match',
  tryouts: 'tryouts',
  defaultLanguage: 'en-US',

  firebase: {
    apiKey: 'AIzaSyAl-bx0-N5foKCKJ6TV8wuYVUsbhQCRLxQ',
    // authDomain: 'sportsgrit-77a4b.firebaseapp.com',
    // databaseURL: 'https://sportsgrit-77a4b.firebaseio.com',
    projectId: 'sportsgrit-77a4b',
    storageBucket: 'sportsgrit-77a4b.appspot.com',
    messagingSenderId: '42507948141'
  },
  supportedLanguages: ['en-US', 'fr-FR']
};
