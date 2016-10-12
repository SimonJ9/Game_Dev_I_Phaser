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
        this.screen.animations.add("scene2", [1], 1, false);
        this.screen.animations.add("scene3", [2], 1, false);

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
            //this.dialogue1_finished = true;

            if(lindex === 0)
            {
                tempT = ".........".split("");
            }
            if(lindex > 0)
            {
                this.dialogue1_finished = true;
                lindex = 0;
            }
            
            if(!this.dialogue1_finished) 
                { 
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
        }
        else if (!this.dialogue2_finished) {
            this.screen.animations.play("scene2");
            /* play dialogue */
            // set this variable to true when finished
            // this.dialogue2_finished = true;
            if(lindex === 0)
            {
                tempT = dialogue.finalCut1.split("");
            }
            if(lindex > 0)
            {
                this.dialogue2_finished = true;
                lindex = 0;
            }
            
            if(!this.dialogue2_finished) 
                { 
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
        }
        else if (!this.dialogue3_finished) {
            this.screen.animations.play("scene3");
            /* play dialogue */
            // set this variable to true when finished
            // this.dialogue3_finished = true;
            if(lindex === 0)
            {
                tempT = dialogue.finalCut2.split("");
            }
            if(lindex === 1)
            {
                tempT = dialogue.AlexMom.split("");
            }
            if(lindex > 1)
            {
                this.dialogue3_finished = true;
                lindex = 0;
                this.state.start("Menu");
            }
            
            if(!this.dialogue3_finished) 
                { 
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
        }
        else {
            this.LoadMainMenu();
        }

    }
};

Ending.prototype.addtextbox = function()
{
    //console.log(currentText);
    box = this.add.sprite(0, 550, "textBox");
    box.inputEnabled = true;
    box.input.useHandCursor = true;
    //console.log(this.this);
    box.events.onInputDown.add(this.removetext, this.this);
    AT = this.add.text(60, 600, "", style);
};

Ending.prototype.removetext = function(sprite)
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

Ending.prototype.nextChar = function()
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

Ending.prototype.LoadMainMenu = function () {
    this.state.start("Main Menu");
};