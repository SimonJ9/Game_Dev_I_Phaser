// JavaScript source code
var Level1 = function (game) {

}
Level1.prototype = {

    /* preload function */
    preload: function () {
        this.load.audio('frankenstein', 'assets/music/frankenstein.mp3');
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
        /* input variables for original prototype */
        var level_time = 45;
        var strt_x = 60;
        var strt_y = this.world.height / 2;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.input.mouse.capture = true;    // track the mouse
        this.time.advancedTiming = true;    // allow an fps counter without my having to make one

        this.platform_scrolling_speed = 500;
        this.level_time = level_time;

        // create layers
        this.layer0 = this.add.sprite(0, 0, "lv1_layer0");
        this.layer1 = this.add.sprite(0, 0, "lv1_layer1");
        this.layer2 = this.add.group();              // layer2 repeats. So this makes it repeat.
        this.layer2.create(0, 0, "lv1_layer2");
        var arbitrary_num_repetitions = 16;     // or 8, or 12, try 32 for a giggle
        var j = 1;
        while (j < arbitrary_num_repetitions / 2 ) {
            this.layer2.create(this.layer2.children[0].width * j, 0, "lv1_layer2");
            j++;
        }

        // set layer speeds
        this.layer0_speed = this.world.width / (this.level_time / 2.0) / 60;
        this.layer1_speed = this.world.width / (this.level_time / 4.0) / 60;
        this.layer2_speed = this.world.width / (this.level_time / arbitrary_num_repetitions) / 60;
        this.moving = true;
        this.stopped = false;

        // create the platforms
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
        this.start_x = strt_x;
        this.start_y = strt_y;

        this.test_ground = this.platforms.create(this.start_x, this.start_y, "lv1_ground_long");
        //console.log(this.test_ground.x.ToString() + "\t" + this.test_ground.y.ToString());

        /* call the function that randomly generates the platforms */
        //console.log("Generating platforms");
        this.GeneratePlatforms(this.start_x + this.test_ground.width, this.start_y);
        //console.log("done");

        /*  This sets up the platforms. It both sets them to immovable and makes them scroll   */
        this.SetPlatformsScrolling();


        // player
        player = this.add.sprite(this.start_x, this.test_ground.y - this.test_ground.height - 96, "player_sprite");
        this.physics.arcade.enable(player);
        player.body.gravity.y = player_grav;
        player.body.bounce.y = .1;
        player.body.collodeWorldBounds = true;  // although honestly the player should never move horizontally ANYway
        //player.body.friction = new Phaser.Point(0, 0);


        player.animations.add("run", [1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add("jump", [8, 9, 10, 11], 10, true);
        player.animations.add("fall", [12, 13, 14, 15], 10, true);
        player.animations.add("skid", [16, 17, 18, 19], 10, true);
        player.animations.add("back", [20], 10, false);
        player.animations.play("run");

        // cutscene
        this.CUTSCENE = false;
        this.CUTSCENE_INITIALIZED = false;

        // the door
        this.door;

        // music
        this.music = this.add.audio('frankenstein');
        this.music.play();

		//Text
		box = this.add.sprite(0, 550, "textBox");
		box.destroy();
		AT = this.add.text(60, 600, "", style);
		AT.destroy();
		tempT = dialogue.crush.split('');
		windex = 0;
		lindex = 0;
		started = false;
		ended = false;
		play = false;
		show = false;
	},

    /* update loop */
    update: function () {
        // IRREGULAR PART OF GAME PLAY
        if (this.CUTSCENE)
        {
            if (!this.CUTSCENE_INITIALIZED)
            {
                this.CUTSCENE_INITIALIZED = true;
                player.body.velocity.y = 0;
                player.body.gravity.y = 0;
                //console.log("initialized cutscene");
            }
            else
            {
                var not_in_motion = false;
                if (this.door.x - player.x <= 400 )
                {
                    if (player.body.velocity.x > 54)
                    {
                        player.animations.play("skid");
                        player.body.velocity.x *= .981;
                        //console.log(player.x);
                    }
                    else {
                        //console.log("zero'd\t" + player.x.toString());
                        player.body.velocity.x = 0;
                        not_in_motion = true;
                        player.animations.play("back");
                    }
                }

                if( not_in_motion )
                {
                    //console.log("play the test dialogue stuff hereeeeeeee");
					
					if(lindex === 0)
					{
						tempT = dialogue.firstCrys1.split("");
					}
					if(lindex === 1)
					{
						tempT = dialogue.firstCrys2.split("");
					}
					if(lindex > 1)
					{
						// WHENEVER THE DIALOGUE FINISHES PLAYING, RUN THESE THREE LINES OF CODE
						this.door.animations.play("open");
						this.pedestal.animations.play("off");
                        
						// wait a few seconds, then
						this.state.start("Level_2");
					}
					
                    if(!play)
					{
						windex = 0;
						show = true;
						play = true;
					}
					else
					{
						show = false;
					}
                }
                
            }

        }

        // REGULAR PART OF GAME PLAY
        else
        {
            this.layer0.x -= this.layer0_speed;
            this.layer1.x -= this.layer1_speed;
            this.layer2.x -= this.layer2_speed;
            

            // if the platforms have SCROLLED FAR ENOUGH!


            // collide the player with the platforms
            if (this.physics.arcade.collide(player, this.platforms))         // if they are colliding, the player will stand still and slide along with the platforms!
            {
                player.animations.play("run");
                player_can_jump = true;
                if (this.layer1.x <= -1 * this.world.width * 4.5 && !this.stopped) {
                    this.CUTSCENE = true;
                    this.moving = false;
                    this.stopped = true;
                    this.SetPlatformsStationary();
                    //console.log("finished set stationary");
                    player.body.velocity.x = 500;       // this is the scrolling speed of the original level. Hardcoding it in here is SO important for the skidding animation
                }

            }
            else {
                player_can_jump = false;
                if (player.body.velocity.y < 0) {
                    player.animations.play("jump");
                }
                else
                {
                    player.animations.play("fall");
                }
            }

            // restart the level if the player falls below a certain height
            if (player.y >= required_gap_bot) {
                console.log("Help! I've fallen and I can't get up!");
                //Level1.Restart(true, false);
                this.music.stop();
                this.state.start("Level_1");
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

            if (this.input.activePointer.leftButton.isDown)        // if clicking
            {
                if (!current_click)       // if current_click === null
                {
                    var time = this.time.now;
                    var mouseX = this.input.mousePointer.x;
                    var mouseY = this.input.mousePointer.y;
                    current_click = new Click(mouseX, mouseY, time);
                }
                else                        // current click exists
                {
                    if (this.time.now - current_click.startT >= 500) {
                        // start doing charge animation for the player to use a bomb
                        console.log("charging bomb...");
                    }
                }
            }
            else {
                if (current_click)     // if current_click !== null
                {
                    var time = this.time.now;
                    var mouseX = this.input.mousePointer.x;
                    var mouseY = this.input.mousePointer.y;
                    current_click.endClick(mouseX, mouseY, time);

                    // now do all the proper testing
                    if (current_click.type === "tap") {
                        if (player_can_jump) {
                            player.body.velocity.y = -player_jump_speed;  // arbitrary number. (but it is the same as what gravity is... For now, it's the height the player jumps to hit the next platform)
                            // we could also set "player_can_jump" back to false here, but it should already be taken care of
                        }
                    }
                    else if (current_click.type === "swipe right") {
                        // cooldown test
                    }
                    else if (current_click.type === "swipe left") {
                        // cooldown test
                    }
                    else if (current_click.type === "swipe up") {
                        // cooldown test
                    }
                    else if (current_click.type === "swipe down") {
                        // cooldown test
                        console.log("Casting lightning!");
                        new LightningSpell(current_click, .2);
                    }
                    else if (current_click.type === "hold") {
                        // cooldown/availability test
                    }

                    // allow the player to be able to click again after we do the proper response to the player's click
                    current_click = null;   //
                }
            }
        }
        
		//Text. turn show on if text is to be displayed
		if(show)
		{
			//console.log("displaying....");
			this.addtextbox();
			
			if(!started)
			{
				ended = false;
				this.time.events.repeat(wordDelay, tempT.length, this.nextChar, this);
				started = true;
			}
			show = false;
		}
    }
};

Level1.prototype.SetPlatformsScrolling = function () {
    var i = 0;
    for (i; i < this.platforms.children.length; i++) {
        this.platforms.children[i].body.immovable = true;
        this.platforms.children[i].body.velocity.x = -this.platform_scrolling_speed;  // setting it's velocity here means it will just always move...
        this.platforms.children[i].body.friction = new Phaser.Point(0, 0);
    }
};

Level1.prototype.GeneratePlatforms = function (begin_x, begin_y) {    /*  Player's speed is equal to platform_scrolling_speed 
     *  Playtime that the level should be is level_time (in seconds)
     *  So, the total number of pixels to cover is
     *      platform_scrolling_speed * level_time
     * 
     *  The total number of pixels to cover is the sum of
     *      - width of each platform
     *      - distance between each platform
     */

    
    //console.log(this.platform_scrolling_speed.toString());
    this.total_distance_to_cover = this.platform_scrolling_speed * this.level_time;        // in pixels
    console.log("Total distance to cover: " + this.total_distance_to_cover.toString());

    var level_end_cursor = begin_x;
    var curr_y = begin_y;
    var jump_dist_x, platform_width, curr_platform;


    var max_y = 100 * player_jump_speed / 400;
    var min_y = 80 * player_jump_speed / 400;    //80


    var prev_results = [true, false, true, false];  // one more than the max number
    while (level_end_cursor <= this.total_distance_to_cover) {   /*  Basic process is:
         *      1. Determine if the next platform will be above or below the current platform
         *          - check to make sure the platform is not above the top of the screen
                    - also make sure the platform is not below the bottom of the screen
         *      2. Generate whether the next platform will be up or down and the resulting height
         *      3. Determine what type of platform length we will have
         *      4. Based on the type of platform, diff_y, and whether up/down is next, generate an acceptable x distance between platforms
         *      5. Move the platform to the level_end_cursor and curr_y
         *      6. Add the width of the generated platform to the level_end_cursor
         */

        /*  1. Determine if the next platform will be above or below the current platform
         *      But we don't ACTUALLY want true randomness. Here, we check to see if this result would make the previous three
         */
        prev_results.shift();
        var next_platform_above = (Math.random() >= .5);
        /* ensure we don't get a bunch of repeated results (because THAT makes for boring generation! */
        if (prev_results[0] === prev_results[1] && prev_results[1] === prev_results[2] && prev_results[2] === next_platform_above) {
            next_platform_above = !next_platform_above;
        }
        prev_results.push(next_platform_above);


        /*  2. Generate whether the next platform will be up or down and the resulting height */
        var diff_y = min_y + Math.floor(Math.random() * (max_y - min_y));

        var place_above = next_platform_above;
        // make sure the next platform won't be above or below an arbitrarily decided acceptable height
        if (next_platform_above) {
            if (curr_y - diff_y <= required_gap_top) {
                place_above = false;
            }
        }
        else {
            if (curr_y + diff_y >= required_gap_bot) {
                place_above = true;
            }
        }

        if (place_above) {
            curr_y -= diff_y;
        }
        else {
            curr_y += diff_y;
        }

        /*  3. Determine what type of platform length we will have */
        var platform_type_reference = ["short", "med", "long"];
        var platform_type_ran = Math.floor(Math.random() * (3 - 0)) + 0;
        var platform_type = platform_type_reference[platform_type_ran];
        var curr_platform = null;
        var medium_type = true;
        if (platform_type === "short") {
            curr_platform = this.platforms.create(0, 0, "lv1_ground_short");
        }
        else if (platform_type === "med") {
            medium_type = (Math.random() <= 0.5);
            if (medium_type) {
                curr_platform = this.platforms.create(0, 0, "lv1_ground_med1");
            }
            else {
                curr_platform = this.platforms.create(0, 0, "lv1_ground_med2");
            }
        }
        else if (platform_type === "long") {
            curr_platform = this.platforms.create(0, 0, "lv1_ground_long");
        }


        /*  4. Based on the type of platform, diff_y, and whether up/down is next, generate an acceptable x distance between platforms  */
        var jump_distance = 0;
        if (place_above)   // just needs to be a jumpable distance from where we are now
        {
            var max_x = 220 * this.platform_scrolling_speed / 400;
            var min_x = 140 * this.platform_scrolling_speed / 400;
            jump_distance = min_x + Math.floor(Math.random() * (max_x - min_x));
        }
        else {   /*  Either make a "drop" platform, or one that the player will need to jump to */
            var is_drop = (Math.random() <= 0.5);
            if (is_drop)       /* player doesn't have to do anything other than let themselves fall */ {
                var max_x = 220 * this.platform_scrolling_speed / 400;
                var min_x = 140 * this.platform_scrolling_speed / 400;
                jump_distance = min_x + Math.floor(Math.random() * (max_x - min_x));
            }
            else                /* player will be required to jump */ {
                /*  The formula for the height as a function of time (normally) is:
                 *      h(t) = h0 + v0 * t - 1/2 * a * t ^ 2
                 *  BUT, because positive y is down, the formula ACTUALLY is
                 *      y(t) = h0 - v0*t + 1/2*a*t*t
                 *
                 *  y(t) = hf = h0 - v0*t + 1/2*a*t*t       <-- where hf is the height of the next platform
                 *  Now, to solve this quadratic equation it's as easy as applying the quadratic formula!
                 *  h0 - v0*t + 1/2*a*t^2 = hf  --> becomes --> Ax^2 + Bx + C, where
                 *  A = 1/2 * a
                 *  B = -v0
                 *  C = h0 - hf
                 *
                 *  The quadratic formula is:
                 *  x = (-B +- sqrt( B^2 - 4*A*C)) / 2*A
                 *
                 *  t = (  v0 +- sqrt( v0*v0 - 4*1/2*a*(h0-hf) )  ) / (2 * 1/2 a)
                 *  See? That was easy! But... Wait! That gives us two answers! One for the plus and one for the minus!
                 *  That's fine, the coordinate determined by the minus is to the left of the player anyway
                 *      Basically, we only care about the forward direction, so we're only gonna use the plus
                 *
                 *
                 *
                 */

                //var h0 = curr_y - diff_y;   // this is the original height before the jump
                //var hf = curr_y;
                //var v0 = player_jump_speed;
                //var a = player_grav;

                //var A = 1.0 / 2.0 * a;
                //var B = -v0;
                //var C = h0 - hf;

                //var t3  = (-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A);
                //var t2 = (v0 + Math.sqrt(v0 * v0 - 2 * a * (h0 - hf))) / a;
                var t = (player_jump_speed + Math.sqrt(player_jump_speed * player_jump_speed - 2 * player_grav * (-diff_y))) / player_grav;

                /*  "t" is the time the player will spend in the air before they reach the height of the next platform.
                    With that in mind, it's easy to determine the gap to the next platform */
                var exact_jump_dist = t * this.platform_scrolling_speed;
                /*  This distance is the maximum distance the player can actually be expected to jump
                    So, I'm just going to drag a platform 1/3 it's width to the left of the position */
                jump_distance = exact_jump_dist - curr_platform.width / 3.0;
            }
        }

        // add the jump_distance to the cursor marking the end of the built level
        level_end_cursor += jump_distance;


        /*  5. Move the platform to the level_end_cursor and curr_y */
        curr_platform.x = level_end_cursor;
        curr_platform.y = curr_y;

        /*  6. Add the width of the generated platform to the level_end_cursor */
        level_end_cursor += curr_platform.width;
    }

    // save the end of the level
    this.level_end = level_end_cursor;
    //console.log("End of level: " + level_end_cursor.toString());

    this.PlaceCutsceneObjects(curr_y);

};


Level1.prototype.PlaceCutsceneObjects = function (current_y) {
    /* make a really long stretch of platforms... */
    var num = 0;
    var end_marker = this.level_end;

    while( num < 7 )
    {
        var ground = this.platforms.create(end_marker, current_y, "lv1_ground_long");
        end_marker += ground.width;
        num ++
    }

    // also put the door down
    //console.log("Placing the door");
    this.door = this.platforms.create(end_marker + ground.width - game.world.width / 2, -196 + current_y, "door");
    this.door.animations.add("closed", [0], 10, false);
    this.door.animations.add("open", [1], 10, false);
    this.door.animations.play("closed");
    //console.log(this.door.toString());

    this.pedestal = this.platforms.create(end_marker + ground.width - game.world.width / 2 + this.door.width, -96 + 9 + current_y, "pedestal");
    this.pedestal.animations.add("on", [1], 10, false);
    this.pedestal.animations.add("off", [0], 10, false);
    this.pedestal.animations.play("on");

};

Level1.prototype.SetPlatformsStationary = function () {
    //console.log("Setting object immovable");
    var b = 0;
    for (b; b < this.platforms.children.length; b++)
    {
        this.platforms.children[b].body.velocity.x = 0;
    }
};

Level1.prototype.addtextbox = function()
{
	//console.log(currentText);
	box = this.add.sprite(0, 550, "textBox");
	box.inputEnabled = true;
	box.input.useHandCursor = true;
	//console.log(this.this);
	box.events.onInputDown.add(this.removetext, this.this);
	AT = this.add.text(60, 600, "", style);
};

Level1.prototype.removetext = function(sprite)
{
	//console.log(undefined === sprite);
	ended = true;
	started = false;
	AT.destroy();
	sprite.destroy();
	play = false;
	lindex++;
	windex = 0;
};

Level1.prototype.nextChar = function()
{
	if(!ended)
	{
		AT.text = AT.text.concat(tempT[windex]);
	}
	//console.log(AT.text);
	windex++;

	if(windex === tempT.length)
	{
		started = false;
		ended = true;
		return;
	}
}