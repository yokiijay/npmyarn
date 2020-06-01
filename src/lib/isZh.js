module.exports = (()=>{
  String.prototype.zh = val=>{
    if(process.env.LANG.includes('zh_CN')) return val
    return this
  }

  return process.env.LANG.includes('zh_CN')
})()