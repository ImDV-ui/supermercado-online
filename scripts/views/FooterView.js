export class FooterView {
    render() {
        const footer = document.createElement('footer');
        footer.innerHTML = `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h4>ASISTENCIA</h4>
                        <ul>
                            <li>Envíos y Devoluciones</li>
                            <li>Preguntas Frecuentes</li>
                            <li>Términos y Condiciones</li>
                            <li>Contacto</li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>NOSOTROS</h4>
                        <ul>
                            <li>Nuestra Historia</li>
                            <li>Sostenibilidad</li>
                            <li>Trabaja con nosotros</li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>SÍGUENOS</h4>
                        <ul>
                            <li>Instagram</li>
                            <li>Twitter</li>
                            <li>TikTok</li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>NEWSLETTER</h4>
                        <div class="form-group">
                            <input type="email" placeholder="Tu email...">
                        </div>
                    </div>
                </div>
                <div style="text-align: center; color: #666; font-size: 0.8rem;">
                    &copy; 2026 EL ÚLTIMO Y ME VOY. TODOS LOS DERECHOS RESERVADOS.
                </div>
            </div>
        `;
        return footer;
    }
}
