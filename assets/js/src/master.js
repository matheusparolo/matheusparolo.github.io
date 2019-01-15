(function(){

    "use strict";

    // Auxiliary
    Object.prototype.removeAllChilds = function(){

        while(this.firstChild)
            this.removeChild(this.firstChild);

    };
    let searchAttr = (attr, element) => {

        while(element.getAttribute(attr) === null)
        {
            element = element.parentNode;
        }
        return element.getAttribute(attr);

    };
    let request = (url, callback) => {

        let oReq = new XMLHttpRequest();
        oReq.onload = callback;
        oReq.open("get", url, true);
        oReq.send();

    };
    let createElement = (tagName, classList) => {

        let element = document.createElement(tagName.toUpperCase());
        classList.forEach(className => {

            element.classList.add(className);

        });
        return element;

    };

    // Functions
    let languages = {

        calcSpaces : points => {

            let spaceBlock1 = (points * 100) / 6;
            let marginLeftBlock1 = 100 - spaceBlock1;
            return {
                width: spaceBlock1 / 2,
                margin: marginLeftBlock1 / 2
            };

        },
        make : () => {

            let percentLeft = document.querySelectorAll(".language .percent-left");
            let percentRight = document.querySelectorAll(".language .percent-right");

            percentLeft.forEach(element => {

                let vals = languages.calcSpaces(element.innerText);
                element.style.width = vals.width + "%";
                element.style["margin-left"] = vals.margin + "%";

            });
            percentRight.forEach(element => {

                let vals = languages.calcSpaces(element.innerText);
                element.style.width = vals.width + "%";

            })

        }

    };
    let toShow = {

        identifiers : {

            codepen : {
                pageIndex : 0,
                div : "#portfolio",
                items : [],
                url : "/assets/json/codepen-links.json"
            },
            replit : {
                pageIndex : 0,
                div : "#portfolio",
                items : [],
                url : "/assets/json/replit-links.json"
            },
            github : {
                pageIndex : 0,
                div : "#projects",
                items : [],
                url : "/assets/json/github-links.json"
            }


        },
        nextPage : e => {

            let identifier = searchAttr("data-identifier", e.target);
            toShow.toPage(toShow.identifiers[identifier].pageIndex + 1, identifier);

        },
        toPage : (index, identifier) => {

            identifier = toShow.identifiers[identifier];
            let listItems = identifier.items;
            let itemsDiv = document.querySelector(identifier.div + " .items");

            if(index < listItems.length){

                itemsDiv.removeAllChilds();

                let items = listItems[index];
                items.forEach(item => itemsDiv.appendChild(toShow.makeDivHtml(item)));

                itemsDiv.appendChild(toShow.makePagination(listItems, index));
                toShow.bindPaginations();

                identifier.pageIndex = index;

            }

        },

        getItems : (id) => {

            let identifier = toShow.identifiers[id];
            document.querySelector(identifier.div).setAttribute("data-identifier", id);
            if(identifier.items.length === 0){

                request(identifier.url,  function(){

                    let data, counter, pageNumber, items;

                    pageNumber = counter = 0;
                    data = JSON.parse(this.responseText);

                    items = identifier.items;

                    // Push items to make pagination
                    data.forEach(item => {

                        if(counter === 4)
                        {
                            counter = 0;
                            pageNumber++;
                        }

                        if(items[pageNumber] === undefined)
                        {
                            items[pageNumber] = [];
                        }
                        items[pageNumber].push(item);

                        counter++;

                    });

                    toShow.toPage(0, id);

                });

            }else{

                toShow.toPage(0, id);

            }

        },

        makeDivHtml : item => {

            let div = document.createElement("DIV");
            div.classList.add("item");

            let anchor = document.createElement("A");
            anchor.href = item.link;

            let img = document.createElement("IMG");
            img.src = item.img;
            img.alt = item.title;

            let title = document.createElement("H3");
            title.innerText = item.title;
            title.classList.add("title");

            anchor.appendChild(img);
            div.appendChild(anchor);
            div.appendChild(title);

            return div;

        },
        makePagination : (list, toActive = 0) => {

            let pagesDiv = document.createElement("DIV");
            pagesDiv.classList.add("pagination");

            for(var i = 0; i < list.length; i++){

                let button = document.createElement("BUTTON");
                button.classList.add("page-index");
                button.innerText = i + 1;

                if(i === toActive)
                {
                    button.classList.add("active");
                }

                pagesDiv.appendChild(button);

            }
            return pagesDiv;

        },
        bindPaginations : () => {

            document.querySelectorAll("[data-type='toShow'] .page-index").forEach(element => {
                element.onclick = (e) => {
                    toShow.toPage(parseInt(e.target.innerText) - 1, searchAttr("data-identifier", e.target));
                };
            });

        },

    };
    let skillsMenu = {

        cards : [],

        change_category_state : event => {

            let category = (event.target.tagName === "P") ? event.target.parentNode : event.target.parentNode.parentNode;
            let img = category.querySelector("img");

            if(category.classList.contains("expanded"))
            {

                category.classList.remove("expanded");
                img.setAttribute("alt", "Expandir Categoria")

            }else{

                category.classList.add("expanded");
                img.setAttribute("alt", "Retrair Categoria")

            }

        },
        showCards : event => {

            let index = searchAttr("data-index", event.target);
            skillsMenu.insertCards(index);

        },
        insertCards : index => {

            let data = skillsMenu.cards[index];
            let title = data.title;
            let cards = data.cards;

            document.querySelector("#skills .top-bar .title").innerText = title;

            let view = document.querySelector("#skills .view");
            view.removeAllChilds();

            for (var k in cards){

                let cardScored = cards[k];
                if (typeof cardScored !== 'function') {

                    let row = createElement("div", ["row", "no-gutters"]);

                    let colGroups = createElement("div", ["col"]);
                    let cardGroup = createElement("div", ["card", "card-group"]);

                    let title = createElement("h1", ["title"]);
                    title.innerText = k;

                    cardGroup.appendChild(title);
                    colGroups.appendChild(cardGroup);

                    let colCards = createElement("div", ["col"]);

                    for (var j in cardScored){

                        let score = cardScored[j];
                        if (typeof score !== 'function') {

                            let card = createElement("div", ["card"]);

                            let cardTitle = createElement("h1", ["title"]);
                            cardTitle.innerText = j;

                            card.appendChild(cardTitle);

                            let cardScores = createElement("div", ["score"]);

                            for(var i = 0; i < score; i++)
                            {

                                let score = createElement("div", ["point", "full"]);
                                cardScores.appendChild(score);

                            }

                            for(i = score; i < 10; i++)
                            {

                                let score = createElement("div", ["point"]);
                                cardScores.appendChild(score);

                            }

                            card.appendChild(cardScores);
                            colCards.appendChild(card);

                        }
                    }

                    row.appendChild(colGroups);
                    row.appendChild(colCards);

                    view.appendChild(row);

                }
            }

        },
        getItems : () => {

            request("/assets/json/skills.json",function(){

                skillsMenu.cards = JSON.parse(this.responseText);
                skillsMenu.insertCards(0);

            })

        }

    };

    // Init
    let bindActions = () => {

        // Action to icons in portfolio
        document.querySelectorAll('[data-type="box"]').forEach(element => {

            element.onclick = (e) => {

                let element = (e.target.tagName === "IMG") ? e.target.parentElement : e.target;

                let box = document.querySelector(element.getAttribute("data-target"));
                if(element.getAttribute("data-action") === "move")
                {
                    box.classList.add("moved");
                    document.querySelector("#portfolio .titleBar h2").innerText = "Repl.it";
                }
                else{
                    box.classList.remove("moved");
                    document.querySelector("#portfolio .titleBar h2").innerText = "Codepen";
                }

                toShow.getItems(element.getAttribute("data-identifier"));

            };

        });

        // Actions in more
        document.querySelectorAll(".more").forEach(element => {

            element.onclick = (e) => {

                let element = (e.target.tagName === "IMG") ? e.target.parentElement : e.target;
                let section = element.parentNode;

                if(section.classList.contains("items-collapsed"))
                {
                    section.classList.remove("items-collapsed");
                    element.querySelector("img").src = "/assets/media/img/icons/arrow_up.svg";
                }else{
                    section.classList.add("items-collapsed");
                    element.querySelector("img").src = "/assets/media/img/icons/arrow_down.svg";
                }

            }

        });

        // Action in pagination
        document.querySelector("[data-type='toShow'] .next-page").onclick = toShow.nextPage;

        // Action to open menu in Skills
        document.querySelector("#open-menu").onclick = e => {

            let element = (e.target.tagName === "IMG") ? e.target.parentElement : e.target;

            if(element.classList.contains("hide"))
            {

                element.classList.remove("hide");

            }else{

                element.classList.add("hide");

            }

        };

        // Action in skills menu nav
        document.querySelectorAll(".item-collapse > p").forEach(element => {

            element.onclick = skillsMenu.change_category_state;
            element.onkeyup = function(event){
                if(event.code === "Space" || event.code === "Enter"){
                    skillsMenu.change_category_state(event);
                }
            }

        });
        document.querySelectorAll("#skills .item-final").forEach( element => {

            element.onclick = skillsMenu.showCards;

        });

        // Action on scroll
        document.querySelectorAll("#menu a").forEach(element => {

           element.onclick = (e) => {

               e.preventDefault();

               let target = e.target.getAttribute("href");
               let toScroll = document.querySelector(target).offsetTop;

               window.scroll({ top: toScroll, left: 0, behavior: 'smooth' });
               document.querySelector("main").scroll({ top: toScroll, left: 0, behavior: 'smooth' })

           }

        });

    };
    let loadContents = () => {

        toShow.getItems("codepen");
        toShow.getItems("github");
        skillsMenu.getItems();

    };
    let main = () => {

        // Make languages in sidebar
        languages.make();

        // Bind Actions
        bindActions();

        // Load Content
        loadContents()

    };

    main();


})();