# Application Workflow

1. Authorization (`auth.gs`)
 * App Installation Routines
 * OAuth routines
 
2. User action processing (`fileaction.gs`)
 * FORGET POST action: remove shortUrlId from targetFormat fileprop
 * SHORTEN POST action: create fileprop re targetFormat = shortUrlId
 * XLSXPDF POST action: create fileprop re xlsx = null if long url not stored yet

3. Main job (`fileaction.gs`)
 * Build available targetFormat strings with null shortUrls
 * Fetch targetFormat strings from file properties:
   - if shortUrlId !null then add shortURL+forgetBttn+infoUrls
   - xlsx2pdf long urls must have forget bttn
 * Show targetFormats with UI
 * Show XLSXPDF add long url section