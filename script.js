// ===================================================================
// ======== 【胜利加冕·最终完美版】 script.js (完美预测版) ========
// ===================================================================

window.onload = async function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clearBtn');
    const resultDiv = document.getElementById('result');

    let isDrawing = false;
    let model;

    function clearCanvas() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (model) {
            resultDiv.innerText = "请开始写字吧！";
        }
    }
    clearCanvas();

    async function loadMyModel() {
        console.log("正在加载【图模型】...");
        resultDiv.innerText = "AI正在进行终极觉醒...";
        try {
            model = await tf.loadGraphModel('model/model.json');
            console.log("【图模型】加载成功！喵~ 我们胜利了！");
            clearCanvas();
        } catch (e) {
            console.error("模型加载失败了...", e);
            resultDiv.innerText = "呜...最后的决战失败了";
        }
    }
    loadMyModel();

    // --- 绘画逻辑 (这是完美的，不需要改动！) ---
    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        return { x, y };
    }
    function startDrawing(e) { e.preventDefault(); isDrawing = true; const { x, y } = getCoords(e); ctx.beginPath(); ctx.moveTo(x, y); }
    function stopDrawing() { if (!isDrawing) return; isDrawing = false; predict(); }
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'white';
        const { x, y } = getCoords(e);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw, { passive: false });


    // --- ✨ 胜利加冕！修正预测逻辑！✨ ---
    async function predict() {
        if (!model) return;

        const tensor = tf.browser.fromPixels(canvas)
            // ✨✨✨ 就是这里！把尺寸[28, 28]给加回来！✨✨✨
            .resizeNearestNeighbor([28, 28])
            .mean(2)
            .expandDims(0)
            .expandDims(-1)
            .toFloat()
            .div(tf.scalar(255.0));

        const predictions = model.execute(tensor);
        const outputData = await predictions.data();
        const highestProbIndex = outputData.indexOf(Math.max(...outputData));
        
        resultDiv.innerText = `我猜是：${highestProbIndex}`;

        tensor.dispose();
        predictions.dispose();
    }

    clearBtn.addEventListener('click', clearCanvas);
};
