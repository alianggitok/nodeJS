:: �����������ڵ������ʾ����Ļ��
@echo off

:: cmd��������
title mongodb installation

:: ��ʾ��ǰ����
date/t

D:\MongoDB\Server\3.2\bin\mongod --config F:\code\mine\github\nodeJS\simple_site\mongodb.cfg --install --serviceName "MongoDB"

:: ��ͣ
pause
