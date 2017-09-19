# Link Manager for Google Drive
**Google Apps Standalone Script**

A Google Drive application to manage file download and export links.
Export options are supported for Google office suite documents.

> Note: native Google office suite documents hereinafter referred 
to as the **NGD**.

## The Problem

When you share a link to a file located on Google Drive your vis-a-vis 
may face:
 * need to switch to a Google account in order to access NGD
 * inability to access NGD when vis-a-vis has got no Google account
 * take extra step to download other types of files as by default those
   are opened in a preview mode
 * inability to access any file if access permissions aren't
   set properly

You may also want to track access activities.

## Solution

This tool integrates with Google Drive and offers:
 * convert-and-download direct links for native Google documents
 * direct download links for other types of files

The tool doesn't fetch files contents.

### Features
 * Convert and download link for NGD
 * NGD gets converted to MSO document, pdf, or other types
 * Google Sheets pdf export can be tuned
 * Direct download link for other types
 * goo.gl url shortener embedded
 * access authorization shortcut

## App Installation

**TBD**

## Further Contents for Developers
 * [Project Structure](#project-structure)
 * [Development](#development)
 * [Set up and Publication](#set-up-and-publication)
   - [Project Set Up](#project-set-up)
   - [Publication with CWS](#publication-with-cws)
 * [Other](#other)


Repo created using [node-google-apps-script](https://github.com/danthareja/node-google-apps-script).

Refer to the above for the initialization process.

## Project Structure
Note that `.js` files are uploaded as `.gs`. Therefore source files 
below referred to as `.gs`.
 * `manifest/` - web app manifest for CWS; see also [`manifest.md`](manifest.md)
   - `manifest.json` - web app manifest for CWS
   - `*.png` - app icons
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

## Set up and Publication

### Project Set Up

**TBD**

### Publication with CWS

**TBD**

## Other
More details on the application are at [this closely related project](https://github.com/OleksiyRudenko/gd-linkman).

Please, refer to the above for more details.

[The Script at Google](https://script.google.com/d/1VWya6MzrBeHa4Pb8kCoJk3N4sCScQu_tX6g9K1McA2skoRo9RaSaKhr1/edit?usp=drive_web)
(restricted access).
