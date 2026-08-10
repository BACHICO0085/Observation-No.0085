document.addEventListener('DOMContentLoaded', () => {

    // header
    const menuButton = document.querySelector('.button-menu');
    const mainMenu = document.querySelector('.main-nav');

    menuButton.addEventListener('click', () => {
        mainMenu.classList.toggle('open-menu');
        if (menuButton.innerHTML === "Menu") {
            menuButton.innerHTML = "Close";
        } else {
            menuButton.innerHTML = "Menu";
        }
    });

    // modal
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const btnPrev = document.getElementById('modal-prev');
    const btnNext = document.getElementById('modal-next');
    const dotsContainer = document.getElementById('modal-dots');
    let currentImages = [];
    let currentIndex = 0;

    const updateModalView = () => {
        modalImg.src = currentImages[currentIndex];
        if (currentImages.length > 1) {
            btnPrev.style.display = 'flex';
            btnNext.style.display = 'flex';
        } else {
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
        }

        dotsContainer.innerHTML = '';
        if (currentImages.length > 1) {
            currentImages.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === currentIndex) {
                    dot.classList.add('is-active');
                }
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateModalView();
                });
                dotsContainer.appendChild(dot);
            });
        }
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imagesStr = item.getAttribute('data-images') || item.getAttribute('data-image');
            if (imagesStr) {
                currentImages = imagesStr.split(',').map(url => url.trim());
            } else {
                currentImages = [item.querySelector('img').src];
            }

            const title = item.getAttribute('data-title') || '';
            const date = item.getAttribute('data-date') || '';
            const desc = item.getAttribute('data-description') || '';

            modalImg.alt = title;
            modalTitle.innerHTML = title;
            modalDate.textContent = date;
            modalDesc.textContent = desc;

            currentIndex = 0;
            updateModalView();

            modal.classList.add('is-active');
            modal.setAttribute('aria-hidden', 'false');

            document.body.style.overflow = 'hidden';
        });
    });

    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateModalView();
    });
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateModalView();
    })

    const closeModal = () => {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    })






});