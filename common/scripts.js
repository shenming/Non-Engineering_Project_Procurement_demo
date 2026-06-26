/**
 * 非工程类招采管理系统 - 框架导航脚本
 * 版本：v2.0 · 框架分离架构
 * 
 * 设计：index.html 作为主框架（侧边栏+顶栏+iframe），
 * 各模块子页面通过 iframe 加载，仅包含业务内容。
 */

// ===== 框架主页面逻辑（仅 index.html 使用）=====
(function() {
    // 如果不在框架主页面，跳过此段
    if (!document.getElementById('contentFrame')) return;

    var iframe = document.getElementById('contentFrame');
    var pageTitle = document.getElementById('pageTitle');

    // 模块默认页和标题映射
    var moduleMap = {
        'dashboard':  { file: 'dashboard/index.html',  title: '仪表盘' },
        'plans':      { file: 'plans/list.html',       title: '采购计划' },
        'procurement':{ file: 'procurement/list.html', title: '采购过程' },
        'collective': { file: 'collective/list.html',  title: '集采管理' },
        'reports':    { file: 'reports/overview.html', title: '报表管理' },
        'settings':   { file: 'settings/overview.html', title: '配置管理' }
    };

    // 切换模块内容
    function navigateTo(module, subFile) {
        var config = moduleMap[module];
        if (!config) return;

        var targetFile = subFile || config.file;

        // 更新顶栏标题
        if (pageTitle) {
            pageTitle.innerHTML = config.title + ' <span>· 非工程类招采管理</span>';
        }

        // 更新侧边栏高亮
        var allItems = document.querySelectorAll('.sidebar-menu .menu-item[data-page]');
        allItems.forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === module) {
                item.classList.add('active');
            }
        });

        // 加载 iframe
        iframe.src = targetFile;
    }

    // 侧边栏菜单点击
    var menuItems = document.querySelectorAll('.sidebar-menu .menu-item[data-page]');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var module = this.getAttribute('data-page');
            navigateTo(module);
        });
    });

    // 监听子页面通过 postMessage 发来的导航请求
    window.addEventListener('message', function(e) {
        var data = e.data;
        if (!data || typeof data !== 'object') return;

        if (data.type === 'navigate') {
            if (data.module) {
                navigateTo(data.module, data.file || null);
            }
        } else if (data.type === 'alert') {
            alert(data.message);
        } else if (data.type === 'modal') {
            // 子页面请求框架弹出 modal
            showFrameworkModal(data.title, data.body, data.onConfirm);
        }
    });

    // 初始加载仪表盘
    navigateTo('dashboard');

})();

// ===== 框架级 Modal（供子页面通过 postMessage 调用）=====
function showFrameworkModal(title, body, confirmCallback) {
    var overlay = document.getElementById('fwModalOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'fwModalOverlay';
        overlay.className = 'modal-overlay';
        overlay.innerHTML = '<div class="modal-box" id="fwModalBox"><div class="modal-header" id="fwModalTitle"></div><div class="modal-body" id="fwModalBody"></div><div class="modal-footer"><button class="btn btn-outline" id="fwModalCancel">取消</button><button class="btn btn-primary" id="fwModalConfirm">确认</button></div></div>';
        document.body.appendChild(overlay);

        // 样式注入
        var s = document.createElement('style');
        s.textContent = '.modal-overlay{position:fixed;z-index:9999;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;}.modal-box{background:#fff;border-radius:8px;width:520px;max-height:80vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.2);}.modal-header{padding:16px 20px;font-weight:700;font-size:16px;border-bottom:1px solid #e5e7eb;}.modal-body{padding:20px;}.modal-footer{padding:12px 20px;border-top:1px solid #e5e7eb;display:flex;justify-content:flex-end;gap:8px;}';
        document.head.appendChild(s);
    }

    document.getElementById('fwModalTitle').textContent = title;
    document.getElementById('fwModalBody').innerHTML = body;
    overlay.style.display = 'flex';

    var confirmBtn = document.getElementById('fwModalConfirm');
    var cancelBtn = document.getElementById('fwModalCancel');

    var newConfirm = confirmBtn.cloneNode(true);
    var newCancel = cancelBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
    cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

    newCancel.addEventListener('click', function() { overlay.style.display = 'none'; });
    newConfirm.addEventListener('click', function() {
        overlay.style.display = 'none';
        if (confirmCallback && window.parent) {
            window.parent.postMessage({ type: 'modalConfirm', payload: confirmCallback }, '*');
        }
    });
}

// ===== 子页面辅助函数 =====

/**
 * 子页面通知框架切换模块/子页
 * @param {string} module - 目标模块标识
 * @param {string} [file] - 目标子页面路径（相对于拆分后目录）
 */
function navTo(module, file) {
    if (window.parent && window.parent !== window) {
        // 在 iframe 中，通知框架切换
        window.parent.postMessage({
            type: 'navigate',
            module: module,
            file: file
        }, '*');
    } else {
        // 不在iframe中时，从子目录返回根目录再跳转
        var pageMap = {
            'dashboard': 'dashboard/index.html',
            'plans': 'plans/list.html',
            'procurement': 'procurement/list.html',
            'collective': 'collective/list.html',
            'reports': 'reports/overview.html',
            'settings': 'settings/overview.html'
        };
        if (file) {
            window.location.href = '../' + file;
        } else if (pageMap[module]) {
            window.location.href = '../' + pageMap[module];
        }
    }
}

