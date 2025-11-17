// ===================================
// ROOMMATE TASK ORGANIZER - SCRIPT
// Interactive Functionality & Data
// ===================================

// ============ THEME MANAGEMENT ============
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved theme or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.checked = true;
    }
}

// ============ CONFETTI ANIMATION ============
function triggerConfetti() {
    const duration = 2000; // 2 seconds
    const particleCount = 50;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#43e97b', '#38f9d7', '#FFD700', '#FF6B6B', '#4ECDC4'];
    
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4; // 4-12px
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 3;
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 200 + 150; // Random velocity
        const endX = startX + Math.cos(angle) * velocity;
        const endY = startY + Math.sin(angle) * velocity + Math.random() * 100;
        const rotation = Math.random() * 360;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        particle.style.opacity = '1';
        particle.style.transform = `rotate(0deg)`;
        particle.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        container.appendChild(particle);
        
        // Trigger animation
        requestAnimationFrame(() => {
            particle.style.left = `${endX}px`;
            particle.style.top = `${endY}px`;
            particle.style.opacity = '0';
            particle.style.transform = `rotate(${rotation}deg)`;
        });
    }
    
    // Remove container after animation
    setTimeout(() => {
        document.body.removeChild(container);
    }, duration);
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                showToast('Dark mode enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                showToast('Light mode enabled');
            }
        });
    }
}

// ============ FAKE DATA ============
const roommates = [
    { id: 1, name: "Janvi Chauhan", initials: "JC", color: "linear-gradient(135deg, #356496)" },
    { id: 2, name: "Aranya Chaudhary", initials: "AC", color: "linear-gradient(135deg, #d86060)" },
    { id: 3, name: "Tamilla Zeynalova", initials: "TZ", color: "linear-gradient(135deg, #169530)" },
    { id: 4, name: "Aaish Ahmed", initials: "AA", color: "linear-gradient(135deg, #e49449)" },
    { id: 5, name: "Rami Abu Sultan", initials: "RS", color: "linear-gradient(135deg, #d768ba)" }
];

// Current user
const currentUser = "Janvi Chauhan";

// Tasks data structure with localStorage support
let tasks = [];

// Load tasks from localStorage or use default data
function loadTasks() {
    // Always use default sample data as base
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoDays = new Date(today);
    twoDays.setDate(twoDays.getDate() + 2);
    const threeDays = new Date(today);
    threeDays.setDate(threeDays.getDate() + 3);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    tasks = [
        { id: 1, title: "Take out garbage ♻️", description: "Take bins to curb by 7 PM", assignees: [4,5], dueDate: today.toISOString().split('T')[0], status: "pending", recurrence: "weekly", urgency: "high" },
        { id: 2, title: "Clean kitchen🧹", description: "Deep clean kitchen counters and stove", assignees: [2], dueDate: today.toISOString().split('T')[0], status: "pending", recurrence: "one-time", urgency: "moderate" },
        { id: 3, title: "Vacuum living room🧹", description: "Deep Clean the living room", assignees: [1, 3], dueDate: tomorrow.toISOString().split('T')[0], status: "pending", recurrence: "one-time", urgency: null },
        { id: 4, title: "Buy groceries🛒", description: "Get milk, bread, eggs, and vegetables", assignees: [1, 3, 4], dueDate: twoDays.toISOString().split('T')[0], status: "pending", recurrence: "one-time", urgency: "low" },
        { id: 5, title: "Water plants🪴", description: "Water all indoor plants", assignees: [5], dueDate: nextWeek.toISOString().split('T')[0], status: "completed", recurrence: "weekly", urgency: null },
        { id: 6, title: "Clean bathroom🚻", description: "Scrub shower and clean mirrors", assignees: [2, 4, 3], dueDate: yesterday.toISOString().split('T')[0], status: "pending", recurrence: "one-time", urgency: "high" },
        { id: 7, title: "Pay rent💰", description: "", assignees: [2], dueDate: threeDays.toISOString().split('T')[0], status: "pending", recurrence: "monthly", urgency: "high" },
        { id: 8, title: "Organize pantry🍞", description: "", assignees: [1], dueDate: nextWeek.toISOString().split('T')[0], status: "pending", recurrence: "one-time", urgency: null },
        { id: 9, title: "Shovel driveway❄️", description: "", assignees: [5], dueDate: nextWeek.toISOString().split('T')[0], status: "pending", recurrence: "one-time", urgency: "moderate" }
    ];
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('roommateTasks', JSON.stringify(tasks));
}

// Expenses data structure with localStorage support
let expenses = [];

// Load expenses from localStorage or use default data
function loadExpenses() {
    const stored = localStorage.getItem('roommateExpenses');
    if (stored) {
        expenses = JSON.parse(stored);
    } else {
        // Default sample data
        expenses = [
            { id: 1, description: "Groceries at Metro🛒", amount: 87.50, payer: "Janvi Chauhan", participants: ["Janvi Chauhan", "Aranya Chaudhary", "Tamilla Zeynalova", "Aaish Ahmed", "Rami Abu Sultan"], date: "2024-11-15", status: "Pending" },
            { id: 2, description: "Internet Bill🧾", amount: 60.00, payer: "Aranya Chaudhary", participants: ["Janvi Chauhan", "Aranya Chaudhary", "Tamilla Zeynalova", "Aaish Ahmed", "Rami Abu Sultan"], date: "2024-11-14", status: "Settled" },
            { id: 3, description: "Cleaning Supplies🛒", amount: 42.30, payer: "Tamilla Zeynalova", participants: ["Janvi Chauhan", "Aranya Chaudhary", "Tamilla Zeynalova", "Aaish Ahmed", "Rami Abu Sultan"], date: "2024-11-13", status: "Pending" },
            { id: 4, description: "House Party Snacks🛒", amount: 95.20, payer: "Janvi Chauhan", participants: ["Janvi Chauhan", "Aranya Chaudhary", "Tamilla Zeynalova", "Aaish Ahmed", "Rami Abu Sultan"], date: "2024-11-12", status: "Settled" },
            { id: 5, description: "Electricity Bill🧾", amount: 120.00, payer: "Aaish Ahmed", participants: ["Janvi Chauhan", "Aranya Chaudhary", "Tamilla Zeynalova", "Aaish Ahmed", "Rami Abu Sultan"], date: "2024-11-10", status: "Pending" },
            { id: 6, description: "Shared Uber🚕", amount: 28.50, payer: "Aranya Chaudhary", participants: ["Janvi Chauhan", "Aranya Chaudhary", "Tamilla Zeynalova", "Rami Abu Sultan"], date: "2024-11-09", status: "Settled" }
        ];
        saveExpenses()
    }
}

