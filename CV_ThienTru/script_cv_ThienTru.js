document.addEventListener('DOMContentLoaded', function () {
    // SCROLL AMINATION & NAVBAR HIGHLIGHT
    const skillsSection = document.querySelector('.skills');
    const aboutContent = document.querySelector('.about-content');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-right a');
    const navHeader = document.querySelector('.nav-header');
    const navHeight = navHeader.offsetHeight;

    let skillsAnimated = false;
    let aboutAnimated = false;

    // HIỆU ỨNG HIGHLIGHT THANH MENU THEO VỊ TRÍ CUỘN TRANG
    function updateActiveNavLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // ĐẢM BẢO HIGHLIGHT MENU CUỐI CÙNG KHI CUỘN XUỐNG CUỐI TRANG
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
            currentSectionId = sections[sections.length - 1].id;
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // XỬ LÝ CÁC HIỆU ỨNG ĐỘNG ĐƯỢC KÍCH HOẠT KHI CUỘN TRANG (KỸ NĂNG, GIỚI THIỆU & BIỂU ĐỒ)
    function handleScrollAnimations() {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        updateActiveNavLink();

        // HIỆU ỨNG ĐỘNG CHO PHẦN KỸ NĂNG
        if (skillsSection && !skillsAnimated) {
            const skillsRect = skillsSection.getBoundingClientRect();
            if (skillsRect.top <= windowHeight * 0.75) {
                skillsSection.classList.add('animate');
                skillsAnimated = true; // ĐẶT CỜ THÀNH ĐÚNG ĐỂ NGĂN VIỆC LẶP LẠI HIỆU ỨNG ĐỘNG
            }
        }

        // HIỆU ỨNG ĐỘNG CHO NỘI DUNG PHẦN GIỚI THIỆU
        if (aboutContent && !aboutAnimated) {
            const aboutRect = aboutContent.getBoundingClientRect();
            if (aboutRect.top <= windowHeight * 0.8) {
                aboutContent.classList.add('active');
                aboutAnimated = true; // ĐẶT CỜ THÀNH ĐÚNG ĐỂ NGĂN HIỆU ỨNG ĐỘNG LẶP LẠI
            }
        }
    }

    // THÊM TRÌNH LẮNG NGHE SỰ KIỆN CUỘN
    window.addEventListener('scroll', handleScrollAnimations);
    // GỌI HÀM BAN ĐẦU TRONG TRƯỜNG HỢP TRANG TẢI MÀ CÁC PHẦN TỬ ĐÃ NẰM SẴN TRONG KHUNG NHÌN
    handleScrollAnimations();


    // HIỆU ỨNG PARALLAX CHO AVT
    const avatarLargeFrame = document.querySelector('.avatar-fixed-right .avatar-frame');
    const avatarLargeImg = document.querySelector('.avatar-fixed-right .avatar-large');
    const aboutAvatarFrame = document.querySelector('.about-avatar .avatar-frame');
    const aboutAvatarImg = document.querySelector('.about-avatar .avatar-large');

    function applyParallax(frame, img, strength = 0.03) { // GIẢM CƯỜNG ĐỘ ĐỂ TẠO HIỆU ỨNG TINH TẾ HƠN
        if (!frame || !img) return;

        frame.addEventListener('mousemove', (e) => {
            const rect = frame.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const offsetX = (e.clientX - centerX) * strength;
            const offsetY = (e.clientY - centerY) * strength;

            img.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
        });

        frame.addEventListener('mouseleave', () => {
            // ĐẶT LẠI VỊ TRÍ ẢNH KHI CON TRỎ CHUỘT RỜI ĐI
            img.style.transform = 'translate(-50%, -50%)';
        });
    }

    // ÁP DỤNG HIỆU ỨNG PARALLAX CHO CẢ 2 AVT
    applyParallax(avatarLargeFrame, avatarLargeImg, 0.015); // CƯỜNG ĐỘ
    applyParallax(aboutAvatarFrame, aboutAvatarImg, 0.01); // CƯỜNG ĐỘ


    // HIỆU ỨNG NỀN: SAO BĂNG + SAO LẤP LÁNH
    // CONTAINER CHO CÁC HIỆU ỨNG NỀN
    const sky = document.createElement('div');
    sky.style.position = 'fixed';
    sky.style.top = 0;
    sky.style.left = 0;
    sky.style.width = '100%';
    sky.style.height = '100%';
    sky.style.zIndex = '1'; // ĐẢM BẢO CONTAINER NẰM DƯỚI NỘI DUNG VÀ TRÊN NỀN
    sky.style.pointerEvents = 'none'; //CHO PHÉP CÁC LẦN NHẤP CHUỘT ĐI XUYÊN QUA
    sky.style.overflow = 'hidden';
    document.body.appendChild(sky);

    // SAO BĂNG
    function createShootingStar() {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1; // KÍCH THƯỚC NGẪU NHIÊN
        const startX = Math.random() * window.innerWidth; // VỊ TRÍ BẮT ĐẦU THEO TRỤC X NGẪU NHIÊN
        const startY = Math.random() * window.innerHeight * 0.5; // BẮT ĐẦU Ở NỬA TRÊN CỦA MÀN HÌNH
        const duration = Math.random() * 1.5 + 0.8; // THỜI LƯỢNG NGẪU NHIÊN

        star.style.position = 'absolute';
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size * 20}px`; // HIỆU ỨNG ĐUÔI DÀI
        star.style.background = 'linear-gradient(-45deg, white, #bf00ff)'; // GRADIENT TỪ TRẮNG SANG TÍM NEON
        star.style.borderRadius = '50%'; // DẠNG HÌNH TRÒN
        star.style.opacity = Math.random() * 0.8 + 0.3; // ĐỘ TRONG SUỐT
        star.style.transform = 'rotate(-45deg)'; // GÓC ĐUÔI CỦA SAO BĂNG
        star.style.boxShadow = `0 0 8px #bf00ff`; // HIỆU ỨNG PHÁT SÁNG KIỂU ĐÈN NEON
        star.style.animation = `shoot ${duration}s linear forwards`; // ANIMATION
        sky.appendChild(star);

        // XÓA NGÔI SAO SAU KHI HIỆU ỨNG ĐỘNG HOÀN TẤT ĐỂ DỌN DẸP DOM
        setTimeout(() => sky.removeChild(star), duration * 1000);
    }

    // TẠO NHIỀU SAO BĂNG NGẪU NHIÊN SAU MỖI 700 MILI GIÂY VỚI 70% (XÁC SUẤT)
    setInterval(() => {
        if (Math.random() > 0.3) { // XÁC SUẤT 70% TẠO RA 1 NGÔI SAO
            createShootingStar();
        }
    }, 700);


    // SAO LẤP LÁNH
    function createTwinklingStars(count = 100) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2 + 1; // KÍCH THƯỚC NGẪU NHIÊN
            const left = Math.random() * 100; // VỊ TRÍ NGANG (TRỤC X) NGẪU NHIÊN
            const top = Math.random() * 100; // VỊ TRÍ DỌC (TRỤC Y) NGẪU NHIÊN
            const delay = Math.random() * 5; // ĐỘ TRỄ ANIMATION NGẪU NHIÊN TẠO LẤP LÁNH ĐA DẠNG

            star.className = 'twinkle-star'; // ÁP DỤNG HIỆU ỨNG ĐỘNG CSS
            star.style.position = 'absolute';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.backgroundColor = 'white'; 
            star.style.borderRadius = '50%'; 
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.opacity = Math.random() * 0.8 + 0.2; 
            star.style.animationDelay = `${delay}s`; 

            sky.appendChild(star);
        }
    }

    createTwinklingStars(); 

    const style = document.createElement('style');
    style.textContent = `
        @keyframes shoot {
            0% {
                transform: translate(0, 0) rotate(-45deg);
                opacity: 1;
            }
            100% {
                transform: translate(-300px, 300px) rotate(-45deg);
                opacity: 0;
            }
        }

        .twinkle-star {
            animation: twinkle 3s infinite ease-in-out;
            box-shadow: 0 0 6px white; /* Subtle glow */
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style);

    // HIỆU ỨNG ĐÁNH CHỮ
    const typingTextElement = document.getElementById('typing-text');
    const textToType = "Tôi là sinh viên công nghệ thông tin";

    if (typingTextElement) {
        typingTextElement.textContent = ''; 
    }

    function typeWriter() {
        if (!typingTextElement) {
            console.error('Phần tử #typing-text không tồn tại!');
            return;
        }

        const totalCharacters = textToType.length;
        const animationDuration = totalCharacters * 0.1; // 0.1 GIÂY MỖI KÍ TỰ

        typingTextElement.style.animation =
            `typing ${animationDuration}s steps(${totalCharacters}, end) forwards,
             blink-caret .75s step-end infinite`;

        typingTextElement.textContent = textToType;

        typingTextElement.addEventListener('animationend', function(event) {
            if (event.animationName === 'typing') {
                typingTextElement.style.borderRight = 'none';
            }
        });
    }

    typeWriter(); 

    // HIỆU ỨNG CARD SỞ THÍCH TỰ ĐỘNG NỔI LÊN LIÊN TỤC
    const hobbyCards = document.querySelectorAll('.hobby-card');
    const hobbiesSection = document.querySelector('#so-thich'); // LẤY SECTION SỞ THÍCH ĐỂ THEO DÕI TẦM NHÌN

    const animationDurationCard = 800; // THỜI GIAN CHO MỖI ANIMATION
    const delayBetweenCards = 600; // ĐỘ TRỄ GIỮA CÁC CARD NỔI LÊN
    const cycleDelay = 1500; // ĐỘ TRỄ GIỮA CÁC CHU KỲ ANIMATION (1.5S SAU KHI CARD CUỐI CÙNG NỔI LÊN)

    let currentCardIndex = 0;
    let animationRunning = false; // BIẾN KIỂM SOÁT XEM ANIMATION CÓ ĐANG CHẠY HAY KHÔNG
    let animationTimeout; // DÙNG ĐỂ LƯU TRỮ TIMEOUT CÓ THỂ XÓA

    function animateNextCard() {
        if (!animationRunning) return; // NẾU ANIMATION ĐÃ DỪNG, THOÁT

        if (currentCardIndex < hobbyCards.length) {
            const cardToAnimate = hobbyCards[currentCardIndex];

            // NẾU CARD ĐANG Ở TRẠNG THÁI 'ANIMATE-IN' (ĐÃ NỔI), THÌ CHO NÓ ẨN ĐI TRƯỚC
            if (cardToAnimate.classList.contains('animate-in')) {
                cardToAnimate.classList.remove('animate-in');
                cardToAnimate.classList.add('animate-out'); // KÍCH HOẠT ANIMATION ẨN ĐI

                // ĐỢI ANIMATION ẨN ĐI HOÀN TẤT TRƯỚC KHI KÍCH HOẠT NỔI LÊN LẠI
                setTimeout(() => {
                    cardToAnimate.classList.remove('animate-out'); // XÓA CLASS ẨN
                    cardToAnimate.classList.add('animate-in'); // KÍCH HOẠT ANIMATION NỔI LÊN
                }, animationDurationCard); // SAU KHI ANIMATION ẨN ĐI HOÀN TẤT
            } else {
                // KÍCH HOẠT NỔI LÊN DO RESET
                cardToAnimate.classList.add('animate-in');
            }

            currentCardIndex++;
            // LÊN LỊCH CHO CARD TIẾP THEO
            animationTimeout = setTimeout(animateNextCard, delayBetweenCards);

        } else {
            // ĐÃ DUYỆT QUA TẤT CẢ CÁC CARD TRONG CHU KỲ
            currentCardIndex = 0; // ĐẶT LẠI INDEX VỀ 0 CHO CHU KỲ TIẾP THEO
            // ĐỢI 1 KHOẢNG THỜI GIAN TRƯỚC KHI BẮT ĐẦU LẠI VÒNG LẶP
            animationTimeout = setTimeout(() => {
                // ĐẢM BẢO TẤT CẢ CÁC CARD ĐÃ VỀ TRẠNG THÁI ẨN/ KHÔNG CÓ ANIMATION
                hobbyCards.forEach(card => {
                    card.classList.remove('animate-in');
                    card.classList.remove('animate-out');
                    card.style.opacity = 0; // ĐẢM BẢO ẨN HẲN
                    card.style.transform = 'translateY(20px)'; // ĐẢM BẢO VỊ TRÍ BAN ĐẦU
                });
                setTimeout(animateNextCard, 100);
            }, cycleDelay);
        }
    }

    if (hobbiesSection && hobbyCards.length > 0) {
        const observerOptions = {
            root: null, // DÙNG VIEWPORT LÀM ROOT
            rootMargin: '0px',
            threshold: 0.2 // KÍCH HOẠT KHI 20% CỦA PHẦN TỬ HIỂN THỊ
        };

        const hobbiesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // BẮT ĐẦU ANIMATION KHI SECTION "SỞ THÍCH" XUẤT HIỆN
                    if (!animationRunning) {
                        animationRunning = true;
                        console.log('Phần Sở thích đã xuất hiện. Bắt đầu animation lặp lại.');
                        animateNextCard(); // BẮT ĐẦU VÒNG LẶP ANIMATION
                    }
                } else {
                    // DỪNG ANIMATION KHI SECTION "SỞ THÍCH" KHÔNG CÒN NẰM TRONG KHUNG
                    if (animationRunning) {
                        animationRunning = false;
                        clearTimeout(animationTimeout); // XÓA TIMEOUT HIỆN TẠI
                        console.log('Phần Sở thích đã khuất. Dừng animation.');
                        // RESET TẤT CẢ CARD VỀ TRẠNG THÁI BAN ĐẦU
                        hobbyCards.forEach(card => {
                            card.classList.remove('animate-in');
                            card.classList.remove('animate-out');
                            card.style.opacity = 0; // ĐẢM BẢO ẨN HẲN
                            card.style.transform = 'translateY(20px)'; // ĐẢM BẢO VỊ TRÍ BAN ĐẦU
                        });
                        currentCardIndex = 0; 
                    }
                }
            });
        }, observerOptions);

        hobbiesObserver.observe(hobbiesSection);
        console.log('IntersectionObserver đã được thiết lập cho phần Sở thích.');
    }

    // HIỆU ỨNG ĐỘNG DẠNG SÓNG CHO BIỂU ĐỒ 
    const duAnSection = document.getElementById('du-an');
    const doughnutCharts = document.querySelectorAll('.doughnut-chart');

    if (duAnSection && doughnutCharts.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3 // KÍCH HOẠT HIỆU ỨNG KHI 30% CỦA PHẦN SECTION HIỂN THỊ
        };

        const duAnObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    doughnutCharts.forEach(chart => {
                        const percentage = chart.style.getPropertyValue('--p'); 
                        chart.style.setProperty('--p', percentage); 
                    });
                    duAnObserver.unobserve(duAnSection);
                }
            });
        }, observerOptions);

        duAnObserver.observe(duAnSection);
    }
});