/**
 * 子页面请求框架弹窗
 */
function showAlert(msg) {
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'alert', message: msg }, '*');
    } else {
        alert(msg);
    }
}

// ============================================================
//  二级品类体系
// ============================================================

/**
 * 采购类别二级品类树
 * 一级类别 → 二级品类列表
 */
var CATEGORY_TREE = {
    '货物类': ['办公用品类', '设备类', 'IT类', '家具类', '劳保用品类', '其他货物'],
    '服务类': ['物业服务', '咨询服务', '培训服务', '法律服务', '维护服务', '运输服务', '其他服务']
};

/**
 * 从完整类别路径中提取一级类别
 * @param {string} fullCategory - 如 "服务类 · 物业服务" 或 "服务类"
 * @returns {string} 一级类别名称
 */
function extractParentCategory(fullCategory) {
    if (!fullCategory) return '';
    var idx = fullCategory.indexOf(' · ');
    return idx > -1 ? fullCategory.substring(0, idx) : fullCategory;
}

/**
 * 从完整类别路径中提取二级品类
 * @param {string} fullCategory - 如 "服务类 · 物业服务"
 * @returns {string} 二级品类名称，无则返回空
 */
function extractSubCategory(fullCategory) {
    if (!fullCategory) return '';
    var idx = fullCategory.indexOf(' · ');
    return idx > -1 ? fullCategory.substring(idx + 3) : '';
}

/**
 * 构建完整类别路径
 * @param {string} parent - 一级类别
 * @param {string} sub - 二级品类（可为空）
 * @returns {string} 完整路径
 */
function buildCategory(parent, sub) {
    if (!parent) return '';
    return sub ? parent + ' · ' + sub : parent;
}

/**
 * 一级类别变更时，联动填充二级品类下拉框
 * @param {string} parentSelectId - 一级类别 <select> 的 id
 * @param {string} childSelectId  - 二级品类 <select> 的 id
 * @param {string} [selectedSub]  - 已选的二级品类值（编辑模式回填）
 */
function populateSubCategory(parentSelectId, childSelectId, selectedSub) {
    var parentEl = document.getElementById(parentSelectId);
    var childEl = document.getElementById(childSelectId);
    if (!parentEl || !childEl) return;

    var parentVal = parentEl.value;
    var subs = CATEGORY_TREE[parentVal] || [];

    childEl.innerHTML = '<option value="">— 请选择 —</option>';
    for (var i = 0; i < subs.length; i++) {
        var sel = (subs[i] === selectedSub) ? ' selected' : '';
        childEl.innerHTML += '<option value="' + subs[i] + '"' + sel + '>' + subs[i] + '</option>';
    }
}

/**
 * 构建类别下拉框选项 HTML（用于内联编辑，optgroup 分组）
 * @param {string} selectedVal - 当前已选值
 * @returns {string} HTML
 */
function categoryEditOptionsHTML(selectedVal) {
    var html = '<option value=""'+(!selectedVal?' selected':'')+'>请选择</option>';
    var keys = Object.keys(CATEGORY_TREE);
    for (var i = 0; i < keys.length; i++) {
        var parent = keys[i];
        html += '<optgroup label="'+parent+'">';
        html += '<option value="'+parent+'"'+(selectedVal===parent?' selected':'')+'>'+parent+'（一级）</option>';
        var subs = CATEGORY_TREE[parent];
        for (var j = 0; j < subs.length; j++) {
            var val = parent + ' · ' + subs[j];
            html += '<option value="'+val+'"'+(selectedVal===val?' selected':'')+'>'+subs[j]+'</option>';
        }
        html += '</optgroup>';
    }
    return html;
}

/**
 * 渲染类别标签 HTML（两级显示）
 * @param {string} fullCategory - 完整类别路径
 * @param {string} [tagClass] - 标签 CSS 类，默认按一级类别自动选择
 * @returns {string} HTML 字符串
 */
function renderCategoryTag(fullCategory, tagClass) {
    if (!fullCategory) return '<span class="tag tag-gray">—</span>';
    var parent = extractParentCategory(fullCategory);
    var sub = extractSubCategory(fullCategory);
    var cls = tagClass || (parent === '服务类' ? 'tag tag-blue' : 'tag tag-green');
    var display = sub ? parent + ' · ' + sub : parent;
    return '<span class="' + cls + '">' + display + '</span>';
}

// ============================================================
//  采购方式智能推荐引擎
// ============================================================

/**
 * 谈判采购适用的 3 种情形
 */
var NEGOTIATION_CONDITIONS = [
    { id: 'N1', label: '技术复杂/性质特殊', desc: '采购标的物技术复杂或性质特殊，不能准确提出采购需求，需与供应商谈判后研究确定' },
    { id: 'N2', label: '多种实施方案', desc: '采购需求明确，但有多种实施方案可供选择，需通过与供应商谈判确定实施方案' },
    { id: 'N3', label: '仅2家合格供应商', desc: '市场供应资源缺乏，符合资格条件供应商只有 2 家' }
];

/**
 * 直接采购适用的 7 种情形
 */