// Save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('roommateExpenses', JSON.stringify(expenses));
}

// Activity Feed Data
const activityFeed = {
    today: [
        { id: 1, type: 'task', title: 'Task completed', description: 'Tamilla completed "Clean kitchen🧹"', time: '2 hours ago', status: 'Done' },
        { id: 2, type: 'expense', title: 'New expense', description: 'Aranya added "Groceries - $87.50"💰', time: '4 hours ago', status: 'Pending' }
    ],
    yesterday: [
        { id: 3, type: 'chat', title: 'New message', description: 'Aaish: "Anyone want to order pizza🍕?"', time: 'Yesterday 8:30 PM' },
        { id: 4, type: 'task', title: 'Task assigned', description: 'You were assigned "Take out garbage♻️"', time: 'Yesterday 6:00 PM', status: 'Pending' },
        { id: 5, type: 'task', title: 'Task completed', description: 'Rami completed "Clean bathroom🚻', time: 'Yesterday 4:30 PM', status: 'Done' }
    ],
    thisWeek: [
        { id: 5, type: 'expense', title: 'Expense settled', description: 'Internet bill was marked as settled🧾', time: '3 days ago', status: 'Settled' },
        { id: 6, type: 'task', title: 'Recurring task', description: 'Weekly cleaning rotation updated🧹', time: '4 days ago' }
    ]
};

// Conversations Data
let conversations = [
    { id: 1, name: 'Good Vibes only', icon: 'fa-users', lastMessage: 'Aaish: Anyone free this weekend?', time: '10:30 AM', unread: 2, participants: [1, 2, 3, 4, 5], type: 'group' },
    { id: 2, name: 'Aranya Chaudhary', icon: 'fa-user', lastMessage: 'You: Sounds good👍🏻!', time: 'Yesterday', unread: 0, participants: [1, 2], type: 'direct' },
    { id: 3, name: 'Tamilla Zeynalova', icon: 'fa-user', lastMessage: 'Tamilla: Thanks for cleaning!✌🏻', time: '2 days ago', unread: 0, participants: [1, 3], type: 'direct' },
    { id: 4, name: 'Bills & Expenses', icon: 'fa-dollar-sign', lastMessage: 'You: I paid the electric bill', time: '3 days ago', unread: 1, participants: [1, 2, 3, 4], type: 'group' }
];

// Chat settings (mute status per conversation)
let chatSettings = {};

// Messages Data
let messages = {
    1: [ // Good Vibes only
        { id: 1, sender: 2, text: 'Hey everyone! Just a reminder about the house meeting tomorrow at 7 PM.', time: '9:15 AM', own: false },
        { id: 2, sender: 1, text: 'Thanks for the reminder! I\'ll be there.👍🏻', time: '9:20 AM', own: true },
        { id: 3, sender: 3, text: 'Count me in too!', time: '9:45 AM', own: false },
        { id: 4, sender: 4, text: 'Anyone free this weekend? Thinking of organizing a house cleanup.', time: '10:30 AM', own: false },
        { id: 5, sender: 5, text: 'I can help out on Saturday morning.', time: '10:45 AM', own: false }
    ],
    2: [ // Aranya Chaudhary
        { id: 1, sender: 2, text: 'Hey! Are you free to help me move the couch later?', time: '2:00 PM', own: false },
        { id: 2, sender: 1, text: 'Sure! What time works for you?', time: '2:15 PM', own: true },
        { id: 3, sender: 2, text: 'How about 5 PM?', time: '2:20 PM', own: false },
        { id: 4, sender: 1, text: 'Sounds good!👍🏻', time: '2:22 PM', own: true }
    ],
    3: [ // Tamilla Zeynalova
        { id: 1, sender: 3, text: 'Thanks for cleaning the kitchen yesterday!', time: '8:00 AM', own: false },
        { id: 2, sender: 1, text: 'No problem! Happy to help.🫶', time: '8:30 AM', own: true },
        { id: 3, sender: 3, text: 'Let me know if you need help with anything.', time: '8:45 AM', own: false }
    ],
    4: [ // Bills & Expenses
        { id: 1, sender: 2, text: 'I paid the internet bill. It was $60 this month.', time: '9:00 AM', own: false },
        { id: 2, sender: 1, text: 'Thanks! I paid the electric bill yesterday, $120.', time: '10:00 AM', own: true },
        { id: 3, sender: 3, text: 'I\'ll handle the water bill this week.', time: '11:00 AM', own: false }
    ]
};

// ============ STATE MANAGEMENT ============
let currentPage = 'home';
let currentFilter = 'my';
let currentConversation = null;
let editingExpenseId = null; // Track which expense is being edited
let editingTaskId = null; // Track which task is being edited

// ============ NAVIGATION ============
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme first
    initializeTheme();
    setupThemeToggle();
    
    loadTasks(); // Load tasks first
    loadExpenses(); // Load expenses
    initializeApp();
    setupNavigation();
    setupQuickActions();
    setupModals();
    setupTaskModal(); // Setup task modal
    setupExpenseModal(); // Setup expense modal
    setupTaskFilters();
    setupChats();
    setupQuickAdd();
    renderHomePage();
    renderTasksPage();
    renderExpensesPage();
    renderChatsPage();
    renderCalendar(); // Render the full month calendar
});

function initializeApp() {
    console.log('🏠 Roommate Task Organizer initialized');
}

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            switchPage(page);
            
            // Update active nav button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchPage(pageName) {
    currentPage = pageName;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// ============ HOME PAGE ============
