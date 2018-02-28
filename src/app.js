import Sticky from 'Root/sticky';
import 'SCSS/main.scss';

let addButton = document.getElementById('add-anchor'),
    addStickyListener = function(evt) {
        //Send AJAX call to get the stciky dom.
        var newStickyRequest = new XMLHttpRequest();
        newStickyRequest.open('GET', 'sticky.html', true);
        newStickyRequest.responseType = 'text';
        newStickyRequest.onload = function(e) {
            if (this.status == 200) {
                createSticky(this.responseText);
            }
        };
        newStickyRequest.send();
    };

//Add click event handler/listener
addButton.addEventListener('click', addStickyListener);

/**
 * Creates new sticky with the sticky dom string.
 *
 * @function createSticky
 * @param  {string} stickyDom {Sticky dom string}
 * @public
 */
var createSticky = function(stickyDom) {
    var stickyArea = document.querySelector('.sticky-area'),
        sticky;
    sticky = new Sticky(stickyArea, stickyDom);
    sticky.create();
}