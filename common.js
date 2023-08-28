function showAlert(message, type, container) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    container.innerHTML = "";
    container.appendChild(alertDiv);

    setTimeout(() => {
        container.innerHTML = "";
    }, 5000);
}

function redirectToPageAfterDelay(pageUrl, container) {
    showAlert("Redirecting...", "info", container);
    setTimeout(() => {
        window.location.href = pageUrl;
    }, 2000);
}
