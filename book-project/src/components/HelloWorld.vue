<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="htmlStatement">测试按钮</el-button>
  </div>
</template>

<script>
import { statement, htmlStatement } from '@/code/statement'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    test() {
      console.log('dalong')
    },
    statement,
    htmlStatement
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
