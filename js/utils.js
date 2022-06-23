// linear interpolation
function lerp(A, B, t) {
    return A + (B - A) * t;
}


// detect intersection between two lines
// line1(A, B) and line2(C, D)
function getIntersection(A, B, C, D) {
    //const tTop = (Bend.x - Bstart.x) * (Astart.y - Bstart.y) - (Bend.y - Bstart.y) * (Astart.x - Bstart.x);
    //const uTop = (Bstart.y - Astart.y) * (Astart.x - Aend.x) - (Bstart.x - Astart.x) * (Astart.y - Aend.y);
    //const bottom = (Bend.y - Bstart.y) * (Aend.x - Astart.x) - (Bend.x - Bstart.x) * (Aend.y - Astart.y);

    // determinant of t
    const tTop = (A.x - C.x) * (C.y - D.y) - (A.y - C.y) * (C.x - D.x);
    // determinant of u
    const uTop = (A.x - C.x) * (A.y - B.y) - (A.y - C.y) * (A.x - B.x);


    // deternimant of bottom matrix
    const bottom = (A.x - B.x) * ( C.y - D.y) - (A.y - B.y) * (C.x - D.x);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;

        if (t >=0 && t <= 1 && u >=0 && u <=1) {
            return {
                x:lerp(A.x, B.x, t),
                y:lerp(A.y, B.y, t),
                offset:t
            }
        }
    }

    return null;
}

// detect intersection between two polygons
function polysIntersect(poly1, poly2) {
    for (let i=0; i<poly1.length; i++) {
        for (let j=0; j<poly2.length; j++) {
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if (touch) {
                return true;
            }
        }
    }
    return false;
}

function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}

function getRandomColor() {
    const hue = 290 + Math.random() * 260;
    return "hsl(" + hue + ", 100%, 60%)";
}