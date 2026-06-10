
const ctx = document.getElementById('c').getContext('2d')
const {sqrt} = Math
class CAMERA {
    constructor(x,y,z){
        this.position = {x, y, z}
        this.direction = {x:0, y:0, z:1}
        
        this.coeff = {
            a: this.direction.x,
            b: this.direction.y,
            c: -this.direction.z,
        }

        this.coeff.d = -(this.coeff.a * (x+this.direction.x) + this.coeff.b * (y+this.direction.y) + this.coeff.c * (z+this.direction.z))
        

    }

    updatePlane() {
        const {x,y,z} = this.position
        this.coeff = {
            a: this.direction.x,
            b: this.direction.y,
            c: this.direction.z,
        }
        this.coeff.d = -(this.coeff.a * (x+this.direction.x) + this.coeff.b * (y+this.direction.y) + this.coeff.c * (z+this.direction.z))
    }

    updatePosition({x,y,z}) {
        this.position.x += x
        this.position.y += y
        this.position.z += z

        this.updatePlane()
    }   



}
