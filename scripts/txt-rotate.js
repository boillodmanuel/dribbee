// html


/*
Message:
<span class="txt-rotate"
data-period="2000"
data-rotate='[ "hello", "’gut&shy;ten tag", "bonjour"]'>hello</span>
    world
 */

// css

/*
.txt-rotate {
    position: relative;
}

.txt-rotate.typing:after {
    content: "";
    position: absolute;
    height: 1.2em;
    width: 1px;
    border-right: 0.08em solid #fff
}
*/

// script
(function () {

    var TxtRotate = function (el, toRotate, period) {

        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 100) || 4000;
        this.txt = toRotate[0];
        this.pause = true;
        this.isDeleting = true;

        var that = this;
        setTimeout(function () {
            that.tick();
        }, this.period / 2);
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        var charLength; // handle special char &shy; with char code 173
        if (this.isDeleting) {
            charLength = this.txt.slice(-1).charCodeAt(0) === 173 ? 2 : 1;
            this.txt = fullTxt.substring(0, this.txt.length - charLength);
        } else {
            charLength = fullTxt.charCodeAt(this.txt.length) === 173 ? 2 : 1;
            this.txt = fullTxt.substring(0, this.txt.length + charLength);
        }

        var timeout;
        if (this.pause) {
            this.el.classList.add('typing');
            this.pause = false;
            timeout = 1000;
        } else {
            this.el.innerHTML = this.txt;

            timeout = 150 - Math.random() * 100;

            if (this.isDeleting) {
                timeout /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                timeout = this.period;
                this.isDeleting = true;
                this.pause = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                timeout = 1000;
            }
            if (this.pause) {
                this.el.classList.remove('typing');
            }
        }

        var that = this;
        setTimeout(function () {
            that.tick();
        }, timeout);
    };

    document.addEventListener("DOMContentLoaded", function () {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].dataset.rotate;
            var period = elements[i].dataset.period;
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
    });

}());