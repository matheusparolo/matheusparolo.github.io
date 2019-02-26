var portfolioManager = {

    typeIDNow : null,
    types : {

        1:{name: "Site",      links: [], url: "/assets/json/portfolio/real.json"},
        2:{name: "Exemplo",   links: [], url: "/assets/json/portfolio/examples.json"},
        3:{name: "Projeto",   links: [], url: "/assets/json/portfolio/projects.json"},
        4:{name: "Fragmento", links: [], url: "/assets/json/portfolio/fragments.json"}

    },

    // Binds actions
    return : () => portfolioManager.changePage("left"),
    next : () => portfolioManager.changePage("right"),
    changeType : (e) => portfolioManager.requestLinks($(e.currentTarget).attr("data-id")),

    // Actions
    changePage : (direction) => {

        let targetInfo = portfolioManager.getStepAndPrefix();
        let prefix = targetInfo.prefix;
        let step = targetInfo.step;
        let target = ".portfolio--links." + prefix;

        let newIndex = parseInt($(target).attr("data-index"));
        newIndex = direction === "left" ? newIndex - 1 : newIndex + 1;

        portfolioManager.toPage(newIndex, prefix, step);

    },
    toPage : (pageIndex, prefix, step) => {

        let target = ".portfolio--links." + prefix;

        let type = portfolioManager.types[portfolioManager.typeIDNow];
        let linksData = portfolioManager.getLinks(pageIndex, step);

        let links = linksData.links;
        let firstPage = linksData.firstPage;
        let lastPage = linksData.lastPage;

        $(target).empty().attr("data-index", pageIndex);
        links.forEach(link => $(target).append(portfolioManager.makeLink(link, type.name)));

        // Show/Hide return/next button
        let className = "d-";
        if(prefix === "md"){className += "md-"}
        else if(prefix === "lg"){className += "lg-"}

        if(firstPage)
            $(".return").removeClass(className + "block").addClass(className + "none");

        else
            $(".return").removeClass(className + "none").addClass(className + "block");

        if(lastPage)
            $(".next").removeClass(className + "block").addClass(className + "none");

        else
            $(".next").removeClass(className + "none").addClass(className + "block");


    },

    // Calc
    getStepAndPrefix : () => {

        // Get Target and step based on screen width
        let prefix;
        let step;

        if(window.innerWidth < 768) {

            prefix = "xs";
            step = 1;

        }
        else if(window.innerWidth >= 768 && window.innerWidth < 992) {
            prefix = "md";
            step = 4
        }

        else{
            prefix = "lg";
            step = 6
        }


        return {step : step, prefix : prefix};

    },
    getLinks : (pageIndex, step) => {

        let type = portfolioManager.types[portfolioManager.typeIDNow];

        let indexInit = pageIndex * step;
        let indexFin = indexInit + step;

        let firstPage = (indexInit === 0);
        let lastPage = (indexFin >= type.links.length);

        return {links : type.links.slice(indexInit, indexFin), firstPage : firstPage, lastPage : lastPage};

    },

    // Makes
    makeLink : (link, typeName) => {

        return $("<a>")
            .addClass("link col-4")
            .attr("href", link.link)
            .attr("data-title", link.title)
            .attr("data-type", typeName)
            .append($("<img>")
                .attr("src", link.img)
                .attr("alt", link.title)
            );


    },

    // Requests
    requestLinks : (id) => {

        portfolioManager.typeIDNow = id;
        let type = portfolioManager.types[id];

        if(type.links.length === 0){

            $.getJSON(portfolioManager.types[id].url, (data) => {

                type.links = data;

                portfolioManager.toPage(0, "xs", 1);
                portfolioManager.toPage(0, "md", 4);
                portfolioManager.toPage(0, "lg", 6);

            })

        }else{

            portfolioManager.toPage(0, "xs", 1);
            portfolioManager.toPage(0, "md", 4);
            portfolioManager.toPage(0, "lg", 6);

        }

    },

    // Init
    init : () => {

        portfolioManager.requestLinks(4);

        $(".return").on("click", portfolioManager.return);
        $(".next").on("click", portfolioManager.next);
        $("#portfolio-types li").on("click", portfolioManager.changeType);

    }

};
portfolioManager.init();