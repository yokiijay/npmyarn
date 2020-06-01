#!/usr/bin/env node
const yargs = require('yargs')
const prompts = require('prompts')
const isZh = require('../src/lib/isZh')
const {description, name} = require('../package.json')
const { registries } = require('../src/config')
const Configstore = require('configstore')
const execa = require('execa')
const switchRegistry = require('../src/switchRegistry')

const config = new Configstore(name)

const usage = `
Just:
$ yrnpm`.zh(`
只需要输在命令行入:
$ yrnpm`)

yargs
.usage(usage)
.alias('v', 'version')
.alias('h', 'help')
.argv

if(process.argv.length>2) yargs.showHelp()

{(async ()=>{
  const ans = await prompts([
    {
      type: 'select',
      name: 'registry',
      message: 'Select an registry origin to use'.zh('选择要用的镜像'),
      hint: ' ',
      choices: registries.map((item,i)=>config.get('selected')===i ? {...item, title: item.title+' -- current',disabled: i!=5?true:false} : {...item, disabled: false}),
      initial: config.get('selected')
    }
  ], {onCancel(){
    console.clear()
    process.exit()
  }})

  registries.forEach((item,i)=>item.value === ans.registry ? config.set('selected', i) : null)

  switchRegistry(ans.registry)
})()}
