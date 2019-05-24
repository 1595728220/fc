/**
 * 产品分类中的英文转为中文
 */
const fanyi = english=>{
    if(english === "color") return "颜色"
    if(english === "thickness") return "种水"
    if(english === "classify") return "分类"
    if(english === "style") return "样式"
    if(english === "phone") return "手机号"
    if(english === "addr") return "联系地址"
    if(english === "userName") return "姓名"
    if(english === "nick") return "昵称"
    if(english === "img_addr") return "头像"
    
}
export{
    fanyi
}