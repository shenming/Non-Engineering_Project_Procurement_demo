/**
 * 招采过程 - 详情模式数据
 * 包含：详情配置（步骤状态/节点文件/审批流）+ 详情表单数据（供 iframe 节点页面使用）
 *
 * 注意：步骤名从 common/data.js 的 METHOD_STEPS 自动读取，
 *       修改步骤名只需改 common/data.js 一处。
 */

// ==================== 辅助函数：从 METHOD_STEPS 生成带状态的 steps ====================

function buildSteps(method, states) {
    var names = METHOD_STEPS[method];
    if (!names) return [];
    return names.map(function(name, i) {
        return { name: name, state: (states[i] || 'future') };
    });
}

// ==================== 一、详情配置 ====================

var DETAIL_METHOD_CONFIG = {
    '公开招标': {
        steps: buildSteps('公开招标', ['done','done','done','done','done','done','active']),
        files: ['nodes/bid-apply.html','nodes/bid-announce.html','nodes/bid-opening.html','nodes/eval-result.html','nodes/eval-announce.html','nodes/award-result.html','nodes/award-announce.html'],
        flow: [
            { node: '招采申请&招采公告', status: '审批通过', date: '2026-06-20', flowId: 'WF-2026-003-01' },
            { node: '开标信息', status: '审批通过', date: '2026-07-10', flowId: 'WF-2026-003-02' },
            { node: '上传评标结果&评标结果公示', status: '审批通过', date: '2026-07-18', flowId: 'WF-2026-003-03' },
            { node: '中标结果', status: '审批通过', date: '2026-07-20', flowId: 'WF-2026-003-04' },
            { node: '中标结果公示', status: '审批中', date: '2026-07-20', flowId: 'WF-2026-003-05' }
        ]
    },
    '邀请招标': {
        steps: buildSteps('邀请招标', ['done','done','active','future','future']),
        files: ['nodes/bid-apply.html','nodes/invite-units.html','nodes/bid-opening.html','nodes/eval-result.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请&拟邀请单位', status: '审批通过', date: '2026-05-15', flowId: 'WF-2026-011-01' },
            { node: '开标信息', status: '未审批', date: '—', flowId: '-' },
            { node: '上传评标结果', status: '待推进', date: '—', flowId: '—' },
            { node: '中标结果', status: '待推进', date: '—', flowId: '—' }
        ]
    },
    '询比采购': {
        steps: buildSteps('询比采购', ['done','active','future']),
        files: ['nodes/bid-apply.html','nodes/invite-units.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请&拟邀请单位', status: '未审批', date: '—', flowId: '—' }
        ]
    },
    '谈判采购': {
        steps: buildSteps('谈判采购', ['done','active','future']),
        files: ['nodes/bid-apply.html','nodes/invite-units.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请&拟邀请单位', status: '未审批', date: '—', flowId: '—' }
        ]
    },
    '直接采购': {
        steps: buildSteps('直接采购', ['active','future']),
        files: ['nodes/bid-apply.html','nodes/eval-result.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请', status: '未审批', date: '—', flowId: '—' }
        ]
    },
    '直接采购-小额': {
        steps: buildSteps('直接采购-小额', ['done','active']),
        files: ['nodes/bid-apply.html','nodes/eval-result.html'],
        flow: [
            { node: '招标申请&确定成交供应商',status: '未审批', date: '—', flowId: '—'  },

        ]
    }
};

// 获取激活步骤名（依赖 DETAIL_METHOD_CONFIG 中的 state）
function getActiveStepName(method) {
    var cfg = DETAIL_METHOD_CONFIG[method];
    if (!cfg) return '';
    for (var i = 0; i < cfg.steps.length; i++) {
        if (cfg.steps[i].state === 'active') return cfg.steps[i].name;
    }
    return '';
}

// 获取完成步骤数
function getDoneCount(method) {
    var cfg = DETAIL_METHOD_CONFIG[method];
    if (!cfg) return 0;
    var count = 0;
    for (var i = 0; i < cfg.steps.length; i++) {
        if (cfg.steps[i].state === 'done') count++;
    }
    return count;
}

// 向下兼容
var METHOD_CONFIG = DETAIL_METHOD_CONFIG;

// ==================== 二、详情表单数据 ====================