function renderHomePage() {
    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) return;
    
    let feedHTML = '';
    
    // Today section
    if (activityFeed.today.length > 0) {
        feedHTML += '<div class="feed-section">';
        feedHTML += '<h4 class="feed-section-title">Today</h4>';
        activityFeed.today.forEach(item => {
            feedHTML += createFeedItem(item);
        });
        feedHTML += '</div>';
    }
    
    // Yesterday section
    if (activityFeed.yesterday.length > 0) {
        feedHTML += '<div class="feed-section">';
        feedHTML += '<h4 class="feed-section-title">Yesterday</h4>';
        activityFeed.yesterday.forEach(item => {
            feedHTML += createFeedItem(item);
        });
        feedHTML += '</div>';
    }
    
    // This Week section
    if (activityFeed.thisWeek.length > 0) {
        feedHTML += '<div class="feed-section">';
        feedHTML += '<h4 class="feed-section-title">This Week</h4>';
        activityFeed.thisWeek.forEach(item => {
            feedHTML += createFeedItem(item);
        });
        feedHTML += '</div>';
    }
    
    feedContainer.innerHTML = feedHTML;
}

function createFeedItem(item) {
    const iconMap = {
        task: '<img src="icons/task.svg" alt="Task" class="custom-icon">',
        expense: '<img src="icons/expenses.svg" alt="Expense" class="custom-icon">',
        chat: '<img src="icons/chats.svg" alt="Chat" class="custom-icon">'
    };
    
    const statusPill = item.status ? `<span class="pill ${item.status.toLowerCase()}">${item.status}</span>` : '';
    
    return `
        <div class="feed-item">
            <div class="feed-icon ${item.type}">
                ${iconMap[item.type]}
            </div>
            <div class="feed-content">
                <p class="feed-title">${item.title}</p>
                <p class="feed-description">${item.description}</p>
                <div class="feed-meta">
                    <span>${item.time}</span>
                    ${statusPill}
                </div>
            </div>
        </div>
    `;
}

// ============ QUICK ACTIONS ============
function setupQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn[data-action]');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    const modal = document.getElementById('action-modal');
    const modalTitle = document.getElementById('modal-title');
    
    if (action === 'new-task') {
        modalTitle.textContent = 'Create New Task';
    } else if (action === 'split-expense') {
        modalTitle.textContent = 'Split Expense';
    } else if (action === 'message') {
        modalTitle.textContent = 'New Message';
    }
    
    modal.classList.add('active');
}

// ============ MODAL HANDLERS ============
function setupModals() {
    const modal = document.getElementById('action-modal');
    const closeBtn = document.getElementById('close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// ============ CALENDAR RENDERING (HTML/CSS-BASED) ============
function renderCalendar() {
    const container = document.getElementById('calendar-days-container');
    if (!container) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    let calendarHTML = '';
    let dayIndex = 0;
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        calendarHTML += createDayCell(day, false, false, true);
        dayIndex++;
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === currentDay;
        
        // Check if day has tasks
        const hasEvent = tasks.some(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.getDate() === day && 
                   taskDate.getMonth() === currentMonth && 
                   taskDate.getFullYear() === currentYear;
        });
        
        calendarHTML += createDayCell(day, isToday, hasEvent, false);
        dayIndex++;
    }
    
    // Calculate how many cells we need to fill the grid
    const totalCells = Math.ceil(dayIndex / 7) * 7;
    const remainingCells = totalCells - dayIndex;
    
    // Next month days to fill the grid
    for (let day = 1; day <= remainingCells; day++) {
        calendarHTML += createDayCell(day, false, false, true);
        dayIndex++;
    }
    
    container.innerHTML = calendarHTML;
}

// Helper function to create a day cell
function createDayCell(dayNum, isToday, hasEvent, isOtherMonth) {
    const todayClass = isToday ? 'today' : '';
    const otherMonthClass = isOtherMonth ? 'other-month' : '';
    const eventDot = hasEvent && !isOtherMonth ? '<div class="day-dot"></div>' : '';
    
    return `
        <div class="calendar-day ${todayClass} ${otherMonthClass}">
            <span class="day-num">${dayNum}</span>
            ${eventDot}
        </div>
    `;
}

// ============ TASKS PAGE ============
function setupTaskFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currentFilter = tab.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Re-render tasks
            renderTasksPage();
        });
    });
}

