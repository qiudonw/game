// 食物
function Food(row, col, img) {
    this.row = row;
    this.col = col;
    this.img = 'url(' + img + ')';
}
// 重置食物位置
Food.prototype.reset = function(row, col) {
    // 重置位置
    this.row = row;
    this.col = col;
}