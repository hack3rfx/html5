var KeyManager = {
    Keys: [
        { name: "w", code: 87, pressed: false },
        { name: "a", code: 65, pressed: false },
        { name: "s", code: 83, pressed: false },
        { name: "d", code: 68, pressed: false },
        { name: "space", code: 32, pressed: false },
        { name: "shift", code: 16, pressed: false }
    ],
    Initialize: function () {
        window.onkeydown = this.OnKeyDown;
        window.onkeyup = this.OnKeyUp;
    },
    OnKeyDown: function (e) {
        for (var i = 0; i < KeyManager.Keys.length; i++) {
            if (KeyManager.Keys[i].code === e.keyCode)
                KeyManager.Keys[i].pressed = true;
        }
    },
    OnKeyUp: function (e) {
        for (var i = 0; i < KeyManager.Keys.length; i++) {
            if (KeyManager.Keys[i].code === e.keyCode)
                KeyManager.Keys[i].pressed = false;
        }
    },
    IsKeyPressed: function (key) {
        for (var i = 0; i < KeyManager.Keys.length; i++) {
            if (KeyManager.Keys[i].name === key)
                return KeyManager.Keys[i].pressed;
        }
        return false;
    }
};