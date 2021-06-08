// 游戏
function Game(map, snake, food, block) {
    // 存储
    // 地图
    this.map = map;
    // 贪吃蛇
    this.snake = snake;
    // 食物
    this.food = food;
    // 障碍物
    this.block = block;
    // 循环时间
    // this.loopTime = 1000;
    this.loopTime = 500;
    // 定时器句柄
    this.timebar = null;
    // 游戏是否结束
    this.state = false;
}
// 初始化方法
Game.prototype.init = function() {
    // console.log('game init');
    // 执行地图的初始化方法
    this.renderMap();
    // 绘制障碍物
    this.renderBlock();
    // 初始化食物
    this.renderFood();
    // 渲染蛇
    this.renderSnake();
    // 游戏开始
    this.startGame();
    // 绑定事件
    this.bindEvent();
}
// 封装
Game.prototype.renderMap = function() {
    // 初始化地图
    this.map.init();
}
// 初始化食物
Game.prototype.renderFood = function() {
    // 找到对应的元素，设置背景
    this.map.arr[this.food.row][this.food.col].style.backgroundImage = this.food.img;
}
// 绘制障碍物
Game.prototype.renderBlock = function() {
    // 遍历障碍物数组，逐一绘制
    for (var i = 0; i < this.block.arr.length; i++) {
        // 获取每一个障碍物
        var block = this.block.arr[i];
        // 找到对应的单元格，绘制背景
        this.map.arr[block.row][block.col].style.backgroundImage = this.block.img;
    }
}
// 渲染蛇
Game.prototype.renderSnake = function() {
    // 渲染头
    var head = this.snake.arr[0];
    // 设置背景
    this.map.arr[head.row][head.col].style.backgroundImage = 'url(' + this.snake.headImage + ')';
    // 渲染身体
    // 循环遍历身体
    for (var i = 1; i < this.snake.arr.length - 1; i++) {
        // 每个身体部位
        var body = this.snake.arr[i];
        // 找到对应的单元格设置
        this.map.arr[body.row][body.col].style.backgroundImage = 'url(' + this.snake.bodyImage + ')';
    }
    // 渲染尾巴
    var tail = this.snake.arr[this.snake.arr.length - 1];
    // 设置对应单元格背景
    this.map.arr[tail.row][tail.col].style.backgroundImage = 'url(' + this.snake.tailImage + ')';
}
// 清除舞台
Game.prototype.clear = function() {
    // 清除每个单元格背景图片
    // 遍历行
    for (var i = 0; i < this.map.arr.length; i++) {
        // 遍历单元格
        for (var j = 0; j < this.map.arr[i].length; j++) {
            // 清除背景
            this.map.arr[i][j].style.backgroundImage = '';
        }
    }
}

// 开始游戏
Game.prototype.startGame = function() {
    // console.log(this, 211);
    // 缓存this
    var me = this;
    // 定义循环定时器
    this.timebar = setInterval(function() {
        // console.log(this);
        // 让蛇移动
        me.snake.move();
        // 检测游戏是否结束
        me.checkGame();
        // 检测撞墙
        me.checkBlock();
        // 检测是否吃到食物
        me.checkFood();
        // 检测撞身体
        me.checkBody();
        // console.log(me.state);
        // 判断是否结束
        if (!me.state) {
            // 重新渲染之前，要清除画布
            me.clear();
            // 重新渲染墙
            me.renderBlock();
            // 重新渲染食物
            me.renderFood();
            // 重新渲染蛇
            me.renderSnake();
        }
    }, this.loopTime)
}

// 监听用户案件
Game.prototype.bindEvent = function() {
    // 缓存this
    // var that = this;
    var me = this;
    // 绑定事件
    document.addEventListener('keydown', function(e) {
        // console.log(this);
        // 判断按键
        switch (e.keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
                // 合法的按键都可以让蛇改变方向
                me.snake.changeDirection(e.keyCode);
                break;
            default:;
        }
    }, false)
}

// 检测游戏是否结束
Game.prototype.checkGame = function() {
    // 判断头部是否在舞台的外部
    // 获取头部位置
    var head = this.snake.arr[0];
    // 判断行和列
    // 注意：蛇的位置是0-19，总行数和总列数是20。
    if (head.row < 0 || head.row >= this.map.rows || head.col < 0 || head.col >= this.map.cols) {
        // 游戏结束
        this.gameOver();
    }
}

// 游戏结束
Game.prototype.gameOver = function() {
     // 游戏结束
     this.state = true;
     // 清除定时器
     clearInterval(this.timebar);
     // 游戏结束
     console.log('游戏结束了');
}

// 检测撞墙
Game.prototype.checkBlock = function() {
    // 头与墙坐标一直
    // 获取头的位置
    var head = this.snake.arr[0];
    // 遍历障碍物，比较坐标'
    for (var i = 0; i < this.block.arr.length; i++) {
        // 缓存墙
        var block = this.block.arr[i];
        // 坐标一致
        if (head.row === block.row && head.col === block.col) {
            // 游戏结束
            this.gameOver();
        }
    }
}

// 检测撞身体
Game.prototype.checkBody = function() {
    // 头与墙坐标一直
    // 获取头的位置
    var head = this.snake.arr[0];    
    // 遍历身体比较坐标
    for (var i = 1; i < this.snake.arr.length - 1; i++) {
        // 缓存身体
        var body = this.snake.arr[i];
        if (head.row === body.row && head.col === body.col) {
            // 游戏结束
            this.gameOver();
        }
    }
}

// 检测食物
Game.prototype.checkFood = function() {
    // 获取头的位置
    var head = this.snake.arr[0]
    // 比较头与食物坐标是否一致
    if (head.row === this.food.row && head.col === this.food.col) {
        // 蛇吃到食物了，蛇要成长
        this.snake.grew();
        // 随机一个食物
        this.randomFood();
    }
}
// 随机一个食物
Game.prototype.randomFood = function() {
    // 随机要给位置
    var row = parseInt(this.map.rows * Math.random());
    var col = parseInt(this.map.cols * Math.random());
    // console.log(row, col);
    // 不能出现在墙上
    for (var i = 0; i < this.block.arr.length; i++) {
        // 坐标一致就表示出现在墙上了
        if (this.block.arr[i].row === row && this.block.arr[i].col === col) {
            // 中断执行，重新随机
            return this.randomFood();
        }
    }
    // 不能出现在蛇身上
    for (var i = 0; i < this.snake.arr.length; i++) {
        // 坐标一致表示在蛇的身上
        if (this.snake.arr[i].row === row && this.snake.arr[i].col === col) {
            // 中断执行，重新随机
            return this.randomFood();
        }
    }
    // 在该位置重置食物
    this.food.reset(row, col);
}