var DIRECT_PURCHASE_CONDITIONS = [
    { id: 'D1', label: '合同估算价＜100,000.00元', desc: '合同估算价＜100,000.00 元', isAmount: true },
    { id: 'D2', label: '涉密/商业秘密', desc: '涉及国家秘密、国家安全或企业重大商业秘密，且不适宜竞争性采购' },
    { id: 'D3', label: '不可替代专利/专有技术', desc: '需采用不可替代的专利或者专有技术' },
    { id: 'D4', label: '原供应商配套', desc: '需向原供应商采购，否则将影响施工或者功能配套要求' },
    { id: 'D5', label: '仅1家有效供应商', desc: '有效供应商有且仅有 1 家' },
    { id: 'D6', label: '抢险救灾/紧急采购', desc: '因抢险救灾、事故抢修等不可预见的特殊情况需要紧急采购' },
    { id: 'D7', label: '政策文件规定', desc: '国家及上海市有关部门文件明确的其他情形' }
];

/**
 * 根据采购类别和金额，返回所有采购方式的合规性判断及推荐。
 * @param {string} category - "货物类" 或 "服务类"
 * @param {number} amount  - 合同估算价/采购金额含税（元）
 * @returns {Array<{method: string, priority: number, compliant: boolean, isBest: boolean, reason: string, tag: string}>}
 */
function recommendProcurementMethod(category, amount) {
    var isGoods = (category === '货物类');
    var results = [];

    // <= 各方式阈值（元）===
    //var publicMin = isGoods ? 2000000 : 1000000;    // 公开招标下限
    var publicMin = isGoods ? 2000000 : 1000000;    // 公开招标下限
    var inviteMax = publicMin;                       // 邀请招标上限 = 公开招标下限
    var rfqMax = isGoods ? 1000000 : 500000;         // 询比采购上限 = 邀请招标下限

    // --- 询比采购（0 ≤ amount < rfqMax，即不满足邀请招标）---
    var rfqOk = amount < rfqMax;
    results.push({
        method: '询比采购',
        priority: 3,
        compliant: rfqOk,
        isBest: rfqOk,
        reason: rfqOk
            ? '合同估算价＜' + fmtWan(rfqMax) + '万元，可采用询比采购'
            : '合同估算价≥' + fmtWan(rfqMax) + '万元，不满足询比采购门槛（＜' + fmtWan(rfqMax) + '万元）',
        tag: rfqOk ? '✅ 合规' : '⚠ 不满足门槛'
    });

    // --- 邀请招标（0 ≤ amount < publicMin）---
    var invOk = amount < inviteMax;
    results.push({
        method: '邀请招标',
        priority: 2,
        compliant: invOk,
        isBest: invOk && !rfqOk,
        reason: invOk
            ? '合同估算价＜' + fmtWan(inviteMax) + '万元，可采用邀请招标'
            : '合同估算价≥' + fmtWan(inviteMax) + '万元，不满足邀请招标门槛（＜' + fmtWan(inviteMax) + '万元）',
        tag: invOk ? '✅ 合规' : '⚠ 不满足门槛'
    });

    // --- 公开招标（≥ publicMin）---
    results.push({
        method: '公开招标',
        priority: 1,
        compliant: true,
        //isBest: amount >= publicMin,
        isBest: amount >= 0,
        reason: '公开招标不限金额门槛，企业可自主选择',
        tag: '✅ 合规'
    });

    // --- 谈判采购（始终合规，需满足情形）---
    results.push({
        method: '谈判采购',
        priority: 4,
        compliant: true,
        isBest: false,
        reason: '无固定金额门槛，满足以下任一情形即可选用：①技术复杂/性质特殊 ②多种实施方案可选 ③仅2家合格供应商',
        tag: '📋 情形适用'
    });

    // --- 直接采购（始终合规，需满足情形）---
    results.push({
        method: '直接采购',
        priority: 5,
        compliant: true,
        isBest: false,
        reason: '7种情形可选用：①金额＜100,000元 ②涉密 ③专利/专有技术 ④原供应商配套 ⑤仅1家供应商 ⑥抢险救灾/紧急 ⑦政策文件规定',
        tag: '📋 情形适用'
    });

    return results;
}

// 金额转万元格式
function fmtWan(yuan) { return (yuan / 10000).toFixed(2); }

/**
 * 校验招采项的类别+金额是否满足所选采购方式的最低门槛
 * @param {string} category - "货物类" 或 "服务类"
 * @param {number} amount   - 采购金额（元）
 * @param {string} method   - 采购方式
 * @returns {{ valid: boolean, reason: string }}
 */
function validateItemMethod(category, amount, method) {
    if (!category || !method) return { valid: false, reason: '请先选择采购类别和采购方式' };
    // 谈判采购、直接采购不受金额门槛限制（情形适用）
    if (method === '谈判采购' || method === '直接采购') return { valid: true, reason: '' };
    var recs = recommendProcurementMethod(category, amount);
    for (var i = 0; i < recs.length; i++) {
        if (recs[i].method === method) {
            return { valid: recs[i].compliant, reason: recs[i].compliant ? '' : recs[i].reason };
        }
    }
    return { valid: false, reason: '未知采购方式：' + method };
}

