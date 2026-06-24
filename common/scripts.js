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
        }
    });

    // 初始加载仪表盘
    navigateTo('dashboard');

})();

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

// ===== 采购过程 - 方式切换（用于 procurement/overview.html）=====
function showProcurementDetail(method) {
    var title = document.getElementById('procDetailTitle');
    var steps = document.getElementById('procSteps');

    var methodMap = {
        '公开招标': {
            title: '📢 公开招标 · 流程示意',
            steps: ['招标申请', '公告发布', '开标', '评标&公示', '中标结果', '中标公告'],
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

    var data = methodMap[method];
    if (!data || !title || !steps) return;

    title.textContent = data.title;

    var html = '';
    data.steps.forEach(function(s, i) {
        if (i > 0) html += '<span class="arrow">→</span>';
        var cls = 'step';
        if (i < data.done) cls += ' done';
        else if (i === data.done) cls += ' active';
        html += '<span class="' + cls + '"><span class="num">' + (i + 1) + '</span> ' + s + '</span>';
    });
    steps.innerHTML = html;

    var detailEl = document.getElementById('procurementDetail');
    if (detailEl) {
        detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}