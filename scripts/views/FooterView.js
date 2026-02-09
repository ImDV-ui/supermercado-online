export class FooterView {
    render() {
        const footer = document.createElement('footer');
        this.loadContent(footer);
        return footer;
    }

    async loadContent(element) {
        try {
            const response = await fetch('templates/Footer.html');
            const html = await response.text();
            element.innerHTML = html;
        } catch (error) {
            console.error('Error loading footer template:', error);
            element.innerHTML = '<div class="container">Error loading footer</div>';
        }
    }
}
