// JavaScript source code
var Ending = function (game) {

}
Ending.prototype = {

    /* preload function */
    preload: function () {
        this.load.spritesheet("screen", "assets/Ending/Ending_spritesheet.png", 1334, 750);

        this.input.mouse.capture = true;    // track the mouse
        //Text
        box = this.load.image("textBox", "assets/placeholder/dialogue.png");
        show = false;
        //this.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");



    },

    /* initialization function */
    create: function () {
        this.screen = this.add.sprite(0, 0, "screen");
        this.screen.animations.add("scene1", [0], 1, false);
        this.screen.animations.add("scene2", [0], 1, false);
        this.screen.animations.add("scene3", [0], 1, false);

        this.dialogue1_finished = false;
        this.dialogue2_finished = false;
        this.dialogue3_finished = false;


    },

    /* update loop */
    update: function () {
        if (!this.dialogue1_finished) {
            this.screen.animations.play("scene1");
            /* play dialogue */
            // set this variable to true when finished
            // this.dialogue1_finished = true;
        }
        else if (!this.dialogue2_finished) {
            this.screen.animations.play("scene2");
            /* play dialogue */
            // set this variable to true when finished
            // this.dialogue2_finished = true;
        }
        else if (!this.dialogue3_finished) {
            this.screen.animations.play("scene3");
            /* play dialogue */
            // set this variable to true when finished
            // this.dialogue3_finished = true;
        }
        else {
            this.LoadMainMenu();
        }

    }
};

Ending.prototype.LoadMainMenu = function () {
    this.state.start("Main Menu");
};