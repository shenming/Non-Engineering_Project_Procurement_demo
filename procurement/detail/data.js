/**
 * 招采过程 - 详情模式原型数据
 * 按采购方式分组，供 detail/index.html 和各节点读取
 */

var DETAIL_DATA = {
    '公开招标': {
        // 顶部基础信息
        info: {
            projectName: '集团年度物业服务',
            applyCode: 'ZB-2026-003',
            unit: '集团总部',
            status: '进行中',
            statusTag: 'tag-yellow',
            approvalStatus: '审批通过'
        },
        // 标段明细
        sections: [
            { id: 'BD-001', planCode: 'PL-2026-0002', lineNo: 1, target: '主合同', awardCode: 'DB-2026-003-1', purchaseName: '集团年度物业服务 - 物业服务', sectionNo: '1', limitAmount: 1865000, winAmount: 1820000, supplierCode: 'GYS-001', supplierName: '北京金牌物业服务有限公司', winDate: '2026-07-20', otherSuppliers: [{ code: 'GYS-002', name: '上海信诚物业有限公司' }, { code: 'GYS-003', name: '广州华泰物业服务有限公司' }] },
            { id: 'BD-002', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-1', purchaseName: '办公设备集中采购 - 服务器采购', sectionNo: '1', limitAmount: 452000, winAmount: 438000, supplierCode: 'GYS-010', supplierName: '上海华讯网络系统有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-011', name: '北京神州数码有限公司' }, { code: 'GYS-012', name: '深圳华为技术有限公司' }] },
            { id: 'BD-003', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-2', purchaseName: '办公设备集中采购 - 网络设备采购', sectionNo: '2', limitAmount: 452000, winAmount: 445000, supplierCode: 'GYS-015', supplierName: '杭州海康威视数字技术股份有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-016', name: '浙江大华技术股份有限公司' }] },
            { id: 'BD-004', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-3', purchaseName: '办公设备集中采购 - 存储设备采购', sectionNo: '3', limitAmount: 452000, winAmount: 432000, supplierCode: 'GYS-018', supplierName: '北京浪潮电子信息产业有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-019', name: '联想（北京）信息技术有限公司' }, { code: 'GYS-020', name: '中科曙光信息产业股份有限公司' }] },
            { id: 'BD-005', planCode: 'PL-2026-0010', lineNo: 1, target: '主合同', awardCode: 'DB-2026-005-4', purchaseName: '办公设备集中采购 - 安全设备采购', sectionNo: '4', limitAmount: 452000, winAmount: 428000, supplierCode: 'GYS-022', supplierName: '新华三技术有限公司', winDate: '2026-07-18', otherSuppliers: [{ code: 'GYS-023', name: '锐捷网络股份有限公司' }] }
        ],
        // 附件数据按标段索引
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
};