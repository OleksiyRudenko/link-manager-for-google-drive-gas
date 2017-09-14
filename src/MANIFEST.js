/*
How to update GAS manifest:
https://developers.google.com/apps-script/guides/domain-wide-web-app

from https://developer.chrome.com/webstore/get_started_simple:
"urls"
    Specifies the starting URLs of all other web pages that are in the app. In this example, 
    both http://mysubdomain.example.com/page1.html and http://mysubdomain.example.com/subdir/page2.html 
    would be in the app. You don't need to specify the URLs for included files or for assets such as images. 
    Currently, the domain name must be followed by at least one character ("/"). 

See gd-linkman@github 

{
  "update_url": "https://clients2.google.com/service/update2/crx",
  "name":"Link Manager for Google Drive (gas-sa)",
  "short_name": "LinkMan",
  "description":"Share export-and-download links for native Google documents and direct download links for other types.",
  "version": "2.0.0.1",
  "manifest_version": 2,
  "api_console_project_id": "940998321600",
  "container": ["DOMAIN_INSTALLABLE", "GOOGLE_DRIVE"],
  "app": {
    "urls":
    ["https://script.google.com/macros/s/AKfycbzkhmrAd5XDWPEjMg2LWZjwZzB_QzU77RYCBh5fk9OXsoqO7jyY/exec"],
    "launch":
    {"web_url":"https://script.google.com/macros/s/AKfycbzkhmrAd5XDWPEjMg2LWZjwZzB_QzU77RYCBh5fk9OXsoqO7jyY/exec"}
  },
  "icons": {
    "128": "ico-gd-linkman-cws-112in128x.png",
    "16" : "ico-cws-gapi-16x.png"
  }
} */