import moment from 'moment';
//级联多选选项
export const checkPhone = (rule, value, callback) => {

    if (value) {
        if ((!(value.match(/^1(3|4|5|7|8)\d{9}$/))) && (!(value.match(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/)))) {
            callback([new Error('请输入正确的手机号码！')]);
        } else {
            callback();
        }
    } else {
        callback();
    }
};

export const checkMail = (rule, value, callback) => {
    let pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (pattern.test(value))
        callback([new Error('请输入正确的电子邮箱！')]);
    else
        callback();
};

export const checkTime = (rule, value, callback) => {
    let pattern = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/;
    if (pattern.test(value))
        callback([new Error('请输入正确的电子邮箱！')]);
    else
        callback();
};

export const layout8 = {
    col: 8,
    itemlayout: {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 15
        },
    }
};

export const layout12 = {
    col: 12,
    itemlayout: {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 18
        },
    }
};

export const layout24 = {
    col: 24,
    itemlayout: {
        labelCol: {
            span: 2
        },
        wrapperCol: {
            span: 21
        },
    }
};
const caoptions = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
            code: 752100,
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            code: 453400,
        }],
    }],
}];
export const formItems2 = [{
    id: 'aa',
    label: '服务编码',
    rules: [{ required: true, message: '请输入服务编码!' }],
    type: 'input',
    initialValue: '',
    layout: layout12
}, {
    id: 'bb',
    label: '服务名称',
    rules: [{ required: true, message: '请输入服务名称!' }],
    type: 'input',
    initialValue: null,
    layout: layout12
}, {
    id: 'cc',
    label: '分类',
    rules: [{ required: true, message: '请选择分类!' }],
    type: 'select',
    initialValue: null, //多选初始值为数组
    selects: { multiple: false, options: ["选项一", "选项二"] },
    layout: layout12
}, ];
export const formItems = [{
        id: 'serviceCode',
        label: '服务编码',
        rules: [{ required: true, message: '请输入服务编码!' }],
        type: 'input',
        initialValue: '',
        layout: layout12
    }, {
        id: 'userName',
        label: '服务名称',
        rules: [{ required: true, message: '请输入服务名称!' }],
        type: 'input',
        initialValue: null,
        layout: layout12
    }, {
        id: 'classCode',
        label: '分类',
        rules: [{ required: true, message: '请选择分类!' }],
        type: 'select',
        initialValue: null, //多选初始值为数组
        selects: { multiple: false, options: ["选项一", "选项二"] },
        layout: layout12
    }, {
        id: 'checkbox',
        label: '是否明星产品',
        rules: [{ required: false, message: '请选择是否明星产品' }],
        type: 'checkbox',
        initialValue: [], //datapicker类型为moment
        selects: { multiple: false, options: ["是"] },
        layout: layout12
    }, {
        id: 'professCode',
        label: '行业',
        rules: [{ required: true, message: '请选择行业!' }],
        type: 'select',
        initialValue: null,
        selects: { multiple: false, options: ["选项一", "选项二"] },
        layout: layout12
    }, {
        id: 'serviceDeptCode',
        label: '服务部门',
        rules: [{ required: true, message: '请选择服务部门!' }],
        type: 'select',
        initialValue: null, //多选初始值为数组
        selects: { multiple: true, options: ["选项一", "选项二"] },
        layout: layout12
    }, {
        id: 'linkMan',
        label: '对外联系人',
        rules: [{ required: true, message: '请输入对外联系人!' }],
        type: 'input',
        initialValue: null,
        selects: {},
        layout: layout12
    }, {
        id: 'phone',
        label: '联系人电话',
        rules: [{ required: true, message: '请输入手机号码!', }, { validator: checkPhone, message: '手机号码有误!' }],
        type: 'input',
        initialValue: null,
        layout: layout12

    }, {
        id: 'mailBox',
        label: '联系人邮箱',
        rules: [{ required: true, message: '请输入邮箱！' }, { type: 'email', message: '邮箱格式不正确！' }],
        type: 'input',
        initialValue: null,
        layout: layout12
    }, {
        id: 'address',
        label: '联系地址',
        rules: [{ required: false, message: '请输入对外联系地址!' }],
        type: 'input',
        initialValue: null,
        selects: {},
        layout: layout12
    }, {
        id: 'submitPerson',
        label: '提交人',
        rules: [{ required: true, message: '请输入提交人!' }],
        type: 'input',
        initialValue: null,
        selects: {},
        layout: layout12
    }, {
        id: 'submitTime',
        label: '提交时间',
        rules: [{ required: false, message: '' }],
        type: 'datepicker',
        initialValue: moment(new Date()),
        selects: {},
        layout: layout12
    }, {
        id: 'innerApprovePerson',
        label: '内部审核人',
        rules: [{ required: false, message: '请输入审核人!' }],
        type: 'input',
        initialValue: null,
        selects: {},
        disabled: true,
        layout: layout12
    }, {
        id: 'innerApproveTime',
        label: '内部审核时间',
        rules: [{ required: false, message: '' }],
        type: 'datepicker',
        placeholder: "尚未提交",
        initialValue: null, //moment(new Date()),
        selects: {},
        disabled: true,
        layout: layout12
    }, {
        id: 'innerApproveOpinion',
        label: '内部审核意见',
        rules: [{ required: false, message: '请输入审核意见!' }],
        type: 'textarea',
        initialValue: null,
        selects: {},
        disabled: true,
        layout: layout24
    }, {
        id: 'businessApprovePerson',
        label: '运营审核人',
        rules: [{ required: false, message: '请输入提交人!' }],
        type: 'input',
        initialValue: null,
        selects: {},
        disabled: true,
        layout: layout12
    }, {
        id: 'businessApproveTime',
        label: '运营审核时间',
        rules: [{ required: false, message: '' }],
        type: 'datepicker',
        initialValue: null, //moment(new Date())
        placeholder: "尚未提交",
        selects: {},
        disabled: true,
        layout: layout12
    }, {
        id: 'businessApproveOpinion',
        label: '运营审核意见',
        rules: [{ required: false, message: '请输入提交人!' }],
        type: 'textarea',
        initialValue: "",
        selects: {},
        disabled: true,
        layout: layout24
    }, {
        id: 'goodsStatus',
        label: '上架状态',
        disabled: false,
        placeholder: "Select a person",
        rules: [{ required: false, message: '上架状态!' }],
        type: 'select',
        initialValue: null, //多选初始值为数组[""]
        selects: { multiple: false, options: ["选项一", "选项二"] },
        layout: layout12
    }, {
        id: 'status',
        label: '状态',
        placeholder: "请选择",
        rules: [{ required: false, message: '状态!' }],
        type: 'select',
        disabled: false,
        // initialValue: [""], //多选初始值为数组
        selects: { multiple: false, options: ["选项一", "选项二"] },
        layout: layout12
    },
    //  {
    //     id: 'selects',
    //     label: '分类',
    //     rules: [{ required: true, message: '请选择分类!' }],
    //     type: 'select',
    //     initialValue: [""], //多选初始值为数组
    //     selects: { multiple: false, options: ["选项一", "选项二"] },
    //     layout: layout3
    // }, {
    //     id: 'datepicker',
    //     label: '日期选择',
    //     rules: [{}],
    //     type: 'datepicker',
    //     initialValue: moment("2017-02-25"), //datapicker类型为moment
    //     selects: {},
    //     layout: layout3
    // }, {
    //     id: 'cascader',
    //     label: '级联选择',
    //     rules: [{}],
    //     type: 'cascader',
    //     initialValue: ['zhejiang', 'hangzhou', 'xihu'], //datapicker类型为moment
    //     selects: { multiple: false, options: caoptions },
    //     layout: layout2

    // }, {
    //     id: 'rangedate',
    //     label: '时间区间',
    //     rules: [{}],
    //     type: 'rangedate',
    //     initialValue: [moment("2017-02-25"), moment("2017-03-02")],
    //     layout: layout2
    // }, {
    //     id: 'monthpicker',
    //     label: '选择月份',
    //     rules: [{}],
    //     type: 'monthpicker',
    //     initialValue: moment("2017-02-25"), //datapicker类型为moment
    //     layout: layout3
    // }, {
    //     id: 'checkbox',
    //     label: '多选',
    //     rules: [{}],
    //     type: 'checkbox',
    //     initialValue: ["a"], //datapicker类型为moment
    //     selects: { multiple: true, options: ["a", "b", "c"] },
    //     layout: layout3
    // }, 
]
