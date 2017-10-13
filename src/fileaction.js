function fileAction(params) {
  /*
  params.state -- app state parameters
  params.shorten -- shorten button clicked
  */
  
  var htmlT = htmlInit('index','file'); /** HtmlService
      // .createHtmlOutputFromFile('ExportLink')
      .createTemplateFromFile('index');
  
  // initialize routing
  htmlT.route = {
    include : 'file',
  }; */
  
  var fileId   = (typeof params.state.ids !== 'undefined')
    ? params.state.ids[0]
    : params.state.exportIds[0];
  
  // =========== process POST actions =================
  if (typeof params.forget!== 'undefined') {
    var setN = params.forget[0];
    var targetFormat = params['format'+setN][0];
    doActionForgetShortUrlId(fileId,targetFormat);
  }
  
  if (typeof params.shorten !== 'undefined') {
    var setN = params.shorten[0];
    var targetFormat = params['format'+setN][0];
    var longUrl = params['long'+setN][0];
    doActionCreateShortUrlId(fileId,targetFormat,longUrl);
  }
  
  // =========== prepare data =================
  
  var fileMDlist = ['id', 'title', 'iconLink', 'webContentLink', 'exportLinks' ];
  var fileMD     = getFileMetaDataById(fileId,fileMDlist);
  
  /*
  var file     = DriveApp.getFileById(fileId);
  var fileREST = Drive.Files.get(fileId);
  var fileProps = getShortIdProps(getFileProps(fileId));
  
  var fileP = {
    id       :  file.getId(),
    name     :  file.getName(),
    mimeType :  file.getMimeType(),
  };
  
  fileP.type = getFileType(fileREST.mimeType);
  */
  
  // initialize ViewModel
  htmlT.vm = {
    submitAction : getScriptUrl() + "?state=" + JSON.stringify(params.state),
    navbar : {
      title : fileMD.title,
      icon  : fileMD.iconLink,
    },
    message : {
      text : '',
      fg   : 'light', // bootstrap primary, secondary, success, danger, warning, info, light, dark, gray-dark, white
      bg   : 'info', // bootstrap primary, secondary, success, danger, warning, info, light, dark, white
    },
    file   : {
      anyoneWithLink : fileMD.permissions.anyoneWithLink,
      LMtype : fileMD.permissions.LMtype,
      urls : getFileUrls(fileMD), // [ { format, long, short, shortinfo, clicks },.. ] - short is either value or null to add 'Shorten' button
    },
  };

  if (typeof params.state.debug !== 'undefined') {
    htmlT.vm.debug = {
      params : params,
      fileMD : fileMD,
      redirectUrl : REDIRECT_URL,
    };
  }
  
  /* var html = htmlT.evaluate();
  html.setTitle("Link Manager for Google Drive");
  html.setFaviconUrl('https://cdn.rawgit.com/OleksiyRudenko/gd-linkman/fca04054/favicon-32x32.png'); */
  return htmlProduce(htmlT);
}

/**
 * sets value targetFormat property of fileId to ''
 */
function doActionForgetShortUrlId(fileId,targetFormat) {
  setShortIdProp(fileId,targetFormat,'');
}

function doActionCreateShortUrlId(fileId,targetFormat,longUrl) {
  // create short URL and get shortUrlId
  var shortUrlId = createShortUrlId(longUrl);
  // add short URL id to file properties
  setShortIdProp(fileId,targetFormat,shortUrlId);
}
