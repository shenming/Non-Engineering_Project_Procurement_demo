/**
 * 非工程类招采管理系统 - 公共数据层
 * 存放所有采购方式共用的纯配置数据
 */

// ===== 采购类别二级品类树 =====
var CATEGORY_TREE = {
    '货物类': ['办公用品类', '设备类', 'IT类', '家具类', '劳保用品类', '其他货物'],
    '服务类': ['物业服务', '咨询服务', '培训服务', '法律服务', '维护服务', '运输服务', '其他服务']
};

// ===== 采购方式 → 步骤名数组（无状态，新增/编辑/详情通用） =====
var METHOD_STEPS = {
    '公开招标': ['招采申请', '招采公告', '开标信息', '上传评标结果', '评标结果公示', '中标结果', '中标结果公示'],
    '邀请招标': ['招标申请', '拟邀请单位', '开标信息', '上传评标结果', '中标结果'],
    '询比采购': ['招标申请', '拟邀请单位', '确定成交供应商'],
    '谈判采购': ['招标申请', '拟邀请单位', '确定成交供应商'],
    '直接采购': ['招标申请', '确定成交供应商'],
    '直接采购-小额': ['招标申请', '确定成交供应商']
};

// ===== 各采购方式各程序环节的附件要求字典 =====
// key: "采购方式|步骤名"
// value: { required: [必传文件列表], other: [其他文件列表], notes: '说明' }
var NODE_ATTACHMENT_RULES = {
    // ===== 公开招标 =====
    '公开招标|招采申请': {
        required: ['招标文件'],
        other: ['其他招标相关附件（如图纸、限价）'],
        notes: ''
    },
    '公开招标|招采公告': {
        required: ['招标公告'],
        other: [],
        notes: ''
    },
    '公开招标|开标信息': {
        required: ['开标记录'],
        other: [],
        notes: ''
    },
    '公开招标|上传评标结果': {
        required: ['评标报告', '中标候选人公示'],
        other: ['其他必要的附件（如澄清文件、质疑及回复文件）'],
        notes: ''
    },
    '公开招标|评标结果公示': {
        required: [],
        other: [],
        notes: ''
    },
    '公开招标|中标结果': {
        required: ['拟中标单位的投标文件'],
        other: ['需要用印的中标结果公告及中标通知书'],
        notes: ''
    },
    '公开招标|中标结果公示': {
        required: ['中标结果公告', '中标通知书（用印完成或从交易平台下载的电子文件）'],
        other: [],
        notes: ''
    },

    // ===== 邀请招标 =====
    '邀请招标|招标申请': {
        required: ['招标文件', '邀请供应商说明文件'],
        other: ['其他招标相关附件（如图纸、限价）'],
        notes: ''
    },
    '邀请招标|拟邀请单位': {
        required: [],
        other: [],
        notes: ''
    },
    '邀请招标|开标信息': {
        required: ['开标记录'],
        other: [],
        notes: ''
    },
    '邀请招标|上传评标结果': {
        required: ['评标报告', '中标候选人公示'],
        other: ['其他必要的附件（如澄清文件、质疑及回复文件）'],
        notes: ''
    },
    '邀请招标|中标结果': {
        required: ['拟中标单位的投标文件', '中标结果公告', '中标通知书（用印完成或从交易平台下载的电子文件）'],
        other: ['需要用印的中标结果公告及中标通知书'],
        notes: '定标与中标公告附件合并'
    },

    // ===== 询比采购 =====
    '询比采购|招标申请': {
        required: ['采购需求', '询比文件', '询比供应商说明文件'],
        other: [],
        notes: '询比小组的组建应在询比申请说明中列明'
    },
    '询比采购|拟邀请单位': {
        required: [],
        other: [],
        notes: ''
    },
    '询比采购|确定成交供应商': {
        required: ['响应文件', '报价记录表', '评审报告', '成交结果告知书'],
        other: ['其他必要的附件（如澄清文件、质疑及回复文件）'],
        notes: ''
    },

    // ===== 谈判采购 =====
    '谈判采购|招标申请': {
        required: ['采购需求', '谈判采购的说明文件'],
        other: [],
        notes: ''
    },
    '谈判采购|拟邀请单位': {
        required: ['谈判文件', '谈判供应商说明文件'],
        other: [],
        notes: '谈判小组的组建应在询比申请说明中列明'
    },
    '谈判采购|确定成交供应商': {
        required: ['各轮次响应文件', '各轮次报价记录表', '评审报告', '成交结果告知书'],
        other: ['其他必要的附件（如澄清文件、质疑及回复文件）'],
        notes: ''
    },

    // ===== 直接采购 =====
    '直接采购|招标申请': {
        required: ['采购需求', '直接采购原因说明文件'],
        other: [],
        notes: '直接采购适用条件第（2）（3）（4）（5）四种情形开展直接采购的'
    },
    '直接采购|确定成交供应商': {
        required: ['采购需求', '供应商说明文件', '商谈记录', '采购结果文件'],
        other: ['其他证明合理性的文件资料'],
        notes: ''
    },

    // ===== 直接采购-小额（沿用直接采购规则） =====
    '直接采购-小额|招标申请': {
        required: ['采购需求', '直接采购原因说明文件'],
        other: [],
        notes: ''
    },
    '直接采购-小额|确定成交供应商': {
        required: ['采购需求', '供应商说明文件', '商谈记录', '采购结果文件'],
        other: ['其他证明合理性的文件资料'],
        notes: ''
    }
};

// 获取某采购方式特定步骤的附件规则
function getAttachmentRule(method, stepName) {
    return NODE_ATTACHMENT_RULES[method + '|' + stepName] || null;
}

// 比对已有附件是否满足必传要求
// returns: { ok: true/false, missing: [...], matched: [...] }
function checkRequiredAttachments(method, stepName, existingAttachments) {
    var rule = getAttachmentRule(method, stepName);
    if (!rule || !rule.required || rule.required.length === 0) {
        return { ok: true, missing: [], matched: [] };
    }
    var matched = [];
    var missing = [];
    for (var i = 0; i < rule.required.length; i++) {
        var req = rule.required[i];
        var found = false;
        for (var j = 0; j < existingAttachments.length; j++) {
            if (existingAttachments[j].type === req) {
                found = true;
                break;
            }
        }
        if (found) {
            matched.push(req);
        } else {
            missing.push(req);
        }
    }
    return {
        ok: missing.length === 0,
        missing: missing,
        matched: matched
    };
}

// ===== 兼容函数 =====
function getStepNames(method) {
    return METHOD_STEPS[method] || [];
}

// 从 METHOD_STEPS 和 states 数组生成带状态的 steps（供 DETAIL_METHOD_CONFIG 调用）
function buildSteps(method, states) {
    var names = METHOD_STEPS[method];
    if (!names) return [];
    return names.map(function(name, i) {
        return { name: name, state: (states[i] || 'future') };
    });
}