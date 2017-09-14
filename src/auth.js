/*  Integration of Google Drive with the Actions of CCSLT Document Manager
*The interconnection with Drive is based on Arun's DRIVE SDK + GAS Presentation and code
*Refresh token logic has been added to give continuous use capability
*Handles the installation for the user (execute script with no params and authorise through OAuth2 conversation
*/
// Globals used in api constructs
var AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/auth'; 
var TOKEN_URL = 'https://accounts.google.com/o/oauth2/token'; 
var REDIRECT_URL= ScriptApp.getService().getUrl();  // url of *this* script exec
var TOKENPROPERTYNAME = 'GOOGLE_OAUTH_TOKEN'; // access token valid until time expire or revoke by user
var REFRESHPROPERTYNAME = 'GOOGLE_OAUTH_REFRESH'; //oauth2 refresh token valid until revoked by user
var EXPIRYPROPERTYNAME = 'GOOGLE_OAUTH_EXPIRY' ; // expiry of oauth2 token time to do refresh!
// OAUTH2 data from API project - needs to be replaced if new project is created or project generates new secret/id
var CLIENT_ID = '940998321600-j97orlmmmrc59d1p1n2mni1dqtji7t01.apps.googleusercontent.com';
var CLIENT_SECRET = 'u3z9_oX2CYp2PlmnPg5Gf9YM';
// 
var DRIVE_API_URL = 'https://www.googleapis.com/drive/v2';
// maintain scope in step with changing application requirements
var SCOPE = 'https://www.googleapis.com/auth/drive.install https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/urlshortener';
/* Main entry point
* functions depend on code and state parameters
* if state present ... app is installed
* createAction called from Google Drive when user selects the App from type choice at CREATE menu state=create
* fileAction called from Google Drive when user selects DOCMAN app from type choice at file selection menu state otherwise
* if state not present then it is an installation and authorisation call
*/

function auth(e) {
  Logger.log("Entering auth with e=" + JSON.stringify(e,null,4));
  var HTMLToOutput = '';
  // business operations of Drive API send state parameter, authentication returns code, initialisation has no parameters
  if(e.parameters.state){
    //1 var state = JSON.parse(e.parameters.state);
    e.parameters.state = JSON.parse(e.parameters.state);
    if(e.parameters.state.action === 'create'){
      // called as a result of  selection from CREATE menu of Google Drive user interface actually creates a UIApp
      return createAction(e.parameters);

    }
    else {
      // called as a result of selection from right click on file menu of Google Drive user interface
     // HTMLToOutput=fileAction(state); 
     // return HtmlService.createHtmlOutput(HTMLToOutput)
     return fileAction(e.parameters);
    }
  }
  else if(e.parameters.code){//if we get "code" as a parameter in, then this is a callback from the install authorisation dance
    Logger.log("Installation response");
    getAndStoreAccessToken(e.parameters.code);  // installer
    // var htmlT = htmlInit('index','installed','Link Manager for Google Drive installed');
    HTMLToOutput = '<!DOCTYPE html><html><head><base target="_top"></head><body><h1>App is installed, you can close this window now or navigate to your <a href="https://drive.google.com">Google Drive</a>.</h1></body></html>';
    // return htmlProduce(htmlT);
  }
  else {//we are starting from scratch or resetting (result of running the /exec of this script)
    Logger.log("Installation request "+getURLForAuthorization());
    // var htmlT = htmlInit('index','install','Install Link Manager for Google Drive');
    // htmlT.vm.authUrl = getURLForAuthorization();
    HTMLToOutput = "<!DOCTYPE html><html><head><base target=\"_top\"></head><body><h1>Install this App into your Google Drive!</h1><a href='"+getURLForAuthorization()+"'>click here to start</a></body></html>";
    // return htmlProduce(htmlT);
  }
  if (HTMLToOutput.length == 0)
    HTMLToOutput = "<!DOCTYPE html><html><head><base target=\"_top\"></head><body>Authorization cycle failed.</body></html>";
  return HtmlService.createHtmlOutput(HTMLToOutput);
}
/* 
* first step of OAUTH2 dance to get an authorisation code
*/
function getURLForAuthorization(){
  return AUTHORIZE_URL + '?' +
    'redirect_uri='+REDIRECT_URL +
      '&response_type=code' +
        '&client_id='+CLIENT_ID +
          '&approval_prompt=force'+
            '&scope=' + encodeURIComponent(SCOPE) +
              '&access_type=offline';
}
/*
* second step of  OAUTH2 dance to exchange authorisation code for access key and refresh key
*/
function getAndStoreAccessToken(code){
  var payload = "client_id=" + CLIENT_ID
  payload = payload + "&redirect_uri="+encodeURIComponent(REDIRECT_URL)
  payload = payload + "&client_secret="+CLIENT_SECRET
  payload = payload + "&code="+encodeURIComponent(code)
  payload = payload + "&scope=&grant_type=authorization_code"

  var parameters = {
    'method' : 'post',
    'contentType' : 'application/x-www-form-urlencoded',
    'payload' : payload
  };
  
  var response = UrlFetchApp.fetch(TOKEN_URL,parameters).getContentText();
   var tokenResponse = JSON.parse(response);
  // store the access token for later retrieval
  UserProperties.setProperty(TOKENPROPERTYNAME, tokenResponse.access_token);
  // store the refresh token for use when access token expires
  UserProperties.setProperty(REFRESHPROPERTYNAME, tokenResponse.refresh_token);
  // store the expiry time to determine when access token expires (expiry is returned as seconds to go - converted to UTC time in msecs)
  UserProperties.setProperty(EXPIRYPROPERTYNAME,tokenResponse.expires_in * 1000 +new Date().getTime());
}
/* 
* Handles the token refresh function of OAUTH2 using saved refresh token
*/
function refreshAccessToken(){
  var payload = 'client_id=' +CLIENT_ID+
    '&client_secret='+CLIENT_SECRET+
      '&refresh_token='+UserProperties.getProperty(REFRESHPROPERTYNAME)+
        '&grant_type=refresh_token'
      
      var parameters = {
        'method' : 'post',
        'contentType' : 'application/x-www-form-urlencoded',
        'payload' : payload
      };
  
  var response = UrlFetchApp.fetch(TOKEN_URL,parameters).getContentText();

  var tokenResponse = JSON.parse(response);
  // store the token for later retrival - note refresh token does not expire
  UserProperties.setProperty(TOKENPROPERTYNAME, tokenResponse.access_token);
  UserProperties.setProperty(EXPIRYPROPERTYNAME,tokenResponse.expires_in * 1000 +new Date().getTime());
  return tokenResponse.access_token
}
/*
* Construct fetch options
*/

function getUrlFetchOptions() {
  return {'contentType' : 'application/json',
          'headers' : {'Authorization' : 'Bearer ' + isTokenValid,
                       'Accept' : 'application/json'}};
}
/*
* CHECK IF STORED token is valid, if not use refresh token to get new one
*/
function isTokenValid() {
  var now = new Date().getTime();
  var storedToken = UserProperties.getProperty(TOKENPROPERTYNAME);
  var storedRefresh = UserProperties.getProperty(REFRESHPROPERTYNAME);
  var expiry = UserProperties.getProperty(EXPIRYPROPERTYNAME);
  // if expired then refresh storedtoken
  if (expiry<= now){
    storedToken = refreshAccessToken();
  }
  
  return storedToken;

}
