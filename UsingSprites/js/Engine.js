var Engine = {
    _debug: false,
    _fps: 60,
    _interval: null,
    _running: false,
    _canvas: null,
    _context: null,
    _Tick: function () {
        Engine._Update();
        Engine._Draw();
    },
    _Update: function () {
        Player.Update(this._canvas);
        if (this._debug)
            Debugger.Update();
    },
    _Draw: function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        Landscape.Draw(this._context);
        Player.Draw(this._context);
        if (this._debug)
            Debugger.Draw(this._context);
    },
    Initialize: function (CanvasId) {
        this._canvas = document.getElementById(CanvasId);
        this._context = this._canvas.getContext("2d");
        window.onresize = this.ResizeCanvas;
        this.ResizeCanvas();
        KeyManager.Initialize();
        Landscape.Initialize();
        Player.Initialize(this._canvas);
    },
    Start: function (withDebugger) {
        if (withDebugger)
            this._debug = true;
        this._running = true;
        this._interval = setInterval(this._Tick, 1000 / this._fps);
        this._lastTickRefresh = new Date();
    },
    Stop: function () {
        this._running = false;
        clearInterval(this._interval);
    },
    ResizeCanvas: function () {
        Engine._context.canvas.width = window.innerWidth;
        Engine._context.canvas.height = window.innerHeight;
    }
};