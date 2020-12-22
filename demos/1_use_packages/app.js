/*
1. Using the command "npm init --yes" to create the "package.json" file in the specific folder ()
2. Find the target/used package, for example "https://www.npmjs.com/package/md5"
3. Install it by the command "npm install md5@2.3.0 --save"
4. Using it und read its document: var md5 = require('md5'); console.log(md5('123456'));
5. Using the command "npm i" to automatic install all the target/used packages, if the packages are not present.
6. 指定安装包的特定版本 => npm install node-media-server@2.1.0 --save
 */

 var md5 = require('md5');
 console.log(md5("123456"));

 var sd = require('silly-datetime');
console.log(sd.format(new Date(), 'YYYY-MM-DD HH:mm'));