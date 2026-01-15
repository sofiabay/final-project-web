// Массив проектов портфолио для ГРАФИЧЕСКОГО и ВЕБ-ДИЗАЙНА
const projects = [
    {
        id: 1,
        title: "Брендинг кофейни",
        description: "Полный бренд-пакет для новой кофейни в центре города. Логотип, фирменный стиль, упаковка, меню и визуальные коммуникации.",
        technologies: ["Figma", "Illustrator", "Photoshop"],
        difficulty: "intermediate",
        date: "2023-10-15",
        image: "кофейня.png",
        alt: "Дизайн брендинга кофейни - логотип и упаковка"
    },
    {
        id: 2,
        title: "Лендинг для приложения",
        description: "Промо-сайт для мобильного приложения с анимациями, адаптивным дизайном и конверсионными элементами.",
        technologies: ["Figma", "Webflow", "After Effects"],
        difficulty: "beginner",
        date: "2023-09-22",
        image: "лендинг.jpg",
        alt: "Дизайн лендинг-страницы мобильного приложения"
    },
    {
        id: 3,
        title: "UI/UX для банковского приложения",
        description: "Полный дизайн-проект мобильного банкинга: пользовательские потоки, прототипы, дизайн-система, анимации.",
        technologies: ["Figma", "Principle", "Illustrator"],
        difficulty: "advanced",
        date: "2023-11-05",
        image: "банк.png",
        alt: "UI/UX дизайн банковского приложения"
    },
    {
        id: 4,
        title: "Иллюстрации для детской книги",
        description: "Серия иллюстраций в digital-технике для детской образовательной книги. 15 разворотов, обложка, персонажи.",
        technologies: ["Procreate", "Photoshop", "Illustrator"],
        difficulty: "beginner",
        date: "2023-08-30",
        image: "книга десткая.jpg",
        alt: "Иллюстрации для детской книги"
    },
    {
        id: 5,
        title: "Дизайн системы для SaaS",
        description: "Комплексная дизайн-система для B2B SaaS-продукта: компоненты, токены, документация, гайдлайны.",
        technologies: ["Figma", "Storybook", "Zeroheight"],
        difficulty: "intermediate",
        date: "2023-10-28",
        image: "saas.png",
        alt: "Дизайн-система SaaS продукта"
    },
    {
        id: 6,
        title: "Редизайн новостного портала",
        description: "Полный редизайн крупного новостного портала с фокусом на улучшении читаемости и пользовательского опыта.",
        technologies: ["Figma", "Webflow", "Photoshop"],
        difficulty: "advanced",
        date: "2023-11-12",
        image: "новостной портал.png",
        alt: "Редизайн новостного портала"
    },
    {
        id: 7,
        title: "Анимация логотипа",
        description: "Анимированный логотип для IT-компании с различными состояниями и адаптацией под разные носители.",
        technologies: ["After Effects", "Illustrator", "Lottie"],
        difficulty: "beginner",
        date: "2023-09-05",
        image: "лого ит.jpg",
        alt: "Анимация логотипа"
    },
    {
        id: 8,
        title: "Дизайн упаковки косметики",
        description: "Экологичная упаковка для линейки органической косметики: дизайн, материалы, производственные макеты.",
        technologies: ["Illustrator", "InDesign", "Photoshop"],
        difficulty: "intermediate",
        date: "2023-10-10",
        image: "косметика.jpg",
        alt: "Дизайн упаковки косметики"
    },
    {
        id: 9,
        title: "Веб-сайт для фотографа",
        description: "Портфолио-сайт фотографа с адаптивной галереей, блогом и системой бронирования съемок.",
        technologies: ["Figma", "Webflow", "Photoshop"],
        difficulty: "beginner",
        date: "2023-09-18",
        image: "фотограф веб.jpg",
        alt: "Веб-сайт портфолио фотографа"
    },
    {
        id: 10,
        title: "3D визуализация интерьера",
        description: "Фотореалистичные 3D-визуализации дизайна интерьера ресторана с подбором материалов и освещения.",
        technologies: ["Blender", "Photoshop", "Substance"],
        difficulty: "advanced",
        date: "2023-11-01",
        image: "3д интерьер.jpg",
        alt: "3D визуализация интерьера ресторана"
    },
    {
        id: 11,
        title: "Мобильное приложение для фитнеса",
        description: "UI/UX дизайн фитнес-приложения с трекерами, планами тренировок и интеграцией с wearable-устройствами.",
        technologies: ["Figma", "Principle", "Illustrator"],
        difficulty: "intermediate",
        date: "2023-11-20",
        image: "фитнес.jpg",
        alt: "UI/UX дизайн фитнес-приложения"
    },
    {
        id: 12,
        title: "Презентация для стартапа",
        description: "Интерактивная презентация для pitch deck стартапа: инфографика, анимации, фирменный стиль.",
        technologies: ["PowerPoint", "Keynote", "After Effects"],
        difficulty: "beginner",
        date: "2023-11-25",
        image: "стартап.jpg",
        alt: "Презентация pitch deck для стартапа"
    }
];

// Уникальные технологии для фильтров (ТОЛЬКО дизайн-инструменты)
const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];

// Уровни сложности
const difficultyLevels = [
    { id: "beginner", label: "Начинающий" },
    { id: "intermediate", label: "Средний" },
    { id: "advanced", label: "Продвинутый" }
];