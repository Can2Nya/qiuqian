//因为Node路由路径和实际文件路径并不一定一致，没有Web容器的原因，这里我们仿照Web路由的实现
var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var request = require("request");

var config = {
  appId: 'wx6f9f274581430c76',
  appSecret: '7fd47bdc3802e189c7bf01de84eed040',
}

const getAccessToken = function () {
  let queryParams = {
    'grant_type': 'client_credential',
    'appid': config.appId,
    'secret': config.appSecret
  };

  let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ queryParams.appid +'&secret=' + queryParams.secret;
  console.log(wxGetAccessTokenBaseUrl);
  let options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        console.log(body);
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  })
};

//保存与更新
const saveToken = function () {
  getAccessToken().then(res => {
    let token = res['access_token'];
    fs.writeFile('./token.txt', token, function (err) {
      console.log('accessToken 保存成功');
    });
  })
};

const refreshToken = function () {
  saveToken();
  setInterval(function () {
    saveToken();
  }, 7000*1000);
}
function start(){
  console.log('获取token中')
  try{
    refreshToken();
  }catch(e){
    console.log(e);
  }
}

start();

// http.createServer(function(req, res) {
//     //得到用户的路径
//     var pathname = url.parse(req.url).pathname;
//     if(pathname == "/") {
//         pathname = "index.html";
//     }
//     //拓展名
//     var extname = path.extname(pathname);
//     // console.log(extname);
//     //真的读取这个文件
//     //缺点，太智能，但是不能检测是什么类型的文件
//     fs.readFile("./" + pathname, function(err, data) {
//       console.log(pathname);
//         //data是一个Buffer，二进制的数据流
//         if(err) {
//             //如果文件不存在，就返回404
//             fs.readFile("./static/404.html", function(err, data) {
//                 res.writeHead(404,{"Content-type":"text/html;chaset=UTF8"});
//                 res.end(data);
//             });
//             return ;//必须这个，不然会走到下个data
//         }
//         //MIME类型，就是
//         //网页文件：text/html
//         //jpg文件：image/jpg
//         var  mime = getMIME(extname)
//         res.writeHead(200,{"Content-type":mime});
//         res.end(data);
//     })
// }).listen(80, "0.0.0.0");
// console.log('listen 80')

// function getMIME(extname) {
//   switch (extname) {
//       case ".html":
//           return "text/html";
//           break;
//       case ".jpg":
//           return "image/jpg";
//           break;
//       case ".png":
//           return "image/png";
//           break;
//       case ".css":
//           return "text/css";
//           break;
//       case ".js":
//           return "application/x-javascript";
//           break;
//       }
      
// }
