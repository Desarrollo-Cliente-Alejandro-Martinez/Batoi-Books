export default class Router {
    
    constructor(view) {
        this.view = view;
        if (!this.view.form || !this.view.about || !this.view.bookList) {
            console.error("Uno o más elementos de vista no se encontraron.");
            return;
        }
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        this.onHashChange();
    }

    onHashChange() {

        const hash = window.location.hash || "#";

        this.hideAllPages();
        
        switch (hash) {
            case "#form":
                this.view.form.classList.remove('hidden');
                break;
            case "#about":
                this.view.about.classList.remove('hidden');
                break;
            case "#list":
                this.view.bookList.classList.remove('hidden');
                break;
            default:
                this.view.bookList.classList.remove('hidden');
        }
    }
    
    hideAllPages() {
        this.view.form.classList.add('hidden');
        this.view.about.classList.add('hidden');
        this.view.bookList.classList.add('hidden');
        window.scrollTo(0, 0);
    } 
}
