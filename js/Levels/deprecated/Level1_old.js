

/* This is the same as preload */
var Level1 = function (level_time, strt_x, strt_y) { 

    this.platform_scrolling_speed = 500;
    this.level_time = level_time;

    // create layers
    this.layer0 = game.add.sprite(0, 0, "lv1_layer0");
    this.layer1 = game.add.sprite(0, 0, "lv1_layer1");
    this.layer2 = game.add.group();              // layer2 repeats. So this makes it repeat.
    this.layer2.create(0, 0, "lv1_layer2");
    var arbitrary_num_repetitions = 16;     // or 8, or 12, try 32 for a giggle
    var j = 1;
    while (j < arbitrary_num_repetitions/2 + 1) {
        this.layer2.create(this.layer2.children[0].width * j, 0, "lv1_layer2");
        j++;
    }

    // set layer speeds
    this.layer0_speed = game.world.width / (this.level_time / 2.0) / 60;
    this.layer1_speed = game.world.width / (this.level_time / 4.0) / 60;
    this.layer2_speed = game.world.width / (this.level_time / arbitrary_num_repetitions) / 60;
    this.moving = true;
    this.stopped = false;

    // create the platforms
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    this.start_x = strt_x;
    this.start_y = strt_y;

    this.test_ground = this.platforms.create(this.start_x, this.start_y, "lv1_ground_long");
    //console.log(this.test_ground.x.ToString() + "\t" + this.test_ground.y.ToString());

    /* call the function that randomly generates the platforms */
    console.log("Generating platforms");
    this.GeneratePlatforms(this.start_x + this.test_ground.width, this.start_y);
    console.log("done");

    /*  This sets up the platforms. It both sets them to immovable and makes them scroll   */
    this.SetPlatformsScrolling();

};


Level1.prototype.Update = function () {
    if (this.moving)
    {
        this.layer0.x -= this.layer0_speed;
        this.layer1.x -= this.layer1_speed;
        this.layer2.x -= this.layer2_speed;
    }
    /*
    else // just to see what the end looks like
    {
        this.layer0.x -= this.layer0_speed;
        this.layer1.x -= this.layer0_speed;
        this.layer2.x -= this.layer0_speed;
    }*/
    
    // if the platforms have SCROLLED FAR ENOUGH!
    if(this.layer0.x <= -1 * game.world.width * 2 && !this.stopped)
    {
        console.log("Reached the end");
        this.Stop();
    }

};

Level1.prototype.Stop = function () {
    this.moving = false;
    this.stopped = true;
};


Level1.prototype.SetPlatformsScrolling = function () {
    var i = 0;
    for (i; i < this.platforms.children.length; i++) {
        this.platforms.children[i].body.immovable = true;
        this.platforms.children[i].body.velocity.x = -this.platform_scrolling_speed;  // setting it's velocity here means it will just always move...
    }
};

Level1.prototype.GeneratePlatforms = function (begin_x, begin_y)
{    /*  Player's speed is equal to platform_scrolling_speed 
     *  Playtime that the level should be is level_time (in seconds)
     *  So, the total number of pixels to cover is
     *      platform_scrolling_speed * level_time
     * 
     *  The total number of pixels to cover is the sum of
     *      - width of each platform
     *      - distance between each platform
     */

    var required_gap_top = 96 + 96 / 2;       // 96 + 48 = 144
    var required_gap_bot = 750 - 96 / 2;      // game.world.height (750) - 48 = 712
    console.log(this.platform_scrolling_speed.toString());
    this.total_distance_to_cover = this.platform_scrolling_speed * this.level_time;        // in pixels
    console.log("Total distance to cover: " + this.total_distance_to_cover.toString());

    var level_end_cursor = begin_x;
    var curr_y = begin_y;
    var jump_dist_x, platform_width, curr_platform;


    var max_y = 100 * player_jump_speed / 400;
    var min_y = 80 * player_jump_speed / 400;    //80


    var prev_results = [true, false, true, false];  // one more than the max number
    console.log("going to start while loop");
    while (level_end_cursor <= this.total_distance_to_cover)
    {   /*  Basic process is:
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
            if (medium_type)
            {
                curr_platform = this.platforms.create(0, 0, "lv1_ground_med1");
            }
            else
            {
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
            if (is_drop)       /* player doesn't have to do anything other than let themselves fall */
            {
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

};