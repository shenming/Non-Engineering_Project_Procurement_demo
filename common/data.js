/**
 * 非工程类招采管理系统 - 公共数据层
 * 存放 5 种采购方式的步骤定义和节点详情模板
 */

// ===== 采购类别二级品类树 =====
var CATEGORY_TREE = {
    '货物类': ['办公用品类', '设备类', 'IT类', '家具类', '劳保用品类', '其他货物'],
    '服务类': ['物业服务', '咨询服务', '培训服务', '法律服务', '维护服务', '运输服务', '其他服务']
};

// ===== 采购方式 → 步骤(含状态)/节点文件/审批流 映射表 =====
var METHOD_CONFIG = {
    '公开招标': {
        steps: [
            { name: '招采申请', state: 'done' },
            { name: '招采公告', state: 'done' },
            { name: '开标信息', state: 'done' },
            { name: '上传评标结果', state: 'done' },
            { name: '评标结果公示', state: 'done' },
            { name: '中标结果', state: 'done' },
            { name: '中标结果公示', state: 'active' }
        ],
        files: ['nodes/bid-apply.html','nodes/bid-announce.html','nodes/bid-opening.html','nodes/eval-result.html','nodes/eval-announce.html','nodes/award-result.html','nodes/award-announce.html'],
        flow: [
            { node: '招采申请&招采公告', status: '审批通过', date: '2026-06-20', flowId: 'WF-2026-003-01' },
            { node: '开标信息', status: '审批通过', date: '2026-07-10', flowId: 'WF-2026-003-02' },
            { node: '上传评标结果&评标结果公示', status: '审批通过', date: '2026-07-18', flowId: 'WF-2026-003-03' },
            { node: '中标结果', status: '审批通过', date: '2026-07-20', flowId: 'WF-2026-003-04' },
            { node: '中标结果公示', status: '审批中', date: '—', flowId: 'WF-2026-003-05' }
        ]
    },
    '邀请招标': {
        steps: [
            { name: '招标申请', state: 'done' },
            { name: '发出邀请', state: 'done' },
            { name: '开标', state: 'active' },
            { name: '评标', state: 'future' },
            { name: '中标结果', state: 'future' }
        ],
        files: ['nodes/bid-apply.html','nodes/invite-units.html','nodes/bid-opening.html','nodes/eval-result.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请', status: '审批通过', date: '2026-05-15', flowId: 'WF-2026-011-01' },
            { node: '发出邀请', status: '审批通过', date: '2026-05-20', flowId: 'WF-2026-011-02' },
            { node: '开标', status: '审批中', date: '—', flowId: 'WF-2026-011-03' },
            { node: '评标', status: '待推进', date: '—', flowId: '—' },
            { node: '中标结果', status: '待推进', date: '—', flowId: '—' }
        ]
    }
};

// 所有步骤名（兼容旧代码使用步骤名数组的场景）
function getStepNames(method) {
    var cfg = METHOD_CONFIG[method];
    if (!cfg) return [];
    return cfg.steps.map(function(s) { return s.name; });
}
// 获取激活步骤名
function getActiveStepName(method) {
    var cfg = METHOD_CONFIG[method];
    if (!cfg) return '';
    for (var i = 0; i < cfg.steps.length; i++) {
        if (cfg.steps[i].state === 'active') return cfg.steps[i].name;
    }
    return '';
}
// 获取完成步骤数
function getDoneCount(method) {
    var cfg = METHOD_CONFIG[method];
    if (!cfg) return 0;
    var count = 0;
    for (var i = 0; i < cfg.steps.length; i++) {
        if (cfg.steps[i].state === 'done') count++;
    }
    return count;
}

// 保留向下兼容
var PUBLIC_BID_STEPS = getStepNames('公开招标');
var PUBLIC_BID_NODE_FILES = METHOD_CONFIG['公开招标'].files;
var PUBLIC_BID_APPROVAL_FLOW = METHOD_CONFIG['公开招标'].flow;
