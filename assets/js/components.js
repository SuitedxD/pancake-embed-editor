// components.js

const fieldsContainer = document.getElementById("fields-container");
const buttonsContainer = document.getElementById("buttons-container");

function escapeHTML(text = "") {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

}

function renderComponents() {

    renderFields();
    renderButtons();

}

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

        </select>

        <label>Action</label>

        <select class="button-action">

            <option value="url">Open URL</option>

            <option value="assign">
                Add Role
            </option>

            <option value="remove">
                Remove Role
            </option>

            <option value="toggle">
                Toggle Role
            </option>

            <option value="reply">
                Send Message
            </option>

            <option value="event">
                Custom Event (Advanced)
            </option>

        </select>

        <label class="button-value-label">
            Action Value
        </label>

        <input
            class="button-value"
            type="text"
            value="${escapeHTML(button.action.value)}"
        >

        <small class="button-help"></small>

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

    updateButtonActionUI(element);

    bindButtonEvents(element, index);

    return element;

}

function updateButtonActionUI(element){

    const action =
        element.querySelector(".button-action").value;

    const value =
        element.querySelector(".button-value");

    const label =
        element.querySelector(".button-value-label");

    const help =
        element.querySelector(".button-help");

    const style =
        element.querySelector(".button-style");

    switch(action){

        case "url":

            label.textContent = "URL";

            value.placeholder =
                "https://example.com";

            help.textContent =
                "Opens a website when clicked.";

            style.value = "link";

            style.disabled = true;

        break;

        case "assign":

            label.textContent = "Role ID";

            value.placeholder =
                "123456789012345678";

            help.textContent =
                "Gives this role to the user.";

            style.disabled = false;

        break;

        case "remove":

            label.textContent = "Role ID";

            value.placeholder =
                "123456789012345678";

            help.textContent =
                "Removes this role from the user.";

            style.disabled = false;

        break;

        case "toggle":

            label.textContent = "Role ID";

            value.placeholder =
                "123456789012345678";

            help.textContent =
                "Adds the role if missing, otherwise removes it.";

            style.disabled = false;

        break;

        case "reply":

            label.textContent = "Reply";

            value.placeholder =
                "Thanks for clicking!";

            help.textContent =
                "Sends an ephemeral message to the user.";

            style.disabled = false;

        break;

        case "event":

            label.textContent = "Event Name";

            value.placeholder =
                "verify_button";

            help.textContent =
                "Triggers a custom event from a plugin that requires a specific custom ID.";

            style.disabled = false;

        break;

    }

}

function bindButtonEvents(element, index) {

    const labelInput =
        element.querySelector(".button-label");

    const emojiInput =
        element.querySelector(".button-emoji");

    const styleInput =
        element.querySelector(".button-style");

    const actionTypeInput =
        element.querySelector(".button-action");
        updateButtonActionUI(element);

    const actionValueInput =
        element.querySelector(".button-value");

    const disabledInput =
        element.querySelector(".button-disabled");

    const removeButtonElement =
        element.querySelector(".remove");

    const update = () => {

        if(

            actionTypeInput.value === "url"

        ){

            styleInput.value = "link";

        }

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

    actionTypeInput.addEventListener("change", () => {
        updateButtonActionUI(element);
        update();
    });

    actionValueInput.addEventListener("input", update);

    disabledInput.addEventListener("change", update);

    removeButtonElement.addEventListener("click", () => {
        removeButton(index);
        renderComponents();
        renderPreview();
    });

}

window.renderComponents = renderComponents;
window.renderFields = renderFields;
window.renderButtons = renderButtons;