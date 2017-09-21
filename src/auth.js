/*  Integration of Google Drive with the Actions of CCSLT Document Manager
*The interconnection with Drive is based on Arun's DRIVE SDK + GAS Presentation and code
*Refresh token logic has been added to give continuous use capability
*Handles the installation for the user (execute script with no params and authorise through OAuth2 conversation
*/
// Globals used in api constructs
var AUTHORIZE_URL       = 'https://accounts.google.com/o/oauth2/auth';
var TOKEN_URL           = 'https://accounts.google.com/o/oauth2/token';
var REDIRECT_URL        = ScriptApp.getService().getUrl();  // url of *this* script exec
var TOKENPROPERTYNAME   = 'GOOGLE_OAUTH_TOKEN'; // access token valid until time expire or revoke by user
var REFRESHPROPERTYNAME = 'GOOGLE_OAUTH_REFRESH'; //oauth2 refresh token valid until revoked by user
var EXPIRYPROPERTYNAME  = 'GOOGLE_OAUTH_EXPIRY' ; // expiry of oauth2 token time to do refresh!
// OAUTH2 data from API project - needs to be replaced if new project is created or project generates new secret/id
var CLIENT_ID     = '940998321600-j97orlmmmrc59d1p1n2mni1dqtji7t01.apps.googleusercontent.com';
var CLIENT_SECRET = 'u3z9_oX2CYp2PlmnPg5Gf9YM';
// 
var DRIVE_API_URL = 'https://www.googleapis.com/drive/v2';
// maintain scope in step with changing application requirements
var SCOPE         = 'https://www.googleapis.com/auth/drive.install https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/urlshortener';
/* Main entry point
* functions depend on code and state parameters
* if state present ... app is installed
* createAction called from Google Drive when user selects the App from type choice at CREATE menu state=create
* fileAction called from Google Drive when user selects DOCMAN app from type choice at file selection menu state otherwise
* if state not present then it is an installation and authorisation call
*/

var GOA_PACKAGE_NAME = 'LinkManager4GDrive';
cGoa.GoaApp.setPackage(PropertiesService.getScriptProperties(), {
  clientId : CLIENT_ID,
  clientSecret : CLIENT_SECRET,
  scopes : cGoa.GoaApp.scopesGoogleExpand([
    'drive.install',
    'userinfo.email',
    'userinfo.profile',
    'drive',
    'urlshortener'
  ]),
  service: 'google',
  packageName: GOA_PACKAGE_NAME
});

var RUN_TO_GET_REDIRECT_URL = true; // cGoa requires initial run to produce callback redirect url for OAuth settings

function auth(e) {
  if (RUN_TO_GET_REDIRECT_URL) return doGetDataStoreUser(e);

  // ===== Authorization routines ===============
  // this is pattern for a WebApp.
  // passing the doGet parameters (or anything else)
  // will ensure they are preservered during the multiple oauth2 processes
  var packageName = GOA_PACKAGE_NAME,
    userPropertyStore = PropertiesService.getUserProperties(),
    scriptPropertyStore = PropertiesService.getScriptProperties();

  // this starts with a package copy for a specific user if its needed
  cGoa.GoaApp.userClone(packageName, scriptPropertyStore , userPropertyStore);

  // create a user specific package.
  var goa = cGoa.GoaApp.createGoa (packageName,userPropertyStore).execute(e);

  // it's possible that we need consent - this will cause a consent dialog
  if (goa.needsConsent()) {
    return goa.getConsent();
  }

  // if we get here its time for your webapp to run and we should have a token, or thrown an error somewhere
  if (!goa.hasToken()) throw 'something went wrong with goa - did you check if consent was needed?';

  // ========== Main routine ===========
  // testDataStore (goa.getToken(), goa.getParams() );  // as per tutorial, whenever user token required

  // retrieve normal parameters
  e = goa.getParams();

  // Logger.log("Entering auth with e=" + JSON.stringify(e,null,4));
  var HTMLToOutput = '';
  // business operations of Drive API send state parameter, authentication returns code, initialisation has no parameters
  if (e.parameters.state) {
    //1 var state = JSON.parse(e.parameters.state);
    e.parameters.state = JSON.parse(e.parameters.state);
    if(e.parameters.state.action === 'create'){
      // called as a result of  selection from CREATE menu of Google Drive user interface actually creates a UIApp
      return createAction(e.parameters);
    } else {
      // called as a result of selection from right click on file menu of Google Drive user interface
     // HTMLToOutput=fileAction(state); 
     // return HtmlService.createHtmlOutput(HTMLToOutput)
     return fileAction(e.parameters);
    }
  }
  if (HTMLToOutput.length == 0)
    HTMLToOutput = '<!DOCTYPE html><html><head><base target="_top"></head><body>Authorization cycle failed.</body></html>';
  return HtmlService.createHtmlOutput(HTMLToOutput);
}

function appUser(params) { // was dataStoreUser()
  // pick up the token refreshing if necessary
  var goa = cGoa.GoaApp.createGoa('DriverDatastore_example', PropertiesService.getUserProperties()).execute(params);
  if (!goa.hasToken()) {
    throw 'for a non webapp version - first publish once off to provoke a dialog - token will be refreshed automatically thereafter';
  }
  // do a test - passing the token and any parameters that arrived to this function
  Logger.log (testDataStore (goa.getToken(), goa.getParams() ));
}

/**
 * this is your main processing - will be called with your access token
 * @param {string} accessToken - the accessToken
 * @param {*} params any params
 */
function testApp (accessToken,params) { // was testDataStore()
  var options = {
    method: "POST",
    contentType : "application/json" ,
    muteHttpExceptions : true,
    headers: {
      "authorization": "Bearer " + accessToken,
    },
    payload:JSON.stringify({
      "query": {
        "kinds": [{"name":"polymerdbab"}]
      }
    })
  };

  return UrlFetchApp.fetch(
    "https://www.googleapis.com/datastore/v1beta2/datasets/xliberationdatastore/runQuery", options);

}