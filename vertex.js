
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




class CUBE {
    constructor(x,y,z,side){
        this.pos = {x,y,z}
        this.side = side/((z == 0) ? 1 : z)
        this.verteces = [

            // Front face
            new Vertex(x-side/2, y-side/2,  z),
            new Vertex(x+side/2, y-side/2,  z),
            new Vertex(x-side/2,  y+side/2,  z),
            new Vertex(x+side/2,  y+side/2,  z),

            // Back face
            new Vertex(x-side/2, y-side/2,  z+side),
            new Vertex(x+side/2, y-side/2,  z+side),
            new Vertex(x-side/2,  y+side/2,  z+side),
            new Vertex(x+side/2,  y+side/2,  z+side),

        ];

    }

    rotateY(theta) {
        for(const vertex of this.verteces) {
            
            const v = {
                x: vertex.pos.x - this.pos.x,
                y: vertex.pos.y - this.pos.y,
                z: vertex.pos.z - this.pos.z
            }
            // console.log(v);
            vertex.rotateY(theta)
            
            // vertex.pos.x += this.pos.x
            // vertex.pos.y += this.pos.y
            // vertex.pos.z += this.pos.z
        }
    }

    rotateX(theta) {
        for(const vertex of this.verteces) {
            
            const v = {
                x: vertex.pos.x - this.pos.x,
                y: vertex.pos.y - this.pos.y,
                z: vertex.pos.z - this.pos.z
            }

            vertex.rotateX(theta)
            // console.log(v);
            
            // vertex.rotateY(theta)
            // vertex.pos.x += this.pos.x
            // vertex.pos.y += this.pos.y
            // vertex.pos.z += this.pos.z
        }
    }

  

    render() {

            
        const p0 = this.verteces[0].projectInto(camera)
        const p1 = this.verteces[1].projectInto(camera)
        const p2 = this.verteces[2].projectInto(camera)
        const p3 = this.verteces[3].projectInto(camera)

        const p4 = this.verteces[4].projectInto(camera)
        const p5 = this.verteces[5].projectInto(camera)
        const p6 = this.verteces[6].projectInto(camera)
        const p7 = this.verteces[7].projectInto(camera)

        // Front
        line(ctx, camera.position.x - p0.x, camera.position.y - p0.y, camera.position.x - p1.x, camera.position.y - p1.y, 'lime')
        line(ctx, camera.position.x - p1.x, camera.position.y - p1.y, camera.position.x - p3.x, camera.position.y - p3.y, 'lime')
        line(ctx, camera.position.x - p3.x, camera.position.y - p3.y, camera.position.x - p2.x, camera.position.y - p2.y, 'lime')
        line(ctx, camera.position.x - p2.x, camera.position.y - p2.y, camera.position.x - p0.x, camera.position.y - p0.y, 'lime')

        // Back
        line(ctx, camera.position.x - p4.x, camera.position.y - p4.y, camera.position.x - p5.x, camera.position.y - p5.y, 'lime')
        line(ctx, camera.position.x - p5.x, camera.position.y - p5.y, camera.position.x - p7.x, camera.position.y - p7.y, 'lime')
        line(ctx, camera.position.x - p7.x, camera.position.y - p7.y, camera.position.x - p6.x, camera.position.y - p6.y, 'lime')
        line(ctx, camera.position.x - p6.x, camera.position.y - p6.y, camera.position.x - p4.x, camera.position.y - p4.y, 'lime')

        // Connections
        line(ctx, camera.position.x - p0.x, camera.position.y - p0.y, camera.position.x - p4.x, camera.position.y - p4.y, 'lime')
        line(ctx, camera.position.x - p1.x, camera.position.y - p1.y, camera.position.x - p5.x, camera.position.y - p5.y, 'lime')
        line(ctx, camera.position.x - p2.x, camera.position.y - p2.y, camera.position.x - p6.x, camera.position.y - p6.y, 'lime')
        line(ctx, camera.position.x - p3.x, camera.position.y - p3.y, camera.position.x - p7.x, camera.position.y - p7.y, 'lime')
    }
}


