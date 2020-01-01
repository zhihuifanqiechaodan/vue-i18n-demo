# vue-i18n-demo

## 前提基础
* 对vue.js、vuex等有基本的了解
* element国际化配置

## 安装依赖
```
npm i -S element-ui vue-i18n js-cookie
```
安装js-cookie是为了将当前选择的语言保存并在下一次打开时默认选择。

## 代码分析

详细请看目录文件

* 准备本地的翻译信息，在src下新建lang文件夹，新建文件zh.js，en.js。 
```
zh.js
const ZH = {
    header: {
        message: '这是公共的头部组件'
    },
    footer: {
        message: '这是公共的底部组件'
    }
}

export default ZH

en.js
const EN = {
    header: {
        message: 'this is a common header component'
    },
    footer: {
        message: 'this is a common footer component'
    }
}

export default EN
```
* 创建VueI18n实例，使用创建的翻译信息，在lang文件下新建index.js文件
```
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import { getToken } from '../utils/cookies'
Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale
    },
    zh: {
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale: getToken('lang') || 'zh',
    messages
})
export default i18n
```
* 在 main.js 中引入 vue-i18n，并挂在在vue实例中。
```
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n, // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  components: { App },
  template: '<App/>'
})
```
* 开始使用，在App.vue页面中通过$t()方法使用。
```
<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <div>
      <h1>vue-i18n国际化Demo</h1>
    </div>
    <div style="margin-bottom:20px">
      <el-select v-model="languageName" placeholder="请选择语言" @change="changeLanguage">
        <el-option
          v-for="item in languageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div>{{$t('header.message')}}</div>
    <div>{{$t('footer.message')}}</div>
    <router-view />
  </div>
</template>
```
## 代码优化
* 在页面中加入切换语言的控件
```
<el-select v-model="languageName" placeholder="请选择语言" @change="changeLanguage">
  <el-option
    v-for="item in languageOptions"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  ></el-option>
</el-select>
```
* 加入一个选择语言的下拉框，修改locale的值为选择的语言。
```
changeLanguage (language) {
  this.$i18n.locale = language
}
```
* 刷新页面之后初始化，将还原为默认值。
```
将language信息保存在cookie（之前已经安装了js-cookie）。初始化从cookie中获取。

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', 
  messages
})

切换语言时候保存到Cookies

Cookies.set('language', language)
```
* 切换语言的控件没有变。
```
languageOptions () {
  let languageOptions
  if (this.$store.state.language === 'zh') {
    languageOptions = [
      {
        value: 'zh',
        label: '中文'
      },
      {
        value: 'en',
        label: '英文'
      }
    ]
  } else {
    languageOptions = [
      {
        value: 'zh',
        label: 'Chinese'
      },
      {
        value: 'en',
        label: 'English'
      }
    ]
  }
  return languageOptions
}
```
* 如果使用了element-ui，element组件无法实现多语言的页面。这里还涉及到手动处理 vue-i18n@6.x 兼容性问题，官网已经做了详细介绍。