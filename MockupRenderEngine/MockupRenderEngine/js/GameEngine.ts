class GameEngine {
    // Performance
    private MAX_FPS: number = 60;
    private ticks: number = 0;
    private lastTickCounter: number = null;
    private FPS_Counter: HTMLElement = null;
    // Interaction Objects
    private context: CanvasRenderingContext2D;
    private canvas = () => { return this.context.canvas as HTMLCanvasElement; };
    private entities: SampleEntity[] = new Array<SampleEntity>();
    // Status & Execution
    private loopInterval: number = null;
    private status: number;

    constructor(canvasId: string) {
        this.context = <CanvasRenderingContext2D>(<HTMLCanvasElement>document.getElementById(canvasId)).getContext("2d");
        this.Resize();
    }

    public HookFPSCounter(EleId: string): void {
        this.FPS_Counter = document.getElementById(EleId) as HTMLElement;
    }

    public Start(): void {
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
        this.loopInterval = setInterval(() => { this.Loop(); }, 1000 / this.MAX_FPS);
    }

    public Stop(): void {
        // Clear Members & Prevent Further Ticks
        this.status = GameEngineStatus.Stopped
        this.lastTickCounter = null;
        this.ticks = 0;
        this.entities.length = 0;
        clearInterval(this.loopInterval);
    }

    public Pause(): void {
        // Update Status - No Logic Exists For 'Paused' In This Sample
        this.status = GameEngineStatus.Paused;
    }

    private Update(): void {
        // Update All Entities
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].Update(this.context);
        }
    }

    private Render(): void {
        // Clear Previous 'Frame'
        this.context.clearRect(0, 0, this.canvas().width, this.canvas().height);
        // Render All Entities
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].Render(this.context);
        }

    }

    private Tick(): void {
        this.ticks++;
        this.Update();
        this.Render();
    }

    private Loop(): void {
        // Verify Status
        if (this.status == GameEngineStatus.Running) {
            // Update FPS Counter Every Second
            if (new Date().getTime() - this.lastTickCounter > 1000) {
                this.lastTickCounter = new Date().getTime();
                if (this.FPS_Counter != null) this.FPS_Counter.innerText = this.ticks.toString();
                this.ticks = 0;
            }

            this.Tick();
        }
    }

    private Resize(): void {
        function doResize(): void {
            // Adjust Canvas Proportions
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight;
        }

        // Maintain Consistent Proportions On Window Resize
        window.onresize = doResize;
        doResize();
    }
}

class SampleEntity {
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public direction: number[] = new Array<number>();
    public speed: number = 1;
    public color: string = "purple";

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        // Sample - Set Test Direction
        this.direction.Add(Direction.Right, Direction.Down);
        this.direction.push(Direction.Right, Direction.Down);
        this.speed = 5;
    }

    public Update(context: CanvasRenderingContext2D): void {
        var moveUp: boolean = this.direction.Contains(Direction.Up);
        var moveRight: boolean = this.direction.Contains(Direction.Right);
        var moveDown: boolean = this.direction.Contains(Direction.Down);
        var moveLeft: boolean = this.direction.Contains(Direction.Left);
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
    }

    public Render(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Direction {
    public static Left: number = 1;
    public static Up: number = 2;
    public static Right: number = 3;
    public static Down: number = 4;
}

class GameEngineStatus {
    public static Running: number = 1;
    public static Stopped: number = 2;
    public static Paused: number = 3;
}


Array.prototype.Remove = function (x: any) {
    return (this.indexOf(x) < 0) ? this : this.splice(this.indexOf(x), 1);
}
Array.prototype.Contains = function (x: any) {
    return this.indexOf(x) > -1;
}
Array.prototype.Add = function (...x: any[]) {
    if (this.indexOf(x) < 0) {
        for (let i = 0; i < x.length; i++) {
            this.push(x[i]);
        }
    }
    return this;
}

interface Array<T> {
    Contains(x: any): boolean;
    Remove(x: any): Array<T>;
    Add(...x: any[]): Array<T>;
}