# Link Manager for Google Drive
**Google Apps Standalone Script**

Repo created using [node-google-apps-script](https://github.com/danthareja/node-google-apps-script).

Refer to above for the initialization process.

## Structure
Note that `.js` files are uploaded as `.gs`. Therefore source files 
below referred to as `.gs`.
 * `manifest/` - web app manifest for CWS; see also [`manifest.md`](manifest.md)
 * `src/` - web app code base
   - `app.gs` - app entry points
   - `auth.gs` - autorization, installation and action dispatching (open/create)
   - `const.gs` - consts
   - `file.html` - file open action UI include
   - `fileaction.gs` - file open action processing
   - `fileprops.gs` - file properties functions
   - `fileurl.gs` - processed file related url functions
   - `html.gs` - web UI processing functions
   - `index.html` - web UI wrapper
   - `install.html` - installation entry (not used due to
      iframe sandboxing incompatibility)
   - `installed.html` - installation report (not used due to
      iframe sandboxing incompatibility)
   - `post.html` - used for debug purposes
   - `urlanalytics.gs` - shortened URL analytics functions
   - `utils-include.gs` - proper web page inclusion wrappers
   - `utils-navigate.gs` - inter-page navigation support wrappers
 * [`codebits.md`](codebits.md) - project related code source bits
 * `gapps.config.json` - `gapps` config; autocreated
 * [`manifest.md`](manifest.md) - app manifest related docs
 * `README.md` - this doc
 * [`resources.md`](resources.md) - app development related useful resources
 * [`workflow.md`](workflow.md) - app workflow docs

## Development
Normal development cycle requires `gapps upload` to update the script in
Google environment.

## Other
More details on the application are at [this closely related project](https://github.com/OleksiyRudenko/gd-linkman).

Please, refer to the above for more details.

[The Script at Google](https://script.google.com/d/1VWya6MzrBeHa4Pb8kCoJk3N4sCScQu_tX6g9K1McA2skoRo9RaSaKhr1/edit?usp=drive_web)
(limited access).
