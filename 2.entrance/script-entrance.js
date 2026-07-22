document.addEventListener('DOMContentLoaded', () => {
    const titleSection = document.querySelector('.title-section');
    const fadeInGroup = document.querySelector('.fade-in-group');

    if(!titleSection || !fadeInGroup) return;

    const handleScrollFade = () => {
        const rect = titleSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if(rect.top <= viewportHeight && rect.bottom >= 0){
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight /2;
            const distanceFromCenter = elementCenter - viewportCenter;
            const fadeRange = viewportHeight /2;
            let progress = 1 - Math.abs(distanceFromCenter) / fadeRange;
            progress = Math.max(0, Math.min(1, progress));
            fadeInGroup.style.opacity = progress;
            const yOffset = 40 * (1 - progress);
            fadeInGroup.style.transform = `translateY(${yOffset}px)`;
        }
    };

    handleScrollFade();
    window.addEventListener('scroll', handleScrollFade);

});
