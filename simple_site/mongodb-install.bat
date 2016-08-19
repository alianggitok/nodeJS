:: 包括本行在内的命令不显示在屏幕上
@echo off

:: cmd窗体标题
title mongodb launcher

:: 显示当前日期
date/t

D:\MongoDB\Server\3.2\bin\mongod --config F:\code\mine\github\nodeJS\simple_site\mongodb.cfg --install --serviceName "MongoDB"

:: 暂停
pause
