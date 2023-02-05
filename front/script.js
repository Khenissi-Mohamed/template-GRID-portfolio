class Portfolio {

    constructor (selector) {
        this.activeContent = null
        this.activeItem = null
        this.container = document.querySelector(selector)
        if (this.container === null) {
            throw new Error(`L'element ${selector} n'existe pas`)
        }
        this.children = Array.prototype.slice.call(this.container.querySelectorAll('.js-item'))
        this.children.forEach((child) => {
            child.addEventListener('click', (e) => {
                e.preventDefault()
                this.show(child)
            })
        })
        // quand on clique sur un projet js-item
        // on supprime l'element actif
        // on clone notre js-body
        // on insere ce clone apres mon element js-item
    }
    // affiche le contenu d un element
    show (child){
        let content = child.querySelector('.js-body').cloneNode(true)
        let offset = 0
        if (this.activeContent !== null) {
            this.slideUp(this.activeContent)
            if (this.activeContent.offsetTop > child.offsetTop) {
                offset = this.activeContent.offsetheight
            }
        }
        if (this.activeItem === child) {
            this.activeContent = null
            this.activeItem = null
        } else {
        let content = child.querySelector('.js-body').cloneNode(true)
        child.after(content)
        this.slideDown(content)
        this.scrollTo(child, offset)
        this.activeContent = content
        this.activeItem = child
        }
        
    }

    // affiche l element avec un effet d'animation
    slideDown (element) {
        let height = element.offsetHeight
        element.style.height = '0px'
        element.style.transitionDuration = '.5s'
        element.offsetHeight // force repaint
        element.style.height = height + 'px'
        window.setTimeout(function () {
            element.style.height = null
        }, 500)
    }


    // masque l element avec un effet d'animation
    slideUp (element) {
        let height = element.offsetHeight
        element.style.height = height + 'px'
        element.offsetHeight // force repaint
        element.style.height = '0px'
        window.setTimeout(function () {
            element.parentNode.removeChild(element)
        }, 500)
    }

    // fait défiler la fenêtre jusqu'à l'elément
    scrollTo(element, offset = 0) {
        window.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop - offset
        })
    }
}

new Portfolio('#js-portfolio')