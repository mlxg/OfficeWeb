#!/bin/bash

echo "删除原有文件"

rm -f ./dist/PC/index.html
rm -rf ./dist/PC/static

echo "成功删除文件"
echo "开始重新构建"

npm run build

echo "构建完毕"

echo "复制网站logo"
cp ./app/PC/images/favicon.ico ./dist/PC/
echo "复制完成"

echo "复制打印页面"
cp ./app/PC/newStaffLetter.html ./dist/PC
echo "复制完成"

echo "复制人事异动页面"
cp ./app/PC/hrChangeConfirm.html ./dist/PC
echo "复制完成"

echo "复制借款打印页面"
cp ./app/PC/loan.html ./dist/PC
echo "复制完成"

echo "复制报销打印页面"
cp ./app/PC/remburse.html ./dist/PC
echo "复制完成"

echo "复制下载"
cp ./app/PC/download.html ./dist/PC
echo "复制完成"

echo "复制报销（申请）打印页面"
cp ./app/PC/rembursetwo.html ./dist/PC
echo "复制完成"

echo "复制借款（申请）打印页面"
cp ./app/PC/loantwo.html ./dist/PC
echo "复制完成"

cp ./app/PC/images/logo_star.png ./dist/PC/
cp ./app/PC/images/logo_robot.png ./dist/PC/
cp ./app/PC/images/guide.png ./dist/PC/
