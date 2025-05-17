document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const taskId = this.dataset.id;
        const taskItem = this.closest('.task-item');
        const taskNameSpan = taskItem.querySelector('.task-name');
        const prioritySpan = taskItem.querySelector('.priority');
        const oldName = taskNameSpan.textContent;
        const oldPriority = prioritySpan.textContent;

        // Create input for name
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldName;
        input.className = 'edit-input';

        // Create select for priority
        const select = document.createElement('select');
        ["Low", "Medium", "High"].forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            if (level === oldPriority) option.selected = true;
            select.appendChild(option);
        });
        select.className = 'edit-priority';

        // Replace spans with inputs
        taskNameSpan.replaceWith(input);
        prioritySpan.replaceWith(select);
        input.focus();

        function saveEdit() {
            const newName = input.value.trim();
            const newPriority = select.value;
            if (newName && (newName !== oldName || newPriority !== oldPriority)) {
                fetch(`/edit/${taskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ updatedName: newName, updatedPriority: newPriority })
                })
                .then(res => {
                    if (res.ok) location.reload();
                    else alert('Edit failed');
                });
            } else {
                input.replaceWith(taskNameSpan);
                select.replaceWith(prioritySpan);
            }
        }

        input.addEventListener('blur', saveEdit);
        select.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') select.focus();
        });
        select.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') select.blur();
        });
    });
});