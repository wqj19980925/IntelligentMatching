import request from '@/utils/request'
// 溯源管理--列表
export function fetchList(data) {
  return request({
    url: '/api/formwork/indexformwork',
    method: 'post',
    data
  })
}
// 溯源管理--列表-启用
export function openSta(data) {
  return request({
    url: '/api/formwork/startstase',
    method: 'post',
    data
  })
}
// 溯源管理--列表-停用
export function stopSta(data) {
  return request({
    url: '/api/formwork/shopstase',
    method: 'post',
    data
  })
}
// 溯源管理--列表-复制
export function copyform(data) {
  return request({
    url: '/api/formwork/copyform',
    method: 'post',
    data
  })
}
// 溯源管理--列表 --添加
export function addfw(data) {
  return request({
    url: '/Template/addtem',
    method: 'post',
    data
  })
}
// 溯源管理--列表 --添加--上传图片
export function imgUp(data) {
  return request({
    url: '/api/formwork/imageform',
    method: 'post',
    data
  })
}
// 溯源管理--列表 --添加--上传视频
export function videoUp(data) {
  return request({
    http: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    url: '/api/formwork/videoform',
    method: 'post',
    data
  })
}
// 溯源管理--列表 --添加--未提交--删除视频
export function delVideo(data) {
  return request({
    url: '/api/formwork/delvideoform',
    method: 'post',
    data
  })
}
// 溯源管理--列表 --添加--未提交--删除图片
export function delImg(data) {
  return request({
    url: '/api/formwork/delimageform',
    method: 'post',
    data
  })
}
// 溯源管理--列表-编辑
export function editfw(data) {
  return request({
    url: '/api/formwork/editformwork',
    method: 'post',
    data
  })
}
// 溯源管理--列表-编辑-提交
export function subEditfw(data) {
  return request({
    url: '/api/formwork/doeditformwork',
    method: 'post',
    data
  })
}
// 溯源管理--信息维护-页面信息
export function infoMod(data) {
  return request({
    url: '/InfoModify/index',
    method: 'post',
    data
  })
}
// 溯源管理--信息维护-提交
export function modify(data) {
  return request({
    url: '/InfoModify/modify',
    method: 'post',
    data
  })
}

// 模板--列表
export function TemplateList(data) {
  return request({
    url: '/Template/index',
    method: 'post',
    data
  })
}

// 模板--新增
export function Templateaddtem(data) {
  return request({
    url: '/Template/addtem',
    method: 'post',
    data
  })
}

//模板--新增标签获取
export function Templatelabelist(data) {
  return request({
    url: '/api/template/labelist',
    method: 'post',
    data
  })
}

//模板--新增图片上传
export function Templateimageform(data) {
  return request({
    url: '/api/template/imageform',
    method: 'post',
    data
  })
}

//模板--新增视频上传
export function Templatevideoform(data) {
  return request({
    url: '/api/template/videoform',
    method: 'post',
    data
  })
}

// 模板--启用
export function Templateenable(data) {
  return request({
    url: '/Template/enable',
    method: 'post',
    data
  })
}

// 模板--停用
export function Templatedisable(data) {
  return request({
    url: '/Template/disable',
    method: 'post',
    data
  })
}

// 模板--删除
export function Templatedeltem(data) {
  return request({
    url: '/Template/deltem',
    method: 'post',
    data
  })
}

// 模板--复制
export function Templatecopytem(data) {
  return request({
    url: '/Template/copytem',
    method: 'post',
    data
  })
}

// 模板--编辑获取默认数据
export function Templateedittem(data) {
  return request({
    url: '/Template/edittem',
    method: 'post',
    data
  })
}

// 模板--编辑提交
export function Templatedoedittem(data) {
  return request({
    url: '/api/template/doedittem',
    method: 'post',
    data
  })
}

// 模板--编辑提交
export function formworkbelist(data) {
  return request({
    url: '/api/formwork/labelist',
    method: 'post',
    data
  })
}

// 信息列表--新增提交
export function formworkaddformwork(data) {
  return request({
    url: '/api/formwork/addformwork',
    method: 'post',
    data
  })
}

// 信息列表--删除
export function formworkdelform(data) {
  return request({
    url: '/api/formwork/delform',
    method: 'post',
    data
  })
}

// 信息维护--搜索批次号
export function searchtime(data) {
  return request({
    url: '/InfoModify/searchtime',
    method: 'post',
    data
  })
}

// 编辑---溯源信息
export function handleformwork(data) {
  return request({
    url: '/InfoModify/handleformwork',
    method: 'post',
    data
  })
}

// 溯源信息 -- 清除
export function InfoModifyDel(data) {
  return request({
    url: '/InfoModify/del',
    method: 'post',
    data
  })
}

// 溯源信息 -- 图片上传
export function imageformsy(data) {
  return request({
    url: '/InfoModify/imageform',
    method: 'post',
    data
  })
}
