## Classes

<dl>
<dt><a href="#InSightDetector">InSightDetector</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#isEl">isEl(el)</a> ⇒ <code>boolean</code></dt>
<dd><p>判断变量是否是 DOM 元素</p>
</dd>
</dl>

<a name="InSightDetector"></a>

## InSightDetector
**Kind**: global class  

* [InSightDetector](#InSightDetector)
    * [new InSightDetector([options])](#new_InSightDetector_new)
    * [.addListener(els, callback)](#InSightDetector+addListener)
    * [.removeListener(els)](#InSightDetector+removeListener)
    * [.removeAllListeners()](#InSightDetector+removeAllListeners)

<a name="new_InSightDetector_new"></a>

### new InSightDetector([options])
构造函数


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | 配置项，可选 |
| [options.interval] | <code>number</code> | 检测函数执行间隔会大于等于此值 |
| options.offset | <code>number</code> \| <code>string</code> | 偏移量。     例如 offset 为 100 时，元素出现在窗口中的高度大于等于 100 才会触发对应回调函数。     也可以为百分比，会根据元素高度计算 |

<a name="InSightDetector+addListener"></a>

### inSightDetector.addListener(els, callback)
增加待检测的元素和对应的回调函数，每次新增元素时，会立即检测一次

**Kind**: instance method of [<code>InSightDetector</code>](#InSightDetector)  

| Param | Type | Description |
| --- | --- | --- |
| els | <code>Element</code> \| <code>Array</code> | 新增的元素，单个元素或数组 |
| callback | <code>function</code> | 该元素处理视口区域时的回调 |

<a name="InSightDetector+removeListener"></a>

### inSightDetector.removeListener(els)
删除指定元素及其回调函数

**Kind**: instance method of [<code>InSightDetector</code>](#InSightDetector)  

| Param | Type | Description |
| --- | --- | --- |
| els | <code>Element</code> \| <code>Array</code> | 待删除的元素，单个元素或数组 |

<a name="InSightDetector+removeAllListeners"></a>

### inSightDetector.removeAllListeners()
删除所有的元素及其回调函数

**Kind**: instance method of [<code>InSightDetector</code>](#InSightDetector)  
<a name="isEl"></a>

## isEl(el) ⇒ <code>boolean</code>
判断变量是否是 DOM 元素

**Kind**: global function  
**Returns**: <code>boolean</code> - 是否是 DOM 元素  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Mixed</code> | 任意变量 |

