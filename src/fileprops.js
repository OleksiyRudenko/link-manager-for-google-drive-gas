/**
 * Gets required properties
 */
function getFileMetaDataById(fileId,fileMDlist) {
  var fileDriveMetaData = Drive.Files.get(fileId); // what if file not accessible?
  var fileMetaData = {};
  for (var i=0; i<fileMDlist.length; i++) {
    fileMetaData[fileMDlist[i]] = fileDriveMetaData[fileMDlist[i]];
  }
  // get permissions
  var anyoneWithLink = null;
  try {
    anyoneWithLink = Drive.Permissions.get(fileId,'anyoneWithLink');
  } catch (e) {
    anyoneWithLink = null;
  }
  fileMetaData['permissions'] = {
    'all'            : Drive.Permissions.list(fileId),
    'anyoneWithLink' : anyoneWithLink,
  };
  // add LMtype
  fileMetaData.LMtype = getFileType(fileDriveMetaData.mimeType);
  // add shortUrlId related properties
  fileMetaData.shortIdProps = getShortIdProps(getFileProps(fileId));
  // fileMetaData.all = getFileProps(fileId);
  return fileMetaData;
}

/**
* gets file type: google native document | bin
 */
function getFileType(mimeType) {
  return (typeof DEF.mimeType[mimeType] !== 'undefined')
    ? DEF.mimeType[mimeType]
    : 'bin';
}

/**
 * gets file properties
 */
function getFileProps(fileId) {
  return Drive.Properties.list(fileId);
}

/**
 * extracts short url id related properties from file properties
 * all filePropPrefix_targetFormat_xlsx2pdfSettings = shortId are converted into:
 *  { targetFormat : shortId,... }
 *  _xlsx2pdfSettings offers no parsing yet
 * returns object
 */
function getShortIdProps(fileProps) {
  var ro = {};
  for (var i=0; i<fileProps.items.length; i++) {
    var item = fileProps.items[i];
    if (item.key.indexOf(DEF_SHORT.filePropPrefix)===0) {
      ro[item.key.slice(DEF_SHORT.filePropPrefix.length)] = item.value;
    }
  }
  return ro;
}

/**
 * extracts short id for given fileType from fileShortIdProps
 */
function getShortIdProp(fileShortIdProps,fileType) {
  return (typeof fileShortIdProps.fileType !== 'undefined')
    ? fileShortIdProps.fileType
    : null;
}

/**
 * sets short id for given fileType from fileShortIdProps
 */
function setShortIdProp(fileId,targetFormat,shortUrlId) {
  Drive.Properties.insert({
    'key'         : makeFilePropKey(targetFormat),
    'visibility'  : 'PUBLIC',
    'value'       : shortUrlId,
  }, fileId);
}

/**
 * makes file property related to short url id storage key name
 */
function makeFilePropKey(targetFormat) {
  return DEF_SHORT.filePropPrefix + targetFormat;
}
