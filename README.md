<p align="center">
  <img src="./assets/img/banner.png">

<table>
  <tr>
    <th colspan="3">Badges</th>
  </tr>
  <tr>
    <td>
      <a href='https://www.npmjs.com/package/comelon'>
        <img src='https://img.shields.io/npm/v/comelon.svg'>
      </a>
    </td>
    <td>
      <img src='https://img.shields.io/npm/dt/comelon.svg'>
      </img>
    </td>
    <td>
      <a href='https://gitter.im/MaxMEllon/comelon?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge'>
        <img src='https://badges.gitter.im/MaxMEllon/comelon.svg'> </img>
      </a>
    </td>
  </tr>
  <tr>
    <td>
      <a href='https://travis-ci.org/MaxMEllon/comelon' />
        <img src='https://travis-ci.org/MaxMEllon/comelon.svg?branch=master' />
      </a>
    </td>
    <td>
      <a href='https://circleci.com/gh/MaxMEllon/comelon' />
        <img src='https://img.shields.io/circleci/project/MaxMEllon/comelon.svg' />
      </a>
    </td>
    <td>
      <a href='https://ci.appveyor.com/api/projects/status/sojo2v2cxwx15f7v?svg=true' />
        <img src='https://ci.appveyor.com/api/projects/status/sojo2v2cxwx15f7v?svg=true' />
      </a>
    </td>
  </tr>
  <tr>
    <td>
      <a href='https://codeclimate.com/github/MaxMEllon/comelon/coverage' />
        <img src='https://codeclimate.com/github/MaxMEllon/comelon/badges/coverage.svg' />
      </a>
    </td>
    <td>
      <a href='https://codeclimate.com/github/MaxMEllon/comelon' />
        <img src='https://codeclimate.com/github/MaxMEllon/comelon/badges/gpa.svg' />
      </a>
    </td>
    <td>
      <a href='https://codeclimate.com/github/MaxMEllon/comelon' />
        <img src='https://codeclimate.com/github/MaxMEllon/comelon/badges/issue_count.svg' />
      </a>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <a href='https://david-dm.org/maxmellon/comelon' />
        <img src='https://david-dm.org/maxmellon/comelon.svg' />
      </a>
    </td>
    <td colspan="2">
      <a href='https://david-dm.org/maxmellon/comelon#info=devDependencies' />
        <img src='https://david-dm.org/maxmellon/comelon/dev-status.svg' />
      </a>
    </td>
  </tr>
</table>

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

