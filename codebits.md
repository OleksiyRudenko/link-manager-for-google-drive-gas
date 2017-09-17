# Code bits

__GND__ - Google Native Documents.

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

## GAS form processing
Source: [StackOverflow](http://stackoverflow.com/)
I think you are trying to do a similar thing to me. Basically 
I need a system that allows you to login then provide additional 
data once you have logged in. So I started out with a basic form 
and then hit the wall that you are talking about, 
where it seems to be impossible to load HTML pages.

I then noticed that you CAN send back strings, therefore you 
can put that string into a div(see loadPage()), 
therefore show different pages. 
Below is a simple example, including handling failures. 
You can then keep writing pages as you would expect. 
So you can pass values to the next form and the next to produce 
an application.

To use this, you can enter in any username and it will fail, 
showing up a thrown error message. If you type in fuzzyjulz 
as the username it with show the next page including additional 
information from the login process.

**`Code.gs`**
```javascript
function doGet() {
  return HtmlService.createTemplateFromFile('Main')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.NATIVE);
}

function onLogin(form) {
  if (form.username == "fuzzyjulz") {
    var template =  HtmlService.createTemplateFromFile('Response');

    //Setup any variables that should be used in the page
    template.firstName = "Fuzzy";
    template.username = form.username;

    return template.evaluate()
      .setSandboxMode(HtmlService.SandboxMode.NATIVE)
      .getContent();
  } else {
    throw "You could not be found in the database please try again.";
  }
}

function include(filename) {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .getContent();
 }
```
**`Main.html`**
```html
<?!= include('CSS'); ?>
<script>
  function loadPage(htmlOut) {
    var div = document.getElementById('content');
    div.innerHTML = htmlOut;
    document.getElementById('errors').innerHTML = "";
  }
  function onFailure(error) {
    var errors = document.getElementById('errors');
    errors.innerHTML = error.message;
  }
</script>
<div id="errors"></div>
<div id="content">
  <?!= include('Login'); ?>
</div>
```
**`CSS.html`**
```css
<style>
  p b {
    width: 100px;
    display: inline-block;
  }
</style>
**`Login.html`**
```html
<script>
  function onLoginFailure(error) {
    var loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = false;
    loginBtn.value = 'Login';
    onFailure(error);
  }
</script>
<div class="loginPanel">
  <form>
    <p>
      <b>Username: </b>
      <input type="text" name="username"/>
    </p>
    <input type="button" id="loginBtn" value="Login" onclick="this.disabled = true; this.value = 'Loading...';google.script.run
      .withSuccessHandler(loadPage)
      .withFailureHandler(onLoginFailure)
      .onLogin(this.parentNode)"/>
  </form>
</div>
````
**`Response.html`**
```html
<div class="text">
  Hi <?= firstName ?>,<br/>
  Thanks for logging in as <?= username ?>
</div>
```