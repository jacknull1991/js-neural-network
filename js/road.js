class Road {

    constructor(x, width, laneCount=3) {
        // road coords
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 10000000;
        this.top = -infinity;
        this.bottom = infinity;

        // road boundary for collision detection
        const topLeft       = {x:this.left, y:this.top};
        const topRight      = {x:this.right, y:this.top};
        const bottomLeft    = {x:this.left, y:this.bottom};
        const bottomRight   = {x:this.right, y:this.bottom};

        // each "border" is a line segment defined by 2 points and a line between these points
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + laneIndex * laneWidth;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // draw lanes
        for (let i=1; i<=this.laneCount-1; i++) {
            const x = lerp(this.left, this.right, i/this.laneCount);

            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        // draw borders
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });

    }
}