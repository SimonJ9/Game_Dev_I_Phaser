// JavaScript source code


// JavaScript source code
var RanGenerator = function ( platforms, player_speed ) {
    this._click = click;
    this._duration = strike_time;          // in seconds
    this._frame_rate = game.time.fps;   // at time of creation
    this._num_anim_frames = strike_time * game.time.fps;
    this._animation_counter = 0;
    this._sprites_used = game.add.group();            // to clean up after the sprite is complete

    lightningSpells.push(this);
};

LightningSpell.prototype.Play = function () {
    if (this._animation_counter % 1 == 0) {
        var fire_type = Math.floor(Math.random() * (4 - 1)) + 1;    // pick a random fire sprite
        var completion_ratio = this._animation_counter / this._num_anim_frames;
        var offset_x = (1.0 * this._animation_counter / this._num_anim_frames) * (this._click.endX - this._click.startX);
        var offset_y = (1.0 * this._animation_counter / this._num_anim_frames) * (this._click.endY - this._click.startY);
        this._sprites_used.create(this._click.startX + offset_x - 64, this._click.startY + offset_y - 64, "fire" + fire_type.toString());
    }
    this._animation_counter++;

    if (this._animation_counter > this._num_anim_frames) {
        this.Finish();
    }
};

LightningSpell.prototype.Finish = function () {
    this._sprites_used.destroy();
    lightningSpells.shift();        // remove self from the lightningSpells global variable
    delete this;
};