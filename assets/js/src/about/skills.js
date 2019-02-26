let skillsMenu = {

    cards : [],

    change_category_state : e => $(e.currentTarget.parentElement).toggleClass("expanded"),
    showCards : e => skillsMenu.insertCards($(e.currentTarget).attr("data-index")),

    insertCards : index => {

        let data = skillsMenu.cards[index];
        let title = data.title;
        let cardsRows = data.cards;

        $("#skills .title").text(title);

        let view = $("#skills #cards");
        view.empty();


        $.each(cardsRows, (cardRowName, cardRow) => {

            view
                .append($("<div>")

                    .addClass("row no-gutters")

                    .append($("<div>")
                        .addClass("col")
                        .append($("<div>")
                            .addClass("skills-card skills-card-group")
                            .append($("<h1>").addClass("title").text(cardRowName))
                        )
                    )

                    .append(function(){

                        let toReturn = $("<div>").addClass("col");
                        $.each(cardRow, (cardName, cardScore) => {

                            let level;
                            if(cardScore <= 2)
                                level = 1;
                            else if(cardScore > 2 && cardScore < 5)
                                level = 2;
                            else if(cardScore >= 5 && cardScore < 7)
                                level = 3;
                            else
                                level = 4;

                            toReturn.append($("<div>").addClass("skills-card level-" + level)
                                .append($("<h1>")
                                    .addClass("title")
                                    .text(cardName)
                                )
                                .append(function(){

                                    let toReturn = $("<div>").addClass("score d-flex");

                                    for(var i = 0; i < cardScore; i++) {
                                        toReturn.append($("<div>").addClass("point full"));
                                    }
                                    for(i; i < 10; i++){
                                        toReturn.append($("<div>").addClass("point"));
                                    }

                                    return toReturn;

                                }())

                            );

                        });

                        return toReturn;

                    }())

                );

        });


    },

    requestData : () => {

        $.getJSON("/assets/json/about/skills.json", (data) => {

            skillsMenu.cards = data;
            skillsMenu.insertCards(0);

        })

    }

};

$("#open-side-panel").on("click", () => $("#skills .side-bar").toggleClass("hide"));
$(".item-collapse > p").on("click", skillsMenu.change_category_state);
$("#skills .item-final").on("click", skillsMenu.showCards);

skillsMenu.requestData();