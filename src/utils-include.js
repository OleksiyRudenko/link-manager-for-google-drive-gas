// include HTML from among the project's .html's
// to be used from a project's .html file
function includeHTML(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
// include and evaluate HTML templates from among the project's .html's
// to be used from a project's .html file
function includeHTMLeval(filename, vm) {
  var htmlT = HtmlService.createTemplateFromFile(filename);
  htmlT.vm = vm;
  return htmlT.evaluate().getContent();
}

// load and evaluate JS technically stored in HTML file 
function loadJSFromHTMLFile(projectHTMLfileName) { // e.g. script.html
  var javascript = HtmlService
       .createTemplateFromFile(projectHTMLfileName).getRawContent();
  eval(javascript);
 }

// Load JavaScript from External Server
function loadJSFromUrl(url) { // e.g. "https://example.com/script.text"
  var javascript = UrlFetchApp.fetch(url).getContentText();
  eval(javascript);
}

// Load JavaScript from Google Drive
function loadJSFromGoogleDrive(id) {
  var rawJS = DriveApp.getFileById(id).getBlob().getDataAsString();
  eval(rawJS);
}

// Include from CDN
// Credit Brian @github
var LIBRARIES = {
  prettyDate:  "http://ejohn.org/files/pretty.js",
  underScore: "http://underscorejs.org/underscore-min.js",
}

Object.keys(LIBRARIES).forEach(function(library) {
  newFunc = loadJSFromUrlX(LIBRARIES[library]);
  eval('var ' + library + ' = ' + newFunc);  
});

function loadJSFromUrlX(url) {
  return eval(UrlFetchApp.fetch(url).getContentText());
}
