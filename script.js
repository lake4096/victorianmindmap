let container, boxes, title;
    
    document.addEventListener('DOMContentLoaded', () => {
        container = document.querySelector('.mindmap-container');
        boxes = document.querySelectorAll('.map-item');
        title = document.querySelector('.map-title');
        
        updateLines();
    });
    window.addEventListener('resize', () => {
        updateLines()
    });
    const updateLines = () => {
        let lines = document.querySelectorAll('.crosshairLine');
        lines.forEach(line => {
            container.removeChild(line);
        });
        let c = container.getBoundingClientRect();
        let t = title.getBoundingClientRect();
        let y1 = t.y - c.y + t.height/2;
        let x1 = t.x - c.x + t.width/2;
        boxes.forEach((box, index) => {
            b = box.getBoundingClientRect();
            let y2 = b.y - c.y + b.height/2;
            let x2 = b.x - c.x + b.width/2;
            createLine(x1, y1, x2, y2);
        })
    }
    const createLine = (x1,y1, x2,y2) => {
        let length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        let transform = `rotate(${angle}deg)`;

        let line = document.createElement("div");
        line.className = 'crosshairLine';
        line.style.position = 'absolute';
        line.style.transform = transform;
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        container.appendChild(line);
        return line;
    }