document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const taskId = this.dataset.id;
        const newName = prompt("Edit your task:");
        if (newName && newName.trim() !== "") {
            fetch(`/edit/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updatedName: newName.trim() })
            })
            .then(res => {
                if (res.ok) location.reload();
                else alert('Edit failed');
            });
        }
    });
});