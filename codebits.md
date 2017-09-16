# Code bits for future use

## Publish GND to web

[API reference](https://developers.google.com/drive/v2/reference/revisions)

```javascript
//this function publish to the web the document given by ID (google sheets or docs)
function publishToWeb(fileId){ 
    // var fileId = 'WqcTq4c3iumeEUSgPMCcM8yKUqycQsrn_w3XeE'; 
    var revisions = Drive.Revisions.list(fileId); 
    var items = revisions.items; 
    var revisionId =items[items.length-1].id; 
    var resource = Drive.Revisions.get(fileId, revisionId); 
    resource.published = true;
    resource.publishAuto = true;
    resource.publishedOutsideDomain = true;
    Drive.Revisions.update(resource, fileId, revisionId); 
}
```
[source](https://stackoverflow.com/questions/40476324/how-to-publish-to-the-web-a-spreadsheet-using-drive-api-and-gas)[170100]

