// declare a namespace for the external API to talk to
var MyApp = window.MyApp || {};

(function(w, $, NESGames) {
    'use strict';

    // media query to handle loading ajax data
    var mqWide = matchMedia("(min-width: 700px)");

    // URL to remote API
    var apiUrl = 'http://iam.colum.edu/jon.petto/nesgames.php';

    // reference destination for related games
    var $relatedGames = $('#related-games');

    //function to execute when media query is true
    var mqHandler = function(mq) {
        if (mq.matches) {
            console.log("getting games!");
            loadGames();    // load games from remote API     
        }
    };

    // function to retrieve games from remote API
    var loadGames = function() {
        $.getScript(apiUrl + '?action=related_games&publisher=capcom&id=0&callback=MyApp.displayGames');
    };

    // Function to display games saved in sessionStorage
    MyApp.displayGames = function(data) {
        // reference our template
        var tpl = document.querySelector('#game-template');

        // prepare a variable for each copy of the template
        var clone;

        for (var i = 0; i < data.games.length; i++) {
            // create copy of our template
            clone = document.importNode(tpl.content, true);

            // set the image of the game
            clone.querySelector('.game-image').setAttribute('src', data.games[i].box_art);

            // set the title of the game
            clone.querySelector('.caption').textContent = data.games[i].title;

            // put the cloned template in the DOM
            $relatedGames.append(clone);
        }

        mqWide.removeListener(mqHandler);
    };

    // make mqWide listen and execute mqHandler
    // listening for viewport resizing
    mqWide.addListener(mqHandler);

    // also check mqWide at page load
    if (mqWide.matches) {
        loadGames();
    }

})(window, window.jQuery, window.NESGames);
