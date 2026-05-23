
const ctx = document.getElementById('c').getContext('2d')
const {sqrt} = Math
class CAMERA {
    constructor(x,y,z){
        this.position = {x, y, z}
        this.direction = {x:0.25 , y:-0.25 , z: 1}  
        // this.direction = {x:0, y:-1, z:1}
        // this.direction = {x: 0, y:-1, z:1}
        
        this.coeff = {
            a: this.direction.x,
            b: this.direction.y,
            c: this.direction.z,
        }

        this.coeff.d = -(this.coeff.a * x + this.coeff.b * y + this.coeff.c * z)
        

    }

    updatePlane() {
        this.coeff = {
            a: this.direction.x,
            b: this.direction.y,
            c: this.direction.z,
        }

        this.coeff.d = -(this.coeff.a * this.position.x + this.coeff.b * this.position.y + this.coeff.c * this.position.z)
    }

    updatePosition({x,y,z}) {
        this.position.x += x
        this.position.y += y
        this.position.z += z

        this.updatePlane()
    }   



}