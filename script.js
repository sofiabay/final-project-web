class PortfolioFilter {
    constructor() {
        this.projects = projects;
        this.filterState = {
            technologies: [],
            difficulty: [],
            sortBy: 'date-desc'
        };
        
        this.init();
    }

    init() {
        this.loadStateFromStorage();
        this.renderFilters();
        this.renderProjects();
        this.setupEventListeners();
        this.updateActiveFilters();
        this.updateCounter();
    }

    // Сохранение состояния в LocalStorage
    saveStateToStorage() {
        localStorage.setItem('portfolioFilters', JSON.stringify(this.filterState));
    }

    // Загрузка состояния из LocalStorage
    loadStateFromStorage() {
        const saved = localStorage.getItem('portfolioFilters');
        if (saved) {
            try {
                this.filterState = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading saved filters:', e);
            }
        }
    }

    // Рендер кнопок фильтров
    renderFilters() {
        this.renderTechFilters();
        this.renderDifficultyFilters();
        this.setSortSelect();
    }

    renderTechFilters() {
        const container = document.getElementById('techFilter');
        container.innerHTML = allTechnologies.map(tech => `
            <button class="filter-btn ${this.filterState.technologies.includes(tech) ? 'active' : ''}" 
                    data-type="technologies" 
                    data-value="${tech}">
                <i class="fas fa-${this.getTechIcon(tech)}"></i> ${tech}
            </button>
        `).join('');
    }

    // Иконки для разных технологий дизайна
    getTechIcon(tech) {
        const iconMap = {
            'Figma': 'figma',
            'Photoshop': 'image',
            'Illustrator': 'pen-nib',
            'After Effects': 'video',
            'Webflow': 'code',
            'Procreate': 'paint-brush',
            'Principle': 'sliders-h',
            'Blender': 'cube',
            'InDesign': 'newspaper',
            'Storybook': 'book',
            'Zeroheight': 'layer-group',
            'Lottie': 'play-circle',
            'Substance': 'palette',
            'PowerPoint': 'file-powerpoint',
            'Keynote': 'apple'
        };
        return iconMap[tech] || 'tools';
    }

    renderDifficultyFilters() {
        const container = document.getElementById('difficultyFilter');
        container.innerHTML = difficultyLevels.map(level => `
            <button class="filter-btn ${this.filterState.difficulty.includes(level.id) ? 'active' : ''}" 
                    data-type="difficulty" 
                    data-value="${level.id}">
                <i class="fas fa-signal"></i> ${level.label}
            </button>
        `).join('');
    }

    setSortSelect() {
        const select = document.getElementById('sortSelect');
        select.value = this.filterState.sortBy;
    }

    // Рендер проектов
    renderProjects() {
        const container = document.getElementById('projectsGrid');
        const filteredProjects = this.getFilteredProjects();
        
        if (filteredProjects.length === 0) {
            document.getElementById('noResults').style.display = 'block';
            container.innerHTML = '';
        } else {
            document.getElementById('noResults').style.display = 'none';
            container.innerHTML = filteredProjects.map(project => this.createProjectCard(project)).join('');
        }
        
        this.updateCounter();
    }

    createProjectCard(project) {
    const difficultyLabels = {
        beginner: 'Начинающий',
        intermediate: 'Средний',
        advanced: 'Продвинутый'
    };
    
    const difficultyClasses = {
        beginner: 'difficulty-beginner',
        intermediate: 'difficulty-intermediate',
        advanced: 'difficulty-advanced'
    };

    const date = new Date(project.date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Используем изображение вместо иконки
    const imageElement = project.image 
        ? `<img src="${project.image}" alt="${project.alt || project.title}" class="project-image">`
        : `<div class="project-image">
             <i class="${project.icon || 'fas fa-image'}"></i>
           </div>`;

    return `
        <div class="project-card" data-id="${project.id}">
            ${imageElement}
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <div class="project-tech">
                        <i class="fas fa-tools"></i> 
                        <span class="tech-tags">${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join(' ')}</span>
                    </div>
                    <div class="project-difficulty ${difficultyClasses[project.difficulty]}">
                        ${difficultyLabels[project.difficulty]}
                    </div>
                </div>
                <div class="project-date">
                    <i class="far fa-calendar"></i> ${date}
                </div>
            </div>
        </div>
    `;
}

    // Фильтрация и сортировка
    getFilteredProjects() {
        let filtered = [...this.projects];

        // Фильтрация по технологиям (ОСНОВНОЙ ФИЛЬТР)
        if (this.filterState.technologies.length > 0) {
            filtered = filtered.filter(project =>
                this.filterState.technologies.some(tech => 
                    project.technologies.includes(tech)
                )
            );
        }

        // Фильтрация по сложности (ДОПОЛНИТЕЛЬНЫЙ ФИЛЬТР)
        if (this.filterState.difficulty.length > 0) {
            filtered = filtered.filter(project =>
                this.filterState.difficulty.includes(project.difficulty)
            );
        }

        // Сортировка
        filtered.sort((a, b) => {
            switch (this.filterState.sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                case 'difficulty':
                    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // Обновление счетчика
    updateCounter() {
        const filteredProjects = this.getFilteredProjects();
        document.getElementById('visibleCount').textContent = filteredProjects.length;
        document.getElementById('totalCount').textContent = this.projects.length;
    }

    // Обновление активных фильтров
    updateActiveFilters() {
        const container = document.getElementById('activeFilters');
        const activeFilters = [];
        
        // Технологии
        this.filterState.technologies.forEach(tech => {
            activeFilters.push({
                type: 'technologies',
                value: tech,
                label: tech
            });
        });
        
        // Сложность
        this.filterState.difficulty.forEach(diff => {
            const label = difficultyLevels.find(l => l.id === diff)?.label || diff;
            activeFilters.push({
                type: 'difficulty',
                value: diff,
                label: label
            });
        });
        
        if (activeFilters.length === 0) {
            container.innerHTML = '<span class="no-filters">Фильтры не выбраны</span>';
        } else {
            container.innerHTML = activeFilters.map(filter => `
                <div class="active-filter">
                    <i class="fas fa-${filter.type === 'technologies' ? this.getTechIcon(filter.value) : 'signal'}"></i>
                    ${filter.label}
                    <button class="remove" 
                            data-type="${filter.type}" 
                            data-value="${filter.value}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    // Обработчики событий
    setupEventListeners() {
        // Фильтры по технологиям и сложности
        document.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-btn');
            if (filterBtn) {
                const type = filterBtn.dataset.type;
                const value = filterBtn.dataset.value;
                this.toggleFilter(type, value);
            }
        });

        // Удаление активных фильтров
        document.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.active-filter .remove');
            if (removeBtn) {
                const type = removeBtn.dataset.type;
                const value = removeBtn.dataset.value;
                this.removeFilter(type, value);
            }
        });

        // Сортировка
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.filterState.sortBy = e.target.value;
            this.saveStateToStorage();
            this.renderProjects();
        });

        // Сброс фильтров
        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        // Очистка LocalStorage
        document.getElementById('clearStorage').addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите очистить сохраненные фильтры?')) {
                localStorage.removeItem('portfolioFilters');
                this.filterState = {
                    technologies: [],
                    difficulty: [],
                    sortBy: 'date-desc'
                };
                this.renderFilters();
                this.renderProjects();
                this.updateActiveFilters();
                alert('Фильтры сброшены!');
            }
        });
    }

    toggleFilter(type, value) {
        const array = this.filterState[type];
        const index = array.indexOf(value);
        
        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
        
        this.saveStateToStorage();
        this.renderFilters();
        this.renderProjects();
        this.updateActiveFilters();
    }

    removeFilter(type, value) {
        const array = this.filterState[type];
        const index = array.indexOf(value);
        
        if (index !== -1) {
            array.splice(index, 1);
            this.saveStateToStorage();
            this.renderFilters();
            this.renderProjects();
            this.updateActiveFilters();
        }
    }

    resetFilters() {
        this.filterState = {
            technologies: [],
            difficulty: [],
            sortBy: this.filterState.sortBy
        };
        
        this.saveStateToStorage();
        this.renderFilters();
        this.renderProjects();
        this.updateActiveFilters();
    }
}

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioFilter();
});