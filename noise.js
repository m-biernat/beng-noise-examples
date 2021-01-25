const size = 512;
var seed = 777;

function drawGrid(p5, scale)
{
	for (var x = 0; x < size; x += size / scale) {
		for (var y = 0; y < size; y += size / scale) {
			p5.stroke(235);
			p5.strokeWeight(1);
			p5.line(x, 0, x, size - 1);
			p5.line(0, y, size - 1, y);
		}
    }
    p5.stroke(220);
    p5.strokeWeight(2);
    p5.line(1, 0, 1, size - 1);
    p5.line(0, 1, size - 1, 1);
    p5.line(size, size - 1, 0, size - 1);
	p5.line(size - 1, size, size - 1, 0);
}

function random(x, y, scale)
{
    var sx = x / size;
    var sy = y / size;
    sx *= scale;
    sy *= scale;
    var ix = Math.floor(sx);
    var iy = Math.floor(sy);
    return value.hash2d(ix, iy);
}

const value = {
    fract: function(i) {
        return i - Math.floor(i);
    },
    lerp: function(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    },
    hash2d: function(x, y) {
        x = 50 * this.fract(x * 0.3183099 + 0.71);
        y = 50 * this.fract(y * 0.3183099 + 0.113);
        return this.fract(1.375986 * seed + x * y * (x + y));
    },
    noise2d: function(x, y) {
        let ix = Math.floor(x);
        let iy = Math.floor(y);
        let fx = this.fract(x);
        let fy = this.fract(y);
        let ux = fx * fx * (3 - 2 * fx);
        return this.lerp(
            this.lerp(this.hash2d(ix, iy), this.hash2d(ix + 1, iy), ux),
            this.lerp(this.hash2d(ix, iy + 1), this.hash2d(ix + 1, iy + 1), ux),
            fy * fy * (3 - 2 * fy)
        );
    }
};

let random1d = new p5((s) => {
    var scale = 128;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        s.background(255);
        drawGrid(s, 32);
        s.beginShape();
        s.noFill();
        for (var x = 0; x < size; x++) {
            s.stroke(0);
            s.strokeWeight(2);
            var r = random(x, 0, scale) * size * 0.5;
            s.vertex(x, r + size * 0.25);
        }
        s.endShape();
        s.noLoop();
    };
}, 'random1d');

let random2d = new p5((s) => {
    var scale = 64;
    
    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        s.loadPixels();
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var index = (x + y * size) * 4;
                var r = random(x, y, scale) * 255;
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };
}, 'random2d');

let value1d = new p5((s) => {
    var scale = 32;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        s.background(255);
        drawGrid(s, 32);
        s.beginShape();
        s.noFill();
        for (var x = 0; x < size; x++) {
            s.stroke(0);
            s.strokeWeight(2);
            var r = value.noise2d(x / scale, 0) * size * 0.5;
            s.vertex(x, r + size * 0.25);
        }
        s.endShape();
        s.noLoop();
    };
}, 'value1d');

let value2d = new p5((s) => {
    var scale = 32;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        s.loadPixels();
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var index = (x + y * size) * 4;
                var r = value.noise2d(x / scale, y / scale) * 255;
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };
}, 'value2d');

let perlin1d = new p5((s) => {
    var scale = 64;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        s.background(255);
        drawGrid(s, 32);
        noise.seed(seed);
        s.beginShape();
        s.noFill();
        for (var x = 0; x < size; x++) {
            s.stroke(0);
            s.strokeWeight(2);
            var r = noise.perlin2(x / scale, 12.3) * size * 0.5;
            s.vertex(x, r + size * 0.5);
        }
        s.endShape();
        s.noLoop();
    };
}, 'perlin1d');

let perlin2d = new p5((s) => {
    var scale = 64;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        noise.seed(seed);
        s.loadPixels();
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var index = (x + y * size) * 4;
                var r = (1 + noise.perlin2(x / scale, y / scale)) * 0.5 * 255;
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };
}, 'perlin2d');

let simplex1d = new p5((s) => {
    var scale = 128;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        s.background(255);
        drawGrid(s, 32);
        noise.seed(seed);
        s.beginShape();
        s.noFill();
        for (var x = 0; x < size; x++) {
            s.stroke(0);
            s.strokeWeight(2);
            var r = noise.simplex2(x / scale, 0) * size * 0.35;
            s.vertex(x, r + size * 0.5);
        }
        s.endShape();
        s.noLoop();
    };
}, 'simplex1d');

let simplex2d = new p5((s) => {
    var scale = 128;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        noise.seed(seed);
        s.loadPixels();
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var index = (x + y * size) * 4;
                var r = (1 + noise.simplex2(x / scale, y / scale)) * 0.5 * 255;
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };
}, 'simplex2d');

let worley2df1 = new p5((s) => {
    var points = [];
    var n = 1;
    
    s.setup = () => {
        s.createCanvas(size, size);
        s.randomSeed(seed + 2);
        for (var i = 0; i < 8; i++) {
            points[i] = s.createVector(s.random(size), s.random(size));
        }
    };
  
    s.draw = () => {
        s.loadPixels();
        var distances = [];
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                points.forEach(function (point, i) {
                    distances[i] = s.dist(x, y, point.x, point.y);
                });
                distances = s.sort(distances);
                var index = (x + y * size) * 4;
                var r = distances[n - 1]
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };
}, 'worley2df1');

let worley2df2 = new p5((s) => {
    var points = [];
    var n = 2;
    
    s.setup = () => {
        s.createCanvas(size, size);
        s.randomSeed(seed + 2);
        for (var i = 0; i < 8; i++) {
            points[i] = s.createVector(s.random(size), s.random(size));
        }
    };
  
    s.draw = () => {
        s.loadPixels();
        var distances = [];
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                points.forEach(function (point, i) {
                    distances[i] = s.dist(x, y, point.x, point.y);
                });
                distances = s.sort(distances);
                var index = (x + y * size) * 4;
                var r = distances[n - 1];
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };
}, 'worley2df2');

