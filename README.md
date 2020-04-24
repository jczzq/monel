# [monel](https://github.com/jczzq/monel)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jczzq/monel/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/jczzq/monel.svg?branch=master)](https://travis-ci.org/jczzq/monel)
[![Coveralls](https://img.shields.io/coveralls/jczzq/monel.svg)](https://coveralls.io/github/jczzq/monel)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/monel)
[![NPM downloads](http://img.shields.io/npm/dm/monel.svg?style=flat-square)](http://www.npmtrends.com/monel)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/jczzq/monel.svg)](http://isitmaintained.com/project/jczzq/monel "Percentage of issues still open")

## :open_file_folder: 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## 使用指南

通过npm下载安装代码

```bash
$ npm install --save monel
```

node环境

```js
var base = require('monel');
```

webpack等环境

```js
import base from 'monel';
```

requirejs环境

```js
requirejs(['node_modules/monel/dist/index.umd.js'], function (base) {
    // xxx
})
```

浏览器环境

```html
<script src="node_modules/monel/dist/index.umd.js"></script>
```

## API 文档
[API](./doc/api.md)


> 注意：浏览器环境需要手动测试，位于`test/browser`

修改 package.json 中的版本号，修改 README.md 中的版本号，修改 CHANGELOG.md，然后发布新版

