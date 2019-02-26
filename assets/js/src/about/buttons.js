let showSkills = () => {

    $("#card")
        .removeClass("show-about")
        .removeClass("show-historic")
        .addClass("show-skills")

};
let showHistoric = () => {

    $("#card")
        .removeClass("show-about")
        .removeClass("show-skills")
        .addClass("show-historic")

};
let showAbout = () => {

    $("#card")
        .removeClass("show-skills")
        .removeClass("show-historic")
        .addClass("show-about")

};

$("#to-skills").on("click", showSkills);
$("#to-historic").on("click", showHistoric);
$(".to-about").on("click", showAbout);