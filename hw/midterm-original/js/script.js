// using a toggleClass method makes this turn off and on constantly
// to avoid that, using a hard 'addClass' and 'removeClass'

$(function(){
    var theorem = $('#theorem');
    var minBtn = $('#maxMin');
    minBtn.on('click', function() {
        theorem.toggleClass('shown');
        theorem.toggleClass('minimized');

        if (minBtn.text() == '--') {
            minBtn.html('<sup>++</sup>');
        }
        else {
            minBtn.html('<sup>--</sup>');
        }
    });
});
