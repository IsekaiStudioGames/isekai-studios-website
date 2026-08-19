const modalRoot = document.getElementById("modal-root");

const modalFiles = [
    "lore",
    "team",
    "contact",
    "guild",
    "games",
    "news",
    "webgame"
];

async function loadModals() {
    if (!modalRoot) {
        console.error("Modal root was not found.");
        return;
    }

    try {
        const modalRequests = modalFiles.map((modalName) =>
            fetch(`components/modals/${modalName}.html`)
        );

        const responses = await Promise.all(modalRequests);

        for (const response of responses) {
            if (!response.ok) {
                throw new Error(
                    `Failed to load modal file: ${response.url}`
                );
            }
        }

        const modalMarkup = await Promise.all(
            responses.map((response) => response.text())
        );

        modalRoot.innerHTML = modalMarkup.join("\n");
    } catch (error) {
        console.error("Could not load the modals:", error);
    }
}

loadModals();