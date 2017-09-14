/*
 * Deploy as web app
 * dev.pdf:    https://script.google.com/macros/s/AKfycby-sAfmiTCAfCsY6hCvVkpU6e0hvlDcLz56EIJJKGMz/dev?state={"ids":["0By_1gNcMlZs6TWE5aHItZnBYOTg"],"action":"open","userId":"{userId}","debug":true}
 * dev.gDoc:   https://script.google.com/macros/s/AKfycby-sAfmiTCAfCsY6hCvVkpU6e0hvlDcLz56EIJJKGMz/dev?state={"ids":["1ANi2hxCFXh62y5RNXXTKQjoUK4RdP4EeyZKaJMRr6sw"],"action":"open","userId":"{userId}","debug":true}
 * dev.gSheet: https://script.google.com/macros/s/AKfycby-sAfmiTCAfCsY6hCvVkpU6e0hvlDcLz56EIJJKGMz/dev?state={"ids":["1s5cfMEuYU04qcNzZTy4Kj-wLy9itlp-imgtlfpRhnjk"],"action":"open","userId":"{userId}","debug":true}
 * dev.gSlide: https://script.google.com/macros/s/AKfycby-sAfmiTCAfCsY6hCvVkpU6e0hvlDcLz56EIJJKGMz/dev?state={"ids":["1WKFLJ14aQcLtrPz6d2z5wx3Ad6gMCGJgfyMt_v3GpBA"],"action":"open","userId":"{userId}","debug":true}
 * dev.gDraw:  https://script.google.com/macros/s/AKfycby-sAfmiTCAfCsY6hCvVkpU6e0hvlDcLz56EIJJKGMz/dev?state={"ids":["1t6b1O6srSCjieMEQbChfCKYa18JuQoe8uquLLVMbnGU"],"action":"open","userId":"{userId}","debug":true}
 *
 * prod: https://script.google.com/macros/s/AKfycbzkhmrAd5XDWPEjMg2LWZjwZzB_QzU77RYCBh5fk9OXsoqO7jyY/exec
 *       https://script.google.com/macros/s/AKfycbzkhmrAd5XDWPEjMg2LWZjwZzB_QzU77RYCBh5fk9OXsoqO7jyY/exec?state={"ids":["0By_1gNcMlZs6TWE5aHItZnBYOTg"],"action":"open","userId":"{userId}","debug":true}
 *
 * CWS: https://chrome.google.com/webstore/detail/gd-linkman-gas-sa/nakhlchefdilapgmhehbpmkgchadojjl
 *      https://chrome.google.com/webstore/developer/dashboard
 *
 * Regular call parameters:
 * APP_URL?state={"ids":["0By_1gNcMlZs6TWE5aHItZnBYOTg"],"action":"open","userId":"{userId}"}
*/

function doGet(e) {
  return auth(e);
}

function doPost(e) {
  /* var template = HtmlService.createTemplateFromFile('post');
  var param = e.parameters;
  template.vm = {
    data : JSON.stringify(param),
  };
  return template.evaluate(); */
  return auth(e);
}