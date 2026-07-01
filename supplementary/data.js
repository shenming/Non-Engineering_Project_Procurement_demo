/**
 * 补充招标 - 数据配置
 * 
 * 补充招标数据直接存储在 DETAIL_DATA 的 supplements 数组中，
 * 本文件提供辅助函数和 mock 数据。
 */

// ==================== 补充招标版本管理 ====================

/**
 * 获取某采购记录的补充招标版本列表
 * @param {string} method - 采购方式
 * @returns {Array} supplements 数组
 */
function getSupplements(method) {
    if (typeof DETAIL_DATA === 'undefined') return [];
    var data = DETAIL_DATA[method];
    return (data && data.supplements) ? data.supplements : [];
}

/**
 * 获取当前最大版本号
 * @param {string} method - 采购方式
 * @returns {number} 当前最大版本号，0表示无补充
 */
function getMaxSupplementVersion(method) {
    var list = getSupplements(method);
    if (list.length === 0) return 0;
    var max = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i].version > max) max = list[i].version;
    }
    return max;
}

/**
 * 生成补充招标编号
 * @param {string} procCode - 原招标过程编号
 * @param {number} version - 补充版本号
 * @returns {string} 如 "ZB-2026-003-BC01"
 */
function generateSupplementId(procCode, version) {
    var ver = String(version).padStart(2, '0');
    return procCode + '-BC' + ver;
}

// ==================== Mock 补充数据 ====================

var SUPPLEMENT_MOCK = {
    '公开招标': [
        {
            version: 1,
            supplementId: 'ZB-2026-003-BC01',
            status: '已生效',
            createDate: '2026-06-25',
            submitDate: '2026-06-26',
            reason: '根据潜在供应商答疑情况，对招标文件中的技术服务参数进行澄清和修改，同时延长投标截止时间。',
            changes: {
                planEndDate: { old: '2026-07-25', new: '2026-08-15' },
                scope: {
                    old: '集团总部大楼A/B座、园区绿化、安保等物业服务，服务期12个月。',
                    new: '集团总部大楼A/B座/C座、园区绿化、安保、食堂等物业服务，服务期12个月。'
                },
                limitAmountText: { old: '¥1,865,000.00元', new: '¥2,200,000.00元' },
                limitAmount: { old: 1865000, new: 2200000 }
            },
            attachments: [
                { type: '补充招标文件', name: '补充招标文件_第1次_集团年度物业服务.pdf', file: 'ZB-2026-003-BC1-ZB.pdf', fileId: 'F20260625001', fileType: 'pdf', size: '1,234,567', ts: '2026-06-25 14:30', user: '李经理' },
                { type: '澄清回复', name: '供应商答疑澄清汇总.xlsx', file: 'ZB-2026-003-BC1-CLARIFY.xlsx', fileId: 'F20260625002', fileType: 'xlsx', size: '456,789', ts: '2026-06-25 15:00', user: '李经理' }
            ],
            approval: {
                status: '审批通过',
                date: '2026-06-26',
                flowId: 'WF-2026-003-S1'
            }
        }
    ],
    '邀请招标': [
        {
            version: 1,
            supplementId: 'ZB-2026-011-BC01',
            status: '已生效',
            createDate: '2026-05-18',
            submitDate: '2026-05-19',
            reason: '收到受邀供应商对弱电系统维保范围的疑问，经现场勘测后调整服务范围并补充相关图纸。',
            changes: {
                scope: {
                    old: '集团总部及下属企业弱电系统（监控、门禁、网络布线等）年度维保服务。',
                    new: '集团总部及下属企业弱电系统（监控、门禁、网络布线、会议室音视频系统等）年度维保服务。'
                },
                agent: { old: '上海XX招标代理有限公司', new: '上海XX招标代理有限公司' }
            },
            attachments: [
                { type: '补充招标文件', name: '补充招标文件_第1次_弱电维保.pdf', file: 'ZB-2026-011-BC1-ZB.pdf', fileId: 'F20260518001', fileType: 'pdf', size: '1,123,456', ts: '2026-05-18 10:00', user: '陈芳' },
                { type: '补充图纸', name: '弱电系统拓扑图_v2.dwg', file: 'ZB-2026-011-BC1-DWG.dwg', fileId: 'F20260518002', fileType: 'dwg', size: '3,567,890', ts: '2026-05-18 10:30', user: '陈芳' }
            ],
            approval: {
                status: '审批通过',
                date: '2026-05-19',
                flowId: 'WF-2026-011-S1'
            }
        }
    ]
};