// Render tasks with full functionality
function renderTasksPage() {
    const taskListContainer = document.getElementById('task-list-container');
    if (!taskListContainer) return;
    
    let filteredTasks = [];
    
    // Filter tasks based on current filter
    if (currentFilter === 'my') {
        // Show only current user's pending tasks
        filteredTasks = tasks.filter(task => task.assignees.includes(1) && task.status !== 'completed');
    } else if (currentFilter === 'all') {
        // Show all pending tasks (exclude completed)
        filteredTasks = tasks.filter(task => task.status !== 'completed');
    } else if (currentFilter === 'completed') {
        // Show only completed tasks
        filteredTasks = tasks.filter(task => task.status === 'completed');
    }
    
    let tasksHTML = '';
    
    if (filteredTasks.length === 0) {
        const emptyMessage = currentFilter === 'completed' 
            ? 'No completed tasks yet' 
            : 'No tasks found';
        const emptySubtext = currentFilter === 'completed'
            ? 'Complete tasks to see them here'
            : 'Click "Add Task" to create your first task';
            
        tasksHTML = `
            <div class="card" style="text-align: center; padding: 3rem 1.5rem; grid-column: 1 / -1;">
                <i class="fas fa-list-check" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">${emptyMessage}</h3>
                <p style="color: var(--text-muted);">${emptySubtext}</p>
            </div>
        `;
    } else {
        filteredTasks.forEach(task => {
            // Build assignees display
            let assigneesHTML = '';
            task.assignees.forEach(assigneeId => {
                const assignee = roommates.find(r => r.id === assigneeId);
                assigneesHTML += `
                    <div class="task-assignee">
                        <div class="avatar small" style="background: ${assignee.color};">${assignee.initials}</div>
                        <span>${assignee.name}</span>
                    </div>
                `;
            });
            
            const recurringIcon = task.recurring ? '<i class="fas fa-rotate" style="color: var(--accent-active); font-size: 0.9rem;"></i>' : '';
            
            // Determine if task is overdue
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const taskDate = new Date(task.dueDate);
            taskDate.setHours(0, 0, 0, 0);
            
            let dateLabel = '';
            let pillClass = '';
            
            if (task.status === 'completed') {
                dateLabel = 'Completed';
                pillClass = 'done';
            } else if (taskDate < today) {
                dateLabel = 'Overdue';
                pillClass = 'overdue';
            } else if (taskDate.getTime() === today.getTime()) {
                dateLabel = 'Today';
                pillClass = 'today';
            } else {
                const diffTime = taskDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    dateLabel = 'Tomorrow';
                    pillClass = 'pending';
                } else if (diffDays <= 7) {
                    dateLabel = `In ${diffDays} days`;
                    pillClass = 'pending';
                } else {
                    dateLabel = formatDateDisplay(task.dueDate);
                    pillClass = 'pending';
                }
            }
            
            // Add completed styling
            const completedClass = task.status === 'completed' ? 'task-completed' : '';
            const titleStyle = task.status === 'completed' ? 'style="text-decoration: line-through; opacity: 0.7;"' : '';
            
            // Add description HTML if description exists
            const descriptionHTML = task.description ? `<p class="task-description">${task.description}</p>` : '';
            
            // Build urgency badge if urgency is set
            let urgencyBadge = '';
            if (task.urgency) {
                const urgencyConfig = {
                    'high': { label: 'High', class: 'urgency-high' },
                    'moderate': { label: 'Moderate', class: 'urgency-moderate' },
                    'low': { label: 'Low', class: 'urgency-low' }
                };
                const config = urgencyConfig[task.urgency.toLowerCase()];
                if (config) {
                    urgencyBadge = `<span class="pill ${config.class}">${config.label}</span>`;
                }
            }
            
            tasksHTML += `
                <div class="task-card ${completedClass}" data-task-id="${task.id}">
                    <div class="task-header">
                        <div class="task-main">
                            <h4 class="task-card-title" ${titleStyle}>${task.title}</h4>
                            ${descriptionHTML}
                            ${assigneesHTML}
                        </div>
                        ${recurringIcon}
                    </div>
                    <div class="task-footer">
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <span class="pill ${pillClass}">${dateLabel}</span>
                            ${urgencyBadge}
                        </div>
                        <div class="task-actions">
                            <i class="fas ${task.status === 'completed' ? 'fa-rotate-left' : 'fa-check'}" 
                               onclick="toggleTaskCompleted(${task.id})" 
                               title="${task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}"
                               style="cursor: pointer;"></i>
                            <i class="fas fa-edit" onclick="openTaskModal(${task.id})" title="Edit task" style="cursor: pointer;"></i>
                            <i class="fas fa-trash" onclick="deleteTask(${task.id})" title="Delete task" style="cursor: pointer;"></i>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    taskListContainer.innerHTML = tasksHTML;
}

// Setup Task Modal
function setupTaskModal() {
    const taskModal = document.getElementById('task-modal');
    const addTaskBtn = document.getElementById('main-add-task-btn');
    const closeTaskModalBtn = document.getElementById('close-task-modal');
    const cancelTaskBtn = document.getElementById('cancel-task-btn');
    const taskForm = document.getElementById('task-form');
    
    if (!taskModal) return;
    
    // Open modal for adding new task
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            openTaskModal();
        });
    }
    
    // Close modal
    if (closeTaskModalBtn) {
        closeTaskModalBtn.addEventListener('click', () => {
            closeTaskModal();
        });
    }
    
    if (cancelTaskBtn) {
        cancelTaskBtn.addEventListener('click', () => {
            closeTaskModal();
        });
    }
    
    // Close modal when clicking outside
    if (taskModal) {
        taskModal.addEventListener('click', (e) => {
            if (e.target === taskModal) {
                closeTaskModal();
            }
        });
    }
    
    // Handle form submission
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveTask();
        });
    }
}

// Open Task Modal (for add or edit)
function openTaskModal(taskId = null) {
    const taskModal = document.getElementById('task-modal');
    const modalTitle = document.getElementById('task-modal-title');
    const form = document.getElementById('task-form');
    
    if (!taskModal || !modalTitle || !form) return;
    
    editingTaskId = taskId;
    
    if (taskId) {
        // Edit mode
        modalTitle.textContent = 'Edit Task';
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            fillTaskForm(task);
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Task';
        form.reset();
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('task-due-date').value = today;
        // Uncheck all assignees by default
        document.querySelectorAll('input[name="task-assignees"]').forEach(cb => {
            cb.checked = false;
        });
    }
    
    taskModal.classList.add('active');
}

// Close Task Modal
function closeTaskModal() {
    const taskModal = document.getElementById('task-modal');
    if (taskModal) {
        taskModal.classList.remove('active');
    }
    editingTaskId = null;
    const form = document.getElementById('task-form');
    if (form) {
        form.reset();
    }
}

// Fill Task Form for editing
function fillTaskForm(task) {
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description || '';
    document.getElementById('task-due-date').value = task.dueDate;
    document.getElementById('task-recurrence').value = task.recurrence || 'one-time';
    
    // Set the assignees checkboxes
    document.querySelectorAll('input[name="task-assignees"]').forEach(cb => {
        cb.checked = task.assignees.includes(parseInt(cb.value));
    });
}

// Save Task (Add or Edit)
function saveTask() {
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const dueDate = document.getElementById('task-due-date').value;
    const recurrence = document.getElementById('task-recurrence').value;
    
    // Get selected assignees from checkboxes
    const assignees = [];
    document.querySelectorAll('input[name="task-assignees"]:checked').forEach(cb => {
        assignees.push(parseInt(cb.value));
    });
    
    // Validation
    if (!title || !dueDate) {
        showToast('Please fill in the title and due date');
        return;
    }
    
    if (assignees.length === 0) {
        showToast('Please select at least one assignee');
        return;
    }
    
    if (editingTaskId) {
        // Update existing task
        editTask(editingTaskId, { title, description, assignees, dueDate, recurrence });
    } else {
        // Add new task
        addTask({ title, description, assignees, dueDate, recurrence });
    }
    
    // Close modal
    closeTaskModal();
}

// Add new task
function addTask(taskData) {
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: taskData.title,
        description: taskData.description,
        assignees: taskData.assignees,
        dueDate: taskData.dueDate,
        status: 'pending',
        recurring: false,
        recurrence: taskData.recurrence
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasksPage();
    
    showToast('Task added successfully!');
}

// Edit existing task
function editTask(taskId, updatedData) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: updatedData.title,
            description: updatedData.description,
            assignees: updatedData.assignees,
            dueDate: updatedData.dueDate,
            recurrence: updatedData.recurrence
        };
        saveTasks();
        renderTasksPage();
        showToast('Task updated successfully!');
    }
}

// Delete task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasksPage();
        showToast('Task deleted successfully!');
    }
}

// Toggle task completed status
function toggleTaskCompleted(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const currentStatus = tasks[taskIndex].status;
        tasks[taskIndex].status = currentStatus === 'completed' ? 'pending' : 'completed';
        saveTasks();
        renderTasksPage();
        const newStatus = tasks[taskIndex].status === 'completed' ? 'completed' : 'pending';
        showToast(`Task marked as ${newStatus}!`);
        if (newStatus === 'completed') {
            triggerConfetti();
        }
    }
}

function setupQuickAdd() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const quickTaskInput = document.getElementById('quick-task-input');
    
    if (addTaskBtn && quickTaskInput) {
        addTaskBtn.addEventListener('click', () => {
            const taskName = quickTaskInput.value.trim();
            if (taskName) {
                // Quick add with defaults: assigned to current user, due today
                const today = new Date().toISOString().split('T')[0];
                addTask({
                    title: taskName,
                    assignees: [1], // Current user
                    dueDate: today
                });
                quickTaskInput.value = '';
            } else {
                showToast('Please enter a task name');
            }
        });
        
        quickTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTaskBtn.click();
            }
        });
    }
}

// ============ EXPENSES PAGE ============
function setupExpenseModal() {
    const expenseModal = document.getElementById('expense-modal');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const closeExpenseModalBtn = document.getElementById('close-expense-modal');
    const cancelExpenseBtn = document.getElementById('cancel-expense-btn');
    const expenseForm = document.getElementById('expense-form');
    const expenseDateInput = document.getElementById('expense-date');
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    expenseDateInput.value = today;
    
    // Open modal for adding new expense
    addExpenseBtn.addEventListener('click', () => {
        openExpenseModal();
    });
    
    // Close modal
    closeExpenseModalBtn.addEventListener('click', () => {
        closeExpenseModal();
    });
    
    cancelExpenseBtn.addEventListener('click', () => {
        closeExpenseModal();
    });
    
    // Close modal when clicking outside
    expenseModal.addEventListener('click', (e) => {
        if (e.target === expenseModal) {
            closeExpenseModal();
        }
    });
    
    // Handle form submission
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveExpense();
    });
}

function openExpenseModal(expenseId = null) {
    const expenseModal = document.getElementById('expense-modal');
    const modalTitle = document.getElementById('expense-modal-title');
    const form = document.getElementById('expense-form');
    
    editingExpenseId = expenseId;
    
    if (expenseId) {
        // Edit mode
        modalTitle.textContent = 'Edit Expense';
        const expense = expenses.find(e => e.id === expenseId);
        if (expense) {
            fillExpenseForm(expense);
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add Expense';
        form.reset();
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('expense-date').value = today;
        // Check all participants by default
        document.querySelectorAll('input[name="participants"]').forEach(cb => {
            cb.checked = true;
        });
    }
    
    expenseModal.classList.add('active');
}

function closeExpenseModal() {
    const expenseModal = document.getElementById('expense-modal');
    expenseModal.classList.remove('active');
    editingExpenseId = null;
    document.getElementById('expense-form').reset();
}

function fillExpenseForm(expense) {
    document.getElementById('expense-description').value = expense.description;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-payer').value = expense.payer;
    document.getElementById('expense-date').value = expense.date;
    document.getElementById('expense-status').value = expense.status;
    
    // Set participants checkboxes
    document.querySelectorAll('input[name="participants"]').forEach(cb => {
        cb.checked = expense.participants.includes(cb.value);
    });
}

function saveExpense() {
    const description = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const payer = document.getElementById('expense-payer').value;
    const date = document.getElementById('expense-date').value;
    const status = document.getElementById('expense-status').value;
    
    // Get selected participants
    const participants = [];
    document.querySelectorAll('input[name="participants"]:checked').forEach(cb => {
        participants.push(cb.value);
    });
    
    // Validation
    if (!description || !amount || !payer || !date || participants.length === 0) {
        showToast('Please fill in all fields and select at least one participant');
        return;
    }
    
    if (editingExpenseId) {
        // Update existing expense
        const expenseIndex = expenses.findIndex(e => e.id === editingExpenseId);
        if (expenseIndex !== -1) {
            expenses[expenseIndex] = {
                ...expenses[expenseIndex],
                description,
                amount,
                payer,
                participants,
                date,
                status
            };
            showToast('Expense updated successfully!');
        }
    } else {
        // Add new expense
        const newExpense = {
            id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
            description,
            amount,
            payer,
            participants,
            date,
            status
        };
        expenses.push(newExpense);
        showToast('Expense added successfully!');
    }
    
    // Save to localStorage
    saveExpenses();
    
    // Re-render the expenses page
    renderExpensesPage();
    updateBalanceSummary();
    
    // Close modal
    closeExpenseModal();
}

function deleteExpense(expenseId) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(e => e.id !== expenseId);
        saveExpenses();
        renderExpensesPage();
        updateBalanceSummary();
        showToast('Expense deleted successfully!');
    }
}

function calculateBalances() {
    let youOwe = 0;
    let youAreOwed = 0;
    
    expenses.forEach(expense => {
        // Only calculate for pending expenses
        if (expense.status !== 'Pending') return;
        
        const shareAmount = expense.amount / expense.participants.length;
        
        // If current user is in participants but didn't pay
        if (expense.participants.includes(currentUser) && expense.payer !== currentUser) {
            youOwe += shareAmount;
        }
        
        // If current user paid but others are in participants
        if (expense.payer === currentUser) {
            const othersCount = expense.participants.filter(p => p !== currentUser).length;
            youAreOwed += shareAmount * othersCount;
        }
    });
    
    return { youOwe, youAreOwed };
}

function updateBalanceSummary() {
    const balances = calculateBalances();
    
    const youOweElement = document.querySelector('.balance-card.owe .balance-amount');
    const youAreOwedElement = document.querySelector('.balance-card.owed .balance-amount');
    
    if (youOweElement) {
        youOweElement.textContent = `$${balances.youOwe.toFixed(2)}`;
    }
    
    if (youAreOwedElement) {
        youAreOwedElement.textContent = `$${balances.youAreOwed.toFixed(2)}`;
    }
}

function renderExpensesPage() {
    const expenseListContainer = document.getElementById('expense-list-container');
    if (!expenseListContainer) return;
    
    let expensesHTML = '';
    
    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedExpenses.forEach(expense => {
        const payer = roommates.find(r => r.name === expense.payer) || { name: expense.payer, initials: expense.payer.substring(0, 2).toUpperCase() };
        
        expensesHTML += `
            <div class="expense-card" data-expense-id="${expense.id}">
                <div class="expense-header">
                    <div>
                        <h4 class="expense-description">${expense.description}</h4>
                        <p class="expense-details">Paid by ${payer.name} • Split between ${expense.participants.length} ${expense.participants.length === 1 ? 'person' : 'people'}</p>
                    </div>
                    <p class="expense-amount">$${expense.amount.toFixed(2)}</p>
                </div>
                <div class="expense-footer">
                    <div>
                        <span class="expense-date">${formatDateDisplay(expense.date)}</span>
                        <span class="pill ${expense.status.toLowerCase()}">${expense.status}</span>
                    </div>
                    <div class="expense-actions">
                        <i class="fas fa-edit" onclick="openExpenseModal(${expense.id})" title="Edit expense"></i>
                        <i class="fas fa-trash" onclick="deleteExpense(${expense.id})" title="Delete expense"></i>
                    </div>
                </div>
            </div>
        `;
    });
    
    if (sortedExpenses.length === 0) {
        expensesHTML = `
            <div class="card" style="text-align: center; padding: 3rem 1.5rem;">
                <i class="fas fa-receipt" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">No expenses yet</h3>
                <p style="color: var(--text-muted);">Click the "Add Expense" button to get started</p>
            </div>
        `;
    }
    
    expenseListContainer.innerHTML = expensesHTML;
    updateBalanceSummary();
}

function formatDateDisplay(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }
    
    // Check if it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    
    // Format as Month Day, Year
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ============ CHATS PAGE ============
function setupChats() {
    // Setup new chat button
    const newChatBtn = document.getElementById('new-chat-btn');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', openNewChatModal);
    }
    
    // Setup new chat modal handlers
    setupNewChatModal();
}

function renderChatsPage() {
    const conversationListContainer = document.getElementById('conversation-list-container');
    if (!conversationListContainer) return;
    
    let conversationsHTML = '';
    
    conversations.forEach(conv => {
        const isMuted = chatSettings[conv.id]?.muted || false;
        const muteIcon = isMuted ? '<i class="fas fa-bell-slash" style="color: var(--text-muted); font-size: 0.8rem; margin-left: 0.25rem;"></i>' : '';
        const unreadBadge = conv.unread > 0 && !isMuted ? `<span class="unread-badge">${conv.unread}</span>` : '';
        
        conversationsHTML += `
            <div class="conversation-card" data-conversation-id="${conv.id}">
                <div class="conversation-avatar">
                    <i class="fas ${conv.icon}"></i>
                </div>
                <div class="conversation-content">
                    <div class="conversation-header">
                        <span class="conversation-name">${conv.name}${muteIcon}</span>
                        <span class="conversation-time">${conv.time}</span>
                    </div>
                    <p class="conversation-preview">${conv.lastMessage}</p>
                </div>
                ${unreadBadge}
            </div>
        `;
    });
    
    conversationListContainer.innerHTML = conversationsHTML;
    
    // Add click handlers to conversation cards
    document.querySelectorAll('.conversation-card').forEach(card => {
        card.addEventListener('click', () => {
            const convId = parseInt(card.dataset.conversationId);
            // Check screen size to determine behavior
            if (window.innerWidth >= 1024) {
                // Desktop: show in preview pane
                openChatDesktop(convId);
            } else {
                // Mobile: show in overlay
                openChat(convId);
            }
        });
    });
    
    // Setup back button (mobile only)
    const backBtn = document.getElementById('back-to-chats');
    if (backBtn) {
        backBtn.addEventListener('click', closeChat);
    }
}

function openChatDesktop(conversationId) {
    currentConversation = conversationId;
    const conversation = conversations.find(c => c.id === conversationId);
    const chatPreview = document.getElementById('chat-preview-desktop');
    const chatEmptyState = chatPreview.querySelector('.chat-empty-state');
    const chatContent = document.getElementById('chat-preview-content');
    const chatTitle = document.getElementById('chat-title-desktop');
    const messagesContainer = document.getElementById('messages-container-desktop');
    
    // Hide empty state, show content
    chatEmptyState.style.display = 'none';
    chatContent.style.display = 'flex';
    
    // Update title with mute icon if needed
    const isMuted = chatSettings[conversationId]?.muted || false;
    const muteIcon = isMuted ? ' <i class="fas fa-bell-slash" style="color: var(--text-muted); font-size: 0.9rem;"></i>' : '';
    chatTitle.innerHTML = conversation.name + muteIcon;
    
    // Render messages
    renderMessages(conversationId, messagesContainer);
    
    // Setup message input for desktop
    setupMessageInput('desktop');
    
    // Setup settings button
    setupChatSettings('desktop');
    
    // Highlight active conversation
    document.querySelectorAll('.conversation-card').forEach(card => {
        if (parseInt(card.dataset.conversationId) === conversationId) {
            card.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(79, 172, 254, 0.1) 100%)';
            card.style.borderLeft = '3px solid var(--accent-primary)';
        } else {
            card.style.background = '';
            card.style.borderLeft = '';
        }
    });
}

function openChat(conversationId) {
    currentConversation = conversationId;
    const conversation = conversations.find(c => c.id === conversationId);
    const chatView = document.getElementById('chat-view');
    const chatTitle = document.getElementById('chat-title');
    const messagesContainer = document.getElementById('messages-container');
    
    // Update title with mute icon if needed
    const isMuted = chatSettings[conversationId]?.muted || false;
    const muteIcon = isMuted ? ' <i class="fas fa-bell-slash" style="color: var(--text-muted); font-size: 0.9rem;"></i>' : '';
    chatTitle.innerHTML = conversation.name + muteIcon;
    
    // Render messages
    renderMessages(conversationId, messagesContainer);
    
    // Show chat view
    chatView.style.display = 'flex';
    
    // Setup message input for mobile
    setupMessageInput('mobile');
    
    // Setup settings button
    setupChatSettings('mobile');
}

function renderMessages(conversationId, container) {
    const chatMessages = messages[conversationId] || [];
    let messagesHTML = '';
    
    chatMessages.forEach(msg => {
        const sender = roommates.find(r => r.id === msg.sender);
        const isOwn = msg.own;
        const ownClass = isOwn ? 'own' : '';
        
        messagesHTML += `
            <div class="message ${ownClass}">
                <div class="message-avatar" style="background: ${sender ? sender.color : 'var(--accent-primary)'};">
                    ${sender ? sender.initials : 'DG'}
                </div>
                <div class="message-bubble">
                    ${!isOwn ? `<p class="message-sender">${sender ? sender.name : 'Unknown'}</p>` : ''}
                    <p class="message-text">${msg.text}</p>
                    <p class="message-time">${msg.time}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = messagesHTML;
}

function closeChat() {
    const chatView = document.getElementById('chat-view');
    chatView.style.display = 'none';
    currentConversation = null;
}

// ============ MESSAGE SENDING ============
function setupMessageInput(context) {
    const inputId = context === 'desktop' ? 'message-input-desktop' : 'message-input-mobile';
    const sendBtnId = context === 'desktop' ? 'send-message-btn-desktop' : 'send-message-btn-mobile';
    
    const messageInput = document.getElementById(inputId);
    const sendBtn = document.getElementById(sendBtnId);
    
    if (!messageInput || !sendBtn) return;
    
    // Remove old event listeners by cloning
    const newMessageInput = messageInput.cloneNode(true);
    const newSendBtn = sendBtn.cloneNode(true);
    messageInput.parentNode.replaceChild(newMessageInput, messageInput);
    sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);
    
    // Add new event listeners
    newSendBtn.addEventListener('click', () => sendMessage(context));
    newMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(context);
        }
    });
}

