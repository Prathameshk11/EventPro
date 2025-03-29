$(document).ready(() => {
    // Initialize vendor carousel
    setTimeout(() => {
        $(".vendor-carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        })

        // Custom navigation for vendor carousel
        $(".vendors-prev").click(() => {
            $(".vendor-carousel").slick("slickPrev")
        })

        $(".vendors-next").click(() => {
            $(".vendor-carousel").slick("slickNext")
        })

        // Initialize venue carousel
        $(".venue-carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3500,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        })

        // Custom navigation for venue carousel
        $(".venues-prev").click(() => {
            $(".venue-carousel").slick("slickPrev")
        })

        $(".venues-next").click(() => {
            $(".venue-carousel").slick("slickNext")
        })

        // Initialize event carousel
        $(".event-carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        })

        // Custom navigation for event carousel
        $(".events-prev").click(() => {
            $(".event-carousel").slick("slickPrev")
        })

        $(".events-next").click(() => {
            $(".event-carousel").slick("slickNext")
        })
    }, 1000) // Delay to ensure Angular has rendered the content
})

