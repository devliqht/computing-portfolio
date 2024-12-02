document.getElementById("search-bar").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        search();
    }
});

function search() {
    clearHighlights(); 
    const searchTerm = document.getElementById("search-bar").value.trim();
    if (!searchTerm) {
        updateCounter(0);
        return;
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    let count = 0;

    document.body.innerHTML = document.body.innerHTML.replace(regex, (match) => {
        count++;
        return `<span class="highlight">${match}</span>`;
    });

    updateCounter(count); 
}

function clearHighlights() {
    const highlightedElements = document.querySelectorAll(".highlight");
    highlightedElements.forEach((el) => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize(); 
    });
    updateCounter(0);
}

function updateCounter(count) {
    document.getElementById("counter").textContent = `Matches: ${count}`;
}