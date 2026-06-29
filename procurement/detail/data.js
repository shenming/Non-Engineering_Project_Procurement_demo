/**
 * 招采过程 - 详情模式原型数据
 * 按采购方式分组，每组的 nodes[0..6] 对应7个步骤的所有数据
 */

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
            // ===== 步骤0：招采申请 (bid-apply) =====
            0: {
                // 顶部招采信息表单
                form: {
                    procCode: 'ZB-2026-003',
                    procName: '集团年度物业服务',
                    companyCode: 'HQ-001',
                    limitAmount: 1865000,
                    limitAmountText: '¥1,865,000.00元',
                    method: '公开招标',
                    category: '服务类 · 物业服务',
                    note: '公开招标不限金额门槛，企业可自主选择',
                    handler: '李经理',
                    applyDate: '2026-06-19',
                    agent: '上海XX招标代理有限公司',
                    planIssueDate: '2026-06-19',
                    planEndDate: '2026-07-25',
                    inHouse: '否',
                    approvalStatus: '审批通过',
                    scope: '集团总部大楼A/B座、园区绿化、安保等物业服务，服务期12个月。'
                },
                // 采购明细行
                purchases: [
                    { idx: 0, name: '集团年度物业服务', planCode: 'PL-2026-0002', lineNo: '001', purchaseName: '集团年度物业服务', amount: 1865000, amountText: '¥1,865,000.00元', sections: 1, cat: '服务类', subCat: '物业服务', target: '主合同', note: '公开招标不限金额门槛' },
                    { idx: 1, name: 'IT设备采购', planCode: 'PL-2026-0010', lineNo: '001', purchaseName: '台式计算机及服务器', amount: 2450000, amountText: '¥2,450,000.00元', sections: 3, cat: '货物类', subCat: 'IT类', target: '主合同', note: '—' }
                ],
                // 标段明细（按采购 idx 索引）
                sectionData: {
                    0: [
                        { seq: 1, name: '集团年度物业服务', limit: 1865000, planCode: 'PL-2026-0002', planRow: '001', purchaseName: '集团年度物业服务', amount: 1865000, sections: 1, cat: '服务类', subCat: '物业服务', target: '主合同', note: '公开招标不限金额门槛' }
                    ],
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
            // ===== 步骤1：招采公告 (bid-announce) =====
            1: {
                form: {
                    announceName: '集团年度物业服务公开招标公告',
                    startDate: '2026-06-21',
                    endDate: '2026-07-08',
                    approvalStatus: '审批通过'
                },
                attachments: [
                    { type: '招标公告', name: '招标公告_集团年度物业服务.pdf', file: '招标公告_集团年度物业服务.pdf', fileId: 'F-2026-0620-001', fileType: 'pdf', size: '1,245,000', ts: '2026-06-20 09:30', user: '李经理' },
                    { type: '招标文件', name: '招标文件_集团年度物业服务.pdf', file: '招标文件_集团年度物业服务.pdf', fileId: 'F-2026-0620-002', fileType: 'pdf', size: '3,560,000', ts: '2026-06-20 10:15', user: '李经理' },
                    { type: '最高限价文件', name: '最高限价说明_物业.pdf', file: '最高限价说明_物业.pdf', fileId: 'F-2026-0620-003', fileType: 'pdf', size: '856,000', ts: '2026-06-20 11:00', user: '张明' }
                ]
            },
            // ===== 步骤2：开标信息 (bid-opening) =====
            2: {
                form: {
                    desc: '开标时间：2026-06-20 09:30，地点：集团总部3楼会议室。3家投标单位均按时完成解密，报价有效。',
                    bidderCount: 3,
                    approvalStatus: '审批通过'
                },
                attachments: [
                    { type: '开标记录', name: 'ZB-2026-003-开标记录.pdf', comp: '开标信息', fileType: 'pdf', size: '1,245,678', ts: 'TS-20260620-001', time: '2026-06-20 09:45', user: '李经理' },
                    { type: '开标现场资料', name: 'ZB-2026-003-现场照片.jpg', comp: '开标信息', fileType: 'jpg', size: '3,210,456', ts: 'TS-20260620-002', time: '2026-06-20 10:00', user: '李经理' }
                ]
            },
            // ===== 步骤3：评标结果 (eval-result) =====
            3: {
                form: {
                    desc: '评标委员会由5人组成（集团采购部3人+外部专家2人），采用综合评分法评审。经评审，供应商A综合得分95.6分排名第一，推荐为中标候选人。公示期至2026-07-18。',
                    approvalStatus: '审批通过'
                },
                attachments: [
                    { type: '评标报告', name: 'ZB-2026-003-评标报告.pdf', comp: '评标结果', fileType: 'pdf', size: '2,456,789', ts: 'TS-20260712-001', time: '2026-07-12 14:30', user: '李经理' },
                    { type: '中标候选人公示', name: 'ZB-2026-003-中标候选人公示.pdf', comp: '评标结果', fileType: 'pdf', size: '1,023,400', ts: 'TS-20260712-002', time: '2026-07-12 14:35', user: '李经理' }
                ]
            },
            // ===== 步骤4：评标结果公示 (eval-announce) =====
            4: {
                form: {
                    desc: '中标候选人：供应商A，中标金额 1,780,000.00 元。公示期自 2026-07-15 至 2026-07-18，公示媒介为集团官网和中国招标投标公共服务平台。',
                    approvalStatus: '审批通过'
                },
                attachments: [
                    { type: '中标候选人公示', name: 'ZB-2026-003-中标候选人公示.pdf', comp: '评标公示', fileType: 'pdf', size: '1,200,000', ts: 'TS-20260715-001', time: '2026-07-15 09:00', user: '李经理' },
                    { type: '评标报告', name: 'ZB-2026-003-评标报告公示版.pdf', comp: '评标公示', fileType: 'pdf', size: '1,500,000', ts: 'TS-20260715-002', time: '2026-07-15 09:05', user: '李经理' }
                ]
            },
            // ===== 步骤5：中标结果 (award-result) =====
            5: {
                form: {
                    approvalStatus: '审批通过',
                    applyCode: 'ZB-2026-003',
                    unit: '集团总部',
                    resultNote: '评标委员会已完成全部评审工作，根据综合评分法推荐中标候选人。经定标委员会审议通过，现对中标结果进行公示，公示期 3 个工作日。'
                },
                sections: [
                    { id: 'BD-001', planCode: 'PL-2026-0002', lineNo: 1, target: '主合同', awardCode: 'DB-2026-003-1', purchaseName: '集团年度物业服务 - 物业服务', sectionNo: '1', limitAmount: 1865000, winAmount: 1820000, supplierCode: 'GYS-001', supplierName: '北京金牌物业服务有限公司', winDate: '2026-07-20', otherSuppliers: [{ code: 'GYS-002', name: '上海信诚物业有限公司' }, { code: 'GYS-003', name: '广州华泰物业服务有限公司' }] },
                    { id: 'BD-002', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-1', purchaseName: '办公设备集中采购 - 服务器采购', sectionNo: '1', limitAmount: 452000, winAmount: 438000, supplierCode: 'GYS-010', supplierName: '上海华讯网络系统有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-011', name: '北京神州数码有限公司' }, { code: 'GYS-012', name: '深圳华为技术有限公司' }] },
                    { id: 'BD-003', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-2', purchaseName: '办公设备集中采购 - 网络设备采购', sectionNo: '2', limitAmount: 452000, winAmount: 445000, supplierCode: 'GYS-015', supplierName: '杭州海康威视数字技术股份有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-016', name: '浙江大华技术股份有限公司' }] },
                    { id: 'BD-004', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-3', purchaseName: '办公设备集中采购 - 存储设备采购', sectionNo: '3', limitAmount: 452000, winAmount: 432000, supplierCode: 'GYS-018', supplierName: '北京浪潮电子信息产业有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-019', name: '联想（北京）信息技术有限公司' }, { code: 'GYS-020', name: '中科曙光信息产业股份有限公司' }] },
                    { id: 'BD-005', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-4', purchaseName: '办公设备集中采购 - 安全设备采购', sectionNo: '4', limitAmount: 452000, winAmount: 428000, supplierCode: 'GYS-022', supplierName: '新华三技术有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-023', name: '锐捷网络股份有限公司' }] }
                ],
                attachments: {
                    'BD-001': [
                        { type: '中标通知书', name: '中标通知书_金牌物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0720-001', fileType: 'pdf', size: 245760, ts: '2026-07-20 14:30', user: '李经理' },
                        { type: '中标结果公告', name: '中标结果公告_物业.docx', comp: '文件管理组件', fileId: 'F-2026-0720-002', fileType: 'docx', size: 128000, ts: '2026-07-20 15:10', user: '李经理' },
                        { type: '评标报告', name: '评标报告_物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 512000, ts: '2026-07-18 10:00', user: '张明' }
                    ],
                    'BD-002': [
                        { type: '中标通知书', name: '中标通知书_华讯网络.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-001', fileType: 'pdf', size: 198000, ts: '2026-07-18 16:00', user: '王磊' },
                        { type: '中标结果公告', name: '中标结果公告_IT标段1.docx', comp: '文件管理组件', fileId: 'F-2026-0718-002', fileType: 'docx', size: 112000, ts: '2026-07-18 16:30', user: '王磊' }
                    ],
                    'BD-003': [
                        { type: '中标通知书', name: '中标通知书_海康威视.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 205000, ts: '2026-07-18 17:00', user: '王磊' },
                        { type: '中标结果公告', name: '中标结果公告_IT标段2.docx', comp: '文件管理组件', fileId: 'F-2026-0718-004', fileType: 'docx', size: 108000, ts: '2026-07-18 17:15', user: '王磊' }
                    ],
                    'BD-004': [
                        { type: '中标通知书', name: '中标通知书_浪潮信息.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-005', fileType: 'pdf', size: 192000, ts: '2026-07-18 17:30', user: '王磊' },
                        { type: '中标结果公告', name: '中标结果公告_IT标段3.docx', comp: '文件管理组件', fileId: 'F-2026-0718-006', fileType: 'docx', size: 105000, ts: '2026-07-18 17:45', user: '王磊' },
                        { type: '评标报告', name: '评标报告_IT设备.pdf', comp: '文件管理组件', fileId: 'F-2026-0717-001', fileType: 'pdf', size: 486000, ts: '2026-07-17 11:00', user: '王磊' }
                    ]
                }
            },
            // ===== 步骤6：中标结果公示 (award-announce) =====
            6: {
                form: {
                    approvalStatus: '审批中',
                    applyCode: 'ZB-2026-003',
                    unit: '集团总部',
                    resultNote: '评标委员会已完成全部评审工作，根据综合评分法推荐中标候选人。经定标委员会审议通过，现对中标结果进行公示，公示期 3 个工作日。'
                },
                sections: [
                    { id: 'BD-001', planCode: 'PL-2026-0002', lineNo: 1, target: '主合同', awardCode: 'DB-2026-003-1', purchaseName: '集团年度物业服务 - 物业服务', sectionNo: '1', limitAmount: 1865000, winAmount: 1820000, supplierCode: 'GYS-001', supplierName: '北京金牌物业服务有限公司', winDate: '2026-07-20', otherSuppliers: [{ code: 'GYS-002', name: '上海信诚物业有限公司' }, { code: 'GYS-003', name: '广州华泰物业服务有限公司' }] },
                    { id: 'BD-002', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-1', purchaseName: '办公设备集中采购 - 服务器采购', sectionNo: '1', limitAmount: 452000, winAmount: 438000, supplierCode: 'GYS-010', supplierName: '上海华讯网络系统有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-011', name: '北京神州数码有限公司' }, { code: 'GYS-012', name: '深圳华为技术有限公司' }] },
                    { id: 'BD-003', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-2', purchaseName: '办公设备集中采购 - 网络设备采购', sectionNo: '2', limitAmount: 452000, winAmount: 445000, supplierCode: 'GYS-015', supplierName: '杭州海康威视数字技术股份有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-016', name: '浙江大华技术股份有限公司' }] },
                    { id: 'BD-004', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-3', purchaseName: '办公设备集中采购 - 存储设备采购', sectionNo: '3', limitAmount: 452000, winAmount: 432000, supplierCode: 'GYS-018', supplierName: '北京浪潮电子信息产业有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-019', name: '联想（北京）信息技术有限公司' }, { code: 'GYS-020', name: '中科曙光信息产业股份有限公司' }] },
                    { id: 'BD-005', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-4', purchaseName: '办公设备集中采购 - 安全设备采购', sectionNo: '4', limitAmount: 452000, winAmount: 428000, supplierCode: 'GYS-022', supplierName: '新华三技术有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-023', name: '锐捷网络股份有限公司' }] }
                ],
                attachments: {
                    'BD-001': [
                        { type: '中标通知书', name: '中标通知书_金牌物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0720-001', fileType: 'pdf', size: 245760, ts: '2026-07-20 14:30', user: '李经理' },
                        { type: '中标结果公告', name: '中标结果公告_物业.docx', comp: '文件管理组件', fileId: 'F-2026-0720-002', fileType: 'docx', size: 128000, ts: '2026-07-20 15:10', user: '李经理' },
                        { type: '评标报告', name: '评标报告_物业.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 512000, ts: '2026-07-18 10:00', user: '张明' }
                    ],
                    'BD-002': [
                        { type: '中标通知书', name: '中标通知书_华讯网络.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-001', fileType: 'pdf', size: 198000, ts: '2026-07-18 16:00', user: '王磊' },
                        { type: '中标结果公告', name: '中标结果公告_IT标段1.docx', comp: '文件管理组件', fileId: 'F-2026-0718-002', fileType: 'docx', size: 112000, ts: '2026-07-18 16:30', user: '王磊' }
                    ],
                    'BD-003': [
                        { type: '中标通知书', name: '中标通知书_海康威视.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-003', fileType: 'pdf', size: 205000, ts: '2026-07-18 17:00', user: '王磊' },
                        { type: '中标结果公告', name: '中标结果公告_IT标段2.docx', comp: '文件管理组件', fileId: 'F-2026-0718-004', fileType: 'docx', size: 108000, ts: '2026-07-18 17:15', user: '王磊' }
                    ],
                    'BD-004': [
                        { type: '中标通知书', name: '中标通知书_浪潮信息.pdf', comp: '文件管理组件', fileId: 'F-2026-0718-005', fileType: 'pdf', size: 192000, ts: '2026-07-18 17:30', user: '王磊' },
                        { type: '中标结果公告', name: '中标结果公告_IT标段3.docx', comp: '文件管理组件', fileId: 'F-2026-0718-006', fileType: 'docx', size: 105000, ts: '2026-07-18 17:45', user: '王磊' },
                        { type: '评标报告', name: '评标报告_IT设备.pdf', comp: '文件管理组件', fileId: 'F-2026-0717-001', fileType: 'pdf', size: 486000, ts: '2026-07-17 11:00', user: '王磊' }
                    ]
                }
            }
        }
    }
};