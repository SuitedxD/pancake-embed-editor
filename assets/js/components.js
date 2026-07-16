/*
=========================================
        Pancake Embed Editor
            Components
=========================================
*/

const fieldsContainer = document.getElementById("fields-container");
const buttonsContainer = document.getElementById("buttons-container");

/*
=========================================
            HELPERS
=========================================
*/

function escapeHTML(text = "") {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

}

/*
=========================================
        RENDER COMPONENTS
=========================================
*/

function renderComponents() {

    renderFields();
    renderButtons();

}

/*
=========================================
            FIELDS
=========================================
*/

function renderFields() {

    const embed = getEmbed();

    fieldsContainer.innerHTML = "";

    if (!embed.fields.length) {

        fieldsContainer.innerHTML = `
            <div class="empty-state">
                No fields added.
            </div>
        `;

        return;

    }

    embed.fields.forEach((field, index) => {

        fieldsContainer.appendChild(
            createField(field, index)
        );

    });

}

function createField(field, index) {

    const element = document.createElement("div");

    element.className = "field";

    element.innerHTML = `

        <div class="field-header">

            <div class="field-title">

                Field ${index + 1}

            </div>

            <button
                class="remove"
                type="button"
            >

                ✕

            </button>

        </div>

        <label>Name</label>

        <input
            class="field-name"
            type="text"
            value="${escapeHTML(field.name)}"
            placeholder="Field name"
        >

        <label>Value</label>

        <textarea
            class="field-value"
            placeholder="Field value"
        >${escapeHTML(field.value)}</textarea>

        <div class="field-inline">

            <input
                class="field-inline-checkbox"
                type="checkbox"
                ${field.inline ? "checked" : ""}
            >

            <label>Inline</label>

        </div>

    `;

    bindFieldEvents(element, index);

    return element;

}

/*
=========================================
        FIELD EVENTS
=========================================
*/

function bindFieldEvents(element, index) {

    const nameInput =
        element.querySelector(".field-name");

    const valueInput =
        element.querySelector(".field-value");

    const inlineInput =
        element.querySelector(".field-inline-checkbox");

    const removeFieldButton =
        element.querySelector(".remove");

    const update = () => {

        updateField(index, {

            name: nameInput.value,

            value: valueInput.value,

            inline: inlineInput.checked

        });

        renderPreview();

    };

    nameInput.addEventListener("input", update);

    valueInput.addEventListener("input", update);

    inlineInput.addEventListener("change", update);

    removeFieldButton.addEventListener("click", () => {
        removeField(index);
        renderComponents();
        renderPreview();
    });

}

/*
=========================================
        BUTTONS
=========================================
*/

function renderButtons() {

    const embed = getEmbed();

    buttonsContainer.innerHTML = "";

    if (!embed.buttons.length) {

        buttonsContainer.innerHTML = `
            <div class="empty-state">
                No buttons added.
            </div>
        `;

        return;

    }

    embed.buttons.forEach((button, index) => {

        buttonsContainer.appendChild(
            createButton(button, index)
        );

    });

}

function createButton(button, index) {

    const element = document.createElement("div");

    element.className = "component";

    element.innerHTML = `

        <div class="component-header">

            <div class="component-title">

                Button ${index + 1}

            </div>

            <button
                class="remove"
                type="button"
            >

                ✕

            </button>

        </div>

        <label>Label</label>

        <input
            class="button-label"
            type="text"
            maxlength="80"
            value="${escapeHTML(button.label)}"
        >

        <label>Emoji</label>

        <input
            class="button-emoji"
            type="text"
            maxlength="32"
            value="${escapeHTML(button.emoji)}"
        >

        <label>Style</label>

        <select class="button-style">

            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="danger">Danger</option>
            <option value="link">Link</option>

        </select>

        <label>Action</label>

        <select class="button-action">

            <option value="url">Open URL</option>
            <option value="role">Assign Role</option>
            <option value="copy">Copy Text</option>
            <option value="reply">Send Message</option>
            <option value="custom">Custom ID</option>

        </select>

        <label>Action Value</label>

        <input
            class="button-value"
            type="text"
            value="${escapeHTML(button.action.value)}"
        >

        <div class="field-inline">

            <input
                class="button-disabled"
                type="checkbox"
                ${button.disabled ? "checked" : ""}
            >

            <label>Disabled</label>

        </div>

    `;

    element.querySelector(".button-style").value = button.style;
    element.querySelector(".button-action").value = button.action.type;

    bindButtonEvents(element, index);

    return element;

}

/*
=========================================
        BUTTON EVENTS
=========================================
*/

function bindButtonEvents(element, index) {

    const labelInput =
        element.querySelector(".button-label");

    const emojiInput =
        element.querySelector(".button-emoji");

    const styleInput =
        element.querySelector(".button-style");

    const actionTypeInput =
        element.querySelector(".button-action");

    const actionValueInput =
        element.querySelector(".button-value");

    const disabledInput =
        element.querySelector(".button-disabled");

    const removeButtonElement =
        element.querySelector(".remove");

    const update = () => {

        updateButton(index, {

            label: labelInput.value,

            emoji: emojiInput.value,

            style: styleInput.value,

            disabled: disabledInput.checked,

            action: {

                type: actionTypeInput.value,

                value: actionValueInput.value

            }

        });

        renderPreview();

    };

    labelInput.addEventListener("input", update);

    emojiInput.addEventListener("input", update);

    styleInput.addEventListener("change", update);

    actionTypeInput.addEventListener("change", update);

    actionValueInput.addEventListener("input", update);

    disabledInput.addEventListener("change", update);

    removeButtonElement.addEventListener("click", () => {
        removeButton(index);
        renderComponents();
        renderPreview();
    });

}

/*
=========================================
            DEBUG
=========================================
*/

window.renderComponents = renderComponents;
window.renderFields = renderFields;
window.renderButtons = renderButtons;