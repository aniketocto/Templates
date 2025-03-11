document.addEventListener("DOMContentLoaded", () => {
    const slidesData = [
        {
            title: "Maharashtrian Meal",
            tagline: "Start your culinary journey with authentic flavors<br>Crispy, savory, aromatic delights<br>Perfect beginnings to a traditional meal",
            image: "image/food-img-1.png",
            menu: {
                title: "Jevan includes:",
                items: [
                    { label: "Signature Dish", value: "Alu Vadi (Colocasia Leaf Rolls)" },
                    { label: "Also Try", value: "Sabudana Vada, Kothimbir Vadi, Batata Vada" },
                    { label: "Served With", value: "Spicy Chutney, Coconut Garnish" },
                    { label: "Pairing", value: "Traditional Sol Kadhi" }
                ]
            }
        },
        {
            title: "Bengali Meal",
            tagline: "Robust flavors that capture the essence of Maharashtra<br>Slow-cooked perfection with aromatic spices<br>Hearty dishes that satisfy and delight",
            image: "image/food-img-2.png",
            menu: {
                title: "Khādya Includes: ",
                items: [
                    { label: "Veg Specials", value: "Masala Vangi, Sukha Shorva Bhaji, Matki Usal" },
                    { label: "Non-Veg Option", value: "Gavathi Chicken, Kombdi Vade, Mutton Rassa" },
                    { label: "Served With", value: "Chapati, Jowar Bhakri, Masala Bhaat" },
                    { label: "Condiments", value: "Thecha, Limboo, Green Chillies" }
                ]
            }
        },
        {
            title: "Gujrati Meals",
            tagline: "Lunch thali arrives, joy opens your dodha<br>Spices call, the rich, pure excitement!<br>Savor each morsel, a traditional touch. You deserve it.",
            image: "image/food-img-3.png",
            menu: {
                title: "Khōrāka Includes:",
                items: [
                    { label: "Appetizer", value: "Alu Vadi" },
                    { label: "Mains", value: "Masala Vangi, Sukha Shorva Bhaji, Chapati, Masala Bhaat, Matki, Gavathi Chicken" },
                    { label: "Sides", value: "Koshimbir Koshimbir" },
                    { label: "Dessert", value: "Shrikhand" }
                ]
            }
        },
        {
            title: "Punjabi Meals",
            tagline: "Sweet endings to a perfect meal<br>Indulgent treats with subtle flavors<br>The perfect balance of sweetness and texture",
            image: "image/food-img-4.png",
            menu: {
                title: "Bhōjana Includes:",
                items: [
                    { label: "Signature Dessert", value: "Shrikhand (Sweetened Strained Yogurt)" },
                    { label: "Also Try", value: "Puran Poli, Modak, Basundi" },
                    { label: "Seasonal Special", value: "Aamras (during mango season)" },
                    { label: "Accompaniment", value: "Homemade Ghee" }
                ]
            }
        },
        {
            title: "South Indian Meals",
            tagline: "Start your culinary journey with authentic flavors<br>Crispy, savory, aromatic delights<br>Perfect beginnings to a traditional meal",
            image: "image/food-img-1.png",
            menu: {
                title: "Uṇavu Includes:",
                items: [
                    { label: "Signature Dish", value: "Alu Vadi (Colocasia Leaf Rolls)" },
                    { label: "Also Try", value: "Sabudana Vada, Kothimbir Vadi, Batata Vada" },
                    { label: "Served With", value: "Spicy Chutney, Coconut Garnish" },
                    { label: "Pairing", value: "Traditional Sol Kadhi" }
                ]
            }
        },
    ];

    const mainImage = document.getElementById('mainImage');
    const content = document.getElementById('content');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 1;
    let rotationDegree = 0;
    let autoPlayInterval;

    function updateContent(index) {
        const data = slidesData[index];

        mainImage.classList.add('animate-image');

        let targetRotation = index * -72;


        mainImage.style.transition = 'transform 1s linear';
        mainImage.style.transform = `rotate(${targetRotation}deg)`;


        rotationDegree = targetRotation;
        currentIndex = index;

        let html = `
            <h1>${data.title}</h1>
            <p class="tagline">${data.tagline}</p>
            <div class="menu-section">
                <p class="menu-label">${data.menu.title}</p>
        `;

        data.menu.items.forEach(item => {
            html += `<p class="menu-items"><strong>${item.label}:</strong> ${item.value}</p>`;
        });

        html += `</div>`;
        content.innerHTML = html;

        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnails[index].classList.add('active');
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(function () {
            currentIndex = (currentIndex + 1) % slidesData.length;
            updateContent(currentIndex);
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function initializeSlider() {
        if (window.innerWidth > 900) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function () {
                    stopAutoPlay(); 
                    const index = parseInt(this.getAttribute('data-id'));
                    currentIndex = index;
                    updateContent(currentIndex);
                    // setTimeout(startAutoPlay, 5000);
                });
            });

            updateContent(0);
            // startAutoPlay();
        } else {
            if (swiper) { // Check if Swiper already initialized
                swiper.destroy(true, true); // Destroy existing instance
            }

            var swiper = new Swiper(".mySwiper", {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                speed: 1000,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });

            swiper.on('slideChange', function () {
                const index = swiper.realIndex; // Get the real index of the active slide
                updateContent(index); // Update content based on Swiper's active slide
            });

            updateContent(0); // Initialize content with the first slide
        }
    }


    initializeSlider();
    window.addEventListener('resize', initializeSlider);
})