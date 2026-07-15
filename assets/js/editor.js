/*
=========================================
        Pancake Embed Editor
              Editor
=========================================
*/

/*
=========================================
            INITIALIZE
=========================================
*/

function initializeEditor() {

    bindMessage();
    bindEmbed();
    bindAuthor();
    bindFooter();
    bindImages();
    bindActions();

}

/*
=========================================
            HELPERS
=========================================
*/

function bindInput(id, setter) {

    const input = document.getElementById(id);

    input.addEventListener("input", () => {

        setter(input.value);

        renderPreview();

    });

}

/*
=========================================
            MESSAGE
=========================================
*/

function bindMessage() {

    bindInput("content", setContent);

}

/*
=========================================
            EMBED
=========================================
*/

function bindEmbed() {

    bindInput("title", setTitle);

    bindInput("description", setDescription);

    const color = document.getElementById("color");

    color.addEventListener("input", () => {

        setColor(color.value);

        renderPreview();

    });

}

/*
=========================================
            AUTHOR
=========================================
*/

function bindAuthor() {

    bindInput("author-name", setAuthorName);

    bindInput("author-icon", setAuthorIcon);

}

/*
=========================================
            FOOTER
=========================================
*/

function bindFooter() {

    bindInput("footer-text", setFooterText);

    bindInput("footer-icon", setFooterIcon);

}

/*
=========================================
            IMAGES
=========================================
*/

function bindImages() {

    bindInput("thumbnail", setThumbnail);

    bindInput("image", setImage);

}

/*
=========================================
        ACTION BUTTONS
=========================================
*/

function bindActions() {

    document
        .getElementById("add-field")
        .addEventListener("click", () => {

            addField();

            renderComponents();

            renderPreview();

        });

    document
        .getElementById("add-button")
        .addEventListener("click", () => {

            addButton();

            renderComponents();

            renderPreview();

        });

    document
        .getElementById("generate")
        .addEventListener("click", async () => {

            await generateEmbedCode();

        });

}

/*
=========================================
            REFRESH
=========================================
*/

function refreshEditor() {

    const state = getState();
    const embed = getEmbed();

    document.getElementById("content").value = state.content;

    document.getElementById("title").value = embed.title;
    document.getElementById("description").value = embed.description;
    document.getElementById("color").value = embed.color;

    document.getElementById("author-name").value = embed.author.name;
    document.getElementById("author-icon").value = embed.author.icon_url;

    document.getElementById("footer-text").value = embed.footer.text;
    document.getElementById("footer-icon").value = embed.footer.icon_url;

    document.getElementById("thumbnail").value = embed.thumbnail.url;
    document.getElementById("image").value = embed.image.url;

    renderComponents();
    renderPreview();

}

/*
=========================================
            DEBUG
=========================================
*/

window.initializeEditor = initializeEditor;
window.refreshEditor = refreshEditor;