function sendMessage(context) {
    if (!currentConversation) return;
    
    const inputId = context === 'desktop' ? 'message-input-desktop' : 'message-input-mobile';
    const messageInput = document.getElementById(inputId);
    const messageText = messageInput.value.trim();
    
    if (!messageText) return;
    
    // Create new message
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    const newMessage = {
        id: Date.now(),
        sender: 1, // Current user (Janvi)
        text: messageText,
        time: timeString,
        own: true
    };
    
    // Add to messages array
    if (!messages[currentConversation]) {
        messages[currentConversation] = [];
    }
    messages[currentConversation].push(newMessage);
    
    // Update conversation last message
    const conversation = conversations.find(c => c.id === currentConversation);
    if (conversation) {
        conversation.lastMessage = `You: ${messageText.substring(0, 30)}${messageText.length > 30 ? '...' : ''}`;
        conversation.time = 'Just now';
    }
    
    // Clear input
    messageInput.value = '';
    
    // Re-render messages
    const containerId = context === 'desktop' ? 'messages-container-desktop' : 'messages-container';
    const container = document.getElementById(containerId);
    renderMessages(currentConversation, container);
    
    // Re-render conversation list to update last message
    renderChatsPage();
    
    // Reopen chat to maintain state
    if (context === 'desktop') {
        openChatDesktop(currentConversation);
    }
    
    showToast('Message sent!');
}

