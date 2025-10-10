const shadow = document.querySelector('.mouse-shadow');

let isMouseInWindow = false;
const targets = document.querySelectorAll('.follow-cursor');
let isHovering = false;

// 元素跟随
// 为每个元素单独初始化
targets.forEach(target => {
    let isHovering = false;
    let lastMoveTime = 0; // 每个元素单独的防抖时间戳

    // 鼠标进入
    target.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    // 鼠标离开
    target.addEventListener('mouseleave', () => {
        isHovering = false;
        target.style.transform = 'translate(0, 0)'; // 单独重置当前元素
    });

    // 鼠标移动（每个元素独立计算）
    target.addEventListener('mousemove', (e) => {
        if (!isHovering) return;

        // 防抖（每个元素单独控制频率）
        if (Date.now() - lastMoveTime < 16) return;
        lastMoveTime = Date.now();

        const rect = target.getBoundingClientRect();
        const elementWidth = rect.width;
        const elementHeight = rect.height;

        // 计算当前元素内的鼠标相对位置
        const mouseX = e.clientX - rect.left - elementWidth / 2;
        const mouseY = e.clientY - rect.top - elementHeight / 2;

        const maxX = elementWidth / 2;
        const maxY = elementHeight / 2;
        const ratioX = Math.max(-1, Math.min(1, mouseX / maxX));
        const ratioY = Math.max(-1, Math.min(1, mouseY / maxY));

        // 阻力算法
        const maxMove = Math.min(elementHeight, elementWidth) / 4; // 最大移动距离
        const moveX = maxMove * ratioX * Math.abs(ratioX);
        const moveY = maxMove * ratioY * Math.abs(ratioY);

        // 应用到当前元素
        target.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});