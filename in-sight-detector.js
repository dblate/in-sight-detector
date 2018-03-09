/**
 * @file 检测器—— DOM 元素是否处于窗口内
 * @author yuhui06
 * @date 2018/3/2
 */


/**
 * 判断变量是否是 DOM 元素
 *
 * @param {Mixed} el 任意变量
 * @return {boolean} 是否是 DOM 元素
 */
function isEl(el) {
    return !!el && typeof el === 'object' && el.nodeType === 1;
}

class InSightDetector {
    /**
     * 构造函数
     *
     * @param {Object=} options 配置项，可选
     * @param {number=} options.interval 检测函数执行间隔会大于等于此值
     * @param {number|string=} options.offset 偏移量。
     *     例如 offset 为 100 时，元素出现在窗口中的高度大于等于 100 才会触发对应回调函数。
     *     也可以为百分比，会根据元素高度计算
     */
    constructor(options) {
        this.config = this._normalize(options);

        // 存储所有的元素及其回调函数
        this._store = [];

        // requestAnimationFrame 中的函数是否执行完的标志位
        this._ticking = false;

        // 记录上次函数执行的时间，用于确保函数执行间隔大于指定值
        this._lastTimestamp = Date.now();

        this._viewportHeight = window.innerHeight;

        this._throttledDetect = this._throttledDetect.bind(this);
    }

    _normalize(options) {
        if (typeof options !== 'object') {
            options = {};
        }

        return {
            interval: options.interval || 0,
            offset: options.offset || 0
        };
    }

    /**
     * 限速版的检测函数
     * 用 requestAnimationFrame 和 interval 来确保函数执行频率不要过高
     *
     * @private
     *
     * @param {Element=} el 单独为此元素执行检测操作，可选 
     */
    _throttledDetect(el) {
        const currentTimestamp = Date.now();
        const interval = currentTimestamp - this._lastTimestamp;
        this._lastTimestamp = currentTimestamp;
        if (!this._ticking
            && this._store.length
            && interval >= this.config.interval) {

            window.requestAnimationFrame(() => {
                this._detect(el);
                this._ticking = false;
            });
        }

        this._ticking = true;
    }

    /**
     * 检测所有元素是否处于视口区域，如果是，则调用回调函数
     * 用 requestAnimationFrame 和 interval 来确保函数执行频率不要过高
     *
     * @private
     *
     * @param {Element=} el 如果传入 el，则只检测 el；否则检测所有元素
     */
    _detect(el) {
        let store = this._store;
        if (isEl(el)) {
            store = this._store.filter(value => value.el.isSameNode(el));
        }

        store.forEach(value => {
            if (this._isInSight(value.el)) {
                value.callback();
            }
        });
    }

    /**
     * 判断元素是否处于视口区域
     *
     * @private
     *
     * @param {Element} el 待检测的元素
     * @return {boolean} isInSight 元素是否处于视口区域
     */
    _isInSight(el) {
        const {top, bottom, height} = el.getBoundingClientRect();
        const offset = this._translateOffset(this.config.offset, height);

        const isTopInSight = (top > 0 && top + offset < this._viewportHeight);
        const isBottomInSight = (bottom - offset > 0 && bottom < this._viewportHeight);
        const isInSight = (isTopInSight || isBottomInSight);

        return isInSight;
    }

    /**
     * 如果偏移量（offset）是百分比，根据元素高度将其转化为具体值
     *
     * @private
     *
     * @param {number|string} offset 偏移量
     * @param {number} height 元素高度
     * @return {number} offset 转化后的偏移量
     */
    _translateOffset(offset, height) {
        const percentReg = /^\d+%$/;
        if (percentReg.test(offset)) {
            const percent = parseInt(offset, 10) / 100;
            offset = Math.round(height * percent);
        } else {
            offset = parseInt(offset, 10);
        }

        return offset;
    }

    /**
     * 增加待检测的元素和对应的回调函数，每次新增元素时，会立即检测一次
     *
     * @param {Element|Array} els 新增的元素，单个元素或数组
     * @param {Function} callback 该元素处理视口区域时的回调
     */
    addListener(els, callback = function () {}) {
        els = [].concat(els);

        els.forEach(el => {
            if (isEl(el)) {
                if (!this._store.length) {
                    window.addEventListener('scroll', this._throttledDetect)
                }

                this._store.push({el, callback});
                this._throttledDetect(el);
            }
        });
    }

    /**
     * 删除指定元素及其回调函数
     *
     * @param {Element|Array} els 待删除的元素，单个元素或数组
     */
    removeListener(els) {
        els = [].concat(els);

        els.forEach(el => {
            if (isEl(el)) {
                this._store = this._store.filter(value => !value.el.isSameNode(el));
            }
        });

        if (!this._store.length) {
            window.removeEventListener('scroll', this._throttledDetect);
        }
    }

    /**
     * 删除所有的元素及其回调函数
     */
    removeAllListeners() {
        this._store = [];
        window.removeEventListener('scroll', this._throttledDetect);
    }
}

 module.exports = InSightDetector;











