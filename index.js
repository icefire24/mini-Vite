const fs = require("fs");
const path=require('path')
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  //   ctx.body = "hello world";
    let {url,query}=ctx.request
  // /=>index.html
  if (url == "/") {
    ctx.type = "text/html";
    let content = fs.readFileSync("./index.html",'utf-8');
    ctx.body=content
  } else if(url.endsWith('.js')) {
      ctx.type='application/javascript'
      let target = path.join(__dirname, url.slice(1))
      let content = fs.readFileSync(target,'utf-8');
      ctx.body = content;
  }
  // *.js=>js
    
});
app.listen(3000, () => {
  console.log("vite start on 3000");
});
