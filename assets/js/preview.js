/*
=========================================
        Pancake Embed Editor
              Preview
=========================================
*/

const preview = document.getElementById("discord-preview");

/*
=========================================
            MAIN RENDER
=========================================
*/

function renderPreview() {

    const state = getState();

    preview.innerHTML = "";

    const wrapper = document.createElement("div");

    if (state.content.trim()) {

        const content = document.createElement("div");

        content.className = "discord-content";
        content.textContent = state.content;

        wrapper.appendChild(content);

    }

    state.embeds.forEach(embed => {

        wrapper.appendChild(
            createEmbed(embed)
        );

    });

    preview.appendChild(wrapper);

}

/*
=========================================
            CREATE EMBED
=========================================
*/

function createEmbed(embed) {

    const card = document.createElement("div");

    card.className = "discord-embed";
    card.style.borderLeftColor = embed.color || "#5865F2";

    createThumbnail(card, embed);
    createAuthor(card, embed);
    createTitle(card, embed);
    createDescription(card, embed);

    createFields(card, embed);
    createImage(card, embed);
    createFooter(card, embed);
    createButtons(card, embed);

    return card;

}

/*
=========================================
            THUMBNAIL
=========================================
*/

function createThumbnail(card, embed) {

    if (!embed.thumbnail.url) {
        return;
    }

    const image = document.createElement("img");

    image.className = "embed-thumbnail";
    image.src = embed.thumbnail.url;
    image.alt = "";

    image.onerror = () => image.remove();

    card.appendChild(image);

}

/*
=========================================
            AUTHOR
=========================================
*/

function createAuthor(card, embed) {

    if (!embed.author.name && !embed.author.icon_url) {
        return;
    }

    const author = document.createElement("div");

    author.className = "embed-author";

    if (embed.author.icon_url) {

        const icon = document.createElement("img");

        icon.src = embed.author.icon_url;
        icon.alt = "";

        icon.onerror = () => icon.remove();

        author.appendChild(icon);

    }

    if (embed.author.name) {

        const name = document.createElement("span");

        name.textContent = embed.author.name;

        author.appendChild(name);

    }

    card.appendChild(author);

}

/*
=========================================
            TITLE
=========================================
*/

function createTitle(card, embed) {

    if (!embed.title) {
        return;
    }

    const title = document.createElement("div");

    title.className = "embed-title";
    title.textContent = embed.title;

    card.appendChild(title);

}

/*
=========================================
        DESCRIPTION
=========================================
*/

function createDescription(card, embed) {

    if (!embed.description) {
        return;
    }

    const description = document.createElement("div");

    description.className = "embed-description";
    description.textContent = embed.description;

    card.appendChild(description);

}

/*
=========================================
            FIELDS
=========================================
*/

function createFields(card, embed) {

    if (!embed.fields.length) {
        return;
    }

    const container = document.createElement("div");

    container.className = "embed-fields";

    embed.fields.forEach(field => {

        const element = document.createElement("div");

        element.className = "embed-field";

        if (field.inline) {

            element.style.display = "inline-block";
            element.style.width = "30%";
            element.style.verticalAlign = "top";

        } else {

            element.style.display = "block";
            element.style.width = "100%";

        }

        if (field.name) {

            const name = document.createElement("div");

            name.className = "embed-field-name";
            name.textContent = field.name;

            element.appendChild(name);

        }

        if (field.value) {

            const value = document.createElement("div");

            value.className = "embed-field-value";
            value.textContent = field.value;

            element.appendChild(value);

        }

        container.appendChild(element);

    });

    card.appendChild(container);

}

/*
=========================================
            IMAGE
=========================================
*/

function createImage(card, embed) {

    if (!embed.image.url) {
        return;
    }

    const image = document.createElement("img");

    image.className = "embed-image";
    image.src = embed.image.url;
    image.alt = "";

    image.onerror = () => image.remove();

    card.appendChild(image);

}

/*
=========================================
            FOOTER
=========================================
*/

function createFooter(card, embed) {

    if (!embed.footer.text && !embed.footer.icon_url) {
        return;
    }

    const footer = document.createElement("div");

    footer.className = "embed-footer";

    if (embed.footer.icon_url) {

        const icon = document.createElement("img");

        icon.src = embed.footer.icon_url;
        icon.alt = "";

        icon.onerror = () => icon.remove();

        footer.appendChild(icon);

    }

    if (embed.footer.text) {

        const text = document.createElement("span");

        text.textContent = embed.footer.text;

        footer.appendChild(text);

    }

    card.appendChild(footer);

}

/*
=========================================
            BUTTONS
=========================================
*/

const BUTTON_STYLES = {

    primary: "primary",
    secondary: "secondary",
    success: "success",
    danger: "danger",
    link: "link"

};

const BUTTON_TOOLTIPS = {

    url: "Open URL",
    role: "Assign Role",
    copy: "Copy Text",
    message: "Send Message",
    custom: "Custom ID"

};

function createButtons(card, embed) {

    if (!embed.buttons.length) {
        return;
    }

    const container = document.createElement("div");

    container.className = "embed-buttons";

    embed.buttons.forEach(button => {

        const element = document.createElement("button");

        element.className = "discord-button";

        element.classList.add(

            BUTTON_STYLES[button.style] ??
            "secondary"

        );

        element.disabled = button.disabled;

        if (button.disabled) {

            element.style.opacity = ".55";
            element.style.cursor = "not-allowed";

        }

        const label = [];

        if ((button.emoji || "").trim()) {
            label.push(button.emoji);
        }

        label.push(

            (button.label || "").trim() || "Button"

        );

        element.textContent = label.join(" ");

        const tooltip =

            BUTTON_TOOLTIPS[button.action.type] ??
            "";

        if (tooltip) {

            element.title = button.action.value

                ? `${tooltip}\n${button.action.value}`

                : tooltip;

        }

        element.addEventListener("click", event => {

            event.preventDefault();

        });

        container.appendChild(element);

    });

    card.appendChild(container);

}

/*
=========================================
            REFRESH
=========================================
*/

window.renderPreview = renderPreview;