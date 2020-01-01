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

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState(["language"]),
    languageOptions() {
      let languageOptions = null;
      if (this.language === "zh") {
        languageOptions = [
          { label: "中文", value: "zh" },
          { label: "英文", value: "en" }
        ];
      } else {
        languageOptions = [
          { label: "Chinese", value: "zh" },
          { label: "English", value: "en" }
        ];
      }
      return languageOptions;
    },
    languageName: {
      get() {
        return this.language;
      },
      set(newValue) {
        this.$store.state.language = newValue;
      }
    }
  },
  methods: {
    ...mapMutations(["changeStoreLanguage"]),
    changeLanguage(language) {
      this.changeStoreLanguage(language);
      this.$i18n.locale = language;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