// ============ CHAT SETTINGS (MUTE/UNMUTE) ============
function setupChatSettings(context) {
    const settingsBtnId = context === 'desktop' ? 'chat-settings-btn-desktop' : 'chat-settings-btn-mobile';
    const settingsBtn = document.getElementById(settingsBtnId);
    
    if (!settingsBtn) return;
    
    // Remove old event listener
    const newSettingsBtn = settingsBtn.cloneNode(true);
    settingsBtn.parentNode.replaceChild(newSettingsBtn, settingsBtn);
    
    newSettingsBtn.addEventListener('click', () => openChatSettingsMenu(context));
}

function openChatSettingsMenu(context) {
    if (!currentConversation) return;
    
    const isMuted = chatSettings[currentConversation]?.muted || false;
    
    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'chat-settings-dropdown';
    dropdown.innerHTML = `
        <div class="settings-menu-item" data-action="toggle-mute">
            <i class="fas ${isMuted ? 'fa-bell' : 'fa-bell-slash'}"></i>
            <span>${isMuted ? 'Unmute Notifications' : 'Mute Notifications'}</span>
        </div>
    `;
    
    // Position dropdown
    const settingsBtnId = context === 'desktop' ? 'chat-settings-btn-desktop' : 'chat-settings-btn-mobile';
    const settingsBtn = document.getElementById(settingsBtnId);
    const rect = settingsBtn.getBoundingClientRect();
    
    dropdown.style.position = 'fixed';
    dropdown.style.top = `${rect.bottom + 5}px`;
    dropdown.style.right = `${window.innerWidth - rect.right}px`;
    
    document.body.appendChild(dropdown);
    
    // Add click handler
    dropdown.querySelector('[data-action="toggle-mute"]').addEventListener('click', () => {
        toggleMute(currentConversation);
        document.body.removeChild(dropdown);
        
        // Refresh the chat view to show mute icon
        if (context === 'desktop') {
            openChatDesktop(currentConversation);
        } else {
            openChat(currentConversation);
        }
    });
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target) && e.target !== settingsBtn) {
                if (document.body.contains(dropdown)) {
                    document.body.removeChild(dropdown);
                }
                document.removeEventListener('click', closeDropdown);
            }
        }, 100);
    });
}

