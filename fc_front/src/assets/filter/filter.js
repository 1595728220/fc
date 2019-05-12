/**
 * 产品分类中的英文转为中文
 */
const fanyi = english=>{
    if(english === "color") return "颜色"
    if(english === "thickness") return "种水"
    if(english === "classify") return "分类"
    if(english === "style") return "样式"
}
export{
    fanyi
}