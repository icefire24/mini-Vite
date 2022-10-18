const fs = require("fs");
const path=require('path')
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  //   ctx.body = "hello world";
  let { url, query } = ctx.request
  // /=>index.html
  if (url == "/") {
    ctx.type = "text/html";
    let content = fs.readFileSync("./index.html", 'utf-8');
    ctx.body = content
  } else if (url.endsWith('.js')) {
    // *.js=>js
    ctx.type = 'application/javascript'
    let target = path.join(__dirname, url.slice(1))
    let content = fs.readFileSync(target, 'utf-8');
    ctx.body = rewriteImport(content);
  } else if (url.startsWith("/@node_modules")) {
  console.log(process.env, "22");

    console.log(url);
    ctx.type = "application/javascript";
    let target = path.join(__dirname, "node_modules", url.replace("/@node_modules/", ''));
    let modulePath = require(path.join(target, 'package.json')).module
    let content = fs.readFileSync(path.join(target,modulePath), "utf-8");
    ctx.body = rewriteImport(content);
  }
    
});
function rewriteImport(content) {
  let reg2 = /from[\s+]['"]([^"']*)['"]/g; 
  let res = content.replace(reg2, function (res, $1) {
    if ($1[0]!=='.' && $1[0]!=='/') {
      return  " from " + `"/@node_modules/${$1}"`;
    } else {
      return res
    }
  });
  return res;
}
app.listen(3000, () => {
  console.log("vite start on 3000");
});
