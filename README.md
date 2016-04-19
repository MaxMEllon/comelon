<p align="center">
  <img src="./assets/img/banner.png">
</p>

- - -

[![npm](https://img.shields.io/npm/v/comelon.svg)](https://www.npmjs.com/package/comelon)
[![npm](https://img.shields.io/npm/dt/comelon.svg)]()
[![Test Coverage](https://codeclimate.com/github/MaxMEllon/comelon/badges/coverage.svg)](https://codeclimate.com/github/MaxMEllon/comelon/coverage)
[![Code Climate](https://codeclimate.com/github/MaxMEllon/comelon/badges/gpa.svg)](https://codeclimate.com/github/MaxMEllon/comelon)
[![Issue Count](https://codeclimate.com/github/MaxMEllon/comelon/badges/issue_count.svg)](https://codeclimate.com/github/MaxMEllon/comelon)
[![Dependency Status](https://david-dm.org/maxmellon/comelon.svg)](https://david-dm.org/maxmellon/comelon)
[![devDependency Status](https://david-dm.org/maxmellon/comelon/dev-status.svg)](https://david-dm.org/maxmellon/comelon#info=devDependencies)
[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/MaxMEllon/comelon/blob/master/LICENSE.txt)
[![Stories in Ready](https://badge.waffle.io/MaxMEllon/comelon.svg?label=ready&title=Ready)](http://waffle.io/MaxMEllon/comelon)
[![Gitter](https://badges.gitter.im/MaxMEllon/comelon.svg)](https://gitter.im/MaxMEllon/comelon?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
<!-- [![Dependency Status](https://gemnasium.com/MaxMEllon/comelon.svg)](https://gemnasium.com/MaxMEllon/comelon) -->
<!-- [![windows](https://ci.appveyor.com/api/projects/status/5i4gddsvsd1i2ba3?svg=true)](https://ci.appveyor.com/project/MaxMEllon/comelon) -->

- - -

| type | status  |
|---|---|
|TravisCI| [![](https://travis-ci.org/MaxMEllon/comelon.svg?branch=master)](https://travis-ci.org/MaxMEllon/comelon) |
|CircleCI| [![](https://img.shields.io/circleci/project/MaxMEllon/comelon.svg)](https://circleci.com/gh/MaxMEllon/comelon) |
|Appveyor| [![](https://ci.appveyor.com/api/projects/status/sojo2v2cxwx15f7v?svg=true)](https://ci.appveyor.com/project/MaxMEllon/comelon) |

## Screenshots

<p align="center">
  <img src="./logs/screenshots/demo.gif">
</p>

## Installation

Quick start for developers.

  ```sh
  $ npm install -g electron-prebuild
  $ npm install -g comelon

  $ comelon # running comelon
  ```

If you cannot run `npm` command.
Then, you are able to download `github release`
[v0.2.3 binary](https://github.com/MaxMEllon/comelon/releases/tag/v0.2.3)

## For development

  ```sh
  $ git clone https://github.com/MaxMEllon/comelon.git && cd comelon
  $ npm i
  $ npm run compile
  $ node_modules/.bin/electron .
  ```

If you would like to watching the source code, then You should execute `npm run start`.

When you run unit test, you need to set enviorment value.
For example as follows.

  ```
  $ export USER_EMAIL=sample@hoge.com
  $ export PASSWORD=XXXXXXXXXXXX
  $ npm run test
  ```

e2e test like when unit test to run, you need to set value.

## Contribute

Everything okay.

がんがんいこうぜ（小さなプルリクエストからなんでも待ってます）

## Download Binary

  - [comelon/releases](https://github.com/MaxMEllon/comelon/releases)

## Todo

[TODO](./TODO.md)

