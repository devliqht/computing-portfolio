function search() {
    clearHighlights();
    const searchTerm = document.getElementById("search-bar").value.trim();
    if (!searchTerm) {
        updateCounter(0);
        return;
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
    let count = 0;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            if (node.nodeValue.trim() === "") return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    const nodesToHighlight = [];
    while (walker.nextNode()) {
        nodesToHighlight.push(walker.currentNode);
    }

    nodesToHighlight.forEach((node) => {
        const parent = node.parentNode;
        const html = node.nodeValue.replace(regex, (match) => {
            count++;
            return `<span class="highlight">${match}</span>`;
        });
        parent.innerHTML = html;
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

document.getElementById("search-bar").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        search();
    }
});