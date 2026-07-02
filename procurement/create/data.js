var DETAIL_METHOD_CONFIG = {
   '公开招标': {
        steps: buildSteps('公开招标', ['active','done','future','future','future','future','future']),
        files: ['nodes/bid-apply.html','nodes/bid-announce.html','nodes/bid-opening.html','nodes/eval-result.html','nodes/eval-announce.html','nodes/award-result.html','nodes/award-announce.html'],
        flow: [
            { node: '招采申请&招采公告',status: '未审批', date: '—', flowId: '-'  },
            { node: '开标信息',  status: '待推进', date: '—', flowId: '-'},
            { node: '上传评标结果&评标结果公示',  status: '待推进', date: '—', flowId: '-' },
            { node: '中标结果',  status: '待推进', date: '—', flowId: '-' },
            { node: '中标结果公示',  status: '待推进', date: '—', flowId: '-' }
        ]
    },
    '邀请招标': {
        steps: buildSteps('邀请招标', ['active','done','future','future','future']),
        files: ['nodes/bid-apply.html','nodes/invite-units.html','nodes/bid-opening.html','nodes/eval-result.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请&拟邀请单位', status: '未审批', date: '—', flowId: '-' },
            { node: '开标信息', status: '待推进', date: '—', flowId: '-' },
            { node: '上传评标结果', status: '待推进', date: '—', flowId: '—' },
            { node: '中标结果', status: '待推进', date: '—', flowId: '—' }
        ]
    },
    '询比采购': {
        steps: buildSteps('询比采购', ['active','done','future']),
        files: ['nodes/bid-apply.html','nodes/invite-units.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请&拟邀请单位', status: '未审批', date: '—', flowId: '—' }
        ]
    },
    '谈判采购': {
        steps: buildSteps('谈判采购', ['active','done','future']),
        files: ['nodes/bid-apply.html','nodes/invite-units.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请&拟邀请单位', status: '未审批', date: '—', flowId: '—' }
        ]
    },
    '直接采购': {
        steps: buildSteps('直接采购', ['active','future']),
        files: ['nodes/bid-apply.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请', status: '未审批', date: '—', flowId: '—' }
        ]
    },
    '直接采购-小额': {
        steps: buildSteps('直接采购-小额', ['active','done']),
        files: ['nodes/bid-apply.html','nodes/award-result.html'],
        flow: [
            { node: '招标申请&确定成交供应商',status: '未审批', date: '—', flowId: '—'  }
        ]
    }


};

var METHOD_CONFIG = DETAIL_METHOD_CONFIG;

var EDITABLE_STEPS = {
    '公开招标': {
        0: true,   // 招采申请
        1: true,   // 发标公告
        2: false,   // 投标申请
        3: false,   // 开标
        4: false,   // 评标结果
        5: false,   // 评标公告
        6: false    // 授标公告
    },
    '邀请招标': {
        0: true,   // 招采申请
        1: true,   // 发标公告
        2: false,   // 开标
        3: false,   // 评标公告
        4: false    // 拟邀请单位
    },
    '询比采购': {
        0: true,   // 招采申请
        1: true,   // 评审
        2: false    // 定标
    },
    '谈判采购': {
        0: true,   // 招采申请
        1: true,   // 谈判
        2: false    // 定标
    },
    '直接采购': {
        0: true,   // 招采申请
        1: false    // 定标
    },
    '直接采购-小额': {
        0: true,   // 招采申请
        1: true    // 定标
    }

};

var DETAIL_DATA = {
    '公开招标': {
        info: {
            projectName: '集团年度物业服务',
            applyCode: 'ZB-2026-003',
            unit: '集团总部',
            status: '草稿',
            statusTag: 'tag- gray',
        },
        
        nodes: {
            0: {
                form: {
                    procCode: 'ZB-2026-003', procName: '集团年度物业服务', companyCode: 'HQ-001',
                    limitAmount: 1865000, limitAmountText: '¥1,865,000.00元', method: '公开招标',
                    category: '服务类 · 物业服务', note: '',
                    handler: '', applyDate: '', agent: '',
                    planIssueDate: '', planEndDate: '', inHouse: '',
                    approvalStatus: '草稿', scope: ''
                },
                purchases: [
                    { idx: 0, name: '集团年度物业服务', planCode: 'PL-2026-0002', lineNo: '001', purchaseName: '集团年度物业服务', amount: 1865000, amountText: '¥1,865,000.00元', sections: 1, cat: '服务类', subCat: '物业服务', target: '主合同', note: '公开招标不限金额门槛' },
                   
                ],
                sectionData: {
                    0: [{ seq: 1, name: '集团年度物业服务', limit: 1865000, planCode: 'PL-2026-0002', planRow: '001', purchaseName: '集团年度物业服务', amount: 1865000, sections: 1, cat: '服务类', subCat: '物业服务', target: '主合同', note: '公开招标不限金额门槛' }],
                   
                },
                attachments: [
                    { type: '招标文件', name: '', file: '', fileId: '', fileType: '', size: '', ts: '', user: '' },
                    { type: '招标公告', name: '', file: '', fileId: '', fileType: '', size: '', ts: '', user: '' }
                ]
            },
            1: {
                form: { announceName: '', startDate: '', endDate: '', approvalStatus: '草稿' },
                attachments: [
                    { type: '招标公告', name: '', file: '', fileId: '', fileType: '', size: '', ts: '', user: '' },
                    { type: '招标文件', name: '', file: '', fileId: '', fileType: '', size: '', ts: '', user: ''  },
                    { type: '最高限价文件', name: '', file: '', fileId: '', fileType: '', size: '', ts: '', user: ''  }
                ]
            }
            }
        }
   
};