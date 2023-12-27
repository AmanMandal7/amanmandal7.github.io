const elem1 = document.querySelector(".elem1");
const elem2 = document.querySelector(".elem2");
const elem3 = document.querySelector(".elem3");
const mainPage = document.querySelector("#main")

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: 10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    }).to(".boundingelem", {
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: .2,
        delay: -1.5
    }).from("#herofooter", {
        opacity: 0,
        duration: 1.5,
        delay: -1.4,
        ease: Expo.easeInOut,
    })
}

var timeout;
function squizTheCircle() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        //Logic from the video
        // xscale = gsap.utils.clamp(1.2, 1.2, xdiff);
        // yscale = gsap.utils.clamp(.8, .8, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        //Login made by myself
        if (xdiff) {
            xscale = 1.3;
        } else {
            xscale = 1
        }
        if (ydiff) {
            yscale = 1.3;
        } else {
            yscale = 1
        }

        circleMouseFoller(xscale, yscale);

        timeout = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100);
    })
}

function circleMouseFoller(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    });
}

squizTheCircle();
circleMouseFoller();
firstPageAim();

var rotate1 = 0;
var rotate2 = 0;
var rotate3 = 0;
var diffrot1 = 0;
var diffrot2 = 0;
var diffrot3 = 0;

mainPage.addEventListener("mousemove", (dets) => {
    // For the element 1 
    var elem1BottomVal = elem1.getBoundingClientRect().bottom;
    var elem1TopVal = elem1.getBoundingClientRect().top;

    var diff1 = dets.clientY - elem1.getBoundingClientRect().top;
    diffrot1 = dets.clientX - rotate1;
    rotate1 = dets.clientX;
    if (dets.clientY > elem1TopVal && dets.clientY < elem1BottomVal) {
        gsap.to(elem1.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: diff1,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-15, 15, diffrot1)
        });
        elem1.classList.add("active");
    } else {
        gsap.to(elem1.querySelector("img"), {
            opacity: 0,
            duration: 0.1
        })
        elem1.classList.remove("active")
    };

    // For the element 2 
    var elem2BottomVal = elem2.getBoundingClientRect().bottom;
    var elem2TopVal = elem2.getBoundingClientRect().top;

    var diff2 = dets.clientY - elem2.getBoundingClientRect().top;
    diffrot2 = dets.clientX - rotate2;
    rotate2 = dets.clientX;
    if (dets.clientY > elem2TopVal && dets.clientY < elem2BottomVal) {
        gsap.to(elem2.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: diff2,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-15, 15, diffrot2)
        });
        elem2.classList.add("active");
    } else {
        gsap.to(elem2.querySelector("img"), {
            opacity: 0,
            duration: 0.1
        });
        elem2.classList.remove("active");
    };

    // For the element 3
    var elem3BottomVal = elem3.getBoundingClientRect().bottom;
    var elem3TopVal = elem3.getBoundingClientRect().top;

    var diff3 = dets.clientY - elem3.getBoundingClientRect().top;
    diffrot3 = dets.clientX - rotate3;
    rotate3 = dets.clientX;
    if (dets.clientY > elem3TopVal && dets.clientY < elem3BottomVal) {
        gsap.to(elem3.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: diff3,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-15, 15, diffrot3)
        });
        elem3.classList.add("active");
    } else {
        gsap.to(elem3.querySelector("img"), {
            opacity: 0,
            duration: 0.1
        });
        elem3.classList.remove("active");
    };

    // For mouse cursor 
    if (dets.clientY > elem1TopVal && dets.clientY < elem3BottomVal) {
        document.querySelector("#minicircle").classList.add('active');
        document.querySelector("#minicircle").innerText = "view";
    } else {
        document.querySelector("#minicircle").classList.remove('active');
        document.querySelector("#minicircle").innerText = "";
    }
})