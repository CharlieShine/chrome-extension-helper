// let REQUEST_TYPE = "script, main_frame, sub_frame, stylesheet, image, object, xmlhttprequest, other";
// let REQUEST_TYPE = "main_frame, script, xmlhttprequest, ping";
let REQUEST_TYPE = "xmlhttprequest, ping";

// chrome.webRequest.onBeforeRequest.addListener (function (detail) {
//     let requestId = detail.requestId;
//     let tabId = detail.tabId;
//     let method = detail.method;
//     let timeStamp = detail.timeStamp;
//     let type = detail.type;
//     let url = detail.url;
//     if (type === "image") {
//         if (url.indexOf(".gif") < 0) {
//             console.log("拦截图片请求->" + url);
//             // return {cancel:true};
//         }
//     }
//     return {cancel:false};
//     /*if (REQUEST_TYPE.indexOf(type) >= 0) {
//         if (REQUEST_TYPE.indexOf(type) >= 0) {
//             // console.log(url);
//         }
//         $.get(url, function(data) {
//             if (data && data.toString().indexOf("") >= 0) {
//                 console.log(url);
//             }
//         });
//     }*/
// }, {
//     urls:["*://*/*"]
// },[
//     "blocking"
// ]);

/*chrome.tabs.onCreated.addListener((data) => {
    console.log(data)
});*/

function notify (message) {
    var opt = {  
        type: 'basic',  
        title: 'chrome开发小助手!',  
        message: message,  
        iconUrl: 'images/recycle_48.png',  
    };

    chrome.notifications.create('', opt, function(id){  
        setTimeout(function(){  
            chrome.notifications.clear(id, function(){});  
        }, 3000);
    }); 
}

chrome.browserAction.onClicked.addListener(function(tab) {
    reloadExtensionCode("cohdpoecbclnpdacldbomemdinpmgphn", 'http://127.0.0.1:3001');
    reloadExtensionCode("aeodplgpncaakahcbdoiiagfcedmjkck", 'http://127.0.0.1:3002');
});

function reloadExtensionCode (extensionId, url) {// 先禁用插件再启用插件 ,以更新代码
    console.log("======================\r更新" + extensionId + "插件代码");
    $.ajax({
        url: url,
        type: "POST",
        data: {
            command: "compile"
        },
        success: function (data) {
            console.log(data);
            console.log("start reload chrome extension ...");
            if (data.success) {
                chrome.management.setEnabled(extensionId, false, function(){console.log("disabled success!")});
                chrome.management.setEnabled(extensionId, true, function(){console.log("reEnabled success!")});
                console.log("chrome extension reload success!");
                notify("插件代码已更新!");
            } else {
                notify("插件更新失败, 请检查代码aeodplgpncaakahcbdoiiagfcedmjkck和编译输出!");
            }
        }
    });
}