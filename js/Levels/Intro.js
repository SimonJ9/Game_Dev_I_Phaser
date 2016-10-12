// JavaScript source code
var Intro = function (game) {

}
Intro.prototype = {


    /* preload function */
    preload: function () {
        this.load.spritesheet("screen", "assets/Scenes/Intro_spritesheet.png", 1334, 750);

        this.input.mouse.capture = true;    // track the mouse
        //Text
        box = this.load.image("textBox", "assets/placeholder/dialogue.png");
        show = false;
        //this.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");

        //Text
        box = this.load.image("textBox", "assets/placeholder/dialogue.png");
        show = false;
        //this.load.bitmapFont("8bit_wonder", "assets/8-BIT WONDER.TTF");

        this.load.image("heart","assets/emojis/Heart.png");
        this.load.image("wifi","assets/emojis/NoWifis copy.png");
        this.load.image("irr", "assets/emojis/Irritated.png");
        this.load.image("message", "assets/emojis/message.png");
        

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

        emo = this.add.sprite(0, 0, "heart");
        emo.destroy();

        this.timer = this.time.create(false);
        this.timer.loop(1600, this.playemoji, this.this);
        timerStart = false;

    },

    /* update loop */
    update: function () {
        if( !this.dialogue1_finished)
        {
            this.screen.animations.play("scene1");
            /* play dialogue */
            // set this variable to true when finished
            // this.dialogue1_finished = true;
            //this.add.sprite(720, 70, "heart");
            //Add emojis
            if(!timeStart)
            {
                this.timer.start();
                timerStart = true;
            }

            if(lindex === 0)
            {
                tempT = dialogue.crush.split("");
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
        else if(!this.dialogue2_finished)
        {
            //console.log(this.dialogue1_finished);
            this.screen.animations.play("scene2");
            /* play dialogue */
            // set this variable to true when finished
            this.dialogue2_finished = true;
            



        }
        else if (!this.dialogue3_finished) {
            this.screen.animations.play("scene3");
            /* play dialogue */
            // set this variable to true when finished
            // this.dialogue3_finished = true;
            if(lindex === 0)
            {
                tempT = dialogue.confused.split("");
            }
            if(lindex > 0)
            {
                this.dialogue3_finished = true;
                lindex - 0;
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
        else
        {
            this.LoadLevel1();
        }

    }
};

Intro.prototype.LoadLevel1 = function () {
    this.state.start("Level_1");
};

Intro.prototype.addtextbox = function()
{
    //console.log(currentText);
    box = this.add.sprite(0, 550, "textBox");
    box.inputEnabled = true;
    box.input.useHandCursor = true;
    //console.log(this.this);
    box.events.onInputDown.add(this.removetext, this.this);
    AT = this.add.text(60, 600, "", style);
};

Intro.prototype.removetext = function(sprite)
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

Intro.prototype.nextChar = function()
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

Intro.prototype.playemoji = function()
{
    if(emoIndex === 0 )
    {
        console.log(this);
        //emo = this.add.sprite(720, 70, "heart");
    }
    if(emoIndex === 1)
    {
        //emo = this.add.sprite(720, 70, "wifi");
    }
    if(emoIndex === 2)
    {
        //emo = this.add.sprite(720, 70, "irr");
    }
    emoIndex++;
    emo.scale.setTo(0.3, 0.3);
}