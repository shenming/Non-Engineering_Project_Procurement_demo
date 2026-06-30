/**
 * 招采过程 - 编辑模式数据
 * 定义每个采购方式、每个步骤中不可编辑（锁定）的字段
 * 默认所有字段可编辑，仅此处列出的字段保持 readonly/disabled
 */

var EDIT_LOCKED_FIELDS = {
    '公开招标': {
        0: ['procCode', 'companyCode', 'method', 'category', 'approvalStatus', 'applyDate', 'planIssueDate', 'planEndDate'],
        1: ['approvalStatus'],
        2: ['approvalStatus'],
        3: ['approvalStatus'],
        4: ['approvalStatus'],
        5: ['approvalStatus', 'applyCode', 'unit'],
        6: ['approvalStatus', 'applyCode', 'unit']
    },
    '邀请招标': {
        0: ['procCode', 'companyCode', 'method', 'category', 'approvalStatus', 'applyDate'],
        1: [],
        2: ['approvalStatus'],
        3: ['approvalStatus'],
        4: ['approvalStatus', 'applyCode', 'unit']
    },
    '询比采购': {
        0: ['procCode', 'companyCode', 'method', 'category', 'approvalStatus', 'applyDate'],
        1: [],
        2: ['approvalStatus', 'applyCode', 'unit']
    },
    '谈判采购': {
        0: ['procCode', 'companyCode', 'method', 'category', 'approvalStatus', 'applyDate'],
        1: [],
        2: ['approvalStatus', 'applyCode', 'unit']
    },
    '直接采购': {
        0: ['procCode', 'companyCode', 'method', 'category', 'approvalStatus', 'applyDate'],
        1: ['approvalStatus', 'applyCode', 'unit']
    },
    '直接采购-小额': {
        0: ['procCode', 'companyCode', 'method', 'category', 'approvalStatus', 'applyDate'],
        1: ['approvalStatus', 'applyCode', 'unit']
    }
};