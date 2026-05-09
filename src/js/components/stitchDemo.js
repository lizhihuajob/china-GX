class StitchDemo {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            canvasWidth: 600,
            canvasHeight: 400,
            backgroundColor: '#faf9f7',
            stitchColor: '#cc0000',
            needleColor: '#333333',
            threadColor: '#cc0000',
            fabricColor: '#ffffff',
            autoPlay: true,
            loop: true,
            speed: 1,
            onStepChange: null,
            onComplete: null,
            ...options
        };

        this.canvas = null;
        this.ctx = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.totalSteps = 0;
        this.animationFrame = null;
        this.progress = 0;
        this.stitchData = null;
        this.needleY = 0;
        this.threadPoints = [];

        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.canvasWidth;
        this.canvas.height = this.options.canvasHeight;
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        
        this.ctx = this.canvas.getContext('2d');
        
        this.element.appendChild(this.canvas);
        
        this.createControls();
        
        this.loadDefaultStitch();
        
        this.bindEvents();
    }

    createControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'stitch-controls';
        controlsContainer.innerHTML = `
            <button class="btn btn-sm btn-outline" data-action="play">
                <span>播放</span>
            </button>
            <button class="btn btn-sm btn-outline" data-action="pause">
                <span>暂停</span>
            </button>
            <button class="btn btn-sm btn-outline" data-action="reset">
                <span>重置</span>
            </button>
            <button class="btn btn-sm btn-outline" data-action="prev">
                <span>上一步</span>
            </button>
            <button class="btn btn-sm btn-outline" data-action="next">
                <span>下一步</span>
            </button>
        `;

        const progressContainer = document.createElement('div');
        progressContainer.className = 'mt-4';
        progressContainer.innerHTML = `
            <div class="flex items-center gap-4">
                <span class="text-sm text-neutral">步骤: <span class="step-counter">0/0</span></span>
                <div class="flex-1">
                    <input type="range" class="progress-slider" min="0" max="100" value="0" 
                           style="width: 100%; accent-color: var(--color-primary);">
                </div>
            </div>
        `;

        this.element.appendChild(controlsContainer);
        this.element.appendChild(progressContainer);

        this.controls = controlsContainer;
        this.progressSlider = progressContainer.querySelector('.progress-slider');
        this.stepCounter = progressContainer.querySelector('.step-counter');
    }

    bindEvents() {
        this.controls.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const action = btn.getAttribute('data-action');
            
            switch (action) {
                case 'play':
                    this.play();
                    break;
                case 'pause':
                    this.pause();
                    break;
                case 'reset':
                    this.reset();
                    break;
                case 'prev':
                    this.prevStep();
                    break;
                case 'next':
                    this.nextStep();
                    break;
            }
        });

        this.progressSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.setProgress(value / 100);
        });
    }

    loadDefaultStitch() {
        this.stitchData = this.createStraightStitch();
        this.totalSteps = this.stitchData.steps.length;
        this.updateStepCounter();
        this.draw();
        
        if (this.options.autoPlay) {
            this.play();
        }
    }

    createStraightStitch() {
        return {
            name: '直针绣',
            description: '直针绣是广绣最基本的针法，线条排列整齐。',
            steps: [
                {
                    name: '准备',
                    description: '准备绣线和绣布，确定起始位置。',
                    draw: (ctx, progress) => this.drawStep1(ctx, progress)
                },
                {
                    name: '出针',
                    description: '从布面下方出针，拉出绣线。',
                    draw: (ctx, progress) => this.drawStep2(ctx, progress)
                },
                {
                    name: '入针',
                    description: '按照预定方向直刺，从布面上方入针。',
                    draw: (ctx, progress) => this.drawStep3(ctx, progress)
                },
                {
                    name: '拉线',
                    description: '从布面下方拉出绣线，完成一针。',
                    draw: (ctx, progress) => this.drawStep4(ctx, progress)
                },
                {
                    name: '重复',
                    description: '重复以上步骤，保持针距均匀。',
                    draw: (ctx, progress) => this.drawStep5(ctx, progress)
                }
            ]
        };
    }

    createContinuousStitch() {
        return {
            name: '续针绣',
            description: '续针绣是将线条分段刺绣，前一针的尾与后一针的头相连。',
            steps: [
                {
                    name: '分段',
                    description: '按照图案轮廓将线条分段。',
                    draw: (ctx, progress) => this.drawContStep1(ctx, progress)
                },
                {
                    name: '第一段',
                    description: '从起点开始刺绣第一段。',
                    draw: (ctx, progress) => this.drawContStep2(ctx, progress)
                },
                {
                    name: '衔接',
                    description: '第二段与第一段尾部自然衔接。',
                    draw: (ctx, progress) => this.drawContStep3(ctx, progress)
                },
                {
                    name: '完成',
                    description: '继续完成整个轮廓的刺绣。',
                    draw: (ctx, progress) => this.drawContStep4(ctx, progress)
                }
            ]
        };
    }

    drawStep1(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = '#e8e4de';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(60, 60, this.options.canvasWidth - 120, this.options.canvasHeight - 120);
        ctx.setLineDash([]);
        
        const needleX = cx;
        const needleY = cy - 100 + progress * 50;
        
        this.drawNeedle(ctx, needleX, needleY, -90);
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('准备刺绣', cx, cy + 120);
    }

    drawStep2(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = '#e8e4de';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(60, 60, this.options.canvasWidth - 120, this.options.canvasHeight - 120);
        ctx.setLineDash([]);
        
        const startX = cx - 100;
        const startY = cy;
        const endX = cx - 100;
        const endY = cy - 50 - progress * 50;
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        this.drawNeedle(ctx, endX, endY, -90);
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('从布面下方出针', cx, cy + 120);
    }

    drawStep3(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = '#e8e4de';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(60, 60, this.options.canvasWidth - 120, this.options.canvasHeight - 120);
        ctx.setLineDash([]);
        
        const startX = cx - 100;
        const startY = cy;
        const midX = startX + progress * 200;
        const midY = cy - 50;
        const endX = cx + 100;
        const endY = cy;
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(midX, midY);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(204, 0, 0, 0.3)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        this.drawNeedle(ctx, midX, midY, 0);
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('沿水平方向刺绣', cx, cy + 120);
    }

    drawStep4(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = '#e8e4de';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(60, 60, this.options.canvasWidth - 120, this.options.canvasHeight - 120);
        ctx.setLineDash([]);
        
        const startX = cx - 100;
        const startY = cy;
        const endX = cx + 100;
        const endY = cy;
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX, endY + progress * 50);
        ctx.stroke();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(endX, endY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('从布面下方拉出绣线，完成一针', cx, cy + 120);
    }

    drawStep5(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = '#e8e4de';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(60, 60, this.options.canvasWidth - 120, this.options.canvasHeight - 120);
        ctx.setLineDash([]);
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        const stitches = Math.floor(progress * 5) + 1;
        const startX = cx - 150;
        const spacing = 75;
        
        for (let i = 0; i < stitches && i < 5; i++) {
            const stitchStartX = startX + i * spacing;
            const stitchEndX = stitchStartX + 50;
            const stitchY = cy - 50 + i * 30;
            
            ctx.beginPath();
            ctx.moveTo(stitchStartX, stitchY);
            ctx.lineTo(stitchEndX, stitchY);
            ctx.stroke();
            
            ctx.fillStyle = this.options.stitchColor;
            ctx.beginPath();
            ctx.arc(stitchStartX, stitchY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(stitchEndX, stitchY, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('保持针距均匀，重复刺绣', cx, cy + 120);
    }

    drawContStep1(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = 'rgba(204, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(80, cy);
        ctx.bezierCurveTo(200, cy - 80, 400, cy + 80, 520, cy);
        ctx.stroke();
        ctx.setLineDash([]);
        
        const segmentCount = 3;
        for (let i = 0; i < segmentCount; i++) {
            const t = (i + 0.5) / segmentCount;
            const x = 80 + t * 440;
            const y = cy + Math.sin(t * Math.PI) * 40;
            
            ctx.strokeStyle = '#e8e4de';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(x, cy - 60);
            ctx.lineTo(x, cy + 60);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('将曲线轮廓分段', cx, cy + 100);
    }

    drawContStep2(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = 'rgba(204, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(80, cy);
        ctx.bezierCurveTo(200, cy - 80, 400, cy + 80, 520, cy);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        const endT = 0.33 * progress;
        const startX = 80;
        const startY = cy;
        const endX = 80 + endT * 440;
        const endY = cy + Math.sin(endT * Math.PI) * 40;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
            80 + endT * 120, startY - 80 * endT,
            80 + endT * 320, startY + 80 * endT,
            endX, endY
        );
        ctx.stroke();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('刺绣第一段', cx, cy + 100);
    }

    drawContStep3(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(80, cy);
        ctx.bezierCurveTo(120, cy - 26, 180, cy + 26, 226, cy + 23);
        ctx.stroke();
        
        const startT = 0.33;
        const endT = 0.33 + 0.34 * progress;
        const startX = 226;
        const startY = cy + 23;
        const endX = 80 + endT * 440;
        const endY = cy + Math.sin(endT * Math.PI) * 40;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
            startX + (endX - startX) * 0.4, startY + (endY - startY) * 0.4 - 40,
            startX + (endX - startX) * 0.6, startY + (endY - startY) * 0.6 + 40,
            endX, endY
        );
        ctx.stroke();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.beginPath();
        ctx.arc(80, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('第二段与第一段自然衔接', cx, cy + 100);
    }

    drawContStep4(ctx, progress) {
        const cx = this.options.canvasWidth / 2;
        const cy = this.options.canvasHeight / 2;
        
        ctx.fillStyle = this.options.fabricColor;
        ctx.fillRect(50, 50, this.options.canvasWidth - 100, this.options.canvasHeight - 100);
        
        ctx.strokeStyle = this.options.threadColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(80, cy);
        ctx.bezierCurveTo(200, cy - 80, 400, cy + 80, 520, cy);
        ctx.stroke();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.beginPath();
        ctx.arc(80, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(226, cy + 23, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(374, cy - 23, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(520, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.options.stitchColor;
        ctx.font = '14px var(--font-family-body)';
        ctx.textAlign = 'center';
        ctx.fillText('完成整个曲线轮廓', cx, cy + 100);
    }

    drawNeedle(ctx, x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);
        
        ctx.fillStyle = this.options.needleColor;
        ctx.beginPath();
        ctx.moveTo(-3, -30);
        ctx.lineTo(3, -30);
        ctx.lineTo(3, 0);
        ctx.lineTo(0, 5);
        ctx.lineTo(-3, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#666';
        ctx.beginPath();
        ctx.ellipse(0, -20, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    draw() {
        if (!this.ctx || !this.stitchData) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const step = this.stitchData.steps[this.currentStep];
        if (step && step.draw) {
            step.draw(this.ctx, this.progress);
        }
        
        if (this.stitchData) {
            this.ctx.fillStyle = '#8c857d';
            this.ctx.font = '12px var(--font-family-body)';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`${this.stitchData.name}: ${step?.name || ''}`, 60, 30);
        }
    }

    play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.isPaused = false;
        this.animate();
    }

    pause() {
        this.isPaused = true;
        this.isPlaying = false;
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    reset() {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.progress = 0;
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.updateStepCounter();
        this.progressSlider.value = 0;
        this.draw();
    }

    animate() {
        if (!this.isPlaying || this.isPaused) return;
        
        this.progress += 0.01 * this.options.speed;
        
        if (this.progress >= 1) {
            this.progress = 0;
            this.currentStep++;
            
            if (this.currentStep >= this.totalSteps) {
                if (this.options.loop) {
                    this.currentStep = 0;
                } else {
                    this.isPlaying = false;
                    if (typeof this.options.onComplete === 'function') {
                        this.options.onComplete();
                    }
                    return;
                }
            }
            
            if (typeof this.options.onStepChange === 'function') {
                this.options.onStepChange(this.currentStep);
            }
            
            this.updateStepCounter();
        }
        
        this.progressSlider.value = (this.currentStep + this.progress) / this.totalSteps * 100;
        this.draw();
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    nextStep() {
        this.progress = 0;
        this.currentStep = Math.min(this.currentStep + 1, this.totalSteps - 1);
        this.updateStepCounter();
        this.progressSlider.value = this.currentStep / this.totalSteps * 100;
        this.draw();
        
        if (typeof this.options.onStepChange === 'function') {
            this.options.onStepChange(this.currentStep);
        }
    }

    prevStep() {
        this.progress = 0;
        this.currentStep = Math.max(this.currentStep - 1, 0);
        this.updateStepCounter();
        this.progressSlider.value = this.currentStep / this.totalSteps * 100;
        this.draw();
        
        if (typeof this.options.onStepChange === 'function') {
            this.options.onStepChange(this.currentStep);
        }
    }

    setProgress(progress) {
        const totalProgress = progress * this.totalSteps;
        this.currentStep = Math.floor(totalProgress);
        this.progress = totalProgress - this.currentStep;
        
        if (this.currentStep >= this.totalSteps) {
            this.currentStep = this.totalSteps - 1;
            this.progress = 1;
        }
        
        this.updateStepCounter();
        this.draw();
    }

    updateStepCounter() {
        if (this.stepCounter) {
            this.stepCounter.textContent = `${this.currentStep + 1}/${this.totalSteps}`;
        }
    }

    setStitch(stitchType) {
        switch (stitchType) {
            case 'straight':
                this.stitchData = this.createStraightStitch();
                break;
            case 'continuous':
                this.stitchData = this.createContinuousStitch();
                break;
            default:
                this.stitchData = this.createStraightStitch();
        }
        
        this.totalSteps = this.stitchData.steps.length;
        this.currentStep = 0;
        this.progress = 0;
        this.updateStepCounter();
        this.progressSlider.value = 0;
        this.draw();
    }

    getStitchInfo() {
        return this.stitchData;
    }

    destroy() {
        this.isPlaying = false;
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        if (this.controls && this.controls.parentNode) {
            this.controls.parentNode.removeChild(this.controls);
        }
        
        this.canvas = null;
        this.ctx = null;
        this.element = null;
        this.stitchData = null;
    }

    static initAll(container = document) {
        const demos = container.querySelectorAll('[data-component="stitchDemo"]');
        return Array.from(demos).map((el) => new StitchDemo(el));
    }
}

export { StitchDemo };
export default StitchDemo;