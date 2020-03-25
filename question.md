### 问题汇总



掘金：https://juejin.im/post/5e731c4c51882549112b5c2d







##### 小程序怎么实现跨域

后端映射

请求的接口实际到微信的后端做了一道映射，微信后端拿到你的wx.request调用的url、用后端请求后端拿到数据后将body返给你这就是为什么、请求后端之后、拿回来的只有body没有header、取不到response header。

小程序的宿主环境是微信客户端，也就是原生app。小程序的运行环境分为逻辑层和渲染层，分别由两个线程来管理，webview 和 jscore。这两个线程的通信会由微信客户端进行中转。



##### react-native跨域问题

react-native是没有跨域的，打包过程会把js代码编译成原生组件，所以是没有跨域问题的。

但是如果是用浏览器（chrome）调试的话，可能会有跨域问题，网上也有部分人使用安卓模拟器出现了跨域问题，原因应该是：浏览器的安全策略问题，解决办法：用真机调试。



##### 消息订阅和推送

消息订阅：wx.requrestSubscribeMessage

​				选择总是之后，通过wx.getSetting可以获取

消息推送：openapi.subscribeMessage.send

​				需要在config.json里配置权限，调用：cloud.openapi.subscribeMessage.send

​			openapi.templateMessage.send	 // 模版消息



##### 小程序缓存

用户级别缓存

同一个微信，同一个小程序===>缓存相同

不同微信，同一个小程序====> 缓存不同

wx.getStorageSync				wx.getStorage

wx.setStorageSync				wx.setStorage

wx.removeStorageSync		wx.removeStorageSync

wx.clearStorageSync			 wx.clearStorage

其他：周期性更新



##### 图片缓存

小程序由于存在大小限制，因此是不会打包图片，因此wxss的图片是使用base64或者网络图片。

并且由于小程序存在版本问题，网络图片只能通过更新URL才能实现全量更新。



##### 小程序的体积计算

小程序会把我们项目的 json、wxml、wxss、js 全部转化为 js，合并成一个文件上传到微信云服务器。当用户第一次打开小程序时再从服务中下载并解析。以我们的项目为例，通过工具的压缩和统计，在我们计算出项目体积达到了~370K，经过微信编译上传，在手机端预览下载时，下载的文件达到了~540K。



##### 如何优化体积

- 编译层面：在编译包和开发包直接存在了~170K 的差距，开发者是否有办法通过代码写法进行优化，还需要我们去深入的了解。

- 构建层面：自己对 JS、WXSS、WXML 进行压缩，通过我们的项目测试，在使用微信默认的`代码压缩上传`的情况下，我们的项目体积增大了~100K

- 接口层面：web API 返回的数据尽量是最小的，且最好是可以直接展示的，也就是说需要在我们的 web 接入层要完成对数据的处理工作，比如时间、距离的展示等等

- 开发层面

  ：

  - wxss 尽可能的使用 import 复用，且减少样式的命名长度，背景图片统一以 url 的方式使用，因为样式的压缩只能是去掉空格，在页面展示复杂的情况下，wxss 可能会占用比 JS 更多的体积（在微信开发者工具 beta 版上已经修复了因为 import 的使用导致引入冗余编译文件，增大编译包的问题）；
  - js 功能尽可能以模块化的方式，如果你的小程序需要多个开发团队参与，主要负责团队需要设计提供统一的前端公共服务；
  - 精简 wxml，我们发现当 wxml 被编译成 js 后会占用非常大的体积(减少一个压缩后 4K 的 wxml，可以减少编译包 9K)



##### 分包加载

某些情况下，开发者需要将小程序划分成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。

目前小程序分包大小有以下限制：

- 整个小程序所有分包大小不超过 4M
- 单个分包/主包大小不能超过 2M

对小程序进行分包，可以优化小程序首次启动的下载时间，以及在多团队共同开发时可以更好的解耦协作。

[分包文档](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)

```javascript
├── app.js
├── app.json
├── app.wxss
├── packageA  // packageA无法require packageB的的JS文件，无法import packageB的template
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── pages
│   ├── index
│   └── logs
└── utils
```

app.json `subpackages`

```javascript
{
  "pages":[
    "pages/index",
    "pages/logs"
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    }, {
      "root": "packageB",
      "name": "pack2",
      "pages": [
        "pages/apple",
        "pages/banana"
      ],
      "independent": true // 是否独立分包
    }
  ]
}
```



##### 小程序加载图片失败，默认图片的替换方法

使用image的error方法

```javascript
// template
<image wx:for="{{list}}" wx:key="item" src="{{item}}" @error="errorFn({{index}})" />
  
// page
errorFn(index) {
  this.setData({
    list: this.data.list.splice(index, 1, "https://static-img1-default/1.png")
  })
}
```



##### 键盘遮挡

