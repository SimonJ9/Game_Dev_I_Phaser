
// Click class
var Click = function (startX, startY, startT) {
    this.startX = startX;
    this.startY = startY;
    this.startT = startT;

    // initialize variables that will be used later
    this.endX = -1;
    this.endY = -1;
    this.endT = -1;
    this.type = null;
};

Click.prototype.endClick = function (upX, upY, upTime) {
    this.endX = upX;
    this.endY = upY;
    this.endT = upTime;
    this.classifyClick();    // determines what type of click it is
};

Click.prototype.classifyClick = function () {
    if (this.endX === -1 || this.endY === -1 || this.endT === -1)     // for safety
    {
        console.log("In the middle of a click...");
    }

    var diffX = this.endX - this.startX;
    var diffY = this.endY - this.startY;
    var distance_traveled = Math.sqrt((diffX) * (diffX) + (diffY) * (diffY));

    // now, to start classifying the click type
    if ((this.endT - this.startT) < 1000 && distance_traveled <= 50)      // DETECT TAP
    {
        this.type = "tap";
        console.log("Tap!");
    }
    else if ((this.endT - this.startT) >= 1000)                            // DETECT HOLD
    {
        this.type = "hold";
        console.log("Hold!");
    }
    else if (distance_traveled >= 50)                                      // DETECT SWIPE
    {
        /* Distinguisges between swipes in each of the 4 directions */
        var abs_diffX = diffX;
        if (abs_diffX < 0) abs_diffX *= -1;
        var abs_diffY = diffY;
        if (abs_diffY < 0) abs_diffY *= -1;
        var slope = abs_diffY / abs_diffX;      // the ratio between the difference in X and the difference in Y

        if (slope > 1 || diffX === 0)          // vertical swipe
        {
            if (diffY > 0) {
                this.type = "swipe down";
                console.log("Swipe down!");
            }
            else {
                this.type = "swipe up";
                console.log("Swipe up!");
            }
        }
        else if (slope < 1 || diffY === 0)     // horizontal swipe
        {
            if (diffX > 0) {
                this.type = "swipe right";
                console.log("Swipe right!");
            }
            else {
                this.type = "swipe left";
                console.log("Swipe left!");
            }
        }
        else {
            console.log("Wow... The Chosen Swipe");
        }
    }
    else {
        console.log("Wow that was a really shitty click if I do say so myself.");
    }
};