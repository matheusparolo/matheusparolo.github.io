"use strict";

(function () {

    "use strict";

    // Auxiliary

    Object.prototype.removeAllChilds = function () {

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
    };
    var searchAttr = function searchAttr(attr, element) {

        while (element.getAttribute(attr) === null) {
            element = element.parentNode;
        }
        return element.getAttribute(attr);
    };
    var request = function request(url, callback) {

        var oReq = new XMLHttpRequest();
        oReq.onload = callback;
        oReq.open("get", url, true);
        oReq.send();
    };
    var createElement = function createElement(tagName, classList) {

        var element = document.createElement(tagName.toUpperCase());
        classList.forEach(function (className) {

            element.classList.add(className);
        });
        return element;
    };

    // Functions
    var languages = {

        calcSpaces: function calcSpaces(points) {

            var spaceBlock1 = points * 100 / 6;
            var marginLeftBlock1 = 100 - spaceBlock1;
            return {
                width: spaceBlock1 / 2,
                margin: marginLeftBlock1 / 2
            };
        },
        make: function make() {

            var percentLeft = document.querySelectorAll(".language .percent-left");
            var percentRight = document.querySelectorAll(".language .percent-right");

            percentLeft.forEach(function (element) {

                var vals = languages.calcSpaces(element.innerText);
                element.style.width = vals.width + "%";
                element.style["margin-left"] = vals.margin + "%";
            });
            percentRight.forEach(function (element) {

                var vals = languages.calcSpaces(element.innerText);
                element.style.width = vals.width + "%";
            });
        }

    };
    var toShow = {

        identifiers: {

            codepen: {
                pageIndex: 0,
                div: "#portfolio",
                items: [],
                url: "/assets/json/codepen-links.json"
            },
            replit: {
                pageIndex: 0,
                div: "#portfolio",
                items: [],
                url: "/assets/json/replit-links.json"
            },
            github: {
                pageIndex: 0,
                div: "#projects",
                items: [],
                url: "/assets/json/github-links.json"
            }

        },
        nextPage: function nextPage(e) {

            var identifier = searchAttr("data-identifier", e.target);
            toShow.toPage(toShow.identifiers[identifier].pageIndex + 1, identifier);
        },
        toPage: function toPage(index, identifier) {

            identifier = toShow.identifiers[identifier];
            var listItems = identifier.items;
            var itemsDiv = document.querySelector(identifier.div + " .items");

            if (index < listItems.length) {

                itemsDiv.removeAllChilds();

                var items = listItems[index];
                items.forEach(function (item) {
                    return itemsDiv.appendChild(toShow.makeDivHtml(item));
                });

                itemsDiv.appendChild(toShow.makePagination(listItems, index));
                toShow.bindPaginations();

                identifier.pageIndex = index;
            }
        },

        getItems: function getItems(id) {

            var identifier = toShow.identifiers[id];
            document.querySelector(identifier.div).setAttribute("data-identifier", id);
            if (identifier.items.length === 0) {

                request(identifier.url, function () {

                    var data = void 0,
                        counter = void 0,
                        pageNumber = void 0,
                        items = void 0;

                    pageNumber = counter = 0;
                    data = JSON.parse(this.responseText);

                    items = identifier.items;

                    // Push items to make pagination
                    data.forEach(function (item) {

                        if (counter === 4) {
                            counter = 0;
                            pageNumber++;
                        }

                        if (items[pageNumber] === undefined) {
                            items[pageNumber] = [];
                        }
                        items[pageNumber].push(item);

                        counter++;
                    });

                    toShow.toPage(0, id);
                });
            } else {

                toShow.toPage(0, id);
            }
        },

        makeDivHtml: function makeDivHtml(item) {

            var div = document.createElement("DIV");
            div.classList.add("item");

            var anchor = document.createElement("A");
            anchor.href = item.link;

            var img = document.createElement("IMG");
            img.src = item.img;
            img.alt = item.title;

            var title = document.createElement("H3");
            title.innerText = item.title;
            title.classList.add("title");

            anchor.appendChild(img);
            div.appendChild(anchor);
            div.appendChild(title);

            return div;
        },
        makePagination: function makePagination(list) {
            var toActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


            var pagesDiv = document.createElement("DIV");
            pagesDiv.classList.add("pagination");

            for (var i = 0; i < list.length; i++) {

                var button = document.createElement("BUTTON");
                button.classList.add("page-index");
                button.innerText = i + 1;

                if (i === toActive) {
                    button.classList.add("active");
                }

                pagesDiv.appendChild(button);
            }
            return pagesDiv;
        },
        bindPaginations: function bindPaginations() {

            document.querySelectorAll("[data-type='toShow'] .page-index").forEach(function (element) {
                element.onclick = function (e) {
                    toShow.toPage(parseInt(e.target.innerText) - 1, searchAttr("data-identifier", e.target));
                };
            });
        }

    };
    var skillsMenu = {

        cards: [],

        change_category_state: function change_category_state(event) {

            var category = event.target.tagName === "P" ? event.target.parentNode : event.target.parentNode.parentNode;
            var img = category.querySelector("img");

            if (category.classList.contains("expanded")) {

                category.classList.remove("expanded");
                img.setAttribute("alt", "Expandir Categoria");
            } else {

                category.classList.add("expanded");
                img.setAttribute("alt", "Retrair Categoria");
            }
        },
        showCards: function showCards(event) {

            var index = searchAttr("data-index", event.target);
            skillsMenu.insertCards(index);
        },
        insertCards: function insertCards(index) {

            var data = skillsMenu.cards[index];
            var title = data.title;
            var cards = data.cards;

            document.querySelector("#skills .top-bar .title").innerText = title;

            var view = document.querySelector("#skills .view");
            view.removeAllChilds();

            for (var k in cards) {

                var cardScored = cards[k];
                if (typeof cardScored !== 'function') {

                    var row = createElement("div", ["row", "no-gutters"]);

                    var colGroups = createElement("div", ["col"]);
                    var cardGroup = createElement("div", ["card", "card-group"]);

                    var _title = createElement("h1", ["title"]);
                    _title.innerText = k;

                    cardGroup.appendChild(_title);
                    colGroups.appendChild(cardGroup);

                    var colCards = createElement("div", ["col"]);

                    for (var j in cardScored) {

                        var score = cardScored[j];
                        if (typeof score !== 'function') {

                            var card = createElement("div", ["card"]);

                            var cardTitle = createElement("h1", ["title"]);
                            cardTitle.innerText = j;

                            card.appendChild(cardTitle);

                            var cardScores = createElement("div", ["score"]);

                            for (var i = 0; i < score; i++) {

                                var _score = createElement("div", ["point", "full"]);
                                cardScores.appendChild(_score);
                            }

                            for (i = score; i < 10; i++) {

                                var _score2 = createElement("div", ["point"]);
                                cardScores.appendChild(_score2);
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
        getItems: function getItems() {

            request("/assets/json/skills.json", function () {

                skillsMenu.cards = JSON.parse(this.responseText);
                skillsMenu.insertCards(0);
            });
        }

    };

    // Init
    var bindActions = function bindActions() {

        // Action to icons in portfolio
        document.querySelectorAll('[data-type="box"]').forEach(function (element) {

            element.onclick = function (e) {

                var element = e.target.tagName === "IMG" ? e.target.parentElement : e.target;

                var box = document.querySelector(element.getAttribute("data-target"));
                if (element.getAttribute("data-action") === "move") {
                    box.classList.add("moved");
                    document.querySelector("#portfolio .titleBar h2").innerText = "Repl.it";
                } else {
                    box.classList.remove("moved");
                    document.querySelector("#portfolio .titleBar h2").innerText = "Codepen";
                }

                toShow.getItems(element.getAttribute("data-identifier"));
            };
        });

        // Actions in more
        document.querySelectorAll(".more").forEach(function (element) {

            element.onclick = function (e) {

                var element = e.target.tagName === "IMG" ? e.target.parentElement : e.target;
                var section = element.parentNode;

                if (section.classList.contains("items-collapsed")) {
                    section.classList.remove("items-collapsed");
                    element.querySelector("img").src = "/assets/media/img/icons/arrow_up.svg";
                } else {
                    section.classList.add("items-collapsed");
                    element.querySelector("img").src = "/assets/media/img/icons/arrow_down.svg";
                }
            };
        });

        // Action in pagination
        document.querySelector("[data-type='toShow'] .next-page").onclick = toShow.nextPage;

        // Action to open menu in Skills
        document.querySelector("#open-menu").onclick = function (e) {

            var element = e.target.tagName === "IMG" ? e.target.parentElement : e.target;

            if (element.classList.contains("hide")) {

                element.classList.remove("hide");
            } else {

                element.classList.add("hide");
            }
        };

        // Action in skills menu nav
        document.querySelectorAll(".item-collapse > p").forEach(function (element) {

            element.onclick = skillsMenu.change_category_state;
            element.onkeyup = function (event) {
                if (event.code === "Space" || event.code === "Enter") {
                    skillsMenu.change_category_state(event);
                }
            };
        });
        document.querySelectorAll("#skills .item-final").forEach(function (element) {

            element.onclick = skillsMenu.showCards;
        });

        // Action on scroll
        document.querySelectorAll("#menu a").forEach(function (element) {

            element.onclick = function (e) {

                e.preventDefault();

                var target = e.target.getAttribute("href");
                var toScroll = document.querySelector(target).offsetTop;

                window.scroll({ top: toScroll, left: 0, behavior: 'smooth' });
                document.querySelector("main").scroll({ top: toScroll, left: 0, behavior: 'smooth' });
            };
        });
    };
    var loadContents = function loadContents() {

        toShow.getItems("codepen");
        toShow.getItems("github");
        skillsMenu.getItems();
    };
    var main = function main() {

        // Make languages in sidebar
        languages.make();

        // Bind Actions
        bindActions();

        // Load Content
        loadContents();
    };

    main();
})();
//# sourceMappingURL=master.js.map