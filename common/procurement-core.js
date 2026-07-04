/**
 * 招采管理 - 创建/编辑公共核心逻辑
 * 被 create/index.html 和 edit/index.html 引用
 * 
 * 使用方式：
 *   <script src="../../common/procurement-core.js"></script>
 *   <script>
 *     initProcurementEditor({
 *         mode: 'create',           // 'create' | 'edit'
 *         backAction: 'exitToList',  // 'exitToList' | 'returnToDetail'
 *         backTarget: 'application', // 返回的模块名
 *         backFile: null,            // 返回的具体文件路径（可选）
 *         nodeBasePath: '../procurement/detail/nodes/',
 *         pageTitle: '✏️ 创建招采',
 *         dataFile: 'data.js',       // 数据文件路径（相对于当前页面）
 *     });
 *   </script>
 */

function initProcurementEditor(config) {
    // ---- 配置合并 ----
    var cfg = config || {};
    var mode = cfg.mode || 'create';
    var backAction = cfg.backAction || 'exitToList';
    var backTarget = cfg.backTarget || 'application';
    var backFile = cfg.backFile || null;
    var nodeBasePath = cfg.nodeBasePath || '../procurement/detail/nodes/';
    var pageTitle = cfg.pageTitle || '✏️ 招采管理';

    // ---- 状态变量 ----
    var selectedStep = 0;
    var doneCount = 0;
    var currentMethod = '公开招标';
    var methodConfig = METHOD_CONFIG[currentMethod];

    // ========== 初始化 ==========
    (function init() {
        var ctx = null;
        try { ctx = JSON.parse(sessionStorage.getItem('procEditContext') || 'null'); } catch(e) {}

        if (ctx) {
            if (ctx.projectName) {
                document.getElementById('breadProject').textContent = ctx.projectName;
                document.getElementById('infoTitle').innerHTML = '✏️ ' + ctx.projectName;
            }
            currentMethod = ctx.method || '公开招标';
            methodConfig = METHOD_CONFIG[currentMethod] || METHOD_CONFIG['公开招标'];

            doneCount = 0;
            selectedStep = 0;
            for (var i = 0; i < methodConfig.steps.length; i++) {
                if (methodConfig.steps[i].state === 'done') doneCount = i + 1;
                if (methodConfig.steps[i].state === 'active' && selectedStep === 0) selectedStep = i;
            }
            sessionStorage.removeItem('procEditContext');
        }

        renderSteps();
        renderApprovalFlow();

        try { sessionStorage.setItem('procNodeData', JSON.stringify(DETAIL_DATA)); } catch(e) {}
        try { sessionStorage.setItem('editEditableSteps', JSON.stringify(EDITABLE_STEPS)); } catch(e) {}
        sessionStorage.setItem('edit_method', currentMethod);
        sessionStorage.setItem('edit_step', selectedStep);

        loadNode(selectedStep);
        document.getElementById('nodeFrame').onload = function() {
            try { sessionStorage.setItem('procNodeData', JSON.stringify(DETAIL_DATA)); } catch(e) {}
            try { sessionStorage.setItem('editEditableSteps', JSON.stringify(EDITABLE_STEPS)); } catch(e) {}
        };
    })();

    // ========== 渲染步骤条 ==========
    function renderSteps() {
        var steps = methodConfig.steps;
        var container = document.getElementById('stepsContainer');
        if (!container) return;
        document.getElementById('procTitle').innerHTML = '📌 招标管理：步骤 ' + (selectedStep + 1) + ' / ' + steps.length + ' (' + steps[selectedStep].name + ')';
        var html = '';
        for (var i = 0; i < steps.length; i++) {
            var s = steps[i];
            if (i > 0) html += '<span class="step-connector ' + (s.state !== 'future' ? 'done' : '') + '"></span>';
            var cls, canClick;
            if (i === selectedStep) {
                cls = ' selected';
                canClick = true;
            } else if (s.state === 'done' || s.state === 'active') {
                cls = ' done';
                canClick = true;
            } else {
                cls = ' future';
                canClick = false;
            }
            var clickAttr = canClick ? ' onclick="onStepClick(' + i + ')"' : '';
            html += '<span class="circle-step' + cls + '"' + clickAttr + '><span class="cnum">' + (i + 1) + '</span><span>' + s.name + '</span></span>';
        }
        container.innerHTML = html;
        updateNavButtons();
    }

    // ========== 渲染审批流 ==========
    function renderApprovalFlow() {
        var tbody = document.getElementById('approvalBody');
        if (!tbody) return;
        var detailData = (typeof DETAIL_DATA !== 'undefined') ? (DETAIL_DATA[currentMethod] || null) : null;
        var flow = (detailData && detailData.flow) ? detailData.flow : (methodConfig.flow || []);
        var html = '';
        for (var i = 0; i < flow.length; i++) {
            var f = flow[i];
            var tagCls = f.status === '审批通过' ? 'tag-green' : (f.status === '审批中' ? 'tag-yellow' : 'tag-gray');
            html += '<tr><td>' + f.node + '</td><td><span class="tag ' + tagCls + '">' + f.status + '</span></td><td>' + f.date + '</td><td>' + f.flowId + '</td></tr>';
        }
        tbody.innerHTML = html;
    }

    // ========== 加载节点 ==========
    function loadNode(index) {
        var files = methodConfig.files || [];
        var nodeFile = files[index] || '';
        var editNodeFile = nodeFile.replace('nodes/', nodeBasePath);
        try { sessionStorage.setItem('procNodeData', JSON.stringify(DETAIL_DATA)); } catch(e) {}
        try { sessionStorage.setItem('editEditableSteps', JSON.stringify(EDITABLE_STEPS)); } catch(e) {}
        sessionStorage.setItem('edit_method', currentMethod);
        sessionStorage.setItem('edit_step', index);
        document.getElementById('nodeFrame').src = editNodeFile + '?method=' + encodeURIComponent(currentMethod) + '&step=' + index + '&mode=' + (mode === 'edit' ? 'edit' : 'edit');
    }

    // ========== 步骤点击 ==========
    function onStepClick(index) {
        var s = methodConfig.steps[index];
        if (s.state !== 'future') { selectedStep = index; loadNode(index); renderSteps(); updateNavButtons(); }
    }

    // ========== 下一步/上一步 ==========
    function nextStep() {
        var steps = methodConfig.steps;
        if (selectedStep < steps.length - 1) { selectedStep++; renderSteps(); loadNode(selectedStep); }
        else alert('🎉 已到达最后一步');
    }

    function prevStep() {
        if (selectedStep > 0) { selectedStep--; renderSteps(); loadNode(selectedStep); }
        else alert('已经第一步');
    }

    // ========== Tab 切换 ==========
    function switchTab(tabId, btn) {
        document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-body').forEach(function(t) { t.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }

    // ========== 更新导航按钮状态 ==========
    function updateNavButtons() {
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.disabled = (selectedStep === 0);
        var steps = methodConfig.steps;
        var nextStepIndex = selectedStep + 1;
        if (nextBtn) nextBtn.disabled = (nextStepIndex >= steps.length || steps[nextStepIndex].state === 'future');
    }

    // ========== 保存 ==========
    function saveProcurement() {
        var frame = document.getElementById('nodeFrame');
        var validationTimeout = null;
        var validated = false;

        function doSave() {
            try {
                var fw = frame.contentWindow || frame.contentDocument.defaultView;
                fw.postMessage({ type: 'flushSectionData' }, '*');
            } catch(e) {}
            try {
                var frameDoc = frame.contentDocument || frame.contentWindow.document;
                var allInputs = frameDoc.querySelectorAll('[data-field]');
                allInputs.forEach(function(el) {
                    var field = el.getAttribute('data-field');
                    var val = el.value || '';
                    console.log('[' + field + '] = ' + val);
                });
            } catch(e) {}
            alert('💾 保存成功！所有修改已提交。');
            var ctx = {
                method: currentMethod,
                projectName: document.getElementById('infoTitle').textContent.replace('✏️ ', '')
            };
            try { sessionStorage.setItem('procurementViewContext', JSON.stringify(ctx)); } catch(e) {}
            navTo('procurement', 'procurement/detail/index.html');
        }

        try {
            var fw = frame.contentWindow || frame.contentDocument.defaultView;
            fw.postMessage({ type: 'validateSection', method: currentMethod, step: selectedStep }, '*');
            validationTimeout = setTimeout(function() {
                if (!validated) { validated = true; doSave(); }
            }, 1000);
            var handler = function(e) {
                if (e.data && e.data.type === 'validationResult') {
                    clearTimeout(validationTimeout);
                    if (validated) return;
                    validated = true;
                    window.removeEventListener('message', handler);
                    if (e.data.ok) {
                        doSave();
                    } else {
                        alert(e.data.msg || '⚠️ 校验不通过，保存已取消。');
                    }
                }
            };
            window.addEventListener('message', handler);
        } catch(e) {
            doSave();
        }
    }

    // ========== 退出/返回 ==========
    function exitToProcurementList() {
        navTo(backTarget, backFile);
    }

    function navTOLastPage() {
        var ctx = {
            method: currentMethod,
            projectName: document.getElementById('infoTitle').textContent.replace('✏️ ', '')
        };
        try { sessionStorage.setItem('procurementViewContext', JSON.stringify(ctx)); } catch(e) {}
        navTo('procurement', 'procurement/detail/index.html');
    }

    // ---- 映射到全局（供 HTML onclick 调用） ----
    window.onStepClick = onStepClick;
    window.nextStep = nextStep;
    window.prevStep = prevStep;
    window.switchTab = switchTab;
    window.saveProcurement = saveProcurement;
    window.exitToProcurementList = exitToProcurementList;
    window.navTOLastPage = navTOLastPage;
    window.renderSteps = renderSteps;
    window.updateNavButtons = updateNavButtons;
    window.renderApprovalFlow = renderApprovalFlow;
    window.loadNode = loadNode;
}