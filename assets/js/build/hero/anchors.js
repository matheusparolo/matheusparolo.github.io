"use strict";var scrollTo=function(a){a=$(a).offset().top,document.querySelector(".nr").scroll({top:a,left:0,behavior:"smooth"})};$(".scroll-to-portfolio").on("click",function(a){a.preventDefault(),scrollTo("#nt")}),$(".scroll-to-about").on("click",function(a){a.preventDefault(),scrollTo("#tc"),showAbout()}),$(".scroll-to-skills").on("click",function(a){a.preventDefault(),scrollTo("#tc"),showSkills()}),$(".scroll-to-historic").on("click",function(a){a.preventDefault(),scrollTo("#tc"),showHistoric()});
//# sourceMappingURL=anchors.js.map
