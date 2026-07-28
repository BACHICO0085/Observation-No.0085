document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    const header = document.getElementById('global-header');

    const cottonImg = document.getElementById('cotton-img')
    const cottonComment = document.getElementById('cotton-comment');
    const typedTextElement = document.getElementById('typed-text');
    let typingStated = false;

    const orbSystem = document.getElementById('orb-system');
    const orbs = document.querySelectorAll('.orb');
    const totalOrbs = orbs.length

    const radiusX = 350;
    const radiusY = 100;
    const orbScrollStart = 2000;
    
    const textLines = [
        "ようこそ、観測者さん。",
        "ここは『Observation No.0085』。",
        "現実と仮想世界のはざまに浮かぶ、小さな観測所です。",
        "BACHICOの形作ったものや、思い出の欠片、",
        "僕が大切に集めた記録たちが、ここで静かに眠っています。",
        "ずっと静かな場所なので...",
        "どうぞ、あなたのペースで、ゆっくりしていってください。",
    ];
    function startTyping(){
        let lineIndex = 0;
        let charIndex = 0;
        
        function type(){
            if(lineIndex < textLines.length){
                if(charIndex < textLines[lineIndex].length){
                    typedTextElement.innerHTML += textLines[lineIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, 50);
                }else{
                    typedTextElement.innerHTML += '<br>';
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(type, 100);
                }
            }
        }
        type();
    }

    window.addEventListener('scroll', () =>{
        const scrollY = window.scrollY;
        if(scrollY > 200){
            heroTitle.classList.add('is-visible');
        }else{
            heroTitle.classList.remove('is-visible');
        }

        if(scrollY > 1000){
            heroTitle.classList.add('is-header');
            header.classList.add('is-active');
            cottonComment.classList.add('is-active');
            cottonImg.classList.add('is-visible');
            if(!typingStated){
                typingStated = true;
                setTimeout(startTyping, 1000)
            }
        }else{
            heroTitle.classList.remove('is-header');
            header.classList.remove('is-active');
            cottonComment.classList.remove('is-active');
            cottonImg.classList.remove('is-visible');
        }

        if(scrollY > orbScrollStart - 200){
            orbSystem.classList.add('is-visible');
            cottonImg.classList.remove('is-visible');
            cottonImg.classList.add('is-orb');
        }else{
            orbSystem.classList.remove('is-visible');
            cottonImg.classList.remove('is-orb');
        }

        if(scrollY > orbScrollStart - 200){
            let baseAngle = (scrollY - orbScrollStart) * 0.15;

            let maxScale = 0;
            let frontOrbIndex = 0;

            orbs.forEach((orb, index) => {
                let angle = baseAngle + (360 / totalOrbs) * index;
                let rad = angle * (Math.PI / 180);

                let x = Math.cos(rad) * radiusX;
                let y = Math.sin(rad) * radiusY;

                let scale = (y + radiusY) / (radiusY * 2) * 0.5 + 0.5;
                let zIndex = Math.round(scale * 100);

                orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
                orb.style.zIndex;

                orb.classList.remove('is-front');

                if(scale > maxScale){
                    maxScale = scale;
                    frontOrbIndex = index;
                }
            });
            
            orbs[frontOrbIndex].classList.add('is-front');
        }
    });
});

orbs.forEach(orb =>{
    orb.addEventListener('click', () =>{
        const targetUrl = orb.getAttribute('deta-url');

        if(orb.classList.constains('is-front') && targetUrl){
            window.location.href = targetUrl;
        }
    });
});