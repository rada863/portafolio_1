
        // Configuración por defecto
        const defaultConfig = {
            nombre_desarrollador: "Franco Carrizo",
            titulo_profesional: "Desarrollador Full Stack",
            descripcion_breve: "Creando experiencias digitales increíbles con tecnologías modernas",
            linkedin_url: "https://linkedin.com/in/tu-perfil",
            github_url: "https://github.com/tu-usuario",
            freelance_url: "https://freelancer.com/tu-perfil",
            primary_color: "#667eea",
            secondary_color: "#764ba2",
            background_color: "#f9fafb",
            text_color: "#1f2937",
            accent_color: "#f093fb",
            font_family: "Inter",
            font_size: 16
        };

        let currentData = [];
        let isLoading = false;

        // Handler para el Data SDK
        const dataHandler = {
            onDataChanged(data) {
                currentData = data;
                updateContactCount();
            }
        };

        // Función para actualizar el contador de mensajes
        function updateContactCount() {
            const countElement = document.getElementById('contact-count');
            if (countElement) {
                countElement.textContent = currentData.length;
            }
        }

        // Función para mostrar estado de carga
        function setLoadingState(loading) {
            isLoading = loading;
            const submitBtn = document.getElementById('submit-btn');
            const loadingSpinner = document.getElementById('loading-spinner');
            
            if (submitBtn && loadingSpinner) {
                submitBtn.disabled = loading;
                loadingSpinner.style.display = loading ? 'inline-block' : 'none';
                submitBtn.textContent = loading ? 'Enviando...' : 'Enviar Mensaje';
            }
        }

        // Función para mostrar mensajes
        function showMessage(text, isError = false) {
            const messageDiv = document.getElementById('form-message');
            if (messageDiv) {
                messageDiv.textContent = text;
                messageDiv.className = `mt-4 p-3 rounded-lg text-sm ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
                messageDiv.style.display = 'block';
                
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        }

        // Función para manejar el envío del formulario
        async function handleSubmit(event) {
            event.preventDefault();
            
            if (currentData.length >= 999) {
                showMessage('Se ha alcanzado el límite máximo de 999 mensajes. Por favor, contacta directamente por las redes sociales.', true);
                return;
            }

            setLoadingState(true);

            const formData = new FormData(event.target);
            const contactData = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                mensaje: formData.get('mensaje'),
                fecha: new Date().toISOString()
            };

            const result = await window.dataSdk.create(contactData);
            
            if (result.isOk) {
                showMessage('¡Mensaje enviado correctamente! Te contactaré pronto.');
                event.target.reset();
            } else {
                showMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.', true);
            }
            
            setLoadingState(false);
        }

        // Función de renderizado
        async function render(config) {
            const customFont = config.font_family || defaultConfig.font_family;
            const baseSize = config.font_size || defaultConfig.font_size;
            const baseFontStack = 'system-ui, -apple-system, sans-serif';

            // Aplicar colores
            document.documentElement.style.setProperty('--primary-color', config.primary_color || defaultConfig.primary_color);
            document.documentElement.style.setProperty('--secondary-color', config.secondary_color || defaultConfig.secondary_color);
            document.documentElement.style.setProperty('--accent-color', config.accent_color || defaultConfig.accent_color);
            
            // Aplicar fuentes y tamaños
            const elements = {
                'developer-name': { size: baseSize * 3, font: `${customFont}, ${baseFontStack}` },
                'developer-title': { size: baseSize * 1.5, font: `${customFont}, ${baseFontStack}` },
                'developer-description': { size: baseSize * 1.125, font: `${customFont}, ${baseFontStack}` },
                'section-title-tech': { size: baseSize * 2.25, font: `${customFont}, ${baseFontStack}` },
                'section-title-projects': { size: baseSize * 2.25, font: `${customFont}, ${baseFontStack}` },
                'contact-title': { size: baseSize * 2.25, font: `${customFont}, ${baseFontStack}` }
            };

            Object.entries(elements).forEach(([id, styles]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.fontSize = `${styles.size}px`;
                    element.style.fontFamily = styles.font;
                }
            });

            // Actualizar contenido de texto
            const textElements = {
                'developer-name': config.nombre_desarrollador || defaultConfig.nombre_desarrollador,
                'developer-title': config.titulo_profesional || defaultConfig.titulo_profesional,
                'developer-description': config.descripcion_breve || defaultConfig.descripcion_breve
            };

            Object.entries(textElements).forEach(([id, text]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = text;
                }
            });

            // Actualizar enlaces
            const links = {
                'linkedin-link': config.linkedin_url || defaultConfig.linkedin_url,
                'github-link': config.github_url || defaultConfig.github_url,
                'freelance-link': config.freelance_url || defaultConfig.freelance_url
            };

            Object.entries(links).forEach(([id, url]) => {
                const element = document.getElementById(id);
                if (element) {
                    element.href = url;
                }
            });

            // Aplicar colores dinámicos
            const gradientElements = document.querySelectorAll('.gradient-bg');
            gradientElements.forEach(element => {
                element.style.background = `linear-gradient(135deg, ${config.primary_color || defaultConfig.primary_color} 0%, ${config.secondary_color || defaultConfig.secondary_color} 100%)`;
            });
        }

        // Configuración del Element SDK
        const capabilities = {
            recolorables: [
                {
                    get: () => window.elementSdk?.config?.primary_color || defaultConfig.primary_color,
                    set: (value) => {
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ primary_color: value });
                        }
                    }
                },
                {
                    get: () => window.elementSdk?.config?.secondary_color || defaultConfig.secondary_color,
                    set: (value) => {
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ secondary_color: value });
                        }
                    }
                },
                {
                    get: () => window.elementSdk?.config?.accent_color || defaultConfig.accent_color,
                    set: (value) => {
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ accent_color: value });
                        }
                    }
                }
            ],
            borderables: [],
            fontEditable: {
                get: () => window.elementSdk?.config?.font_family || defaultConfig.font_family,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ font_family: value });
                    }
                }
            },
            fontSizeable: {
                get: () => window.elementSdk?.config?.font_size || defaultConfig.font_size,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ font_size: value });
                    }
                }
            }
        };

        function mapToEditPanelValues(config) {
            return new Map([
                ['nombre_desarrollador', config.nombre_desarrollador || defaultConfig.nombre_desarrollador],
                ['titulo_profesional', config.titulo_profesional || defaultConfig.titulo_profesional],
                ['descripcion_breve', config.descripcion_breve || defaultConfig.descripcion_breve],
                ['linkedin_url', config.linkedin_url || defaultConfig.linkedin_url],
                ['github_url', config.github_url || defaultConfig.github_url],
                ['freelance_url', config.freelance_url || defaultConfig.freelance_url]
            ]);
        }

        // Inicialización
        document.addEventListener('DOMContentLoaded', async function() {
            // Inicializar Data SDK
            if (window.dataSdk) {
                const initResult = await window.dataSdk.init(dataHandler);
                if (!initResult.isOk) {
                    console.error('Error al inicializar Data SDK');
                }
            }

            // Inicializar Element SDK
            if (window.elementSdk) {
                window.elementSdk.init({
                    defaultConfig,
                    render,
                    mapToCapabilities: () => capabilities,
                    mapToEditPanelValues
                });
            }

            // Configurar formulario
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', handleSubmit);
            }

            // Renderizado inicial
            await render(defaultConfig);
        });
    // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        });
        
    