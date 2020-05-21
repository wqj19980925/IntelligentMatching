import {
    Message
  } from 'element-ui'

// 只能输入数字的输入框
export function verifynum (val,text) {
    let reg = /^\d+(?=\.{0,1}\d+$|$)/;
    return reg.test(reg)
}
// 判断日期是否在另一个日期之内
export function isDateBetween(dateString, startDateString, endDateString){
    let t1 = new Date(dateString);
    let t2 = new Date(startDateString);
    let t3 = new Date(endDateString);
    if(Date.parse(t1) - Date.parse(t2)<0 || Date.parse(t1) - Date.parse(t3)>0){
        Message.error('选择的日期需要在项目周期之间')
        return '';
    }else{
        return dateString;
    }
};

// 验证手机号
export function verifyPhone(val) {
    var myreg = /^1[3456789]\d{9}$/;
    if(!myreg.test(val)){
        Message.error('请输入有效的手机号')
        return ''
    }else{
        return val
    }
}

// 验证网址
export function verifyURL(val) {
    var myreg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if(!myreg.test(val)){
        Message.error('请输入有效网址链接')
        return ''
    }else{
        return val
    }
}

export function compare(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}

// 验证车牌号
export function check_licensePlate(val) {
	var re=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
	if(val.search(re) == -1) {
        Message.error('请输入有效车牌号')
		return '';
	} else {
		return val;
	}
}

