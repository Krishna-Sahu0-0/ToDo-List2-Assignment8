document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const taskId = this.dataset.id;
        fetch(`/delete/${taskId}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) location.reload();
                else alert('Delete failed');
            });
    });
});

document.querySelectorAll('.delete-checkbox').forEach(box => {
    box.addEventListener('change', function () {
        if (this.checked) {
            const taskId = this.dataset.id;
            fetch(`/delete/${taskId}`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) location.reload();
                    else alert('Delete failed');
                });
        }
    });
});