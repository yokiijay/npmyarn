const execa = require('execa')
const signale = require('signale')
const commandExists = require('command-exists')

/**
 * 
 * @param {String} registryURL 镜像地址
 */
const switchResgitry = async (registryURL)=>{
  const setYarn = async()=>{
    const res = await execa('yarn', ['config','set','registry', registryURL])
    signale.success(`yarn registry origin is now: ${registryURL}`)
  }
  const setNpm = async()=>{
    const res = await execa('npm', ['config','set','registry', registryURL])
    signale.success(`npm registry origin is now: ${registryURL}`)
  }

  if(registryURL){
    if(commandExists.sync('yarn')) setYarn()
    if(commandExists.sync('npm')) setNpm()
  }else {
    console.log( 'will support next version, coming soon~' )
  }

}

module.exports = switchResgitry