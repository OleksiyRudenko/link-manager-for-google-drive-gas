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
 * `cws/` - files used to publish app with chrome web store
   - `cws-promo/` - promotional assets
     - `*.png` - imagery
   - `manifest/` - web app manifest for CWS; see also [`manifest.md`](manifest.md)
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

Import project files under Google Script Engine either via
[Google Script IDE](https://script.google.com/) directly or
via connecting Google Apps Script app on Google Drive and
initializing the script at destination of your choice.

### Project Set Up

> **GS-IDE** - Google Script IDE.

> **DEVCON** - [Google Developers Console](http://console.developers.google.com/)

1. @ GS-IDE:
 * Rename script project as appropriate and uniquely
 * File > Manage versions:
   - describe and Save new version
   - Publish > Deploy as web app:
     - Project version = select freshly saved
     - Execute the app as = account of the user who visits the app
     - Who has access to the app = "Anyone" or "Anyone, even anonymous"
     - Deploy
     - Take note of '**Current web app URL**' (EXEC) and '**Test web app**' (DEV)
 * Resources > Advanced Google services : switch on services:
   - Drive API v2
   - URL Shortener API v1
2. @ DEVCON:
 * Select the project
 * Libraries > enable APIs:
   - Google Drive API
   - URL Shortener API
   - Google Apps Marketplace SDK
 * Credentials:
   - Create credentials:
     - Google Drive Integration
     - git-integration (optional to support)
     - take notes of keys and secrets, download key-files when required
   - OAuth consent screen: complete fields
   - Google Drive integration credentials:
     - complete the form
     - add Authorised redirect URI using EXEC url with replacement 
       `exec` => `usercallback`
 * Dashboard:
   - Google Apps Marketplace SDK > Configuration
     - take note of Project number (App ID)
     - complete required fields
     - tick `Enable individual install' & 'Drive extension'
     - use EXEC url for Setup URL field
   - Google Drive API > Drive UI Integration
     - complete required fields
     - DO NOT tick 'Automatically show OAuth 2.0 consent screen...'
     - DO NOT set Default MIME Types and Default File Extensions
     - set Secondary MIME Types and Secondary File Extensions as per section below
     - tick 'Importing', 'Mobile browser support', 'Team Drive support'
3. @ GS-IDE:
 * `auth.gs` - update App ID and credentials per notes taken above
 * republish app (create new version, deploy as web app)

#### Drive UI Integration

**Secondary MIME Types**:
 * `application/vnd.google-apps.document`
 * `application/vnd.google-apps.spreadsheet`
 * `application/vnd.google-apps.presentation`
 * `application/vnd.google-apps.drawing`

**Secondary File Extensions**:

| xlsx | xlsxm | docx | pptx | ppsx | vsdx |
|------|-------|------|------|------|------|
| ods  | odt   | odp  | pdf  | psd  | md   |
| exe  | msi   | zip  | 7z   | img  | gz   |
| html | htm   | jpeg | jpg  | png  | gif  |
| avi  | mp4   |

### Publication with CWS
Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
1. Complete your profile if not yet and pay required fee
2. Locate your project and edit it:
   * change assets in `cws/cws-promo/` and use those to complete the app profile
   * `cws/manifest/manifest.json`:
     - change app name, App ID, and other settings
     - set version to `x.0.0.1` where `x` is current version of the app in CWS
   * zip files in `cws/manifest/` and upload to app profile in CWS
   * choose proper publishing option and Publish

The app will be available in an hour or so.

Check [cws/README.md](cws/README.md) and how to
[Publish in the Chrome Web Store](https://developer.chrome.com/webstore/publish)
for details.

## Other
More details on the application you can find at
[this closely related project](https://github.com/OleksiyRudenko/gd-linkman).

[The Script at Google](https://script.google.com/d/1VWya6MzrBeHa4Pb8kCoJk3N4sCScQu_tX6g9K1McA2skoRo9RaSaKhr1/edit?usp=drive_web)
(restricted access).
