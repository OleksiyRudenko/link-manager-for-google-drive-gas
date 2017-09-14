/**
 * fileREST     = Drive.Files.get(fileId)
 * fileType     = getFileType | null
 * targetFormat = value from DEF.cvtFormats[fileType], uses DEF.formats, fileREST.exportLinks[] & .webContentLink for bin
 */
function getExportUrl(fileMD,fileType,targetFormat) {
  if (fileType == null) {
    fileType = getFileType(fileMD.mimeType);
  }
  
  if (targetFormat == 'download')
    return fileMD.webContentLink;
  return (targetFormat == 'ppsx')
    ? fileMD.exportLinks[ DEF.formats['pptx'] ].replace('Format=pptx','Format=ppsx') // special case for ppsx which is not supported directly
    : fileMD.exportLinks[ DEF.formats[targetFormat] ];
}

/**
 * Generate a set of export urls
 */
function getFileUrls(fileMD) {
  var urls = [];
  var fileType = fileMD.LMtype;
  
  for (var i=0; i < DEF.cvtFormats[fileType].length; i++) {
    var targetFormat = DEF.cvtFormats[fileType][i];
    var longUrl = getExportUrl(fileMD,fileType,targetFormat);
    var isThereAShortId = ( (typeof fileMD.shortIdProps[targetFormat] !== 'undefined') && (fileMD.shortIdProps[targetFormat].length>0)) 
        ? true
        : false;
    var shortId = null;
    if (isThereAShortId) {
      shortId = fileMD.shortIdProps[targetFormat];
    }
    
    urls.push({
      format : targetFormat,
      long   : longUrl,
      short  : (isThereAShortId) ? makeShortUrlById(shortId) : null,
      info   : (isThereAShortId) ? makeShortUrlInfoById(shortId,'allTime') : null,
    });
  }
  
  return urls;
}


/**
 * create short url id
 */
function createShortUrlId(longUrl) {
  var shortId = extractGooglId(getShortUrl(longUrl));
  return shortId;
}

function getShortUrl(longUrl) {
  var url = UrlShortener.Url.insert({
    longUrl: longUrl
  });
  return url.id;
}

function extractGooglId(shortUrl) {
  return shortUrl.slice(-6);
}

/**
 * makes goo.gl url by Id
 */
function makeShortUrlById(urlId) {
  return makeShortUrlByIdFromTemplate(urlId,'link');
}

/**
 * makes goo.gl url by Id
 */
function makeShortUrlInfoById(urlId,timeSpan) {
  return makeShortUrlByIdFromTemplate(urlId,timeSpan);
}

/**
 * makes goo.gl url by Id and tplName
 */
function makeShortUrlByIdFromTemplate(urlId,tplName) {
  return Utilities.formatString(DEF_SHORT.urlTpl[tplName], urlId);
}



