//<!--load before the game-->

function preload()
{
    game.load.spritesheet("test_dude", "assets/placeholder/dude.png", 32, 48);
    game.load.image("test_ground_short", "assets/testing platforms_small.png");
    game.load.image("test_ground_med", "assets/testing platforms.png");
    game.load.image("test_ground_long", "assets/testing platforms_big.png");
    game.load.image("fire1", "assets/placeholder/fire1.png");
    game.load.image("fire2", "assets/placeholder/fire2.png");
    game.load.image("fire3", "assets/placeholder/fire3.png");
    
    // these are the quick background layers I had to make
    game.load.image("layer0", "assets/Sample Backgrounds/layer0.png");
    game.load.image("layer1", "assets/Sample Backgrounds/layer1.png");
    game.load.image("layer2", "assets/Sample Backgrounds/layer2.png");
	
	
	game.load.image("textBox", "assets/placeholder/dialogue.png");
	//game.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");


}
//<!--End Of preload()-->


