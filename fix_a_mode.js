var fs = require('fs');
var files = [
  'procurement/detail/nodes/bid-announce.html',
  'procurement/detail/nodes/bid-opening.html',
  'procurement/detail/nodes/bid-apply.html',
  'procurement/detail/nodes/eval-result.html',
  'procurement/detail/nodes/eval-announce.html',
  'procurement/detail/nodes/award-result.html',
  'procurement/detail/nodes/award-announce.html',
  'procurement/detail/nodes/invite-units.html'
];

// The variable "a" is not available in the detached script block.
// Replace "a.mode === 'edit'" with inline querystring parsing.
var search = "a.mode === 'edit' || (typeof params !== 'undefined' && params.mode === 'edit')";
var replacement = "(function(){var p={};location.search.replace('?','').split('&').forEach(function(s){var kv=s.split('=');if(kv[0])p[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]||'')});return p.mode==='edit'})()";

files.forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  if (c.indexOf(search) === -1) {
    console.log('Pattern not found in: ' + f);
  } else {
    c = c.split(search).join(replacement);
    fs.writeFileSync(f, c, 'utf8');
    console.log('Fixed: ' + f);
  }
});
console.log('Done');