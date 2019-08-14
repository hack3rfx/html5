var Debugger = {
    _fps: 0,
    _ticks: 0,
    _ticksRefresh: null,
    Update: function () {
        ++this._ticks;
        var now = new Date();
        if (now - this._ticksRefresh >= 1000) {
            this._fps = this._ticks;
            this._ticks = 0;
            this._ticksRefresh = now;
        }
    },
    Draw: function (context) {
        context.font = "20px Comic Sans MS";
        context.fillStyle = "yellow";
        //context.textAlign = "left";
        context.fillText("FPS: " + this._fps, 25, 50);
        context.fillText("Move: " + Player.direction, 25, 70);
    }
};