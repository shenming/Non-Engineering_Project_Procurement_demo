/**
 * 非工程类招采管理系统 - 公共数据层
 * 存放 5 种采购方式的步骤定义和节点详情模板
 */

// ===== 采购方式步骤定义 =====
var PROCUREMENT_METHODS = {
    '公开招标': {
        title: '📢 公开招标 · 流程示意',
        steps: ['招标申请','公告发布', '开标', '评标', '公示', '中标结果', '中标公告'],
        done: 2
    },
    '邀请招标': {
        title: '📨 邀请招标 · 流程示意',
        steps: ['招标申请','邀请单位', '开标', '评标', '中标结果'],
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

// ===== 采购类别二级品类树 =====
var CATEGORY_TREE = {
    '货物类': ['办公用品类', '设备类', 'IT类', '家具类', '劳保用品类', '其他货物'],
    '服务类': ['物业服务', '咨询服务', '培训服务', '法律服务', '维护服务', '运输服务', '其他服务']
};

// ===== 采购方式 → 步骤/节点文件/审批流 映射表 =====
var METHOD_CONFIG = {
    '公开招标': {
        steps: ['招采申请', '招采公告', '开标信息', '上传评标结果', '评标结果公示', '中标结果', '中标结果公示'],
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
        steps: ['招标申请', '发出邀请', '开标', '评标', '中标结果'],
        files: ['nodes/bid-apply.html','nodes/bid-announce.html','nodes/bid-opening.html','nodes/eval-result.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请', status: '审批通过', date: '2026-05-15', flowId: 'WF-2026-011-01' },
            { node: '发出邀请', status: '审批通过', date: '2026-05-20', flowId: 'WF-2026-011-02' },
            { node: '开标', status: '审批中', date: '—', flowId: 'WF-2026-011-03' },
            { node: '评标', status: '待推进', date: '—', flowId: '—' },
            { node: '中标结果', status: '待推进', date: '—', flowId: '—' }
        ]
    }
};

// 保留向下兼容的全局变量
var PUBLIC_BID_STEPS = METHOD_CONFIG['公开招标'].steps;
var PUBLIC_BID_NODE_FILES = METHOD_CONFIG['公开招标'].files;
var PUBLIC_BID_APPROVAL_FLOW = METHOD_CONFIG['公开招标'].flow;