/**
 * 根据采购方式生成采购项说明下拉选项 HTML
 * @param {string} method - 采购方式
 * @param {string} [selectedVal] - 当前已选值
 * @returns {string} HTML
 */
function noteOptionsHTML(method, selectedVal) {
    var html = '<option value="">—</option>';
    if (method === '谈判采购') {
        NEGOTIATION_CONDITIONS.forEach(function(c) {
            html += '<option value="' + c.label + '"' + (selectedVal === c.label ? ' selected' : '') + '>' + c.label + '</option>';
        });
    } else if (method === '直接采购') {
        DIRECT_PURCHASE_CONDITIONS.forEach(function(c) {
            html += '<option value="' + c.label + '"' + (selectedVal === c.label ? ' selected' : '') + '>' + c.label + '</option>';
        });
    }
    return html;
}

/**
 * 校验采购项说明是否已选择 + 直接采购D1金额校验
 * @param {string} method - 采购方式
 * @param {string} note  - 采购项说明
 * @param {number} amount - 采购金额（元）
 * @returns {{ valid: boolean, reason: string }}
 */
function validateItemNote(method, note, amount) {
    if (method === '谈判采购') {
        if (!note) return { valid: false, reason: '谈判采购必须选择采购项说明（技术复杂/多种实施方案/仅2家供应商）' };
        var found = NEGOTIATION_CONDITIONS.some(function(c) { return c.label === note; });
        if (!found) return { valid: false, reason: '请从谈判采购适用情形中选择采购项说明' };
    } else if (method === '直接采购') {
        if (!note) return { valid: false, reason: '直接采购必须选择采购项说明（7种情形之一）' };
        var found = DIRECT_PURCHASE_CONDITIONS.some(function(c) { return c.label === note; });
        if (!found) return { valid: false, reason: '请从直接采购适用情形中选择采购项说明' };
        // D1 特殊校验：金额必须 < 100,000
        if (note === '合同估算价＜100,000.00元' && amount >= 100000) {
            return { valid: false, reason: '采购项说明选择「合同估算价＜100,000.00元」，但采购金额为 ' + amount.toFixed(2) + ' 元，不满足＜100,000.00元的条件' };
        }
    }
    return { valid: true, reason: '' };
}

/**
 * 智能更新采购方式下拉框 UI
 * 在子页面中调用，自动高亮推荐项、标注合规状态
 * @param {string} categorySelectId   - 采购类别 <select> 的 id
 * @param {string} amountInputId      - 金额 <input> 的 id
 * @param {string} methodSelectId     - 采购方式 <select> 的 id
 * @param {string} [amountInputId2]   - 第二个金额字段（如采购限价），可选
 * @param {string} hintContainerId    - 提示信息容器的 id
 */
function bindMethodRecommendation(categorySelectId, amountInputId, methodSelectId, amountInputId2, hintContainerId) {
    var catEl = document.getElementById(categorySelectId);
    var amtEl = document.getElementById(amountInputId);
    var amtEl2 = amountInputId2 ? document.getElementById(amountInputId2) : null;
    var methodEl = document.getElementById(methodSelectId);
    var hintEl = hintContainerId ? document.getElementById(hintContainerId) : null;

    if (!catEl || !amtEl || !methodEl) return;

    // 存储所有选项的原始 HTML 和 value
    var methodOptions = [];
    for (var i = 0; i < methodEl.options.length; i++) {
        methodOptions.push({
            value: methodEl.options[i].value,
            text: methodEl.options[i].textContent
        });
    }

    function refresh() {
        var category = catEl.value;
        var amt = parseFloat(amtEl.value) || 0;
        var amt2 = amtEl2 ? (parseFloat(amtEl2.value) || 0) : 0;
        var effectiveAmount = Math.max(amt, amt2);

        if (!category || effectiveAmount <= 0) {
            // 重置下拉框
            rebuildOptions(null);
            if (hintEl) hintEl.innerHTML = '';
            return;
        }

        var recs = recommendProcurementMethod(category, effectiveAmount);
        rebuildOptions(recs);

        // 构建提示信息
        if (hintEl) {
            var best = null;
            for (var j = 0; j < recs.length; j++) {
                if (recs[j].isBest) { best = recs[j]; break; }
            }
            var html = '';
            if (best) {
                html += '<div class="method-hint method-hint-best">🏆 <strong>推荐：' + best.method + '</strong> — ' + best.reason + '</div>';
            }
            for (var k = 0; k < recs.length; k++) {
                var r = recs[k];
                if (r.isBest) continue;
                var cls = r.compliant ? 'method-hint-ok' : 'method-hint-warn';
                html += '<div class="method-hint ' + cls + '">' + r.tag + ' — ' + r.reason + '</div>';
            }
            hintEl.innerHTML = html;
        }
    }

    function rebuildOptions(recs) {
        var currentVal = methodEl.value;
        methodEl.innerHTML = '';
        for (var i = 0; i < methodOptions.length; i++) {
            var opt = document.createElement('option');
            opt.value = methodOptions[i].value;
            opt.textContent = methodOptions[i].text;
            if (recs) {
                // 查找对应的推荐信息
                var rec = null;
                for (var j = 0; j < recs.length; j++) {
                    if (recs[j].method === methodOptions[i].value) { rec = recs[j]; break; }
                }
                if (rec) {
                    if (rec.isBest) {
                        opt.style.fontWeight = 'bold';
                        opt.style.color = '#059669';
                        opt.textContent = '🏆 ' + opt.textContent + ' ★推荐';
                        if (currentVal === methodOptions[i].value || !currentVal) {
                            opt.selected = true;
                        }
                    } else if (rec.compliant) {
                        opt.style.color = '#374151';
                        opt.textContent = '✅ ' + opt.textContent;
                    } else {
                        opt.style.color = '#9ca3af';
                        opt.textContent = '⚠ ' + opt.textContent;
                    }
                }
            }
            methodEl.appendChild(opt);
        }
    }

    // 绑定事件
    catEl.addEventListener('change', refresh);
    amtEl.addEventListener('input', refresh);
    if (amtEl2) amtEl2.addEventListener('input', refresh);

    // 初始刷新
    refresh();
}

