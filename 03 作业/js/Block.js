// 障碍物
function Block(img) {
    // 存储图片
    this.img = 'url(' + img + ')';
    // 障碍物坐标
    this.arr = [
        { row: 6, col: 3 },
        { row: 6, col: 4 },
        { row: 6, col: 5 },
        { row: 6, col: 6 },
        { row: 6, col: 7 },
        { row: 6, col: 8 },
    ]
}
// 随机障碍物位置
Block.prototype.resetBlock = function(row, col) {
    // 重置位置
    this.row = row;
    this.col = col;
}