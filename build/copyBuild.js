var path = require('path')
var { spawn } = require('child_process')
var fs = require('fs')
var chalk = require('chalk')
var myConfig = require ('../.localConfig.js')
var params = process.argv.splice(2)[0]
class copyBuild {
  constructor () {
	this.time = this.countTime()
	this.src = path.resolve(__dirname, '../dist')
	this.dst = params ? `${myConfig.testPath}/${params}` : `${myConfig.testPath}/update_${myConfig.fileName}_${myConfig.name}_${this.time}`
	this.builPath = `${this.dst}/${myConfig.fileName}`
  }
  init () {
	this.deleteFolder(this.dst)
	let pathList = params ? `${params}/${myConfig.fileName}` : `update_${myConfig.fileName}_${myConfig.name}_${this.time}/${myConfig.fileName}`
	let path = `${myConfig.testPath}`
	pathList.split('/').forEach(item => {
		path += `/${item}`
	  if (!fs.existsSync(path)) {
	   	fs.mkdirSync(path)
	  }
	})
	this.copyFolder(this.src, this.builPath)
	console.log(chalk.cyan(
		'  copy dist to test success \n' +
		'  fileName: ' + this.dst
	))
	this.openFiles()
  }
  countTime () {
    let date = new Date()
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	let d = date.getDate();
	m = m < 10 ? `0${m}` : m;
	d = d < 10 ? `0${d}` : d;
	return `${y}${m}${d}`;
  }
  deleteFolder (path) {
	var files = [];
	if (fs.existsSync(path)) {
	  if (fs.statSync(path).isDirectory()) {
		files = fs.readdirSync(path);

		files.forEach((file, index) => {
		  var curPath = path + "/" + file;
		  if (fs.statSync(curPath).isDirectory()) {
			this.deleteFolder(curPath);
		  } else {
			fs.unlinkSync(curPath);
		  }
		});
		fs.rmdirSync(path);
	  } else {
		fs.unlinkSync(path);
	  }
	}
  }
  copyFolder (from, to) {        // 复制文件夹到指定目录
	let files = [];
	if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
	  files = fs.readdirSync(from);
		files.forEach((file, index) => {
		  var targetPath = from + "/" + file;
		  var toPath = to + '/' + file;
		  if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
			this.copyFolder(targetPath, toPath);
		  } else {                                    // 拷贝文件
			fs.copyFileSync(targetPath, toPath);
		  }
		});
	} else {
	  fs.mkdirSync(to);
	  this.copyFolder(from, to);
	}
  }
  openFiles () {
	spawn('explorer.exe', [path.resolve(__dirname, '../dist')])
	spawn('explorer.exe', [path.resolve(this.dst)])
  }
}

new copyBuild().init()
// module.exports = new copyBuild()



