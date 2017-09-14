/**


Workflow:

Process FORGET POST action: remove shortUrlId from targetFormat fileprop
Process SHORTEN POST action: create fileprop re targetFormat = shortUrlId
Process XLSXPDF POST action: create fileprop re xlsx = null if long url not stored yet

Build available targetFormat strings with null shortUrls
Fetch targetFormat strings from file properties:
a) if shortUrlId !null then add shortURL+forgetBttn+infoUrls
b) xlsx2pdf long urls must have forget bttn

Show targetFormats

Show XLSXPDF add long url section

 


*/