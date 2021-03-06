// JavaScript source code
// JavaScript source code
var GameOver = function (game) {

}
GameOver.prototype = {

    /* preload function */
    preload: function () {
        this.load.spritesheet("screen", "assets/Game Over/GameOver_SpriteSheet.png", 1334, 750);

        this.input.mouse.capture = true;    // track the mouse
        //Text
        box = this.load.image("textBox", "assets/placeholder/dialogue.png");
        show = false;
        //this.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");

    },

    /* initialization function */
    create: function () {
        this.screen = this.add.sprite(0, 0, "screen");
        this.screen.animations.add("blink", [1, 1, 1, 1, 0, 0], 5, true);
        this.screen.animations.play("blink");

        
    },

    /* update loop */
    update: function () {
        if (this.input.activePointer.leftButton.isDown) {
            level_music.stop();
            if(global_current_level === 1)
            {
                this.state.start("Level_1");
            }
            else if(global_current_level === 2)
            {
                this.state.start("Level_2");
            }
            else if(global_current_level === 3)
            {
                this.state.start("Level_3");
            }
        }

    }
};