/**
 * 获取谈判采购适用情形 HTML（用于弹窗选择）
 */
function getNegotiationConditionsHTML() {
    var html = '<p class="text-muted" style="margin-bottom:12px;">请选择适用的情形：</p>';
    for (var i = 0; i < NEGOTIATION_CONDITIONS.length; i++) {
        var c = NEGOTIATION_CONDITIONS[i];
        html += '<label style="display:flex;align-items:flex-start;gap:8px;padding:8px 0;cursor:pointer;">';
        html += '<input type="radio" name="negoCond" value="' + c.id + '" style="margin-top:3px;">';
        html += '<div><strong>' + c.label + '</strong><br><span class="text-xs text-muted">' + c.desc + '</span></div>';
        html += '</label>';
    }
    return html;
}

/**
 * 获取直接采购适用情形 HTML（用于弹窗选择）
 */
function getDirectPurchaseConditionsHTML(currentAmount) {
    var html = '<p class="text-muted" style="margin-bottom:12px;">请选择适用的情形：</p>';
    for (var i = 0; i < DIRECT_PURCHASE_CONDITIONS.length; i++) {
        var c = DIRECT_PURCHASE_CONDITIONS[i];
        var satisfied = c.isAmount && currentAmount < 100000;
        var icon = satisfied ? '✅' : (c.isAmount ? '❌' : '');
        html += '<label style="display:flex;align-items:flex-start;gap:8px;padding:8px 0;cursor:pointer;">';
        html += '<input type="radio" name="dpCond" value="' + c.id + '">';
        html += '<div>' + icon + ' <strong>' + c.label + '</strong>' + (satisfied ? ' <span class="tag tag-green" style="font-size:10px;">当前满足</span>' : '') + '<br><span class="text-xs text-muted">' + c.desc + '</span></div>';
        html += '</label>';
    }
    return html;
}

// ===== 采购过程 - 方式切换 & 环节详情（用于 procurement/overview.html & view.html）=====

/**
 * 各采购方式的环节定义
 */
var PROCUREMENT_METHODS = {
    '公开招标': {
        title: '📢 公开招标 · 流程示意',
        steps: ['招标申请&公告发布', '开标', '评标&公示', '中标结果', '中标公告'],
        done: 2
    },
    '邀请招标': {
        title: '📨 邀请招标 · 流程示意',
        steps: ['招标申请&邀请单位', '开标', '评标', '中标结果'],
        done: 1
    },
    '询比采购': {
        title: '📊 询比采购 · 流程示意',
        steps: ['采购申请&邀请单位', '确定成交供应商'],
        done: 0
    },
    '谈判采购': {
        title: '🤝 谈判采购 · 流程示意',
        steps: ['采购申请&邀请单位', '确定成交供应商'],
        done: 0
    },
    '直接采购': {
        title: '📌 直接采购 · 流程示意',
        steps: ['采购申请', '确定采购结果'],
        done: 0
    }
};

/**
 * 渲染采购流程步骤条
 * @param {string} method - 采购方式名称
 * @param {string} stepsContainerId - 步骤容器元素 id
 * @param {string} titleElId - 标题元素 id（可选）
 * @param {boolean} [renderCard=true] - 是否为 overview 页面的完整卡片模式
 */
