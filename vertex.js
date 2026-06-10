
class Vertex {
    constructor(x,y,z) {
        this.pos = {x,y,z}
    }

    projectInto(camera) {
          const { x, y, z } = this.pos;

        // Plane coefficients: ax + by + cz + d = 0
        const { a, b, c, d } = camera.coeff;

        // Compute denominator
        const denom = a * a + b * b + c * c;

        if (denom === 0) {
            throw new Error("Invalid plane normal vector.");
        }

        // Distance factor along the normal
        const t = (a * x + b * y + c * z + d) / denom;

        // Projected point
        return  {
            x: (x - a * t),
            y: y - b * t,
            z: z - c * t
        }; 


    }

    perspectiveProjection(camera) {
        const ray = (subVector(this.pos, camera.position))
        const {x,y,z} = ray
        const {a,b,c,d} = camera.coeff
        const {x: xv, y: yv, z: zv} = this.pos
        const {
            x: cx,
            y: cy,
            z: cz
        } = camera.position
       
        const t = (d + a*xv + b*yv + c*zv) / (a*x + b*y + c*z)
        console.log(t);
        
        return {
            Px: cx+camera.direction.x + x*t, Py: cy+camera.direction.y + y*t, Pz: cz+camera.direction.y + z*t
        }
    }

    rotateX(theta) {

        const v = this.pos

        const c = Math.cos(theta)
        const s = Math.sin(theta)

        this.pos = {
            x: v.x,
            y: v.y * c - v.z * s,
            z: v.y * s + v.z * c
        }
    }

    rotateY(theta, relativePosition) {
        const v = relativePosition ?? this.pos
        const c = Math.cos(theta);
        const s = Math.sin(theta);

        this.pos =  {
            x: v.x * c + v.z * s,
            y: v.y,
            z: -v.x * s + v.z * c
        };
    }

    
}




