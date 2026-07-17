const API_URL = "https://pancake-embed-api.onrender.com";
const TOKEN_KEY = "pancake_token";

document.addEventListener("DOMContentLoaded", async () => {

    console.log("=================================");
    console.log("     Pancake Embed Editor");
    console.log("=================================");

    registerEvents();

    await authenticate();

});

function registerEvents() {

    document
        .getElementById("discord-login")
        .addEventListener("click", login);

    document
        .getElementById("logout")
        .addEventListener("click", logout);
    document
        .getElementById("join-discord")
        .addEventListener("click", () => {

            window.open(
                "https://discord.gg/SgXdeVaxuh",
                "_blank"
            );

        });
    document
        .getElementById("see-guide")
        .addEventListener("click", () => {

            window.open(
                "https://github.com/SuitedxD/pancake-embed-editor/tree/main#getting-started",
                "_blank"
            );

        });

}

function login() {

    window.location.href =

        `${API_URL}/auth/discord`;

}

function logout() {

    localStorage.removeItem(TOKEN_KEY);

    window.location.href =

        window.location.pathname;

}

async function authenticate() {

    const params = new URLSearchParams(

        window.location.search

    );

    const token = params.get("token");

    if (token) {

        localStorage.setItem(

            TOKEN_KEY,

            token

        );

        history.replaceState(

            {},

            document.title,

            window.location.pathname

        );

    }

    const storedToken =

        localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {

        showLogin();

        return;

    }

    showEditor();

}


function showLogin() {

    document
        .getElementById("login-screen")
        .hidden = false;

    document
        .getElementById("editor-app")
        .hidden = true;

}

function showEditor() {

    document
        .getElementById("login-screen")
        .hidden = true;

    document
        .getElementById("editor-app")
        .hidden = false;

    initializeApplication();

}

function initializeApplication() {

    initializeEditor();

    initializeFileManager();

    initializeKeyboardShortcuts();

    renderComponents();

    renderPreview();

    console.log("Application initialized.");

}

function initializeKeyboardShortcuts() {

    document.addEventListener("keydown", async event => {

        const ctrl = event.ctrlKey || event.metaKey;

        if (!ctrl) {

            return;

        }

        switch (event.key.toLowerCase()) {

            case "s":

                event.preventDefault();

                await generateEmbedCode();

                break;

            case "o":

                event.preventDefault();

                document

                    .getElementById("import-file")

                    .click();

                break;

            case "e":

                event.preventDefault();

                exportProject();

                break;

            case "n":

                event.preventDefault();

                if (confirm("Discard current project?")) {

                    resetEditor();

                }

                break;

        }

    });

}

function resetEditor() {

    resetState();

    refreshEditor();

}

function isAuthenticated() {

    return localStorage.getItem(TOKEN_KEY) !== null;

}

window.addEventListener("storage", event => {

    if (event.key !== TOKEN_KEY) {

        return;

    }

    if (!event.newValue) {

        logout();

    }

});


window.getAuthToken = function () {

    return localStorage.getItem(TOKEN_KEY);

};

window.isAuthenticated = isAuthenticated;

window.login = login;

window.logout = logout;

window.pancake = {

    state: getState,

    preview: renderPreview,

    refresh: refreshEditor,

    reset: resetEditor,

    export: exportProject,

    import: importProject,

    generate: generateEmbedCode,

    get: fetchEmbed,

    login,

    logout,

    authenticated: isAuthenticated

};

console.log("app.js loaded.");