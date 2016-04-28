:: 包括本行在内的命令一并不显示在屏幕
@echo off

:: cmd窗体标题
title node somthing

:: 显示当前日期
date/t

node "package\main.js"

:: 暂停
pause
