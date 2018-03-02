<h1>InSightDetector</h1>


<h3>使用情景</h3>
是否遇到过这种情况：需要检测一个元素是否展示 => 该元素不在首屏 => 页面滑动过程中 js 动态改变了其它元素，该元素的位置又变了？

那么你可能就需要 in-sight-detector.js，一个用来动态检测某些 DOM 元素是否处于浏览器窗口内的探测器。

可以用来：

* 处理图片惰性加载
* 统计某些动态变化的元素的 pv

<h3>快速使用</h3>

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
```

<h3>npm</h3>

```javascript
  npm install in-sight-detector
```

<h3>文档</h3>

[in-sight-detector.md](https://github.com/dblate/in-sight-detector/blob/master/docs/in-sight-detector.md)

<h3>一些想法</h3>

<h4>为什么要用 Class 而不用普通的函数或者对象？</h4>

一个页面可能会被分为多个模块，如果用 Class 创建 detector 实例，则每个 detector 的数据是独立的。你也不想大家相互之间数据搞乱吧
  
<h4>别影响浏览器性能</h4>

整个事件是在浏览器滚动时执行的，浏览器花了更多精力去解决滚动时的性能问题，若是因为你的一两行代码搞得页面滑动时卡顿，怕是产品经理就不高兴了。

in-sight-detector.js 中通过一些手段尽量保证性能：

* 使用 requestAnimationFrame，让浏览器渲染优先
* 提供 interval 参数为函数执行提供最小执行间隔

但决定因素还是在使用者身上，建议：

* 回调函数中不要做太耗性能的操作，比如频繁的修改 DOM
* 如果有时确实需要做一些有损性能的操作，可以把 interval 值稍微调大一点
* 某些元素不再需要检测时，移除对应的事件
