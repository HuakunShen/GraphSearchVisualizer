// move every half a second
function move_every_half_sec() {
    let old = 0;
    let clock = 0;
    let count = 0;
    while (1) {
        let second = new Date().getMilliseconds();
        if (second < 500) {     //every half second
            clock = 0;
        } else {
            clock = 1;
        }
        if (move()) {
            console.log(count);
        }
        if (count > 100) {
            count = 0;
        }
    }

    function move() {
        if (old != clock) {
            old = clock;
            count++;
            return true;
        }
        return false;
    }
}
// move_every_half_sec();

function move_every_one_sec(func) {
    let prev = 0;
    let curr = new Date().getMilliseconds();
    let count = 0;
    while (1) {
        prev = curr;
        curr = new Date().getMilliseconds();
        if (prev === 0 && curr !== 0) {
            func(count);
            count++;
        }
        if (count > 100) {
            count = 0;
        }
    }
}
// move_every_one_sec(func);

function func(e) {
    console.log(e);
}
function timer(func, num, stop) {
    num /= 2;
    if (num < 1) {
        num = 1;
    }
    let prev = 0;
    let curr = new Date().getMilliseconds();
    let count = 0;
    let display_count = 0;
    while (1) {
        prev = curr;
        curr = new Date().getMilliseconds();
        if (curr % 100 === 0) {
            if (prev !== curr) {
                // func(count);
                // console.log(count);
                count++;
            }
        }
        if (count === num) {
            func();
            console.log(display_count);
            display_count++;
            count = 0;
        }
        // if (display_count > 1000) {
        //     display_count = 0;
        // }
        if (display_count === stop) {
            return;
        }

    }
}
timer(function(){}, 500,4);