class fbm1d {
    constructor(octaves, div) {
        new p5(function(s) {
            var scale = 64;
            var size2 = size / 2 + 1;
        
            s.setup = () => {
                s.createCanvas(size2, size2);
                noise.seed(seed);
            };
        
            s.draw = () => {
                s.background(255);
                drawGrid(s, 32);
                s.beginShape();
                s.noFill();
                for (var x = 0; x < size2; x++) {
                    s.stroke(0);
                    s.strokeWeight(2);
                    var a = 1;
                    var f = 1;
                    var r = 0;      
                    for (var i = 0; i < octaves; i++) {
                        var sX = x / scale * f;
                        r += noise.perlin2(sX, 0) * a;
                        a *= 0.5;
                        f *= 2;
                    }
                    r = r * size2 * 0.5;
                    s.vertex(x, r + size2 * 0.5);
                }
                s.endShape();
                s.noLoop();
            };
        }, div);
    }
}

class fbm2d {
    constructor(octaves, div) {
        new p5(function(s) {
            var scale = 64;
            var size2 = size / 2 + 1;
        
            s.setup = () => {
                s.createCanvas(size2, size2);
                noise.seed(seed);
            };
        
            s.draw = () => {
                s.loadPixels();
                for (var x = 0; x < size2; x++) {
                    for (var y = 0; y < size2; y++) {
                        var index = (x + y * size2) * 4;
                        var a = 1;
                        var f = 1;
                        var r = 0;      
                        for (var i = 0; i < octaves; i++) {
                            var sX = x / scale * f;
                            var sY = y / scale * f;
                            r += noise.perlin2(sX, sY) * a;
                            a *= 0.5;
                            f *= 2;
                        }
                        r = (1 + r) * 0.5 * 255;
                        s.pixels[index + 0] = r;
                        s.pixels[index + 1] = r;
                        s.pixels[index + 2] = r;
                        s.pixels[index + 3] = 255;
                    }
                }
                s.updatePixels();
                s.noLoop();
            };
        }, div);
    }
}

let fbm1d1 = new fbm1d(1, 'fbm1d1');
let fbm1d2 = new fbm1d(2, 'fbm1d2');
let fbm1d4 = new fbm1d(4, 'fbm1d4');
let fbm1d8 = new fbm1d(8, 'fbm1d8');

let fbm2d1 = new fbm2d(1, 'fbm2d1');
let fbm2d2 = new fbm2d(2, 'fbm2d2');
let fbm2d4 = new fbm2d(4, 'fbm2d4');
let fbm2d8 = new fbm2d(8, 'fbm2d8');

let ridged1d = new p5((s) => {
    var scale = 64;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        s.background(255);
        drawGrid(s, 32);
        noise.seed(seed);
        s.beginShape();
        s.noFill();
        for (var x = 0; x < size; x++) {
            s.stroke(220);
            s.strokeWeight(2);
            var a = 1;
            var f = 1;
            var r = 0;      
            for (var i = 0; i < 2; i++) {
                var sX = x / scale * f;
                r += noise.perlin2(sX, 0) * a;
                a *= 0.5;
                f *= 2;
            }
            r = r * size * 0.5;
            s.vertex(x, r + size * 0.5);
        }
        s.endShape();
        s.beginShape();
        s.noFill();
        for (var x = 0; x < size; x++) {
            s.stroke(0);
            s.strokeWeight(2);
            var a = 1;
            var f = 1;
            var r = 0;      
            for (var i = 0; i < 2; i++) {
                var sX = x / scale * f;
                r += noise.perlin2(sX, 0) * a;
                a *= 0.5;
                f *= 2;
            }
            //r = r * size * 0.5;
            r = 1 - s.abs(r) * size * 0.5;
            s.vertex(x, r + size * 0.5);
        }
        s.endShape();
        s.noLoop();
    };
}, 'ridged1d');

let ridged2d = new p5((s) => {
    var scale = 64;

    s.setup = () => {
        s.createCanvas(size, size);
    };
  
    s.draw = () => {
        noise.seed(seed);
        s.loadPixels();
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var index = (x + y * size) * 4;
                var a = 1;
                var f = 1;
                var r = 0;      
                for (var i = 0; i < 2; i++) {
                    var sX = x / scale * f;
                    var sY = y / scale * f;
                    r += noise.perlin2(sX, sY) * a;
                    a *= 0.5;
                    f *= 2;
                }
                //r = (1 + r) * 0.5 * 255;
                r = s.map(s.abs(r), 0, 1, 235, 0); 
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };
}, 'ridged2d');

let warped2d = new p5((s) => {
    var scale = 64;
    var size2 = 2 * size;

    s.setup = () => {
        s.createCanvas(size2, size);
    };
  
    s.draw = () => {
        noise.seed(seed);
        s.loadPixels();
        for (var x = 0; x < size2; x++) {
            for (var y = 0; y < size; y++) {
                var index = (x + y * size2) * 4;
                var r = s.warped(x / scale, y / scale);
                r = (1 + r) * 0.5 * 255;
                s.pixels[index + 0] = r;
                s.pixels[index + 1] = r;
                s.pixels[index + 2] = r;
                s.pixels[index + 3] = 255;
            }
        }
        s.updatePixels();
        s.noLoop();
    };

    s.warped = (x, y) => {
        var w = noise.perlin2(x, y);
        return noise.perlin2(x + w, y + w);
    };
}, 'warped2d');
