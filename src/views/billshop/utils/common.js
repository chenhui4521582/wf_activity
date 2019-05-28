/**
 * @description 获取地址栏问号后面的参数值
 * @param {*} ename 
 */
export const getUrlParam = (ename)=> {
    let url = window.location.href
    let Request = new Object()
    if (url.indexOf('?') != -1) {
      let str = url.split('?')[1]
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
          Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
    } else {
      return ''
    }
    let params = Request[ename] ? Request[ename].split('#')[0] : ''
    return params
}
/**
 * @description 埋点
 * @param {*} ename 
 */
// 埋点方法
export const marchSetsPoint = async (event,params)=>{
  await GLOBALS.marchSetsPoint(event, {
    entrance: getUrlParam('from'),
    awards_name:params.awards_name?params.awards_name:'',
    task_id:params.task_id?params.task_id:'',
    residual_phone:params.residual_phone?params.residual_phone:'',
  })
}