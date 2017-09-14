/*
I think you are trying to do a similar thing to me. Basically I need a system that allows you to login then provide additional data once you 
have logged in. So I started out with a basic form and then hit the wall 
that you are talking about, where it seems to be impossible to load HTML pages.

I then noticed that you CAN send back strings, therefore you can put that string into a div(see loadPage()), therefore show different pages. 
Below is a simple example, including handling failures. You can then keep writing pages as you would expect. 
So you can pass values to the next form and the next to produce an application.

To use this, you can enter in any username and it will fail, showing up a thrown error message. If you type in fuzzyjulz as the username 
it with show the next page including additional information from the login process.

Code.gs

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
Main.html

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
CSS.html

<style>
  p b {
    width: 100px;
    display: inline-block;
  }
</style>
Login.html

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
Response.html

<div class="text">
  Hi <?= firstName ?>,<br/>
  Thanks for logging in as <?= username ?>
</div> */