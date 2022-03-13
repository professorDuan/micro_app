const path = require('path')
//创建子进程的包
const childProcess = require('child_process')

//定义好要执行的文件目录
const files = {
    vue2: path.join(__dirname,'../vue2'),
    vue3: path.join(__dirname,'../vue3'),
    react: path.join(__dirname,'../react'),
    service: path.join(__dirname,'../service')
};

//遍历文件目录依次执行
(function () {
    Object.values(files).forEach(value => childProcess.spawn(`cd ${value} && npm start`, {stdio: 'inherit', shell: true}))
})()