export default class Sticky {

    /**
     * Constructor.
     * @param  {HTMLElement} parent {parent node for the sticky}
     * @public
     */
    constructor(parent) {
        this.parent = parent;
        this.position = this.getPosition();
        this.target = null;
    }

    /**
     * Creates sticky on the DOM once.
     *
     * @function {create}
     * @public
     */
    create() {
        let target = this.target,
            parent = this.parent,
            position = this.position;
        if (!target) {
            target = document.createElement('div'),
                target.classList.add('sticky');
            //Set sticky position
            target.style.top = position.top;
            target.style.left = position.left;
            //Set dom
            target.innerHTML = stickyDom;
            //Add new sticky to sticky area
            parent.appendChild(target);
        }
    }


    /**
     * Returns random top and left position with max allowed screen width.
     *
     * @function getPosition
     * @return {Object} {Object with random top & left}
     * @private
     */
    getPosition() {
        let stickySize = 250, //Width & Height of the sticky
            topPadding = 20, //Padding around nav bar
            vPadding = 10, //Padding on both left and right end of the screen
            navBarHeight = 50, //Height of the nav bar
            minTop = navBarHeight + topPadding, //Min top position should be nar bar height plus top padding
            maxScreenWidth = window.innerWidth - (stickySize + 2 * vPadding), //max width should exclude sticky width and padding
            maxScreenHeight = window.innerHeight - (stickySize + minTop), //max height should exclude sticky height and padding
            randomLeft = Math.ceil(Math.random() * maxScreenWidth), //Random left with max screen width
            randomTop = Math.ceil(Math.random() * maxScreenHeight); //Random top with max screen height
        randomTop = randomTop < minTop ? minTop : randomTop; //If random top is less than min top then use min top
        randomLeft = randomLeft < vPadding ? vPadding : randomLeft; //If random left is less than vPadding then use vPadding
        return {
            top: randomTop,
            left: randomLeft
        };
    }
}