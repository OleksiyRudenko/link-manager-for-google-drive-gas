var DEF = {
  mimeType : {
    'application/vnd.google-apps.document'     : 'gdoc',
    'application/vnd.google-apps.spreadsheet'  : 'gsheets',
    'application/vnd.google-apps.presentation' : 'gslides',
    'application/vnd.google-apps.drawing'      : 'gdrawing',
    // other : bin
  },
  exportUrl : {
    bin     : 'https://drive.google.com/uc?export=download&id=%s',
    gdoc    : 'https://docs.google.com/document/d/%s/export?format=%s',
    gsheets : 'https://docs.google.com/spreadsheets/d/%s/export?format=%s',
    gslides : 'https://docs.google.com/presentation/d/%s/export/%s',
    gdrawing: 'https://docs.google.com/drawings/d/%s/export/%s',
  },
  formats : { // format : target mime-type; fileREST.exportLinks{}
    'pdf'  : "application/pdf",
    'docx' : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    'rtf'  : "application/rtf",
    'odt'  : "application/vnd.oasis.opendocument.text",
    'txt'  : "text/plain",
    'epub' : "application/epub+zip",
    'html' : "text/html",   // not used as contains external links
    'htmlz': "application/zip",
    'xlsx' : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    'ods'  : "application/vnd.oasis.opendocument.spreadsheet",
    'tsv'  : "text/tab-separated-values",
    'csv'  : "text/csv",
    'pptx' : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    // 'ppsx'
    'odp'  : "application/vnd.oasis.opendocument.presentation",
    'png'  : "image/png",
    'jpeg' : "image/jpeg",
    'svg'  : "image/svg+xml",
  },
  cvtFormats : {
    bin      : [ 'download' ], // fileREST.webContentLink
    gdoc     : [ 'pdf', 'docx', 'odt', 'htmlz', 'rtf', 'epub', 'txt', ],
    gsheets  : [ 'pdf', 'xlsx', 'ods', 'htmlz', 'csv', 'tsv', ],
    gslides  : [ 'pdf', 'pptx', 'odp', ], // 'ppsx', 'jpeg', 'png', 'svg', ],
    gdrawing : [ 'pdf', 'jpeg', 'png', 'svg', ],
  },
  gsheets : {
    printTpl : '&size=%s&portrait=%s&fitw=%s&source=%s&sheetnames=%s&printtitle=%s&pagenumbers=%s&gridlines=%s&fzr=%s',
    singleSheet : '&gid=%s',
    printSettings : {
      size        : 'A4',
      portrait    : 'false',
      fitw        : 'true',
      source      : 'Link Manager for Google Drive',
      sheetnames  : 'false',
      printtitle  : 'false',
      pagenumbers : 'false',
      gridlines   : 'false',
      fzr         : 'false',
    },
    // check built-in print export options
    printSettingsOptions : {
      size        : { 
        'Letter (21.6 cm x 27.9 cm)'    : 'Letter',
        'Tabloid (27.9 cm x 43.2 cm)'   : 'Tabloid',
        'Legal (21.6 cm x 35.6 cm)'     : 'Legal',
        'Statement (14.0 cm x 21.6 cm)' : 'Statement',
        'Executive (18.4 cm x 26.7 cm)' : 'Executive',
        'Folio (21.6 cm x 33.0 cm)' : 'Folio',
        'A3 (29.7 cm x 42.0 cm)' : 'A3',
        'A4 (21.0 cm x 29.7 cm)' : 'A4',
        'A5 (14.8 cm x 21.0 cm)' : 'A5',
        'B4 (25.0 cm x 35.3 cm)' : 'B4',
        'B5 (17.6 cm x 25.0 cm)' : 'B5',
      },
      portrait    : { name : 'Page orientation', type: 'select', options : { 'Portrait'  : 'true', 'Landscape' : 'false' }, },
      fitw        : { name : 'Fit page width', type: 'checkbox', options: true, },
      source      : { name : 'Source', type : 'text', options: 'Link manager', },
      sheetnames  : { name : 'Print sheet names', type: 'checkbox', options: false, },
      printtitle  : { name : 'Print workbook title', type: 'checkbox', options: 'false', },
      pagenumbers : { name : 'Print page numbers', type: 'checkbox', options : 'false', },
      gridlines   : { name : 'Print gridlines', type: 'checkbox', options : 'false', },
      fzr         : { name : 'Repeat frozen rows', type: 'checkbox', options : 'false', },
    },
  },
  shortInfo : {
    key    : ['allTime','month','week','day','twoHours'],
    text   : { allTime:'All time', month:'Month', week:'Week', day:'Day', twoHours:'2 hours' },
    urlTpl : {
      allTime : 'https://goo.gl/#analytics/goo.gl/%s/all_time', 
      month   : 'https://goo.gl/#analytics/goo.gl/%s/month', 
      week    : 'https://goo.gl/#analytics/goo.gl/%s/week', 
      day     : 'https://goo.gl/#analytics/goo.gl/%s/day',
      twoHours: 'https://goo.gl/#analytics/goo.gl/%s/two_hours',
    },
  },
};

/* file short id related properties format
   filePropPrefix_targetFormat_xlsx2pdfSettings = shortId
   `_xlsx2pdfSettings` is optional
*/

var DEF_SHORT = {
  filePropPrefix : 'shortid_',
  urlTpl : {
    link    : 'https://goo.gl/%s',
    allTime : 'https://goo.gl/#analytics/goo.gl/%s/all_time', 
    month   : 'https://goo.gl/#analytics/goo.gl/%s/month', 
    week    : 'https://goo.gl/#analytics/goo.gl/%s/week', 
    day     : 'https://goo.gl/#analytics/goo.gl/%s/day',
    twoHours: 'https://goo.gl/#analytics/goo.gl/%s/two_hours',
  },
};


