let reg = /\<script\>(.+)\<\/script\>/g;
let str = "<script>nihao</script>";
let demo = "import {createApp,h} from 'vue' createApp('div',null,[h('div',null,'hello world')]).mount('#root')";
// console.log(str.match(reg));
let reg2 = /import(.+)from[\s+]['"]([^"]*)['"]/; //(\s+)('|")(\s+)('|")
let res = demo.replace(reg2, function (res, $1, $2) {
  return "import " + $1 + " from " + `"node_modeles/${$2}"`;
});
console.log(res);
// console.log(vue.match(/["][^"]*["]/));
// console.log("186a619b28".match(/\d+(.+)\d+/));
