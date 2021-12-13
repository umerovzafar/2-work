class SLIDER {
    constructor(options) {
        this.slider = document.querySelector(options.slider)
        this.sliderLine = this.slider.querySelector('.slider__line')
        this.slides = this.sliderLine.children
        this.next = this.slider.querySelector('.slider__next')
        this.prev = this.slider.querySelector('.slider__prev')
        this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y'
        this.timeMove = options.time != undefined ? options.time : 1000
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.moveSize = 'X' === this.dir ? this.width : this.height
        this.activeSlide = 0;

        this.sliderLine.style = `position:relative;
                                 height: ${this.height}px;
                                 overflow:hidden;`

        for (let i = 0; i < this.slides.length; i++) {
            const sl = this.slides[i];
            sl.style = `position:absolute;
                      width: ${this.width}px;
                      height: ${this.height}px;`
            if (i != this.activeSlide) {
                sl.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if (i === this.slides.length - 1) {
                sl.style.transform = `translate${this.dir}(${-this.moveSize}px)`
            }
        }
        if (options.autoplay) {
            let interval = setInterval(() => {
                this.move(this.next)
            }, this.timeMove + 2000)
            this.slider.addEventListener('mouseenter', () => {
                clearInterval(interval)
            })
            this.slider.addEventListener('mouseleave', () => {
                interval = setInterval(() => {
                    this.move(this.next)
                }, this.timeMove + 2000);
            })
        }
        this.next.addEventListener('click', () => this.move(this.next))
        this.prev.addEventListener('click', () => this.move(this.prev))

        window.addEventListener('resize', function (e) {
            this.slider = document.querySelector(options.slider);
            this.sliderLine = this.slider.querySelector('.slider__line');
            this.slides = this.sliderLine.children;
            this.width = this.slider.clientWidth;
            this.height = this.slider.clientHeight;
            this.moveSize = 'X' === this.dir ? this.width : this.height;


            for (let i = 0; i < this.slides.length; i++) {
                const sl = this.slides[i];
                sl.style = `position:absolute;
                          width: ${this.width}px;
                          height: ${this.height}px;`
                if (i != this.activeSlide) {
                    sl.style.transform = `translate${this.dir}(${this.moveSize}px)`
                }
                if (i === this.slides.length - 1) {
                    sl.style.transform = `translate${this.dir}(${-this.moveSize}px)`
                }
            }

        });
    }

    move(btn) {
        this.next.disabled = true;
        this.prev.disabled = true;
        setTimeout(() => {
            this.next.disabled = false;
            this.prev.disabled = false;
        }, this.timeMove + 2000);
        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize

        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            slide.style.transition = '0ms';
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`
            }

        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.slides.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms'
    }

}


const slider = new SLIDER({
    slider: '.slider',
    direction: 'X',
    time: 1000,
    autoplay: true,
})