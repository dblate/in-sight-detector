<h1>InSightDetector</h1>


<h3>使用情景</h3>
是否遇到过这种情况：需要检测一个元素是否展示 => 该元素不在首屏 => 页面滑动过程中 js 动态改变了其它元素，导致该元素的位置又变了？

试试 in-sight-detector.js 呗，用来动态检测某些 DOM 元素是否处于浏览器窗口内。

可以用来：

* 根据屏幕滚动动态加载元素
* 统计某些动态变化的元素的展现量


<h3>快速使用</h3>

<h4>获取代码</h4>

github 只是用来存放源码，如果想要获取生产环境所需的代码，可以通过以下两种形式：

* npm

```javascript
  npm install in-sight-detector
```

* 本地编译

```shell
git clone https://github.com/dblate/in-sight-detector.git

cd in-sight-detector

npm install

grunt
```

grunt 执行完后在 dist 目录下有编译完成的代码

<h4>使用示例</h4>

```javascript
    import InSightDetector from 'in-sight-detector'
    
    const detector = new InSightDetector();
    const testEl = document.getElementById('test-el');
    
    detector.addListener(testEl, () => {
        // testEl 出现在视图中时触发
        console.log('TestEl has shown');
        
        // 有时你需要装完哔就跑
        detector.removeListener(testEl);
    });


    // 同时为多个元素绑定事件
    detector.addListener([el0, el1, el2], () => {
        console.log('Bind multiple elements at the same time');
    });

    // 同时为多个元素取消事件
    detector.removeListener([el0, el1, el2]);

    // 移除所有元素及其事件
    detector.removeAllListener();
```

<h3>文档</h3>

[in-sight-detector.md](https://github.com/dblate/in-sight-detector/blob/master/docs/in-sight-detector.md)

<h3>兼容性</h3>

使用了 addEventListener 和 requestAnimationFrame，pc 端不兼容 IE，移动端没问题

<h3>一些想法</h3>

<h4>为什么要用 Class 而不用普通的函数或者对象？</h4>

一个页面可能会被分为多个模块，如果用 Class 创建 detector 实例，则每个 detector 的数据是独立的。反之，数据是公共的，容易误操作别人的数据
  
<h4>别影响浏览器性能</h4>

整个事件是在浏览器滚动时执行的，浏览器花了很多精力去解决滚动时的性能问题，若是因为你的一两行代码搞得页面滑动时卡顿，会有点不划算（当然一般不会这样，除非你有很多回调，而且做很多丧心病狂的操作）。

in-sight-detector.js 中通过一些手段尽量保证性能：

* 使用 requestAnimationFrame，让浏览器渲染优先
* 提供 interval 参数为函数提供最小执行间隔

但决定因素还是在使用者身上，建议：

* 回调函数中不要做太耗性能的操作，比如频繁的修改 DOM
* 如果有时确实需要做一些有损性能的操作，可以把 interval 值稍微调大一点
* 某些元素不再需要检测时，移除对应的事件
