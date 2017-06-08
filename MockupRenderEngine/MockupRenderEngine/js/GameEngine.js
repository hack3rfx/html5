var GameEngine = (function () {
    function GameEngine(canvasId) {
        var _this = this;
        // Performance
        this.MAX_FPS = 60;
        this.ticks = 0;
        this.lastTickCounter = null;
        this.FPS_Counter = null;
        this.canvas = function () { return _this.context.canvas; };
        this.entities = new Array();
        // Status & Execution
        this.loopInterval = null;
        this.context = document.getElementById(canvasId).getContext("2d");
        this.Resize();
    }
    GameEngine.prototype.HookFPSCounter = function (EleId) {
        this.FPS_Counter = document.getElementById(EleId);
    };
    GameEngine.prototype.Start = function () {
        var _this = this;
        // Add Sample Entities
        var entity0 = new SampleEntity(0, 0, 20, 20);
        var entity1 = new SampleEntity(150, 200, 30, 30);
        entity1.direction = [Direction.Down];
        entity1.color = "blue";
        var entity2 = new SampleEntity(500, 500, 40, 60);
        entity2.direction = [Direction.Left];
        entity2.color = "red";
        this.entities.push(entity0, entity1, entity2);
        // Update Members
        this.status = GameEngineStatus.Running;
        this.loopInterval = setInterval(function () { _this.Loop(); }, 1000 / this.MAX_FPS);
    };
    GameEngine.prototype.Stop = function () {
        // Clear Members & Prevent Further Ticks
        this.status = GameEngineStatus.Stopped;
        this.lastTickCounter = null;
        this.ticks = 0;
        this.entities.length = 0;
        clearInterval(this.loopInterval);
    };
    GameEngine.prototype.Pause = function () {
        // Update Status - No Logic Exists For 'Paused' In This Sample
        this.status = GameEngineStatus.Paused;
    };
    GameEngine.prototype.Update = function () {
        // Update All Entities
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].Update(this.context);
        }
    };
    GameEngine.prototype.Render = function () {
        // Clear Previous 'Frame'
        this.context.clearRect(0, 0, this.canvas().width, this.canvas().height);
        // Render All Entities
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].Render(this.context);
        }
    };
    GameEngine.prototype.Tick = function () {
        this.ticks++;
        this.Update();
        this.Render();
    };
    GameEngine.prototype.Loop = function () {
        // Verify Status
        if (this.status == GameEngineStatus.Running) {
            // Update FPS Counter Every Second
            if (new Date().getTime() - this.lastTickCounter > 1000) {
                this.lastTickCounter = new Date().getTime();
                if (this.FPS_Counter != null)
                    this.FPS_Counter.innerText = this.ticks.toString();
                this.ticks = 0;
            }
            this.Tick();
        }
    };
    GameEngine.prototype.Resize = function () {
        function doResize() {
            // Adjust Canvas Proportions
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight;
        }
        // Maintain Consistent Proportions On Window Resize
        window.onresize = doResize;
        doResize();
    };
    return GameEngine;
}());
var SampleEntity = (function () {
    function SampleEntity(x, y, w, h) {
        this.direction = new Array();
        this.speed = 1;
        this.color = "purple";
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        // Sample - Set Test Direction
        this.direction.Add(Direction.Right, Direction.Down);
        this.direction.push(Direction.Right, Direction.Down);
        this.speed = 5;
    }
    SampleEntity.prototype.Update = function (context) {
        var moveUp = this.direction.Contains(Direction.Up);
        var moveRight = this.direction.Contains(Direction.Right);
        var moveDown = this.direction.Contains(Direction.Down);
        var moveLeft = this.direction.Contains(Direction.Left);
        var speed = this.direction.length > 1 ? this.speed / 2 : this.speed;
        if (moveUp)
            this.y -= speed;
        else if (moveDown)
            this.y += speed;
        if (moveLeft)
            this.x -= speed;
        else if (moveRight)
            this.x += speed;
        if (this.x + this.w > context.canvas.width) {
            this.x = context.canvas.width - this.w;
            this.direction.Remove(Direction.Right);
            this.direction.Add(Direction.Left);
        }
        if (this.x < 0) {
            this.x = 0;
            this.direction.Remove(Direction.Left);
            this.direction.Add(Direction.Right);
        }
        if (this.y + this.h > context.canvas.height) {
            this.y = context.canvas.height - this.h;
            this.direction.Remove(Direction.Down);
            this.direction.Add(Direction.Up);
        }
        if (this.y < 0) {
            this.y = 0;
            this.direction.Remove(Direction.Up);
            this.direction.Add(Direction.Down);
        }
    };
    SampleEntity.prototype.Render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    };
    return SampleEntity;
}());
var Direction = (function () {
    function Direction() {
    }
    return Direction;
}());
Direction.Left = 1;
Direction.Up = 2;
Direction.Right = 3;
Direction.Down = 4;
var GameEngineStatus = (function () {
    function GameEngineStatus() {
    }
    return GameEngineStatus;
}());
GameEngineStatus.Running = 1;
GameEngineStatus.Stopped = 2;
GameEngineStatus.Paused = 3;
Array.prototype.Remove = function (x) {
    return (this.indexOf(x) < 0) ? this : this.splice(this.indexOf(x), 1);
};
Array.prototype.Contains = function (x) {
    return this.indexOf(x) > -1;
};
Array.prototype.Add = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    if (this.indexOf(x) < 0) {
        for (var i = 0; i < x.length; i++) {
            this.push(x[i]);
        }
    }
    return this;
};
