'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填.');
  process.exit(0);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const chineseName = process.argv[3] || componentname;
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, '../src/components', componentname);
const Files = [
  // {
//     filename: 'index.js',
//     content: `import ${ComponentName} from './main';

// /* istanbul ignore next */
// ${ComponentName}.install = function(Vue) {
//   Vue.component(${ComponentName}.name, ${ComponentName});
// };

// export default ${ComponentName};`
//   },
//   {
//     filename: 'cooking.conf.js',
//     content: `var cooking = require('cooking');
// var path = require('path');

// cooking.set({
//   entry: {
//     index: path.join(__dirname, 'index.js')
//   },
//   dist: path.join(__dirname, 'lib'),
//   template: false,
//   format: 'umd',
//   moduleName: 'El${ComponentName}',
//   extends: ['vue2'],
//   alias: config.alias,
//   externals: { vue: config.vue }
// });

// module.exports = cooking.resolve();`
//   },
//   {
//     filename: 'package.json',
//     content: `{
//   "name": "el-${componentname}",
//   "version": "0.0.0",
//   "description": "A ${componentname} component for Vue.js.",
//   "keywords": [
//     "element",
//     "vue",
//     "component"
//   ],
//   "main": "./lib/index.js",
//   "repository": "https://github.com/ElemeFE/element/tree/master/packages/${componentname}",
//   "author": "elemefe",
//   "license": "MIT",
//   "dependencies": {}
// }`
//   },
  {
    filename: `${componentname}.vue`,
    content: `<template>
  <div class="el-${componentname}"></div>
</template>

<script>
export default {
  name: 'el-${componentname}'
};
</script>`
  },
  {
    filename: `${componentname}.md`,
    content: `## ${chineseName}`
  },

  // {
  //   filename: path.join('../../examples/docs/en-us', `${componentname}.md`),
  //   content: `## ${componentname}`
  // },
  {
    filename: `../../test/${componentname}.spec.js`,
    content: `import { createTest, destroyVM } from '../util';
import Alert from 'packages/';

describe('', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(, true);
    expect(vm.$el).to.exist;
  });
});
`
  }
];

// 添加到 components.json
// const componentsFile = require('../../components.json');
const componentsFile = require('./components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(0);
}
componentsFile[componentname] = `../src/components/${componentname}/index.js`;
var fp = path.join(__dirname, './components.json');
console.log(fp)
fileSave(fp)
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 创建 package
console.log(PackagePath)
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
  .write(file.content, 'utf8')
  .end('\n');
});

// 添加到 nav.config.json
// const navConfigFile = require('../../examples/nav.config.json');
const navConfigFile = require('./nav.config.json');

Object.keys(navConfigFile).forEach(lang => {
  let groups = navConfigFile[lang][2].groups;
  groups[groups.length - 1].list.push({
    path: `/${componentname}`,
    title: lang === 'zh-CN' && componentname !== chineseName
        ? `${ComponentName} ${chineseName}`
        : ComponentName
  });
});

fileSave(path.join(__dirname, '../../examples/nav.config.json'))
  .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
  .end('\n');

console.log('DONE!');
