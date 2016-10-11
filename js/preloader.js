//<!--load before the game-->

function preload()
{
    game.load.audio('frankenstein', 'assets/music/frankenstein.mp3');

    game.load.spritesheet("player_sprite", "assets/run.png", 96, 144);
    
    
    // these are the platforms for lv 1
    game.load.image("lv1_ground_short", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat1.png");
    game.load.image("lv1_ground_med1", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat3.png");
    game.load.image("lv1_ground_med2", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat4.png");
    game.load.image("lv1_ground_long", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat2.png");

    // these are the platforms for lv 2
    game.load.image("lv2_ground_short", "assets/All_Platforms/Resized_WholeGreen/Green_Plat2.png");
    game.load.image("lv2_ground_med1", "assets/All_Platforms/Resized_WholeGreen/Green_Plat1.png");
    game.load.image("lv2_ground_med2", "assets/All_Platforms/Resized_WholeGreen/Green_Plat4.png");
    game.load.image("lv2_ground_long", "assets/All_Platforms/Resized_WholeGreen/Green_Plat3.png");

    // these are the platforms for lv 2
    game.load.image("lv3_ground_short", "assets/All_Platforms/Resized_WholeRed/Red_Plat3.png");
    game.load.image("lv3_ground_med1", "assets/All_Platforms/Resized_WholeRed/Red_Plat1.png");
    game.load.image("lv3_ground_med2", "assets/All_Platforms/Resized_WholeRed/Red_Plat2.png");
    game.load.image("lv3_ground_long", "assets/All_Platforms/Resized_WholeRed/Red_Plat4.png");


    // these are the background layers for lv 1
    game.load.image("lv1_layer0", "assets/Background Layers/Layer 0/Lvl_1.png");
    game.load.image("lv1_layer1", "assets/Background Layers/Layer 1/Lvl_1.png");
    game.load.image("lv1_layer2", "assets/Background Layers/Layer 2/Lvl_1.png");

    // these are the background layers for lv 2
    game.load.image("lv2_layer0", "assets/Background Layers/Layer 0/Lvl_2.png");
    //game.load.image("lv2_layer1", "assets/Background Layers/Layer 1/Lvl_2.png");
    game.load.image("lv2_layer2", "assets/Background Layers/Layer 2/Lvl_2.png");

    // these are the background layers for lv 3
    game.load.image("lv3_layer0", "assets/Background Layers/Layer 0/Lvl_3.png");
    //game.load.image("lv3_layer1", "assets/Background Layers/Layer 1/Lvl_3.png");
    game.load.image("lv3_layer2", "assets/Background Layers/Layer 2/Lvl_3.png");



	
	game.load.image("textBox", "assets/placeholder/dialogue.png");
	//game.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");


}
//<!--End Of preload()-->


