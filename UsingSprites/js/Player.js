var Player = {
    _speed: 5,
    spriteSheet: null,
    x: 4,
    y: 5,
    width: 77,
    height: 83,
    isMoving: false,
    direction: "",
    sprite: {
        row: 0,
        col: 0,
        cTicks: 0
    },
    Initialize: function (canvas) {
        this.x = (canvas.width / 2) - (this.width / 2);
        this.y = (canvas.height / 2) - (this.height / 2);

        var img = new Image();
        img.onload = function () {
            Player.spriteSheet = img;
        };
        img.src = "assets/player_sprites.png";
    },
    Update: function (canvas) {
        this.isMoving = false;

        var yDelta = 0, xDelta = 0, factoredSpeed = this._speed;
        this.direction = "";

        if (KeyManager.IsKeyPressed("shift"))
            factoredSpeed *= 2;

        // Moving up
        if (KeyManager.IsKeyPressed("w")) {
            this.direction += "up ";
            yDelta += -factoredSpeed;
        }
        // Moving down
        if (KeyManager.IsKeyPressed("s")) {
            this.direction += "down ";
            yDelta += factoredSpeed;
        }
        // Moving left
        if (KeyManager.IsKeyPressed("a")) {
            this.direction += "left ";
            xDelta += -factoredSpeed;
        }
        // Moving right
        if (KeyManager.IsKeyPressed("d")) {
            this.direction += "right ";
            xDelta += factoredSpeed;
        }

        if (yDelta || xDelta) {
            this.isMoving = true;

            if (yDelta && xDelta) {
                this.y += yDelta * 0.75;
                this.x += xDelta * 0.75;
                this.sprite.row = xDelta > 0 ? 7 : 5;
            }
            else if (yDelta) {
                this.y += yDelta;
                this.sprite.row = yDelta > 0 ? 4 : 6;
            }
            else if (xDelta) {
                this.x += xDelta;
                this.sprite.row = xDelta > 0 ? 7 : 5;
            }
        }
        else {
            this.sprite.col = 0;
            this.sprite.cTicks = 0;
            if (this.sprite.row >= 4) {
                this.sprite.row -= 4;
            }
        }

        if (this.x < 0)
            this.x = 0;
        else if (this.x + this.width > canvas.width)
            this.x = canvas.width - this.width;

        if (this.y < 0)
            this.y = 0;
        else if (this.y + this.height > canvas.height)
            this.y = canvas.height - this.height;
    },
    Draw: function (context) {
        context.drawImage( this.spriteSheet,
            (Player.sprite.col * 96) + 1, (Player.sprite.row * 104) + 1,
            95, 102,
            Player.x, Player.y,
            Player.width, Player.height
        );

        if (Player.isMoving) {
            ++this.sprite.cTicks;
            if (this.sprite.cTicks >= 5) {
                this.sprite.cTicks = 0;
                ++Player.sprite.col;
                if (Player.sprite.col > 9)
                    Player.sprite.col = 0;
            }
        }
    }
};