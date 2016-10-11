var LEVELS = {};

LEVELS.ONE = function(game){
	
};

LEVELS.ONE.prototype = {
	
	preload:function() {
		
		this.load.audio('frankenstein', 'assets/music/frankenstein.mp3');
	
		this.load.spritesheet("player_sprite", "assets/run.png", 96, 144);
		this.load.image("test_ground_short", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat1.png");
		this.load.image("test_ground_med", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat3.png");
		this.load.image("test_ground_med2", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat4.png");
		this.load.image("test_ground_long", "assets/All_Platforms/Resized_WholeBlue/Blue_Plat2.png");
		this.load.image("fire1", "assets/placeholder/fire1.png");
		this.load.image("fire2", "assets/placeholder/fire2.png");
		this.load.image("fire3", "assets/placeholder/fire3.png");
		
		// these are the quick background layers I had to make
		this.load.image("layer0", "assets/Background Layers/Layer 0/Lvl_1.png");
		this.load.image("layer1", "assets/Sample Backgrounds/layer1.png");
		this.load.image("layer2", "assets/Background Layers/Layer 2/Lvl_1.png");
	
		
		this.load.image("textBox", "assets/placeholder/dialogue.png");
		//this.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");
	
	},
	create:function() {
		upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);		//the key for testing dialogue display
		downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		spKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACE);
		//spKey.onDown.add(Restartgame, this);
		upKey.onDown.add(addtext, this);
		downKey.onDown.add(removetext, this);
		
		//alert(dialogue.crush);

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.input.mouse.capture = true;    // track the mouse
		this.time.advancedTiming = true;    // allow an fps counter without my having to make one

		// setting up the background images

		layer0 = this.add.sprite(0, 0, "layer0");
		layer1 = this.add.sprite(0, 0, "layer1");
		var arbitrary_num_repetitions = 16;     // or 8, or 12, try 32 for a giggle
		layer2 = this.add.group();              // layer2 repeats. So this makes it repeat.
		layer2.create(0, 0, "layer2");
		var j = 1;
		while (j < arbitrary_num_repetitions/2) {
			layer2.create(layer2.children[0].width * j, 0, "layer2");
			j++;
		}

		layer0_speed = this.world.width / (level_time / 2.0) / 60;
		layer1_speed = this.world.width / (level_time / 4.0) / 60;
		layer2_speed = this.world.width / (level_time / arbitrary_num_repetitions) / 60;


		platforms = this.add.group();
		platforms.enableBody = true;

		var start_x = 0;
		var start_y = this.world.height / 2;

		var test_ground = platforms.create(start_x, start_y, "test_ground_long");

		//var max_ground = this.add.sprite(300, required_gap_top, "test_ground_short");
		//var lowest_ground = this.add.sprite(300, required_gap_bot, "test_ground_short");



		/* call the function that randomly generates the platforms */
		
		generatePlatforms(level_time, start_x + test_ground.width, start_y);

		/*  This sets up the platforms. It both sets them to immovable and makes them scroll   */
		setPlatformsScrolling();
		
		

		// player
		player = this.add.sprite(60, test_ground.y - test_ground.height - 96, "player_sprite");
		this.physics.arcade.enable(player);
		player.body.gravity.y = player_grav;
		player.body.bounce.y = .1;
		player.body.collodeWorldBounds = true;  // although honestly the player should never move horizontally ANYway

		player.animations.add("run", [1,2,3,4,5, 6, 7], 10, true);
		player.animations.play("run");


		// music
		var music = this.add.audio('frankenstein');
		music.play();
	},
	
	update:function() {
			
		// parallax the background
		layer0.x -= layer0_speed;
		layer1.x -= layer1_speed;
		layer2.x -= layer2_speed;


		// collide the player with the platforms
		if (game.physics.arcade.collide(player, platforms))         // if they are colliding, the player will stand still and slide along with the platforms!
		{
			player.body.velocity.x = platform_scrolling_speed;
			player_can_jump = true;
		}
		else
		{
			player.body.velocity.x = 0;
			player_can_jump = false;
		}


		/*  We will have to do lots of input mouse detection...
		 *  I already wrote a click class. I'm thinking there's a global variable called "current_click."
		 *  Whenever there is mouseDown, current_click is initialized by the click's X, Y, and time of the click
		 *  Whenever there is a release, current_click.endClick( upX, upY, upTime ) is called
		 *      Then the click itself determines what type of click it was with click.classifyClick()
		 *      and THEN we do whatever we should do whatever response we should do
		 *
		 *  Ok I did this already! -Fuller <3
		 */

		if( game.input.activePointer.leftButton.isDown )        // if clicking
		{
			if( !current_click )       // if current_click === null
			{
				var time = game.time.now;
				var mouseX = game.input.mousePointer.x;
				var mouseY = game.input.mousePointer.y;
				current_click = new Click(mouseX, mouseY, time);
			}
			else                        // current click exists
			{
				if( game.time.now - current_click.startT >= 500 )
				{
					// start doing charge animation for the player to use a bomb
					console.log("charging bomb...");
				}
			}
		}
		else
		{
			if( current_click )     // if current_click !== null
			{
				var time = game.time.now;
				var mouseX = game.input.mousePointer.x;
				var mouseY = game.input.mousePointer.y;
				current_click.endClick(mouseX, mouseY, time);

				// now do all the proper testing
				if ( current_click.type === "tap" )
				{
					if( player_can_jump )
					{
						player.body.velocity.y = -player_jump_speed;  // arbitrary number. (but it is the same as what gravity is... For now, it's the height the player jumps to hit the next platform)
						// we could also set "player_can_jump" back to false here, but it should already be taken care of
					}
				}
				else if ( current_click.type === "swipe right" )
				{
					// cooldown test
				}
				else if ( current_click.type === "swipe left" )
				{
					// cooldown test
				}
				else if ( current_click.type === "swipe up")
				{
					// cooldown test
				}
				else if (current_click.type === "swipe down")
				{
					// cooldown test
					console.log("Casting lightning!");
					new LightningSpell(current_click, .2);
				}
				else if (current_click.type === "hold")
				{
					// cooldown/availability test
				}

				// allow the player to be able to click again after we do the proper response to the player's click
				current_click = null;   //
			}
		}



		// play all the current animations
		var i = 0;
		while( i < lightningSpells.length )
		{
			var temp = lightningSpells[i];//lightningSpells[i].Play();
			temp.Play();
			i++;
		}
	}

}
