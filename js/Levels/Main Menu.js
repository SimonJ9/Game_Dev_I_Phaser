// JavaScript source code
// JavaScript source code
var MainMenu = function (game) {

}
MainMenu.prototype = {

    /* preload function */
    preload: function () {
        this.load.audio('song', 'assets/music/other_song.mp3');
        this.load.spritesheet("screen", "assets/Title Screen/Title_SpriteSheet.png", 1334, 750);

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

        main_menu_music = this.add.audio('song');
        main_menu_music.play();
    },

    /* update loop */
    update: function () {
        if (this.input.activePointer.leftButton.isDown) 
        {
            this.state.start("Intro");
        }

    }
};
