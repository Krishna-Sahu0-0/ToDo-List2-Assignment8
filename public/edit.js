document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const taskId = this.dataset.id;
        const taskItem = this.closest('.task-item');
        const taskNameSpan = taskItem.querySelector('.task-name');
        const oldName = taskNameSpan.textContent;
        // Create input box
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldName;
        input.className = 'edit-input';
        taskNameSpan.replaceWith(input);
        input.focus();

        function saveEdit() {
            const newName = input.value.trim();
            if (newName && newName !== oldName) {
                fetch(`/edit/${taskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ updatedName: newName })
                })
                .then(res => {
                    if (res.ok) location.reload();
                    else alert('Edit failed');
                });
            } else {
                input.replaceWith(taskNameSpan);
            }
        }

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    });
});