//<!--load before the game-->

function preload()
{
    game.load.spritesheet("player_sprite", "assets/run.png", 96, 144);
    game.load.image("test_ground_short", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat1.png");
    game.load.image("test_ground_med", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat3.png");
    game.load.image("test_ground_med2", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat4.png");
    game.load.image("test_ground_long", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat2.png");
    game.load.image("fire1", "assets/placeholder/fire1.png");
    game.load.image("fire2", "assets/placeholder/fire2.png");
    game.load.image("fire3", "assets/placeholder/fire3.png");
    
    // these are the quick background layers I had to make
    game.load.image("layer0", "assets/Background Layers/Layer 0/Lvl_1.png");
    game.load.image("layer1", "assets/Sample Backgrounds/layer1.png");
    game.load.image("layer2", "assets/Background Layers/Layer 2/Lvl_1.png");

	
	game.load.image("textBox", "assets/placeholder/dialogue.png");
	//game.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");


}
//<!--End Of preload()-->


