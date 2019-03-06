define("module/common",function(a,b){function c(a,b){a=/^\d+$/.test(a)&&new Date(a)||a;var c=function(a,b){for(var c=0,d=b-(a+"").length;d>c;c++)a="0"+a;return a+""},d=["日","一","二","三","四","五","六"],e=b.replace(/yyyy|YYYY/,a.getFullYear()).replace(/yy|YY/,c(a.getFullYear()%100,2)).replace(/mm|MM/,c(a.getMonth()+1,2)).replace(/m|M/g,a.getMonth()+1).replace(/dd|DD/,c(a.getDate(),2)).replace(/d|D/g,a.getDate()).replace(/hh|HH/,c(a.getHours(),2)).replace(/h|H/g,a.getHours()).replace(/ii|II/,c(a.getMinutes(),2)).replace(/i|I/g,a.getMinutes()).replace(/ss|SS/,c(a.getSeconds(),2)).replace(/s|S/g,a.getSeconds()).replace(/w/g,a.getDay()).replace(/W/g,d[a.getDay()]);return e}function d(a,b,c){window.localStorage||(window.localStorage={});var d={data:b,time:(new Date).getTime(),timeout:c||12e4};localStorage[a]=JSON.stringify(d),"dev"==ENV&&q("\n设置缓存 ["+a+"] = "+localStorage[a]+"\n")}function e(a){window.localStorage||(window.localStorage={});var b=null;try{var c=JSON.parse($.trim(localStorage[a]));if(c){var d=c.time,e=c.timeout,f=(new Date).getTime();e>=f-d&&c.data&&(b=c.data)}}catch(g){}return"dev"==ENV&&b&&q("\n读取缓存 ["+a+"] = "+JSON.stringify(b)+"\n\n"),b}function f(a){a=$.trim(a||""),window.localStorage||(window.localStorage={});var b=[];if("length"in localStorage)for(var c=0,d=localStorage.length;d>c;c++)b.push(localStorage.key(c));else $.each(localStorage,function(a,c){b.push(a)});$.each(b,function(b,c){(""==a||-1!=c.indexOf(a))&&(localStorage[c]="",localStorage.removeItem&&localStorage.removeItem(c))})}function g(a,b){var c="CGI: "+a,d=$.trim($.param(b).split("&").sort().join("&"));return""!=d&&(c=c+"?"+d),c}function h(a,b,c,h,j,k){var l=g(a,c);if(b=(b||"").toLowerCase(),v.showLoading(),"dev2"==ENV&&"get"==b){var m=e(l);if(m)return isFunction(h)&&h(m),void v.closeLoading()}isBoolean(h)?k=h:isBoolean(j)&&(k=j),a=MOCK_CGI?"/js/mockcgi/"+a:PROXY+a,$.ajax({url:a,type:b||"post",data:c||{},dataType:"json",contentType:isString(c)?"application/json;charset=UTF-8":"application/x-www-form-urlencoded",async:!k,cache:!1,error:function(a){v.closeLoading(),v.showNotice("服务繁忙，请稍候重试！"),isFunction(j)&&j.call(this,a)},success:function(a){if(v.closeLoading(),"1"==a.errCode){v.clear();var c=$.trim(i("toHash"));c=c||encodeURIComponent(r());var e="login";return HASH_ENCODE?c&&!/login/.test(n(c))&&(e+="&toHash="+c):c&&!/login/.test(c)&&(e+="&toHash="+c),void s("#"+e)}if(0==a.errCode&&"dev2"==ENV)if("get"==b)d(l,a);else if("post"==b){var g=l.indexOf("/"),j=l.substring(0,g);f(j)}isFunction(h)&&h.call(this,a)}})}function i(a,b){var c="";a=$.trim(a),b=b||window.location.search;var d=new RegExp("\\b"+a+"\\b=([^&=?]+)"),e=b.match(d);if((!e||2!=e.length)&&1==arguments.length){var f=r();l(f)&&(f=n(f)),e=f.match(d)}return e&&2==e.length&&(c=$.trim(e[1])),c}function j(a,b){b=b||"";for(var c=[],d=0,e=a.length;e>d;d++){for(var f=a.charCodeAt(d),g=0,h=b.length;h>g;g++)f^=b.charCodeAt(g);c.push(f)}return escape(String.fromCharCode.apply(null,c))}function k(a,b){b=b||"",a=unescape(a);for(var c=[],d=0,e=a.length;e>d;d++){for(var f=a.charCodeAt(d),g=b.length-1;g>=0;g--)f^=b.charCodeAt(g);c.push(f)}return String.fromCharCode.apply(null,c)}function l(a){a=$.trim(a.replace(/#/g,""));var b=!1,c="kindergarten",d=a.split("&");return 2==d.length&&(b=$.md5($.trim(d[0])+c)===$.trim(d[1])),b}function m(a){a=$.trim(a.replace(/#/g,""));var b="HASH_ENCODE: "+a,c=$.trim(e(b));if(""!=c)return c;var f="",g="kindergarten";return f=encodeURIComponent(j(a,g)),f=f+"&"+$.md5(f+g),d(b,f,864e5),f}function n(a){a=$.trim(a.replace(/#/g,""));var b="HASH_DECODE: "+a,c=$.trim(e(b));if(""!=c)return c;var f="",g="kindergarten";if(l(a)){var h=a.split("&");if(2==h.length){var i=decodeURIComponent($.trim(h[0]));f=k(i,g),d(b,f,864e5)}}return f}function o(a){var b=document.createElement("div");null!=b.textContent?b.textContent=a:b.innerText=a;var c=b.innerHTML;return b=null,c}function p(a){var b=document.createElement("div");b.innerHTML=a;var c=b.innerText||b.textContent;return b=null,c}function q(a){a=isString(a)&&a||isObject(a)&&JSON.stringify(a)||a,window.console&&window.console.log(a)}function r(){var a=window.location.href,b="",c=a.indexOf("#");return-1!=c&&(b=$.trim(a.substr(c))),b}function s(a,b){HASH_ENCODE&&/^#/.test(a)&&!l(a)&&(a="#"+m(a)),b=b||"_self";var c=document.createElement("a");c.click?(c.style.display="none",c.target=b,c.href=a,c.innerHTML="&nbsp;",document.body.appendChild(c),c.click()):(c=document.createElement("form"),c.style.display="none",c.target=b,c.action=a,document.body.appendChild(c),c.submit());try{document.body.removeChild(c)}catch(d){}}function t(){var a=parseInt(history.length)||0;1>=a?s("#"):history.back()}function u(a){if(!isObject(a))return a;a=a||{};var b=parseInt(a.type),c=parseInt(a.resourceId),d=(trim(a.fileName),trim(a.extension)),e=trim(a.url),f="";return e?f=e:1==b&&(f=UPLOAD_IMG_PATH+c+(d?"."+d:"")),f}b.formatDate=c,b.callCGI=h,b.getUrlParam=i,b.encode=j,b.decode=k,b.validHashEncode=l,b.hashEncode=m,b.hashDecode=n,b.htmlEncode=o,b.htmlDecode=p,b.log=q,b.getLocationHash=r,b.locationUrl=s,b.historyBack=t,b.setCache=d,b.getCache=e,b.clearCache=f,b.getResourceUrl=u,a("external/jquery.md5");var v=a("module/ui")}),define("module/main",function(a,b){function c(a,b){var c=b.title||"",d=b.className||"";if(a.setTitle(c),$("#pageContainer").length>0)return $("#pageContainer").attr("class","container "+d),void e();var f={IMG_PATH:IMG_PATH,className:d};a.setContent(l.content(f)),e()}function d(a){$("#pageContent").html(a)}function e(){var a=i.getLocationHash();if(HASH_ENCODE&&(a=i.hashDecode(a)),a=a||"",/\b(?:login|password)\b/.test(a))return $("#loginUserInfoBox").hide(),void $("#pageMenu").hide();$("#loginUserInfoBox").show(),$("#pageMenu").show();var b={needSelf:!0};k.getAdminUserInfo(b,function(a){if(0!=a.errCode)return void j.showNotice(a.msg);var b=a.data||{},c=trim(b.userName)||"";$("#loginUserName").html(c)}),$("#pageHeader [href]").off().on("click",function(a){a.preventDefault(),a.stopPropagation();var b=trim($(this).attr("href"));b&&i.locationUrl(b)}),f()}function f(){var a={needSelf:!0,pageNum:1,pageSize:500};k.getAdminUserMenuList(a,function(a){if(0!=a.errCode)return void j.showNotice(a.msg);var b=a.data&&a.data.list||[],c={};$.each(b,function(a,b){var d=trim(b.parentMenuName)||"";d&&(d in c||(c[d]=[]),c[d].push(b))});var d={Object:Object,menuMap:c};$("#menuList").html(l.menuList(d)),$("#menuList [href]").on("click",function(a){a.preventDefault(),a.stopPropagation();var b=trim($(this).attr("href"));b&&i.locationUrl(b)}),g()})}function g(){var a=i.getLocationHash();HASH_ENCODE&&(a=i.hashDecode(a)),a=a||"#index","#index"==a&&$("#menuList [href]:first").click(),$("#menuList [activeHref]").each(function(b,c){var d=$(c).attr("activeHref"),e="active";$(c).removeClass(e);var f=new RegExp(d,"ig");f.test(a)&&$(c).addClass(e)})}function h(a){$("#"+a+" tr").on("click",function(){$(this).toggleClass("active")})}b.setMain=c,b.setContent=d,b.activeTr=h;var i=a("module/common"),j=a("module/ui"),k=a("cgi/adminUser"),l=a("view/main")}),define("module/ui",function(a,b){function c(){$(".mask").remove();for(var a in b)/^close/gi.test(a)&&isFunction(b[a])&&b[a]()}function d(a){a=a||{};var b=a.id||"bodyMask",c=a.zIndex||2,d=a.opacity||.6,e=isFunction(a.onClick)&&a.onClick||function(){};$("body").children(".mask").each(function(){b==this.id&&$(this).remove()}),$("body").append(p.mask({id:b,zIndex:c,opacity:d,filter:100*d,canClose:isFunction(a.onClick)})),$("#"+b).off().on("click",function(a){a.preventDefault(),a.stopPropagation(),e()})}function e(a){a=a||{};var b=a.id||"bodyMask";$("#"+b).remove()}function f(a){a=a||1e4,g(),$("body").append(p.loading()),f.timer=setTimeout(g,a)}function g(){clearTimeout(f.timer),$("#loadingBox").remove()}function h(a,b){b=b||1e3,$("#noticeBox").remove();var c={text:a};$("body").append(p.notice(c)),$("#noticeBox").fadeIn(500,function(){clearTimeout(h.timer),h.timer=setTimeout(function(){$("#noticeBox").fadeOut(1e3)},b)})}function i(a,b){a=$.trim(a)||"",b=b||function(){},j();var c={text:a};$("body").append(p.alert(c)),$("#alertBtn").off().on("click",function(a){a.preventDefault(),a.stopPropagation(),b(),j()})}function j(){$("#alertBox").remove()}function k(a){a=a||{};var b=$.trim(a.html)||"";l();var c={html:b};$("body").append(p.window(c)),$("#closeWindow").on("click",l)}function l(){$("#windowBox").remove()}function m(a,b,c){a=$.trim(a)||"",b=b||function(){},c=c||function(){},n();var d={text:a};$("body").append(p.confirm(d)),$("#sureBtn").off().on("click",function(a){a.preventDefault(),a.stopPropagation(),b()}),$("#cancelBtn").off().on("click",function(a){a.preventDefault(),a.stopPropagation(),c(),n()})}function n(){$("#confirmBox").remove()}function o(a){var b=a.pageNum,c=a.pageSize,d=a.totalCount,e=a.pageCodeId,f=a.pageCodeFun,g=Math.ceil(d/c),h=1,i=0,j="",k="",l=[];j=b>1?"visibility:visible":"visibility:hidden",k=g==b?"visibility:hidden":"visibility:visible",0>=g&&(j="visibility:hidden",k="visibility:hidden"),b>4&&(h=b-4),g>=h+8?i=h+8:(i=g,h=i-8),0>=h&&(h=1),l.push('<p class="page"><span class="totalBox">总计<span class="total">'+d+"</span>条</span>"),l.push('<input style="'),l.push(j),l.push('" pageNum="'+(b-1)+'" class="btn" type="button" value="上一页"/>');for(var m=[],n=h;i>=n;n++)m.push('<span class="num '+(n==b?"active":"")+'" pageNum="'+n+'">'+n+"</span>");9==m.length&&(h>1&&(m[0]='<span class="num" pageNum="1">1</span>',m[1]='<span class="cut">···</span>'),g>i&&(m[8]='<span class="num" pageNum="'+g+'">'+g+"</span>",m[7]='<span class="cut">···</span>')),l.push(m.join("")),l.push('<input style="'),l.push(k),l.push('" pageNum="'+(b+1)+'" class="btn" type="button" value="下一页" />'),l.push("</p>"),l=l.join(""),$("#"+e).html(l),$("#"+e+" [pageNum]").off(),$("#"+e+" [pageNum]").on("click",f)}b.clear=c,b.showMask=d,b.closeMask=e,b.showLoading=f,b.closeLoading=g,b.showNotice=h,b.showAlert=i,b.closeAlert=j,b.showWindow=k,b.closeWindow=l,b.showConfirm=m,b.closeConfirm=n,b.showPagination=o;var p=a("view/ui")});
//# sourceMappingURL=debug/module.js.map