function showProcurementDetail(method, stepsContainerId, titleElId, renderCard) {
    var data = PROCUREMENT_METHODS[method];
    if (!data) return;

    var title = titleElId ? document.getElementById(titleElId) : document.getElementById('procDetailTitle');
    var steps = stepsContainerId ? document.getElementById(stepsContainerId) : document.getElementById('procSteps');

    if (title) title.textContent = data.title;
    if (!steps) return;

    var done = data.done;
    var html = '';
    data.steps.forEach(function(s, i) {
        if (i > 0) html += '<span class="arrow">→</span>';
        var cls = 'step';
        if (i < done) cls += ' done';
        else if (i === done) cls += ' active';
        else cls += ' future';
        var clickable = (i <= done) ? ' onclick="showStepDetail(\'' + method + '\', ' + i + ')" style="cursor:pointer;"' : '';
        html += '<span class="' + cls + '"' + clickable + '><span class="num">' + (i + 1) + '</span> ' + s + '</span>';
    });
    steps.innerHTML = html;

    // Hide detail panel on method switch
    var panel = document.getElementById('stepDetailPanel');
    if (panel) panel.style.display = 'none';

    if (renderCard !== false) {
        var detailEl = document.getElementById('procurementDetail');
        if (detailEl) {
            detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

/**
 * 环节详情数据（依据《非工程类招采管理系统需求说明书 v1.0》第3.2节）
 * 每个节点包含 fields（表格展示的字段列表）和 attachments（附件，分必选/可选）
 */
var STEP_DETAIL_DATA = {
    // ===== 公开招标 5 节点 =====
    '公开招标': {
        0: {
            title: '招标申请&招标公告',
            status: '已生效',
            fields: [
                { label: '招采申请编号', value: 'ZB-2026-003' },
                { label: '关联招采计划编号', value: 'PL-2026-0002 · 2026年度集团总部采购计划' },
                { label: '所属单位', value: '集团总部' },
                { label: '招标项目名称', value: '集团年度物业服务' },
                { label: '采购类别', value: '服务类 · 物业服务' },
                { label: '采购内容', value: '集团总部办公区域物业服务' },
                { label: '服务范围', value: '总部大楼A/B座、园区绿化、安保' },
                { label: '采购限价', value: '¥186.5 万' },
                { label: '拟发标时间', value: '2026-06-19' },
                { label: '计划开标时间', value: '2026-07-10' },
                { label: '计划定标时间', value: '2026-07-25' },
                { label: '公告发布时间', value: '2026-06-20 09:00' }
            ],
            requiredFiles: ['招标文件', '招标公告'],
            optionalFiles: ['图纸', '限价文件', '其他招标相关附件'],
            actions: [{ label: '查看用印文件', onclick: "showAlert('📎 招标文件、招标公告已用印归档')" }]
        },
        1: {
            title: '开标信息',
            status: '已完成',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-003' },
                { label: '情况说明', value: '3家投标单位完成解密，报价有效' },
                { label: '审批状态', value: '已生效' }
            ],
            requiredFiles: ['开标记录'],
            optionalFiles: ['开标现场资料', '过程说明'],
            actions: [{ label: '查看开标详情', onclick: "navTo('procurement','procurement/bid-opening.html')" }]
        },
        2: {
            title: '评标结果&公示',
            status: '进行中',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-003' },
                { label: '情况说明', value: '评标委员会已完成初步评审，公示期至2026-07-18' },
                { label: '审批状态', value: 'OA审批中' }
            ],
            requiredFiles: ['评标报告', '中标候选人公示'],
            optionalFiles: ['澄清文件', '质疑及回复文件'],
            actions: [
                { label: '上传评标报告', onclick: "showAlert('📎 评标报告上传功能')" },
                { label: '确认评标结果', onclick: "showAlert('✅ 评标结果已确认，进入公示')" }
            ]
        },
        3: {
            title: '中标结果',
            status: '待推进',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-003' },
                { label: '情况说明', value: '待评标完成后确认中标单位' },
                { label: '审批状态', value: '待提交' }
            ],
            requiredFiles: ['拟中标单位投标文件', '中标结果公告（需用印）', '中标通知书（需用印）'],
            optionalFiles: [],
            actions: []
        },
        4: {
            title: '中标公告',
            status: '待推进',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-003' },
                { label: '情况说明', value: '发布中标公告，归档采购文件' },
                { label: '审批状态', value: '待提交' }
            ],
            requiredFiles: ['中标结果公告', '中标通知书（用印完成或电子文件）'],
            optionalFiles: [],
            actions: []
        }
    },

    // ===== 邀请招标 4 节点 =====
    '邀请招标': {
        0: {
            title: '招标申请&拟邀请单位',
            status: '已生效',
            fields: [
                { label: '招采申请编号', value: 'ZB-2026-008' },
                { label: '关联招采计划编号', value: 'PL-2026-0010 · 2026年度成员企业B采购计划' },
                { label: '所属单位', value: '成员企业B' },
                { label: '招标项目名称', value: 'IT设备采购' },
                { label: '采购类别', value: '货物类 · IT类' },
                { label: '采购内容', value: '服务器及网络设备采购' },
                { label: '采购限价', value: '¥45.0 万' },
                { label: '拟发标时间', value: '2026-05-10' },
                { label: '计划开标时间', value: '2026-05-20' },
                { label: '计划定标时间', value: '2026-06-01' },
                { label: '拟邀请供应商（≥3家）', value: '供应商A / 供应商B / 供应商C' },
                { label: '邀请理由说明', value: '该类设备市场供应充足，3家均具备资质' },
                { label: '评标办法', value: '综合评分法' },
                { label: '需求部门', value: '信息部' },
                { label: '经办人', value: '王磊' }
            ],
            requiredFiles: ['招标文件', '邀请供应商说明文件'],
            optionalFiles: ['图纸', '限价文件'],
            actions: []
        },
        1: {
            title: '开标信息',
            status: '已完成',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-008' },
                { label: '情况说明', value: '2家单位完成投标解密' },
                { label: '审批状态', value: '已生效' }
            ],
            requiredFiles: ['开标记录'],
            optionalFiles: ['开标现场资料', '过程说明'],
            actions: [{ label: '查看开标详情', onclick: "showAlert('📋 开标详情')" }]
        },
        2: {
            title: '评标结果',
            status: '已完成',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-008' },
                { label: '情况说明', value: '评标完成，推荐供应商A为中标候选人' },
                { label: '审批状态', value: '已生效' }
            ],
            requiredFiles: ['评标报告', '中标候选人告知文件'],
            optionalFiles: [],
            actions: []
        },
        3: {
            title: '中标结果',
            status: '已完成',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-008' },
                { label: '情况说明', value: '确认中标单位并发布结果通知' },
                { label: '审批状态', value: '已生效' }
            ],
            requiredFiles: ['拟中标单位投标文件', '中标结果公告', '中标通知书'],
            optionalFiles: [],
            actions: []
        }
    },

    // ===== 询比采购 2 节点 =====
    '询比采购': {
        0: {
            title: '采购申请&拟邀请单位',
            status: '已生效',
            fields: [
                { label: '招采申请编号', value: 'ZB-2026-012' },
                { label: '关联招采计划编号', value: 'PL-2026-0015 · 2026年度成员企业A采购计划' },
                { label: '所属单位', value: '成员企业A' },
                { label: '招标项目名称', value: '年度培训服务采购' },
                { label: '采购类别', value: '服务类 · 培训服务' },
                { label: '采购内容', value: '2026年度员工培训服务' },
                { label: '采购限价', value: '¥28.0 万' },
                { label: '拟发标时间', value: '2026-04-01' },
                { label: '计划开标时间', value: '2026-04-08' },
                { label: '计划定标时间', value: '2026-04-15' },
                { label: '拟邀请供应商（≥3家）', value: '培训机构A / 培训机构B / 培训机构C' },
                { label: '邀请理由说明', value: '3家机构均具有培训资质和经验' },
                { label: '评标办法', value: '最低价中标法' },
                { label: '需求部门', value: '人力资源部' },
                { label: '经办人', value: '陈芳' }
            ],
            requiredFiles: ['采购需求', '询比文件', '询比供应商说明文件'],
            optionalFiles: ['技术规范书'],
            actions: []
        },
        1: {
            title: '确定成交供应商',
            status: '进行中',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-012' },
                { label: '情况说明', value: '已完成报价评审，推荐的成交供应商为培训机构A' },
                { label: '审批状态', value: 'OA审批中' }
            ],
            requiredFiles: ['响应文件', '报价记录表', '评审报告', '成交结果告知书'],
            optionalFiles: ['澄清文件', '质疑及回复文件'],
            actions: [{ label: '确认成交', onclick: "showAlert('✅ 成交供应商已确认')" }]
        }
    },

    // ===== 谈判采购 2 节点 =====
    '谈判采购': {
        0: {
            title: '采购申请&拟邀请单位',
            status: '已生效',
            fields: [
                { label: '招采申请编号', value: 'ZB-2026-015' },
                { label: '关联招采计划编号', value: 'PL-2026-0020 · 2026年度集团总部采购计划' },
                { label: '所属单位', value: '集团总部' },
                { label: '招标项目名称', value: '生产设备维护服务采购' },
                { label: '采购类别', value: '服务类 · 维护服务' },
                { label: '采购内容', value: '生产设备年度维护服务' },
                { label: '采购限价', value: '¥67.0 万' },
                { label: '拟发标时间', value: '2026-03-01' },
                { label: '计划开标时间', value: '2026-03-10' },
                { label: '计划定标时间', value: '2026-03-20' },
                { label: '拟邀请供应商（≥2家）', value: '维保公司A / 维保公司B' },
                { label: '邀请理由说明', value: '设备专业性较强，市场仅2家符合资质' },
                { label: '评标办法', value: '综合评分法' },
                { label: '需求部门', value: '生产部' },
                { label: '经办人', value: '赵岩' }
            ],
            requiredFiles: ['采购需求', '谈判采购说明文件', '谈判文件', '谈判供应商说明文件'],
            optionalFiles: ['技术规范书'],
            actions: []
        },
        1: {
            title: '确定成交供应商',
            status: '进行中',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-015' },
                { label: '情况说明', value: '已完成多轮谈判，维保公司A方案最优' },
                { label: '审批状态', value: 'OA审批中' }
            ],
            requiredFiles: ['各轮次响应文件', '各轮次报价记录表', '评审报告', '成交结果告知书'],
            optionalFiles: ['澄清文件', '质疑及回复文件'],
            actions: [{ label: '确认成交', onclick: "showAlert('✅ 谈判成交方案已确认')" }]
        }
    },

    // ===== 直接采购 2 节点 =====
    '直接采购': {
        0: {
            title: '采购申请',
            status: '已生效',
            fields: [
                { label: '招采申请编号', value: 'ZB-2026-020' },
                { label: '关联招采计划编号', value: 'PL-2026-0025 · 2026年度成员企业A采购计划' },
                { label: '所属单位', value: '成员企业A' },
                { label: '招标项目名称', value: '年度法律顾问服务' },
                { label: '采购类别', value: '服务类 · 法律服务' },
                { label: '采购内容', value: '2026年度常年法律顾问服务' },
                { label: '服务范围', value: '合同审核、法律咨询、诉讼代理' },
                { label: '采购限价', value: '¥15.0 万' },
                { label: '拟发标时间', value: '2026-02-01' },
                { label: '计划开标时间', value: '—' },
                { label: '计划定标时间', value: '2026-02-05' },
                { label: '直接采购适用条件', value: '② 涉密/商业秘密 | ⑥ 抢险救灾/紧急采购 | ③ 不可替代专利/专有技术(三选一)' }
            ],
            requiredFiles: ['采购需求', '直接采购原因说明文件'],
            optionalFiles: ['其他证明合理性的文件资料'],
            actions: []
        },
        1: {
            title: '确定采购结果',
            status: '已完成',
            fields: [
                { label: '关联招采申请编号', value: 'ZB-2026-020' },
                { label: '情况说明', value: '与原法律顾问单位续签年度服务合同' },
                { label: '审批状态', value: '已生效' }
            ],
            requiredFiles: ['供应商说明文件', '商谈记录', '采购结果文件'],
            optionalFiles: ['其他证明合理性的文件资料'],
            actions: [{ label: '确认结果', onclick: "showAlert('✅ 采购结果已确认')" }]
        }
    }
};