var DETAIL_DATA = {
    '公开招标': {
        info: {
            projectName: '集团年度物业服务',
            applyCode: 'ZB-2026-003',
            unit: '集团总部',
            status: '进行中',
            statusTag: 'tag-yellow'
        },
        nodes: {
            0: {
                form: {
                    procCode: 'ZB-2026-003', procName: '集团年度物业服务', companyCode: 'HQ-001',
                    limitAmount: 1865000, limitAmountText: '¥1,865,000.00元', method: '公开招标',
                    category: '服务类 · 物业服务', note: '公开招标不限金额门槛，企业可自主选择',
                    handler: '李经理', applyDate: '2026-06-19', agent: '上海XX招标代理有限公司',
                    planIssueDate: '2026-06-19', planEndDate: '2026-07-25', inHouse: '否',
                    approvalStatus: '审批通过', scope: '集团总部大楼A/B座、园区绿化、安保等物业服务，服务期12个月。'
                },
                purchases: [
                    { idx: 0, name: '集团年度物业服务', planCode: 'PL-2026-0002', lineNo: '001', purchaseName: '集团年度物业服务', amount: 1865000, amountText: '¥1,865,000.00元', sections: 1, cat: '服务类', subCat: '物业服务', target: '主合同', note: '公开招标不限金额门槛' },
                    { idx: 1, name: 'IT设备采购', planCode: 'PL-2026-0010', lineNo: '001', purchaseName: '台式计算机及服务器', amount: 2450000, amountText: '¥2,450,000.00元', sections: 3, cat: '货物类', subCat: 'IT类', target: '主合同', note: '—' }
                ],
                sectionData: {
                    0: [{ seq: 1, name: '集团年度物业服务', limit: 1865000, planCode: 'PL-2026-0002', planRow: '001', purchaseName: '集团年度物业服务', amount: 1865000, sections: 1, cat: '服务类', subCat: '物业服务', target: '主合同', note: '公开招标不限金额门槛' }],
                    1: [
                        { seq: 1, name: 'IT设备采购-标段1', limit: 1000000, planCode: 'PL-2026-0010', planRow: '001', purchaseName: '台式计算机', amount: 1000000, sections: 1, cat: '货物类', subCat: 'IT类', target: '主合同', note: '—' },
                        { seq: 2, name: 'IT设备采购-标段2', limit: 800000, planCode: 'PL-2026-0010', planRow: '001', purchaseName: '服务器', amount: 800000, sections: 2, cat: '货物类', subCat: 'IT类', target: '主合同', note: '—' },
                        { seq: 3, name: 'IT设备采购-标段3', limit: 650000, planCode: 'PL-2026-0010', planRow: '001', purchaseName: '网络设备', amount: 650000, sections: 3, cat: '货物类', subCat: 'IT类', target: '主合同', note: '—' }
                    ]
                },
                attachments: [
                    { type: '招标文件', name: '集团物业服务招标文件_v2.pdf', file: 'ZB-2026-003-ZB.pdf', fileId: 'F202606001', fileType: 'pdf', size: '2,456,832', ts: '2026-06-19 10:30', user: '李经理' },
                    { type: '招标公告', name: '集团物业服务招标公告.pdf', file: 'ZB-2026-003-GG.pdf', fileId: 'F202606002', fileType: 'pdf', size: '1,023,456', ts: '2026-06-19 10:35', user: '李经理' }
                ]
            },
            1: {
                form: { announceName: '集团年度物业服务公开招标公告', startDate: '2026-06-21', endDate: '2026-07-08', approvalStatus: '审批通过' },
                attachments: [
                    { type: '招标公告', name: '招标公告_集团年度物业服务.pdf', file: '招标公告_集团年度物业服务.pdf', fileId: 'F-2026-0620-001', fileType: 'pdf', size: '1,245,000', ts: '2026-06-20 09:30', user: '李经理' },
                    { type: '招标文件', name: '招标文件_集团年度物业服务.pdf', file: '招标文件_集团年度物业服务.pdf', fileId: 'F-2026-0620-002', fileType: 'pdf', size: '3,560,000', ts: '2026-06-20 10:15', user: '李经理' },
                    { type: '最高限价文件', name: '最高限价说明_物业.pdf', file: '最高限价说明_物业.pdf', fileId: 'F-2026-0620-003', fileType: 'pdf', size: '856,000', ts: '2026-06-20 11:00', user: '张明' }
                ]
            },
            2: {
                form: { desc: '开标时间：2026-06-20 09:30，地点：集团总部3楼会议室。3家投标单位均按时完成解密，报价有效。', bidderCount: 3, approvalStatus: '审批通过' },
                attachments: [
                    { type: '开标记录', name: 'ZB-2026-003-开标记录.pdf', comp: '开标信息', fileType: 'pdf', size: '1,245,678', ts: 'TS-20260620-001', time: '2026-06-20 09:45', user: '李经理' },
                    { type: '开标现场资料', name: 'ZB-2026-003-现场照片.jpg', comp: '开标信息', fileType: 'jpg', size: '3,210,456', ts: 'TS-20260620-002', time: '2026-06-20 10:00', user: '李经理' }
                ]
            },
            3: {
                form: { desc: '评标委员会由5人组成（集团采购部3人+外部专家2人），采用综合评分法评审。经评审，供应商A综合得分95.6分排名第一，推荐为中标候选人。公示期至2026-07-18。', approvalStatus: '审批通过' },
                attachments: [
                    { type: '评标报告', name: 'ZB-2026-003-评标报告.pdf', comp: '评标结果', fileType: 'pdf', size: '2,456,789', ts: 'TS-20260712-001', time: '2026-07-12 14:30', user: '李经理' },
                    { type: '中标候选人公示', name: 'ZB-2026-003-中标候选人公示.pdf', comp: '评标结果', fileType: 'pdf', size: '1,023,400', ts: 'TS-20260712-002', time: '2026-07-12 14:35', user: '李经理' }
                ]
            },
            4: {
                form: { desc: '中标候选人：供应商A，中标金额 1,780,000.00 元。公示期自 2026-07-15 至 2026-07-18，公示媒介为集团官网和中国招标投标公共服务平台。', approvalStatus: '审批通过' },
                attachments: [
                    { type: '中标候选人公示', name: 'ZB-2026-003-中标候选人公示.pdf', comp: '评标公示', fileType: 'pdf', size: '1,200,000', ts: 'TS-20260715-001', time: '2026-07-15 09:00', user: '李经理' },
                    { type: '评标报告', name: 'ZB-2026-003-评标报告公示版.pdf', comp: '评标公示', fileType: 'pdf', size: '1,500,000', ts: 'TS-20260715-002', time: '2026-07-15 09:05', user: '李经理' }
                ]
            },
            5: {
                form: { approvalStatus: '审批通过', applyCode: 'ZB-2026-003', unit: '集团总部', resultNote: '评标委员会已完成全部评审工作，根据综合评分法推荐中标候选人。经定标委员会审议通过，现对中标结果进行公示，公示期 3 个工作日。' },
                sections: [
                    { id: 'BD-001', planCode: 'PL-2026-0002', lineNo: 1, target: '主合同', awardCode: 'DB-2026-003-1', purchaseName: '集团年度物业服务 - 物业服务', sectionNo: '1', limitAmount: 1865000, winAmount: 1820000, supplierCode: 'GYS-001', supplierName: '北京金牌物业服务有限公司', winDate: '2026-07-20', otherSuppliers: [{ code: 'GYS-002', name: '上海信诚物业有限公司' }, { code: 'GYS-003', name: '广州华泰物业服务有限公司' }] },
                    { id: 'BD-002', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-1', purchaseName: '办公设备集中采购 - 服务器采购', sectionNo: '1', limitAmount: 452000, winAmount: 438000, supplierCode: 'GYS-010', supplierName: '上海华讯网络系统有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-011', name: '北京神州数码有限公司' }, { code: 'GYS-012', name: '深圳华为技术有限公司' }] },
                    { id: 'BD-003', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-2', purchaseName: '办公设备集中采购 - 网络设备采购', sectionNo: '2', limitAmount: 452000, winAmount: 445000, supplierCode: 'GYS-015', supplierName: '杭州海康威视数字技术股份有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-016', name: '浙江大华技术股份有限公司' }] },
                    { id: 'BD-004', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-3', purchaseName: '办公设备集中采购 - 存储设备采购', sectionNo: '3', limitAmount: 452000, winAmount: 432000, supplierCode: 'GYS-018', supplierName: '北京浪潮电子信息产业有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-019', name: '联想（北京）信息技术有限公司' }, { code: 'GYS-020', name: '中科曙光信息产业股份有限公司' }] },
                    { id: 'BD-005', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-4', purchaseName: '办公设备集中采购 - 安全设备采购', sectionNo: '4', limitAmount: 452000, winAmount: 428000, supplierCode: 'GYS-022', supplierName: '新华三技术有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-023', name: '锐捷网络股份有限公司' }] }
                ],
                attachments: {
                    'BD-001': [{ type: '中标通知书', name: '中标通知书_金牌物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0720-001', fileType: 'pdf', size: 245760, ts: '2026-07-20 14:30', user: '李经理' }, { type: '中标结果公告', name: '中标结果公告_物业.docx', comp: '文件管理组件', fileId: 'F-2026-0720-002', fileType: 'docx', size: 128000, ts: '2026-07-20 15:10', user: '李经理' }, { type: '评标报告', name: '评标报告_物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 512000, ts: '2026-07-18 10:00', user: '张明' }],
                    'BD-002': [{ type: '中标通知书', name: '中标通知书_华讯网络.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-001', fileType: 'pdf', size: 198000, ts: '2026-07-18 16:00', user: '王磊' }, { type: '中标结果公告', name: '中标结果公告_IT标段1.docx', comp: '文件管理组件', fileId: 'F-2026-0718-002', fileType: 'docx', size: 112000, ts: '2026-07-18 16:30', user: '王磊' }],
                    'BD-003': [{ type: '中标通知书', name: '中标通知书_海康威视.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 205000, ts: '2026-07-18 17:00', user: '王磊' }, { type: '中标结果公告', name: '中标结果公告_IT标段2.docx', comp: '文件管理组件', fileId: 'F-2026-0718-004', fileType: 'docx', size: 108000, ts: '2026-07-18 17:15', user: '王磊' }],
                    'BD-004': [{ type: '中标通知书', name: '中标通知书_浪潮信息.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-005', fileType: 'pdf', size: 192000, ts: '2026-07-18 17:30', user: '王磊' }, { type: '中标结果公告', name: '中标结果公告_IT标段3.docx', comp: '文件管理组件', fileId: 'F-2026-0718-006', fileType: 'docx', size: 105000, ts: '2026-07-18 17:45', user: '王磊' }, { type: '评标报告', name: '评标报告_IT设备.pdf', comp: '文件管理组件', fileId: 'F-2026-0717-001', fileType: 'pdf', size: 486000, ts: '2026-07-17 11:00', user: '王磊' }]
                }
            },
            6: {
                form: { approvalStatus: '审批中', applyCode: 'ZB-2026-003', unit: '集团总部', resultNote: '评标委员会已完成全部评审工作，根据综合评分法推荐中标候选人。经定标委员会审议通过，现对中标结果进行公示，公示期 3 个工作日。' },
                sections: [
                    { id: 'BD-001', planCode: 'PL-2026-0002', lineNo: 1, target: '主合同', awardCode: 'DB-2026-003-1', purchaseName: '集团年度物业服务 - 物业服务', sectionNo: '1', limitAmount: 1865000, winAmount: 1820000, supplierCode: 'GYS-001', supplierName: '北京金牌物业服务有限公司', winDate: '2026-07-20', otherSuppliers: [{ code: 'GYS-002', name: '上海信诚物业有限公司' }, { code: 'GYS-003', name: '广州华泰物业服务有限公司' }] },
                    { id: 'BD-002', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-1', purchaseName: '办公设备集中采购 - 服务器采购', sectionNo: '1', limitAmount: 452000, winAmount: 438000, supplierCode: 'GYS-010', supplierName: '上海华讯网络系统有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-011', name: '北京神州数码有限公司' }, { code: 'GYS-012', name: '深圳华为技术有限公司' }] },
                    { id: 'BD-003', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-2', purchaseName: '办公设备集中采购 - 网络设备采购', sectionNo: '2', limitAmount: 452000, winAmount: 445000, supplierCode: 'GYS-015', supplierName: '杭州海康威视数字技术股份有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-016', name: '浙江大华技术股份有限公司' }] },
                    { id: 'BD-004', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-3', purchaseName: '办公设备集中采购 - 存储设备采购', sectionNo: '3', limitAmount: 452000, winAmount: 432000, supplierCode: 'GYS-018', supplierName: '北京浪潮电子信息产业有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-019', name: '联想（北京）信息技术有限公司' }, { code: 'GYS-020', name: '中科曙光信息产业股份有限公司' }] },
                    { id: 'BD-005', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-4', purchaseName: '办公设备集中采购 - 安全设备采购', sectionNo: '4', limitAmount: 452000, winAmount: 428000, supplierCode: 'GYS-022', supplierName: '新华三技术有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-023', name: '锐捷网络股份有限公司' }] }
                ],
                attachments: {
                    'BD-001': [{ type: '中标通知书', name: '中标通知书_金牌物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0720-001', fileType: 'pdf', size: 245760, ts: '2026-07-20 14:30', user: '李经理' }, { type: '中标结果公告', name: '中标结果公告_物业.docx', comp: '文件管理组件', fileId: 'F-2026-0720-002', fileType: 'docx', size: 128000, ts: '2026-07-20 15:10', user: '李经理' }, { type: '评标报告', name: '评标报告_物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 512000, ts: '2026-07-18 10:00', user: '张明' }],
                    'BD-002': [{ type: '中标通知书', name: '中标通知书_华讯网络.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-001', fileType: 'pdf', size: 198000, ts: '2026-07-18 16:00', user: '王磊' }, { type: '中标结果公告', name: '中标结果公告_IT标段1.docx', comp: '文件管理组件', fileId: 'F-2026-0718-002', fileType: 'docx', size: 112000, ts: '2026-07-18 16:30', user: '王磊' }],
                    'BD-003': [{ type: '中标通知书', name: '中标通知书_海康威视.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 205000, ts: '2026-07-18 17:00', user: '王磊' }, { type: '中标结果公告', name: '中标结果公告_IT标段2.docx', comp: '文件管理组件', fileId: 'F-2026-0718-004', fileType: 'docx', size: 108000, ts: '2026-07-18 17:15', user: '王磊' }],
                    'BD-004': [{ type: '中标通知书', name: '中标通知书_浪潮信息.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-005', fileType: 'pdf', size: 192000, ts: '2026-07-18 17:30', user: '王磊' }, { type: '中标结果公告', name: '中标结果公告_IT标段3.docx', comp: '文件管理组件', fileId: 'F-2026-0718-006', fileType: 'docx', size: 105000, ts: '2026-07-18 17:45', user: '王磊' }, { type: '评标报告', name: '评标报告_IT设备.pdf', comp: '文件管理组件', fileId: 'F-2026-0717-001', fileType: 'pdf', size: 486000, ts: '2026-07-17 11:00', user: '王磊' }]
                }
            }
        }
    },
    '邀请招标': {
        info: {
            projectName: '弱电系统维保服务',
            applyCode: 'ZB-2026-011',
            unit: '集团总部',
            status: '进行中',
            statusTag: 'tag-yellow'
        },
        nodes: {
            0: {
                form: {
                    procCode: 'ZB-2026-011', procName: '弱电系统维保服务', companyCode: 'HQ-002',
                    limitAmount: 850000, limitAmountText: '¥850,000.00元', method: '邀请招标',
                    category: '服务类 · 维护服务', note: '—',
                    handler: '陈芳', applyDate: '2026-05-10', agent: '上海XX招标代理有限公司',
                    planIssueDate: '2026-05-12', planEndDate: '2026-06-15', inHouse: '否',
                    approvalStatus: '审批通过',
                    scope: '集团总部及下属企业弱电系统（监控、门禁、网络布线等）年度维保服务。'
                },
                purchases: [
                    { idx: 0, name: '弱电系统维保服务', planCode: 'PL-2026-0021', lineNo: '001', purchaseName: '弱电系统维保服务', amount: 850000, amountText: '¥850,000.00元', sections: 1, cat: '服务类', subCat: '维护服务', target: '主合同', note: '—' }
                ],
                sectionData: {
                    0: [{ seq: 1, name: '弱电系统维保服务', limit: 850000, planCode: 'PL-2026-0021', planRow: '001', purchaseName: '弱电系统维保服务', amount: 850000, sections: 1, cat: '服务类', subCat: '维护服务', target: '主合同', note: '—' }]
                },
                attachments: [
                    { type: '招标文件', name: '弱电维保招标文件_v1.pdf', file: 'ZB-2026-011-ZB.pdf', fileId: 'F202605001', fileType: 'pdf', size: '1,800,000', ts: '2026-05-10 14:00', user: '陈芳' },
                    { type: '招标公告', name: '弱电维保招标公告.pdf', file: 'ZB-2026-011-GG.pdf', fileId: 'F202605002', fileType: 'pdf', size: '680,000', ts: '2026-05-10 14:10', user: '陈芳' }
                ]
            },
            1: {
                form: { inviteNote: '拟邀请供应商A、供应商B、供应商C共3家具有弱电维保资质的企业，均通过资格审查。', approvalStatus: '审批通过'},
                attachments: [
                    { type: '邀请函', name: '邀请函_供应商A.pdf', file: '邀请函_A.pdf', fileId: 'F-2026-0515-001', fileType: 'pdf', size: '420,000', ts: '2026-05-15 09:00', user: '陈芳' },
                    { type: '邀请函', name: '邀请函_供应商B.pdf', file: '邀请函_B.pdf', fileId: 'F-2026-0515-002', fileType: 'pdf', size: '420,000', ts: '2026-05-15 09:05', user: '陈芳' },
                    { type: '邀请函', name: '邀请函_供应商C.pdf', file: '邀请函_C.pdf', fileId: 'F-2026-0515-003', fileType: 'pdf', size: '420,000', ts: '2026-05-15 09:10', user: '陈芳' }
                ]
            },
            2: {
                form: { desc: '开标时间：2026-05-25 14:00，地点：集团总部2楼会议室。3家受邀单位均按时投标，标书密封完好。', bidderCount: 3, approvalStatus: '草稿' },
                attachments: [
                    { type: '开标记录', name: 'ZB-2026-011-开标记录.pdf', comp: '开标信息', fileType: 'pdf', size: '980,000', ts: 'TS-20260525-001', time: '2026-05-25 14:30', user: '陈芳' },
                    { type: '投标文件汇总', name: '投标文件汇总表.xlsx', comp: '开标信息', fileType: 'xlsx', size: '560,000', ts: 'TS-20260525-002', time: '2026-05-25 15:00', user: '陈芳' }
                ]
            },
            3: {
                form: { desc: '评标委员会由3人组成。经评审，供应商A综合得分92.3分，供应商B88.7分，供应商C85.1分。', approvalStatus: '待推进' },
                attachments: [
                    { type: '评标报告', name: 'ZB-2026-011-评标报告.pdf', comp: '评标结果', fileType: 'pdf', size: '1,560,000', ts: 'TS-20260528-001', time: '2026-05-28 11:00', user: '陈芳' }
                ]
            },
            4: {
                form: { approvalStatus: '待推进', applyCode: 'ZB-2026-011', unit: '集团总部', resultNote: '待评标完成后确认中标单位。' },
                sections: [
                    { id: 'BD-011', planCode: 'PL-2026-0021', lineNo: 1, target: '主合同', awardCode: 'DB-2026-011-1', purchaseName: '弱电系统维保服务', sectionNo: '1', limitAmount: 850000, winAmount: 828000, supplierCode: 'GYS-030', supplierName: '上海安保通智能科技有限公司', winDate: '2026-06-01', otherSuppliers: [{ code: 'GYS-031', name: '北京中科弱电工程有限公司' }, { code: 'GYS-032', name: '深圳达实智能股份有限公司' }] }
                ],
                attachments: {
                    'BD-011': [
                        { type: '中标通知书', name: '中标通知书_安保通.pdf', comp: '文件管理组件', fileId: 'F-2026-0601-001', fileType: 'pdf', size: 198000, ts: '2026-06-01 10:00', user: '陈芳' },
                        { type: '中标结果公告', name: '中标结果公告_弱电维保.docx', comp: '文件管理组件', fileId: 'F-2026-0601-002', fileType: 'docx', size: 98000, ts: '2026-06-01 10:30', user: '陈芳' }
                    ]
                }
            }
        }
    },
    '询比采购': {
        info: {
            projectName: '办公设备集中采购',
            applyCode: 'ZB-2026-005',
            unit: '成员企业A',
            status: '草稿',
            statusTag: 'tag-gray'
        },
        nodes: {
            0: {
                form: {
                    procCode: 'ZB-2026-005', procName: '办公设备集中采购', companyCode: 'MEMBER-001',
                    limitAmount: 452000, limitAmountText: '¥452,000.00元', method: '询比采购',
                    category: '货物类 · IT类', note: '询比采购适用于标准化货品',
                    handler: '王磊', applyDate: '2026-05-15', agent: '—',
                    planIssueDate: '2026-05-18', planEndDate: '2026-06-10', inHouse: '否',
                    approvalStatus: '草稿',
                    scope: '台式计算机、服务器等办公设备集中采购，含安装调试。'
                },
                purchases: [
                    { idx: 0, name: '办公设备集中采购', planCode: 'PL-2026-0010', lineNo: '001', purchaseName: '台式计算机及服务器', amount: 452000, amountText: '¥452,000.00元', sections: 1, cat: '货物类', subCat: 'IT类', target: '主合同', note: '—' }
                ],
                sectionData: {
                    0: [{ seq: 1, name: '办公设备集中采购', limit: 452000, planCode: 'PL-2026-0010', planRow: '001', purchaseName: '台式计算机及服务器', amount: 452000, sections: 1, cat: '货物类', subCat: 'IT类', target: '主合同', note: '—' }]
                },
                attachments: [
                    { type: '询比文件', name: '办公设备询比文件.pdf', file: 'ZB-2026-005-XB.pdf', fileId: 'F202605001', fileType: 'pdf', size: '1,200,000', ts: '2026-05-16 09:00', user: '王磊' }
                ]
            },
            1: {
                form: { inviteNote: '邀请供应商A、供应商B、供应商C共3家参与报价，均通过资格预审。', approvalStatus: '草稿' },
                attachments: [
                    { type: '报价邀请函', name: '报价邀请函_供应商A.pdf', file: '邀请函_A.pdf', fileId: 'F-2026-0518-001', fileType: 'pdf', size: '320,000', ts: '2026-05-18 10:00', user: '王磊' },
                    { type: '报价邀请函', name: '报价邀请函_供应商B.pdf', file: '邀请函_B.pdf', fileId: 'F-2026-0518-002', fileType: 'pdf', size: '320,000', ts: '2026-05-18 10:05', user: '王磊' },
                    { type: '报价邀请函', name: '报价邀请函_供应商C.pdf', file: '邀请函_C.pdf', fileId: 'F-2026-0518-003', fileType: 'pdf', size: '320,000', ts: '2026-05-18 10:10', user: '王磊' }
                ]
            },
            2: {
                form: { approvalStatus: '待推进', applyCode: 'ZB-2026-005', unit: '成员企业A', resultNote: '经比价，供应商A报价最低且满足技术要求，推荐为成交供应商。' },
                sections: [
                    { id: 'BD-005', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-1', purchaseName: '办公设备集中采购', sectionNo: '1', limitAmount: 452000, winAmount: 438000, supplierCode: 'GYS-010', supplierName: '上海华讯网络系统有限公司', winDate: '2026-06-05', otherSuppliers: [{ code: 'GYS-011', name: '北京神州数码有限公司' }, { code: 'GYS-012', name: '深圳华为技术有限公司' }] }
                ],
                attachments: {
                    'BD-005': [
                        { type: '成交通知书', name: '成交通知书_华讯网络.pdf', comp: '文件管理组件', fileId: 'F-2026-0605-001', fileType: 'pdf', size: 185000, ts: '2026-06-05 14:00', user: '王磊' },
                        { type: '成交结果公告', name: '成交结果公告_办公设备.docx', comp: '文件管理组件', fileId: 'F-2026-0605-002', fileType: 'docx', size: 92000, ts: '2026-06-05 14:30', user: '王磊' }
                    ]
                }
            }
        }
    },
    '谈判采购': {
        info: {
            projectName: 'IT运维服务',
            applyCode: 'ZB-2026-007',
            unit: '成员企业A',
            status: '草稿',
            statusTag: 'tag-gray'
        },
        nodes: {
            0: {
                form: {
                    procCode: 'ZB-2026-007', procName: 'IT运维服务', companyCode: 'MEMBER-001',
                    limitAmount: 320000, limitAmountText: '¥320,000.00元', method: '谈判采购',
                    category: '服务类 · 维护服务', note: '谈判采购适用于技术复杂或紧急需求',
                    handler: '陈芳', applyDate: '2026-06-01', agent: '—',
                    planIssueDate: '2026-06-03', planEndDate: '2026-06-30', inHouse: '否',
                    approvalStatus: '草稿',
                    scope: '集团成员企业A的IT系统运维服务，服务期6个月。'
                },
                purchases: [
                    { idx: 0, name: 'IT运维服务', planCode: 'PL-2026-0015', lineNo: '001', purchaseName: 'IT运维服务', amount: 320000, amountText: '¥320,000.00元', sections: 1, cat: '服务类', subCat: '维护服务', target: '主合同', note: '—' }
                ],
                sectionData: {
                    0: [{ seq: 1, name: 'IT运维服务', limit: 320000, planCode: 'PL-2026-0015', planRow: '001', purchaseName: 'IT运维服务', amount: 320000, sections: 1, cat: '服务类', subCat: '维护服务', target: '主合同', note: '—' }]
                },
                attachments: [
                    { type: '谈判文件', name: 'IT运维服务谈判文件.pdf', file: 'ZB-2026-007-TP.pdf', fileId: 'F202606001', fileType: 'pdf', size: '980,000', ts: '2026-06-02 09:30', user: '陈芳' }
                ]
            },
            1: {
                form: { inviteNote: '邀请具有IT运维资质的供应商A、供应商B共2家参与谈判。', approvalStatus: '草稿' },
                attachments: [
                    { type: '谈判邀请函', name: '谈判邀请函_供应商A.pdf', file: '邀请函_A.pdf', fileId: 'F-2026-0604-001', fileType: 'pdf', size: '280,000', ts: '2026-06-04 10:00', user: '陈芳' },
                    { type: '谈判邀请函', name: '谈判邀请函_供应商B.pdf', file: '邀请函_B.pdf', fileId: 'F-2026-0604-002', fileType: 'pdf', size: '280,000', ts: '2026-06-04 10:05', user: '陈芳' }
                ]
            },
            2: {
                form: { approvalStatus: '待推进', applyCode: 'ZB-2026-007', unit: '成员企业A', resultNote: '待谈判完成后确定成交供应商。' },
                sections: [
                    { id: 'BD-007', planCode: 'PL-2026-0015', lineNo: 1, target: '主合同', awardCode: 'DB-2026-007-1', purchaseName: 'IT运维服务', sectionNo: '1', limitAmount: 320000, winAmount: 0, supplierCode: '', supplierName: '待确定', winDate: '—', otherSuppliers: [] }
                ],
                attachments: {}
            }
        }
    },
    '直接采购': {
        info: {
            projectName: '法律顾问服务',
            applyCode: 'ZB-2026-006',
            unit: '集团总部',
            status: '草稿',
            statusTag: 'tag-gray'
        },
        nodes: {
            0: {
                form: {
                    procCode: 'ZB-2026-006', procName: '法律顾问服务', companyCode: 'HQ-003',
                    limitAmount: 85000, limitAmountText: '¥85,000.00元', method: '直接采购',
                    category: '服务类 · 法律服务', note: '直接采购适用于独家供应或紧急采购',
                    handler: '张明', applyDate: '2026-06-10', agent: '—',
                    planIssueDate: '2026-06-10', planEndDate: '2026-06-25', inHouse: '否',
                    approvalStatus: '草稿',
                    scope: '集团2026年度常年法律顾问服务，期限12个月。'
                },
                purchases: [
                    { idx: 0, name: '法律顾问服务', planCode: 'PL-2026-0001', lineNo: '001', purchaseName: '年度法律顾问服务', amount: 85000, amountText: '¥85,000.00元', sections: 1, cat: '服务类', subCat: '法律服务', target: '主合同', note: '—' }
                ],
                sectionData: {
                    0: [{ seq: 1, name: '法律顾问服务', limit: 85000, planCode: 'PL-2026-0001', planRow: '001', purchaseName: '年度法律顾问服务', amount: 85000, sections: 1, cat: '服务类', subCat: '法律服务', target: '主合同', note: '—' }]
                },
                attachments: [
                    { type: '采购说明', name: '直接采购说明_法律顾问服务.pdf', file: 'ZB-2026-006-SM.pdf', fileId: 'F202606003', fileType: 'pdf', size: '560,000', ts: '2026-06-10 09:00', user: '张明' }
                ]
            },
            1: {
                form: { approvalStatus: '待推进', applyCode: 'ZB-2026-006', unit: '集团总部', resultNote: '待审批通过后，与供应商签订合同。' },
                sections: [
                    { id: 'BD-006', planCode: 'PL-2026-0001', lineNo: 1, target: '主合同', awardCode: 'DB-2026-006-1', purchaseName: '法律顾问服务', sectionNo: '1', limitAmount: 85000, winAmount: 82000, supplierCode: 'GYS-040', supplierName: '北京XX律师事务所', winDate: '—', otherSuppliers: [] }
                ],
                attachments: {
                    'BD-006': [
                        { type: '供应商评审表', name: '供应商评审表_法律顾问.pdf', comp: '文件管理组件', fileId: 'F-2026-0612-001', fileType: 'pdf', size: 320000, ts: '2026-06-12 11:00', user: '张明' }
                    ]
                }
            }
        }
    },
    '直接采购-小额': {
        info: {
            projectName: '办公用品采购',
            applyCode: 'ZB-2026-013',
            unit: '成员企业B',
            status: '草稿',
            statusTag: 'tag-gray'
        },
        nodes: {
            0: {
                form: {
                    procCode: 'ZB-2026-013', procName: '办公用品采购', companyCode: 'MEMBER-002',
                    limitAmount: 98000, limitAmountText: '¥98,000.00元', method: '直接采购',
                    category: '货物类 · 办公用品类', note: '合同估算价 ＜ 100,000.00 元，可按直接采购方式实施',
                    handler: '赵岩', applyDate: '2026-06-20', agent: '—',
                    planIssueDate: '2026-06-20', planEndDate: '2026-06-30', inHouse: '否',
                    approvalStatus: ' 草稿',
                    scope: '成员企业B 2026年度办公用品（打印纸、文具、耗材等）集中采购，满足全年办公需求。'
                },
                purchases: [
                    { idx: 0, name: '办公用品采购', planCode: 'PL-2026-0025', lineNo: '001', purchaseName: '办公用品采购', amount: 98000, amountText: '¥98,000.00元', sections: 1, cat: '货物类', subCat: '办公用品类', target: '主合同', note: '合同估算价 ＜ 100,000.00 元' }
                ],
                sectionData: {
                    0: [{ seq: 1, name: '办公用品采购', limit: 98000, planCode: 'PL-2026-0025', planRow: '001', purchaseName: '办公用品采购', amount: 98000, sections: 1, cat: '货物类', subCat: '办公用品类', target: '主合同', note: '合同估算价 ＜ 100,000.00 元' }]
                },
                attachments: [
                    { type: '采购说明', name: '直接采购说明_办公用品.pdf', file: 'ZB-2026-013-SM.pdf', fileId: 'F202606010', fileType: 'pdf', size: '420,000', ts: '2026-06-20 09:00', user: '赵岩' }
                ]
            },
            1: {
                form: { approvalStatus: '草稿', applyCode: 'ZB-2026-013', unit: '成员企业B', resultNote: '完成供应商评审，确定成交供应商。' },
                sections: [
                    { id: 'BD-013', planCode: 'PL-2026-0025', lineNo: 1, target: '主合同', awardCode: 'DB-2026-013-1', purchaseName: '办公用品采购', sectionNo: '1', limitAmount: 98000, winAmount: 95500, supplierCode: 'GYS-050', supplierName: '上海晨光办公用品有限公司', winDate: '—', otherSuppliers: [{ code: 'GYS-051', name: '北京齐心办公用品有限公司' }] }
                ],
                attachments: {
                    'BD-013': [
                        { type: '供应商评审表', name: '供应商评审表_办公用品.pdf', comp: '文件管理组件', fileId: 'F-2026-0622-001', fileType: 'pdf', size: '280,000', ts: '2026-06-22 10:00', user: '赵岩' }
                    ]
                }
            }
        }
    }
};