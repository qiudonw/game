// 地图
function Maps(width, height, rows, cols, container) {
    // 存储数据
    // 总宽度
    this.width = width;
    // 总高度
    this.height = height;
    // 总行数
    this.rows = rows;
    // 总列数
    this.cols = cols;
    // 每个单元格的宽高
    this.itemWidth = this.width / this.cols;
    this.itemHeight = this.height / this.rows;
    // 地图容器
    this.container = container;
    // 二位数组，存储每一个单元格
    this.arr = [];
}
// 初始化的方法
Maps.prototype.init = function() {
    // console.log(1111);
    // 地图绘制出来
    // 遍历行
    for (var i = 0; i < this.rows; i++) {
        // 创建行
        var rowDom = document.createElement('div');
        // 行数组
        var rowArr = [];
        // 遍历列
        for (var j = 0; j < this.cols; j++) {
            // 创建每一个单元格
            var colDom = document.createElement('div');
            // 设置样式
            this.css(colDom, {
                width: this.itemWidth + 'px',
                height: this.itemHeight + 'px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                backgroundSize: 'cover'
            })
            // 放入行元素中
            rowDom.appendChild(colDom);
            // 放在行数组中
            rowArr.push(colDom);
        }
        // 设置行的样式
        this.css(rowDom, {
            display: 'flex'
        })
        // 放在容器中
        this.container.appendChild(rowDom);
        // 行数组放在二位数组中
        this.arr.push(rowArr)
    }
    // 修饰容器
    this.css(this.container, {
        border: '1px solid #ccc',
        width: this.width + 'px',
        height: this.height + 'px',
        margin: '0 auto'
    })
    // console.log(this.arr);
}
// 设置样式的方法
Maps.prototype.css = function(dom, obj) {
    // 解析样式对象
    for (var key in obj) {
        // key是样式名称，obj[key]是样式值
        dom.style[key] = obj[key];
    }
}