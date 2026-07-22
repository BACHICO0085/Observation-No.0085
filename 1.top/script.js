document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.getElementById('spotlight');
    const door = document.getElementById('door');
    const enterBtn = document.getElementById('enter-btn')
    const flash = document.getElementById('flash-overlay');

    let doorTimer = null;
    let isHoveringDoor = false;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    const easingSpeed = 0.1;

    let flickerFrame = 0;
    const baseRadius = window.innerWidth <= 768 ? 180 : 350;

    setTimeout(() =>{
        spotlight.classList.add('spotlight-active');
    }, 1500);

    function handlePointerMove(clientX, clientY){
        targetX = (clientX / window.innerWidth) * 100;
        targetY = (clientY / window.innerHeight) * 100;

        const rect = door.getBoundingClientRect();

        const isInside = (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
        );

        if(isInside && !isHoveringDoor){
            isHoveringDoor = true;
            doorTimer = setTimeout(() => {
                enterBtn.classList.add('is-visible');
            }, 1500);
        }

        else if(!isInside && isHoveringDoor){
            isHoveringDoor = false;
            clearTimeout(doorTimer);
        }
    }

    document.addEventListener('mousemove', (e) => {
        handlePointerMove(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    function animateSpotlight() {
        currentX += (targetX - currentX) * easingSpeed;
        currentY += (targetY - currentY) * easingSpeed;

        flickerFrame++;
        const gentleWave = Math.sin(flickerFrame * 0.04) * 15;
        const sharpNoise = (Math.random() - 0.5) *8;

        const currentRadius = baseRadius + gentleWave + sharpNoise;

        spotlight.style.setProperty('--mouse-x', `${currentX}%`);
        spotlight.style.setProperty('--mouse-y', `${currentY}%`);
        spotlight.style.setProperty('--spotlight-size', `${currentRadius}px`);

        requestAnimationFrame(animateSpotlight);
    }

    requestAnimationFrame(animateSpotlight);

    // door.addEventListener('mouseenter', () => {
    //     doorTimer = setTimeout(() => {
    //         enterBtn.classList.add('is-visible');
    //     },1000);
    // });

    // door.addEventListener('mouseleave', () => {
    //     clearTimeout(doorTimer);
    // });

    enterBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        flash.classList.add('flash-active');
        setTimeout(() => {
           window.location.href = enterBtn.getAttribute('href'); 
        }, 1500);
    });
});