输入框增加**cursor-spacing**属性即可解决

```html
<input type="text" password="true" placeholder="请输入支付密码" cursor-spacing="150"  />
```



##### 微信小程序中WebView中原生组件限制问题解析

所谓的原生组件，即非Web组件系统扩展Native组件。因为小程序在视图渲染层面使用了WebView，而在Video，Map这类组件，使用WebView的WebCore渲染之后体验不佳的诟病一直存在，而且标准不一。小程序上因使用原生的WebView进行渲染，而不是用修改的WebView内核（至少在iOS上没有这么干），而无法对web原生标签扩展。基于用户体验，和坑爹的技术限制，小程序提出了原生组件的概念，也就是在WebView上面使用原生组件填充占位元素的方式修补这类组件用户体验问题。因为WebView和原生组件在应用层本身就不是一个渲染层级，于是出现Web上面的标签无法浮于Video之上(直播应用的恶梦)，在不修改技术思路的前提下，position: fixed， overflow: hidden这样的属性是不可能用于原生组件的样式的。不过伪同层渲染也不是说不可能，即在渲染原生组件时候根据层级镂空面积。

特别在Map上使用WebView作为渲染之后体验不佳的诟病一直存在，特别是地图上marker标记过多的重度场景下，笔者所在的公司的在使用高德地图Web端提供出来的C端具备反人类的体验，地图拖拉龟速，点击响应缓慢，加载loading地图区域等待时间过长。而Video则支持的格式有限，列出部分浏览器的支持的如下：

```
Firefox：支持 Ogg Vorbis和WAV Opera ：支持Ogg Vorbis和WAV Safari ：支持MP3，AAC格式 ，和MP4 Chrome ：支持Ogg Vorbis，MP3，WAV，AAC和MP4 Internet Explorer 9+ ：支持MP3，AAC格式 ，和MP4 IOS ：支持MP3，AAC格式 ，和MP4 Android ：支持AAC和MP3 
```

上述，可以知道视频支持有限（限于版权）。而就我们关注的移动端iOS和Andoroid，实现一个视频播放，我们可能都会有以下几点的需求：
1、全屏处理；
2、覆盖层效果；
3、自动播放；
4、播放控制；
5、隐藏播放控件；
在iOS上如果使用WebView，你无法修改全屏下的工具这一点体验已经足够让所有的产品经理抓狂，更不用说Android的这么多的机型。覆盖层效果在微信上不得不使用微信提供原生组件cover-view实现，而限于原生实现限制，cover-view的支持有限。

https://segmentfault.com/a/1190000016401019



##### setData原理

小程序的视图层目前使用 WebView 作为渲染载体，而逻辑层是由独立的 JavascriptCore 作为运行环境。在架构上，WebView 和 JavascriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 `evaluateJavascript` 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。

而 `evaluateJavascript` 的执行会受很多方面的影响，数据到达视图层并不是实时的。同一进程内的 WebView 实际上会共享一个 JS VM，如果 WebView 内 JS 线程正在执行渲染或其他逻辑，会影响 evaluateJavascript 脚本的实际执行时间，另外多个 WebView 也会抢占 JS VM 的执行权限；另外还有 JS 本身的编译执行耗时，都是影响数据传输速度的因素。

setData的错误操作

	1. 频繁的setDta
 	2. 每次setData都更新大量数据
 	3. 后台态页面进行setData，在onHide里setData

[优化文档](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)



##### 小程序分享票据shareTickets

https://www.jianshu.com/p/fe4c0e98acf4

1. 不能全局设置，不能在onShareAppMessage设置，需要在单个页面onload时候设置

   ```javascript
   wx.showShareMenu({
       withShareTicket: true
   });
   ```

2. 只有转发到群聊中打开才可以获取到 shareTickets 返回值，单聊没有 shareTickets

3. shareTicket 仅在当前小程序生命周期内有效，放到storeage保存下次再调用wx.getShareInfo无效



##### 小程序e.target与e.currentTarget

小程序中关于事件对象  e  的属性中有两个特别重要的属性：target与currentTarget属性：对于这两个属性，官方文档上的解释是：

　　　　　target：事件源组件对象（e.target是tap点击事件触发的对象，也就是点击的是）

　　　　　currentTarget：当前组件对象（是事件绑定在哪个元素上，也就是这个事件在哪个组件上）



##### block

`<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性

**不能直接在block标签内引用自定义组件！**



##### `wx:if` vs `hidden`

因为 `wx:if` 之中的模板也可能包含数据绑定，所以当 `wx:if` 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时 `wx:if` 也是**惰性的**，如果在初始渲染条件为 `false`，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，`hidden` 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，`wx:if` 有更高的切换消耗而 `hidden` 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用 `hidden` 更好，如果在运行时条件不大可能改变则 `wx:if` 较好。









