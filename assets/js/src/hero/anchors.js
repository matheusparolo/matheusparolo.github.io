let scrollTo = (target) => {

    target = $(target).offset().top;
    document.querySelector(".parallax").scroll({top: target, left: 0, behavior: 'smooth'});

};


$(".scroll-to-portfolio").on("click", (e) => {

    e.preventDefault();
    scrollTo("#portfolio")

});
$(".scroll-to-about").on("click", (e) => {

    e.preventDefault();
    scrollTo("#about");

    showAbout();

});
$(".scroll-to-skills").on("click", (e) => {


    e.preventDefault();
    scrollTo("#about");

    showSkills();

});
$(".scroll-to-historic").on("click", (e) => {

    e.preventDefault();
    scrollTo("#about");

    showHistoric();

});