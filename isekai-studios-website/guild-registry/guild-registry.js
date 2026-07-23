async function loadGuildRegistry() {
    const root = document.getElementById("guild-registry-root");

    if (!root || root.dataset.loaded === "true") {
        return;
    }

    try {
        const response = await fetch(
            "guild-registry/guild-registry.html"
        );

        if (!response.ok) {
            throw new Error(
                `Guild Registry failed to load: ${response.status}`
            );
        }

        root.innerHTML = await response.text();
        root.dataset.loaded = "true";

        createGuildCardBacks(root);
    } catch (error) {
        console.error(error);

        root.innerHTML = `
            <p class="guild-load-error">
                The Guild Registry could not be loaded.
            </p>
        `;
    }
}

function createGuildCardBacks(root) {
    const cards = root.querySelectorAll(".guild-member-card");

    cards.forEach((card) => {
        const name =
            card.querySelector(".guild-member-details h3")
                ?.textContent.trim() || "Guild Member";

        const role =
            card.querySelector(".guild-member-details p")
                ?.textContent.trim() || "";

        const number =
            card.querySelector(".guild-member-number")
                ?.textContent.trim() || "---";

        const avatar = card.querySelector(".guild-avatar");

        const emoji =
            avatar?.textContent.trim() || "⚔️";

        const avatarClasses =
            avatar
                ? Array.from(avatar.classList).join(" ")
                : "guild-avatar";

        const frontContent = card.innerHTML;

        card.innerHTML = `
            <div class="guild-card-inner">

                <div class="guild-card-face guild-card-front">
                    ${frontContent}
                </div>

                <div class="guild-card-face guild-card-back">
                    <span class="guild-back-heading">
                        ISEKAI STUDIOS
                    </span>

                    <div class="${avatarClasses} guild-back-avatar">
                        ${escapeHTML(emoji)}
                    </div>

                    <h3>${escapeHTML(name)}</h3>
                    <p>${escapeHTML(role)}</p>

                    <div class="guild-back-info">
                        <span>
                            MEMBER NO. ${escapeHTML(number)}
                        </span>

                        <span>STATUS: ACTIVE</span>
                    </div>
                </div>

            </div>
        `;
    });
}

function escapeHTML(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}

function waitForGuildRegistryRoot() {
    const root = document.getElementById("guild-registry-root");

    if (root) {
        loadGuildRegistry();
        return;
    }

    const observer = new MutationObserver(() => {
        const loadedRoot =
            document.getElementById("guild-registry-root");

        if (loadedRoot) {
            observer.disconnect();
            loadGuildRegistry();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

document.addEventListener(
    "DOMContentLoaded",
    waitForGuildRegistryRoot
);