function toggleMute(conversationId) {
    if (!chatSettings[conversationId]) {
        chatSettings[conversationId] = {};
    }
    
    const wasMuted = chatSettings[conversationId].muted || false;
    chatSettings[conversationId].muted = !wasMuted;
    
    const conversation = conversations.find(c => c.id === conversationId);
    const action = chatSettings[conversationId].muted ? 'muted' : 'unmuted';
    
    showToast(`${conversation.name} ${action}`);
    
    // Re-render conversation list to show/hide mute icon
    renderChatsPage();
    
    // Reopen current chat if it matches
    if (currentConversation === conversationId) {
        if (window.innerWidth >= 1024) {
            openChatDesktop(conversationId);
        }
    }
}

// ============ NEW CHAT / GROUP CREATION ============
function setupNewChatModal() {
    const newChatModal = document.getElementById('new-chat-modal');
    const closeBtn = document.getElementById('close-new-chat-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNewChatModal);
    }
    
    // Close when clicking outside
    if (newChatModal) {
        newChatModal.addEventListener('click', (e) => {
            if (e.target === newChatModal) {
                closeNewChatModal();
            }
        });
    }
    
    // Setup action buttons
    const directChatBtn = document.getElementById('start-direct-chat-btn');
    const groupChatBtn = document.getElementById('start-group-chat-btn');
    
    if (directChatBtn) {
        directChatBtn.addEventListener('click', showDirectChatForm);
    }
    
    if (groupChatBtn) {
        groupChatBtn.addEventListener('click', showGroupChatForm);
    }
}

