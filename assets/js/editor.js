// editor.js

function initializeEditor() {

    bindMessage();
    bindEmbed();
    bindAuthor();
    bindFooter();
    bindImages();
    bindActions();

}

function bindInput(id, setter) {

    const input = document.getElementById(id);

    input.addEventListener("input", () => {

        setter(input.value);

        renderPreview();

    });

}

function bindMessage() {

    bindInput("content", setContent);

}

function bindEmbed() {

    bindInput("title", setTitle);

    bindInput("description", setDescription);

    const color = document.getElementById("color");

    color.addEventListener("input", () => {

        setColor(color.value);

        renderPreview();

    });

}

function bindAuthor() {

    bindInput("author-name", setAuthorName);

    bindInput("author-icon", setAuthorIcon);

}

function bindFooter() {

    bindInput("footer-text", setFooterText);

    bindInput("footer-icon", setFooterIcon);

}

function bindImages() {

    bindInput("thumbnail", setThumbnail);

    bindInput("image", setImage);

}

function bindActions() {

    document
        .getElementById("add-field")
        .addEventListener("click", () => {


        const embed = getEmbed();


        if(embed.fields.length >= 25){

            alert(
                "Discord allows maximum 25 fields."
            );

            return;

        }


        addField();

        renderComponents();

        renderPreview();
    });

    document
        .getElementById("add-button")
        .addEventListener("click", () => {


        const embed = getEmbed();


        if(embed.buttons.length >= 25){

            alert(
                "Discord allows maximum 25 buttons."
            );

            return;

        }


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