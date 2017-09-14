function getUrlClicks(shortUrl) {
  var url = UrlShortener.Url.get(shortUrl, {
    projection: 'ANALYTICS_CLICKS'
  });
  var clicks = {
    id        : url.id,
    analytics : url.analytics,
  };
  return clicks;
}


function humanizeNumber(number) {
  if (number<1000) return number;
  
  number = (number/1000).toFixed(1);
  if (number<1000) return number + 'k+';
  
  number = (number/1000).toFixed(1);
  if (number<1000) return number + 'm+';
}
