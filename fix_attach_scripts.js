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
files.forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  c = c.replace(
    /<script src="\.\.\/\.\.\/\.\.\/common\/scripts\.js">([\s\S]*?)<\/script>/g,
    '<script src="../../../common/scripts.js"></script>\n<script>$1</script>'
  );
  fs.writeFileSync(f, c, 'utf8');
  console.log('Fixed: ' + f);
});
console.log('All done');