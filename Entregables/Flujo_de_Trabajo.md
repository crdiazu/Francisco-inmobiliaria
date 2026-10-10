# Flujo de Trabajo (Producción y Marketing)

A continuación se detalla el ecosistema visual y el proceso de trabajo desde que se diseña la estrategia hasta que el contenido está publicado en las redes de Francisco Inmobiliaria.

```mermaid
graph TD
    %% Nodos Principales
    A[Estrategia y Guiones Mensuales] -->|Visita Presencial| B(Grabación en Terreno)
    B --> C{Levantamiento de Material}
    
    %% Ramificaciones de grabación
    C -->|Batching 2 hrs| D[Videos Hablados]
    C -->|1 hr 15 min| E[Tomas de Apoyo B-Roll]
    
    %% Procesamiento
    D --> F[Edición con IA Opus Clip / Vizard]
    E --> F
    
    %% Resultados
    F --> G(Revisión y Ajustes)
    G --> H[Publicación Instagram Reels]
    G --> I[Publicación LinkedIn]
    
    %% Estilos
    style A fill:#2b5cff,stroke:#1e45c4,color:#fff,stroke-width:2px
    style B fill:#10b981,stroke:#059669,color:#fff,stroke-width:2px
    style F fill:#8b5cf6,stroke:#7c3aed,color:#fff,stroke-width:2px
    style H fill:#e1306c,stroke:#c13584,color:#fff,stroke-width:2px
    style I fill:#0077b5,stroke:#005e93,color:#fff,stroke-width:2px
```

### Explicación del Ecosistema

1. **Estrategia y Guiones:** Se definen los temas del mes basados en los dolores del cliente (compra en blanco, créditos, etc.).
2. **Terreno:** Se dedican 4 horas para recolectar TODO el contenido visual necesario.
3. **Inteligencia Artificial:** Se automatiza el proceso de edición (recortes, subtítulos automáticos, emojis y encuadre) utilizando herramientas de IA, ahorrando horas de trabajo manual.
4. **Distribución:** El contenido final se distribuye en formatos nativos verticales tanto para Instagram como para el público más corporativo en LinkedIn.
