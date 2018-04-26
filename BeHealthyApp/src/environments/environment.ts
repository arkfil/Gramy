// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBvE1AMLqRSm-lMvPMwprcqfwk7sz5c0QQ",
    authDomain: "baihealthy.firebaseapp.com",
    databaseURL: "https://baihealthy.firebaseio.com",
    projectId: "baihealthy",
    storageBucket: "baihealthy.appspot.com",
    messagingSenderId: "756039335184"
  }
};
