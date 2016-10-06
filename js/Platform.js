// JavaScript source code
var Platform = function (start_x, height, platform_order) {
    this.front = start_x;
    this.y = height;
    this.sprite_group = game.add.group();
    
    this.Fill(platform_order);
    
};

Platform.prototype.Fill = function(platforms){
    this.head = this.sprite_group.create(this.front, this.y, "assets/platform_left.png");
    this.tail = this.sprite_group.create(this.front + platforms.Length * 48, this.y, "assets/platform_right.png");

    var i = 0;
    while( i < platform_order.Length )
    {
        this.sprite_group.create(this.front + (i + 1) * 48, this.y, "assets/" + platform_order[i]);
    }

};


Platform.prototype.Remove = function () {
    this.head.destroy();
    this.sprite_group.destroy();
    this.tail.destroy();

    delete this;
};