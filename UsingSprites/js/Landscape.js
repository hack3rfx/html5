var Landscape = {
    images: null,
    Initialize: function () {
        var img = new Image();
        img.onload = function () {
            Landscape.image = img;
        };
        img.src = "assets/Grass_1.png";
    },
    Draw: function (context) {
        for (var w = 0; w < Math.ceil(context.canvas.width / this.image.width); w++) {
            for (var h = 0; h < Math.ceil(context.canvas.height / this.image.height); h++) {
                context.drawImage(this.image,
                    0,
                    0,
                    this.image.width,
                    this.image.height,
                    w * this.image.width,
                    h * this.image.height,
                    this.image.width,
                    this.image.height
                );
            }
        }
    }
};