/**
 * 渲染附件区 HTML
 * @param {string[]} files - 附件列表
 * @param {string} label - 标签（必选/可选）
 */
function renderAttachmentSection(files, label) {
    if (!files || files.length === 0) return '';
    var cls = (label === '必选') ? 'tag tag-red' : 'tag tag-gray';
    var html = '<div class="text-sm" style="display:flex;align-items:flex-start;gap:6px;flex-wrap:wrap;">';
    html += '<span class="text-xs" style="white-space:nowrap;color:var(--gray-500);min-width:36px;">' + label + '：</span>';
    files.forEach(function(f) {
        html += '<span class="' + cls + '" style="margin:1px 2px;font-size:11px;">📄 ' + f + '</span>';
    });
    html += '</div>';
    return html;
}

/**
 * 展开/切换环节详情面板（表格形式渲染）
 * @param {string} method - 采购方式
 * @param {number} stepIndex - 环节索引
 */
function showStepDetail(method, stepIndex) {
    var panel = document.getElementById('stepDetailPanel');
    if (!panel) return;

    var data = PROCUREMENT_METHODS[method];
    if (!data) return;

    var stepName = data.steps[stepIndex];
    var detail = (STEP_DETAIL_DATA[method] && STEP_DETAIL_DATA[method][stepIndex]) || {};
    var done = data.done;
    var statusText = detail.status || ((stepIndex < done) ? '已完成' : '进行中');
    var statusTag = (statusText === '已完成' || statusText === '已生效') ? 'tag tag-green' : ((statusText === '进行中' || statusText === 'OA审批中') ? 'tag tag-yellow' : (statusText === '待推进' ? 'tag tag-gray' : 'tag tag-purple'));

    // 构建字段表格
    var fieldsHtml = '';
    if (detail.fields && detail.fields.length > 0) {
        fieldsHtml = '<table style="margin-bottom:12px;"><tbody>';
        detail.fields.forEach(function(f) {
            var valHtml = (f.value.indexOf('¥') === 0) ? '<span class="money">' + f.value + '</span>' : f.value;
            fieldsHtml += '<tr><td style="width:150px;color:var(--gray-500);font-size:12px;padding:5px 12px 5px 0;vertical-align:top;">' + f.label + '</td><td style="font-size:13px;padding:5px 0;font-weight:500;">' + valHtml + '</td></tr>';
        });
        fieldsHtml += '</tbody></table>';
    }

    // 附件区
    var attachHtml = '';
    if (detail.requiredFiles || detail.optionalFiles) {
        attachHtml = '<div style="border-top:1px solid var(--gray-200);padding-top:10px;">';
        attachHtml += '<div class="text-sm fw-600 mb-4">📎 附件要求</div>';
        if (detail.requiredFiles) attachHtml += renderAttachmentSection(detail.requiredFiles, '必选');
        if (detail.optionalFiles) attachHtml += renderAttachmentSection(detail.optionalFiles, '可选');
        attachHtml += '</div>';
    }

    // 操作按钮
    var actionsHtml = '';
    if (stepIndex === done && detail.actions && detail.actions.length > 0) {
        actionsHtml = '<div class="flex gap-8 mt-12" style="border-top:1px solid var(--gray-200);padding-top:12px;">';
        detail.actions.forEach(function(a) {
            actionsHtml += '<button class="btn btn-sm btn-primary" onclick="' + a.onclick + '">' + a.label + '</button>';
        });
        actionsHtml += '</div>';
    } else if (stepIndex < done) {
        actionsHtml = '<div class="text-xs text-muted mt-8" style="border-top:1px solid var(--gray-200);padding-top:10px;">该环节已完成，操作记录已归档。</div>';
    }

    panel.innerHTML =
        '<div class="card" style="margin-bottom:0;"><div class="card-header"><h3>📌 ' + detail.title + ' <span class="' + statusTag + '">' + statusText + '</span></h3></div>' +
        '<div class="card-body">' +
        fieldsHtml + attachHtml + actionsHtml +
        '</div></div>';

    panel.style.display = '';

    // Highlight active step in steps bar
    var allSteps = document.querySelectorAll('.steps .step');
    allSteps.forEach(function(s) { s.classList.remove('selected'); });
    if (allSteps[stepIndex]) allSteps[stepIndex].classList.add('selected');
}
