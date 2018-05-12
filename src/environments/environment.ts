// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyAY4_9moLsRouKzMyZBDkb--5i8N71h96U",
    authDomain: "ucalproject.firebaseapp.com",
    databaseURL: "https://ucalproject.firebaseio.com",
    projectId: "ucalproject",
    storageBucket: "ucalproject.appspot.com",
    messagingSenderId: "204990184677"
  }
};
