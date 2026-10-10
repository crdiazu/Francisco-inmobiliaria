document.addEventListener('DOMContentLoaded', () => {
    loadAllSections();
    setupNavScrollSpy();
});

async function loadAllSections() {
    const loaders = document.querySelectorAll('.section-loader');

    // Configure marked to handle options cleanly
    marked.setOptions({
        gfm: true,
        breaks: true
    });

    const fetchPromises = Array.from(loaders).map(async (loader) => {
        const filePath = loader.getAttribute('data-file');
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }
            const markdownText = await response.text();
            const htmlContent = marked.parse(markdownText);

            // Replace loader with rendered markdown container
            const container = document.createElement('div');
            container.className = 'markdown-card fade-in';
            container.innerHTML = htmlContent;

            // Process any Mermaid blocks inside this section
            const mermaidBlocks = container.querySelectorAll('code.language-mermaid');
            mermaidBlocks.forEach((block) => {
                const div = document.createElement('div');
                div.className = 'mermaid';
                div.style.textAlign = 'center';
                div.style.margin = '2rem 0';
                div.textContent = block.textContent;
                block.parentNode.replaceWith(div);
            });

            loader.replaceWith(container);
        } catch (error) {
            loader.innerHTML = `
                <div class="markdown-card error-card">
                    <h3>Error al cargar el documento</h3>
                    <p>No se pudo obtener <code>${filePath}</code>. ${error.message}</p>
                </div>
            `;
        }
    });

    await Promise.all(fetchPromises);

    // Initialize Mermaid after all sections are inserted into DOM
    if (window.mermaid) {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            securityLevel: 'loose'
        });
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    }
}

function setupNavScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.report-section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
