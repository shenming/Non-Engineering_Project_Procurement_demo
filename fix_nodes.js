var fs = require('fs');
var dir = 'd:/项目/Non-Engineering_Project_Procurement_demo/procurement/detail/nodes/';

// 1. Fix bid-opening.html
var f = fs.readFileSync(dir + 'bid-opening.html', 'utf8');
if (f.indexOf('statusTag') === -1) {
  f = f.replace(
    '<div class="form-group" style="margin-bottom:0;">\n                    <label>审批状态</label>\n                    <div><span class="tag tag-green">审批通过</span></div>',
    '<div class="form-group" style="margin-bottom:0;">\n                    <label>审批状态</label>\n                    <div><span id="statusTag" class="tag tag-green">审批通过</span></div>'
  );
}
f = f.replace(
  "document.getElementById('bidderCountDisplay').textContent = f.bidderCount || 0;",
  "document.getElementById('bidderCountDisplay').textContent = f.bidderCount || 0;var st=document.getElementById('statusTag'),sv=f.approvalStatus||'审批通过';if(st){st.textContent=sv;st.className='tag '+(sv==='审批通过'||sv==='已生效'?'tag-green':sv.indexOf('中')>=0?'tag-yellow':'tag-gray')}"
);
fs.writeFileSync(dir + 'bid-opening.html', f, 'utf8');
console.log('bid-opening done');

// 2. Fix eval-result.html
['eval-result', 'eval-announce'].forEach(function(name) {
  f = fs.readFileSync(dir + name + '.html', 'utf8');
  if (f.indexOf('statusTag') === -1) {
    f = f.replace(
      '<div class="form-group" style="margin-bottom:0;">\n            <label>审批状态</label>\n            <div><span class="tag tag-yellow">审批中</span></div>',
      '<div class="form-group" style="margin-bottom:0;">\n            <label>审批状态</label>\n            <div><span id="statusTag" class="tag tag-yellow">审批中</span></div>'
    );
  }
  var searchStr = "document.getElementById('txtDesc').value=f.desc||'';";
  var insertStr = searchStr + "var st=document.getElementById('statusTag'),sv=f.approvalStatus||'审批中';if(st){st.textContent=sv;st.className='tag '+(sv==='审批通过'||sv==='已生效'?'tag-green':sv.indexOf('中')>=0?'tag-yellow':'tag-gray')}";
  f = f.replace(searchStr, insertStr);
  fs.writeFileSync(dir + name + '.html', f, 'utf8');
  console.log(name + ' done');
});

console.log('All 3 files fixed');