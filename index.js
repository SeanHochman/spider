function Circle(layer_index, attr_index, pos_x, pos_y) {
  this.layer_index = layer_index;
  this.attr_index = attr_index;
  this.pos_x = pos_x;
  this.pos_y = pos_y;

  this.containsPoint = function(x, y) {
    let diff_x = x - this.pos_x;
    let diff_y = y - this.pos_y;

    if(diff_x > 5 || diff_x < -5) 
      return false;

    if(diff_y > 5 || diff_y < -5) 
      return false;

    return true;
  }

  this.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos_x, this.pos_y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

function SpiderGraph(center_x, center_y, attr_count, layer_count) {
  this.circles = [];
  this.polygon = [];
  this.center_x = center_x;
  this.center_y = center_y;
  this.attr_count = attr_count;
  this.layer_count = layer_count;

  this.generate_layer = function(index, radius) {
    let = step = 2 * Math.PI / this.attr_count;
    let angle = 0;
  
    for(let i = 0; i < this.attr_count; i++) {
      let pos_x = this.center_x + radius * Math.cos(angle);
      let pos_y = this.center_y + radius * Math.sin(angle);
      this.circles.push(new Circle(index, i, pos_x, pos_y));
      angle += step;
    }
  }

  this.generate = function() {
    let radius = 50;

    for(let i = 0; i < this.layer_count; i++) {
      this.generate_layer(i, radius);
      radius += 30;
    }

    this.polygon = this.circles.slice(0, this.attr_count);
  }

  this.draw_polygon = function(ctx) {
    ctx.strokeStyle = "white";
    let first = this.polygon[0];
    ctx.beginPath();
    ctx.moveTo(first.pos_x, first.pos_y);
    
    for(let i = 1; i < this.attr_count; i++) {
      let circle = this.polygon[i];
      ctx.lineTo(circle.pos_x, circle.pos_y);
    }

    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
    ctx.closePath();
    ctx.fill();
  }

  this.draw = function(ctx) {
    this.draw_polygon(ctx);
    ctx.lineWidth=2;
    this.circles.forEach(c => c.draw(ctx));
    let radius = 50; 
    for(let i = 0; i < this.layer_count; i++) { 
      ctx.beginPath();
      ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      radius+=30;   
    }
    
    let = step = 2 * Math.PI / this.attr_count;
    let angle = 0;
    radius = 50 + (this.layer_count -1) * 30;
    // let attribute = attribute.index;

    for(let i = 0; i < this.attr_count; i++) {
      let pos_x = this.center_x + radius * Math.cos(angle);
      let pos_y = this.center_y + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(center_x, center_y);
      ctx.lineTo(pos_x, pos_y)
      ctx.stroke();

      angle += step;
    }

    for(let i = 0; i < this.attr_count; i++) {
      let pos_x = this.center_x + radius*1.17 * Math.cos(angle);
      let pos_y = this.center_y + radius*1.16 * Math.sin(angle);

      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(attribute[i], pos_x, pos_y);

      angle += step;
    }

    
  }




  this.circle_by_point = function(x, y) {
    for(let i = 0; i < this.circles.length; i++) {
      if(this.circles[i].containsPoint(x, y))
        return this.circles[i];
    }

    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let graph = new SpiderGraph(300, 300, 10, 6);
  graph.generate();
  graph.draw(ctx);

  canvas.addEventListener('click', e => {
    let circle = graph.circle_by_point(e.layerX, e.layerY);
    if(circle !== null) {
      graph.polygon[circle.attr_index] = circle;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      graph.draw(ctx);
      alert(attribute[circle.attr_index]);
    }
  });
});

let attribute = [
  'alcohol', 
  'color', 
  'bitterness',
  'smokiness',
  'fruitiness',
  'malt',
  'sourness',
  'funk',
  'aroma',
  'sweetness'
];