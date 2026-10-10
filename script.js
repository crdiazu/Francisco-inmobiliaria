// Load default content on start
document.addEventListener('DOMContentLoaded', () => {
    loadContent('Entregables/Resumen_Ejecutivo.md');
});

async function loadContent(filePath) {
    // Update active button state
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event?.currentTarget.classList.add('active');

    const container = document.getElementById('markdown-content');
    
    // Add loading state
    container.innerHTML = '<div class="loading-state">Cargando documento...</div>';
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo: ${response.statusText}`);
        }
        
        const markdownText = await response.text();
        
        // Parse markdown using marked.js
        const htmlContent = marked.parse(markdownText);
        
        // Render with fade-in effect
        container.innerHTML = `<div class="markdown-body fade-in">${htmlContent}</div>`;
        
        // Render Mermaid charts if they exist
        if (markdownText.includes('mermaid')) {
            // Marked wraps it in <pre><code class="language-mermaid">
            const mermaidBlocks = container.querySelectorAll('code.language-mermaid');
            mermaidBlocks.forEach(block => {
                const div = document.createElement('div');
                div.className = 'mermaid';
                div.style.textAlign = 'center';
                div.textContent = block.textContent;
                block.parentNode.replaceWith(div);
            });
            mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        }
        
    } catch (error) {
        container.innerHTML = `
            <div class="markdown-body fade-in">
                <h2>Error</h2>
                <p>No se pudo cargar el documento. ${error.message}</p>
                <p><strong>Nota:</strong> Al abrir el archivo localmente en tu navegador (sin un servidor local), es posible que los navegadores bloqueen la carga de archivos por seguridad (CORS/Cross-Origin Request). Esto funcionará perfectamente una vez que esté publicado en GitHub Pages.</p>
            </div>
        `;
    }
}
