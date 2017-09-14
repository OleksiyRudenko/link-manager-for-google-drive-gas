function htmlInit(index,inclusion,title,icon) {
  var htmlT = HtmlService
      // .createHtmlOutputFromFile('ExportLink')
      .createTemplateFromFile('index');
  
  // initialize routing
  htmlT.route = {
    include : inclusion,
  };
  
  // default data for navbar
  htmlT.vm = {
    navbar : {
      title: title,
      icon : 'https://cdn.rawgit.com/OleksiyRudenko/gd-linkman/gh-pages/favicon-16x16.png',
    },
  };
  return htmlT;
}

function htmlProduce(htmlT) {
  var html = htmlT.evaluate();
  html.setTitle("Link Manager for Google Drive");
  html.setFaviconUrl('https://cdn.rawgit.com/OleksiyRudenko/gd-linkman/fca04054/favicon-32x32.png');
  return html;
}
