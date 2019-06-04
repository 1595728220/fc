/**
 * 产品分类中的英文转为中文
 */
const fanyi = english => {
    if (english === "color") return "颜色"
    if (english === "thickness") return "种水"
    if (english === "classify") return "分类"
    if (english === "style") return "样式"
    if (english === "phone") return "手机号"
    if (english === "addr") return "联系地址"
    if (english === "userName") return "姓名"
    if (english === "nick") return "昵称"
    if (english === "img_addr") return "头像"
}
const money = price => {
    let tmp = price
    //如果是数字
    if (!isNaN(Number(price))) {
        tmp = `￥${tmp.toFixed(2)}`
    }
    return tmp
}
const monthDate = time => {
    let tmp = time
    if (!isNaN(Number(time))) {
        time = new Date(time)
        tmp = `${geshi(time.getMonth() + 1)}月${geshi(time.getDate())}日`
    }
    return tmp
}
//将数字补全为两位
function geshi(n) {
    return n > 9 ? n : "0" + n
}
const toWan = count => {
    let tmp = count
    if (!isNaN(Number(tmp))) {
        if (tmp > 999) {
            tmp = `${(count / 10000).toFixed(1)}万`
        }
    }
    return tmp
}
export {
    fanyi,
    money,
    monthDate,
    toWan,
}