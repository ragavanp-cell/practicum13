// CRUD Array of TrainSphere Corporate Training & Workshop Tasks
let workshopTasks = [
    { id: 1, title: 'Schedule Executive Leadership Offsite', dept: 'Leadership Labs', status: 'Pending', date: '19/11/2026', owner: 'TS' },
    { id: 2, title: 'Finalize Cloud FinOps Workshop Labs', dept: 'Tech Bootcamps', status: 'Pending', date: '24/11/2026', owner: 'TL' },
    { id: 3, title: 'Conduct Agile Scrum Master Bootcamp', dept: 'Agile Sprints', status: 'In Progress', date: '19/11/2026', owner: 'AG' },
    { id: 4, title: 'Update Client Communication Playbook', dept: 'Soft Skills Mastery', status: 'In Progress', date: '21/11/2026', owner: 'TS' },
    { id: 5, title: 'Deliver AI Automation Cohort Certificates', dept: 'Tech Bootcamps', status: 'Completed', date: '16/11/2026', owner: 'LD' }
];

let activeSidebarFilter = 'All';

// CREATE: Add a new task object into the workshopTasks array
function createTask() {
    const titleInput = document.getElementById('taskTitleInput');
    const deptSelect = document.getElementById('taskDeptSelect');
    const statusSelect = document.getElementById('taskStatusSelect');

    const title = titleInput.value.trim();
    if (title === '') {
        alert('Please enter a corporate training or workshop task before adding.');
        titleInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        dept: deptSelect.value,
        status: statusSelect.value,
        date: new Date().toLocaleDateString('en-GB'),
        owner: 'TS'
    };

    workshopTasks.push(newTask);
    titleInput.value = '';
    renderBoard();
}

// READ: Render tasks from the CRUD array into the 3 status columns
function renderBoard() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    const statuses = ['Pending', 'In Progress', 'Completed'];

    statuses.forEach(status => {
        const listEl = document.getElementById(`list-${status}`);
        const countEl = document.getElementById(`count-${status}`);
        const colEl = document.getElementById(`col-${status}`);

        // Show/hide column based on sidebar filter
        colEl.style.display = (activeSidebarFilter === 'All' || activeSidebarFilter === status) ? 'block' : 'none';

        const filtered = workshopTasks.filter(t =>
            t.status === status &&
            (t.title.toLowerCase().includes(searchQuery) || t.dept.toLowerCase().includes(searchQuery))
        );

        countEl.textContent = filtered.length;
        listEl.innerHTML = '';

        const cardClass = status === 'Pending' ? 'card-pending' :
                          status === 'In Progress' ? 'card-progress' : 'card-completed';

        filtered.forEach(task => {
            const card = document.createElement('div');
            card.className = `task-card ${cardClass}`;
            card.innerHTML = `
                <div class="card-top">
                    <div class="avatar-circle">${task.owner}</div>
                    <div>
                        <p class="task-title">${task.title}</p>
                        <span class="task-date">${task.date}</span>
                    </div>
                </div>
                <span class="dept-tag">${task.dept}</span>
                <div class="card-actions">
                    <button class="mini-btn" onclick="editTaskTitle(${task.id})">Edit</button>
                    <button class="mini-btn" onclick="advanceTaskStatus(${task.id})">Move &rarr;</button>
                    <button class="mini-btn del" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            listEl.appendChild(card);
        });
    });
}

// UPDATE (1): Edit task title inside the array
function editTaskTitle(id) {
    const task = workshopTasks.find(t => t.id === id);
    if (!task) return;

    const updatedTitle = prompt('Update TrainSphere workshop task title:', task.title);
    if (updatedTitle !== null && updatedTitle.trim() !== '') {
        task.title = updatedTitle.trim();
        renderBoard();
    }
}

// UPDATE (2): Cycle task status across Pending -> In Progress -> Completed
function advanceTaskStatus(id) {
    const task = workshopTasks.find(t => t.id === id);
    if (!task) return;

    if (task.status === 'Pending') {
        task.status = 'In Progress';
    } else if (task.status === 'In Progress') {
        task.status = 'Completed';
    } else {
        task.status = 'Pending';
    }
    renderBoard();
}

// DELETE: Remove task from the array
function deleteTask(id) {
    workshopTasks = workshopTasks.filter(t => t.id !== id);
    renderBoard();
}

// Sidebar status filter helper
function filterByStatus(status, btnElement) {
    activeSidebarFilter = status;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    renderBoard();
}

// Initial render on page load
renderBoard();