function openNewChatModal() {
    const modal = document.getElementById('new-chat-modal');
    const choiceView = document.getElementById('new-chat-choice');
    const directView = document.getElementById('new-chat-direct');
    const groupView = document.getElementById('new-chat-group');
    
    // Show choice view, hide others
    choiceView.style.display = 'block';
    directView.style.display = 'none';
    groupView.style.display = 'none';
    
    modal.classList.add('active');
}

function closeNewChatModal() {
    const modal = document.getElementById('new-chat-modal');
    modal.classList.remove('active');
}

function showDirectChatForm() {
    const choiceView = document.getElementById('new-chat-choice');
    const directView = document.getElementById('new-chat-direct');
    
    choiceView.style.display = 'none';
    directView.style.display = 'block';
    
    // Populate roommate list
    const roommatesList = document.getElementById('roommates-list-direct');
    roommatesList.innerHTML = '';
    
    roommates.forEach(roommate => {
        if (roommate.id === 1) return; // Skip current user
        
        // Check if direct chat already exists
        const existingChat = conversations.find(c => 
            c.type === 'direct' && 
            c.participants.includes(1) && 
            c.participants.includes(roommate.id)
        );
        
        const item = document.createElement('div');
        item.className = 'roommate-select-item';
        item.innerHTML = `
            <div class="avatar small" style="background: ${roommate.color};">${roommate.initials}</div>
            <span>${roommate.name}</span>
            ${existingChat ? '<span style="font-size: 0.75rem; color: var(--text-muted); margin-left: auto;">Chat exists</span>' : ''}
        `;
        
        if (!existingChat) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => createDirectChat(roommate.id));
        } else {
            item.style.opacity = '0.6';
            item.style.cursor = 'default';
        }
        
        roommatesList.appendChild(item);
    });
}

function showGroupChatForm() {
    const choiceView = document.getElementById('new-chat-choice');
    const groupView = document.getElementById('new-chat-group');
    
    choiceView.style.display = 'none';
    groupView.style.display = 'block';
    
    // Populate roommate checkboxes with horizontal layout
    const roommatesList = document.getElementById('roommates-list-group');
    roommatesList.innerHTML = '';
    
    roommates.forEach(roommate => {
        if (roommate.id === 1) return; // Skip current user
        
        // Create horizontal layout: checkbox + name on same line
        const item = document.createElement('div');
        item.className = 'modal-assignee-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'group-participants';
        checkbox.value = roommate.id;
        checkbox.id = `group-roommate-${roommate.id}`;
        
        const label = document.createElement('label');
        label.htmlFor = `group-roommate-${roommate.id}`;
        label.textContent = roommate.name;
        
        item.appendChild(checkbox);
        item.appendChild(label);
        
        roommatesList.appendChild(item);
    });
    
    // Setup form submission
    const form = document.getElementById('group-chat-form');
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createGroupChat();
    });
}

function createDirectChat(roommateId) {
    const roommate = roommates.find(r => r.id === roommateId);
    if (!roommate) return;
    
    // Create new conversation
    const newConvId = conversations.length > 0 ? Math.max(...conversations.map(c => c.id)) + 1 : 1;
    const newConversation = {
        id: newConvId,
        name: roommate.name,
        icon: 'fa-user',
        lastMessage: 'No messages yet',
        time: 'Just now',
        unread: 0,
        participants: [1, roommateId],
        type: 'direct'
    };
    
    conversations.unshift(newConversation);
    messages[newConvId] = [];
    
    closeNewChatModal();
    renderChatsPage();
    
    // Open the new chat
    if (window.innerWidth >= 1024) {
        openChatDesktop(newConvId);
    } else {
        openChat(newConvId);
    }
    
    showToast(`Chat with ${roommate.name} created!`);
}

function createGroupChat() {
    const groupName = document.getElementById('group-chat-name').value.trim();
    const selectedParticipants = Array.from(document.querySelectorAll('input[name="group-participants"]:checked'))
        .map(cb => parseInt(cb.value));
    
    if (!groupName) {
        showToast('Please enter a group name');
        return;
    }
    
    if (selectedParticipants.length === 0) {
        showToast('Please select at least one roommate');
        return;
    }
    
    // Add current user to participants
    selectedParticipants.unshift(1);
    
    // Create new conversation
    const newConvId = conversations.length > 0 ? Math.max(...conversations.map(c => c.id)) + 1 : 1;
    const newConversation = {
        id: newConvId,
        name: groupName,
        icon: 'fa-users',
        lastMessage: 'No messages yet',
        time: 'Just now',
        unread: 0,
        participants: selectedParticipants,
        type: 'group'
    };
    
    conversations.unshift(newConversation);
    messages[newConvId] = [];
    
    closeNewChatModal();
    renderChatsPage();
    
    // Open the new chat
    if (window.innerWidth >= 1024) {
        openChatDesktop(newConvId);
    } else {
        openChat(newConvId);
    }
    
    showToast(`Group "${groupName}" created!`);
}

// ============ TOAST NOTIFICATIONS ============
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============ UTILITY FUNCTIONS ============
function getRoommateById(id) {
    return roommates.find(r => r.id === id);
}

function formatDate(dateString) {
    // Simple date formatting (can be enhanced)
    return dateString;
}

// ============ ANIMATIONS & INTERACTIONS ============
// Add hover effects and micro-interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons (optional enhancement)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Small scale animation on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

console.log('✅ Roommate Task Organizer loaded successfully!');
