// JavaScript source code
// JavaScript source code
var Level1 = function (game) {

}
Level1.prototype = {

    /* preload function */
    preload: function () {
        this.load.audio('frankenstein', 'assets/music/other_song.mp3');
        this.load.spritesheet("player_sprite", "assets/spritesheet.png", 96, 144);

        // these are the platforms for lv1
        this.load.image("lv1_ground_short", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat1.png");
        this.load.image("lv1_ground_med1", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat3.png");
        this.load.image("lv1_ground_med2", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat4.png");
        this.load.image("lv1_ground_long", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat2.png");

        // these are the background layers for lv 1
        this.load.image("lv1_layer0", "assets/Background Layers/Layer 0/Lvl_1.png");
        this.load.image("lv1_layer1", "assets/Background Layers/Layer 1/Lvl_1.png");
        this.load.image("lv1_layer2", "assets/Background Layers/Layer 2/Lvl_1.png");

        // load door
        //this.load.image("door", "assets/door_1.png");
        this.load.spritesheet("door", "assets/door_1.png", 128, 196);

        // load crystal pedastal
        this.load.spritesheet("pedestal", "assets/Crystal Pedestals/Lvl1_OffOn.png", 42, 96);

        //Text
        box = this.load.image("textBox", "assets/placeholder/dialogue.png");
        show = false;
        //this.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");

    },

    /* initialization function */
    create: function () {
        
    },

    /* update loop */
    update: function () {
        

    }
};
