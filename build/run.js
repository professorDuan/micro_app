const path = require('path')
//创建子进程的包
const childProcess = require('child_process')

//定义好要执行的文件目录
const files = {
    vue: path.join(__dirname,'../vue'),
    react: path.join(__dirname,'../react'),
    service: path.join(__dirname,'../service'),
    base: path.join(__dirname,'../base')
};

//遍历文件目录依次执行
(function () {
    Object.values(files).forEach(value => childProcess.spawn(`cd ${value} && npm start`, {stdio: 'inherit', shell: true}))
})()