/*
=========================================
        Pancake Embed Editor
            State Manager
=========================================
*/

const DEFAULT_STATE = {
    content: "",
    embeds: [
        {
            title: "",
            description: "",
            color: "#5865F2",

            author: {
                name: "",
                icon_url: ""
            },

            footer: {
                text: "",
                icon_url: ""
            },

            thumbnail: {
                url: ""
            },

            image: {
                url: ""
            },

            fields: [],

            buttons: []
        }
    ]
};

let state = clone(DEFAULT_STATE);

/*
=========================================
            HELPERS
=========================================
*/

function clone(value){

    if(window.structuredClone){

        return structuredClone(value);

    }

    return JSON.parse(

        JSON.stringify(value)

    );

}

function getEmbed() {
    return state.embeds[0];
}

/*
=========================================
            STATE
=========================================
*/

function getState() {
    return clone(state);
}

function setState(newState) {
    state = clone(newState);
}

function resetState() {
    state = clone(DEFAULT_STATE);
}

/*
=========================================
        SIMPLE SETTERS
=========================================
*/

function setContent(value) {
    state.content = value;
}

function setTitle(value) {
    getEmbed().title = value;
}

function setDescription(value) {
    getEmbed().description = value;
}

function setColor(value) {
    getEmbed().color = value;
}

function setAuthorName(value) {
    getEmbed().author.name = value;
}

function setAuthorIcon(value) {
    getEmbed().author.icon_url = value;
}

function setFooterText(value) {
    getEmbed().footer.text = value;
}

function setFooterIcon(value) {
    getEmbed().footer.icon_url = value;
}

function setThumbnail(value) {
    getEmbed().thumbnail.url = value;
}

function setImage(value) {
    getEmbed().image.url = value;
}

/*
=========================================
            FIELDS
=========================================
*/

function addField() {

    getEmbed().fields.push({
        name: "",
        value: "",
        inline: false
    });

}

function updateField(index, field) {

    if (!getEmbed().fields[index]) {
        return;
    }

    getEmbed().fields[index] = clone(field);

}

function removeField(index) {

    if (!getEmbed().fields[index]) {
        return;
    }

    getEmbed().fields.splice(index, 1);

}

/*
=========================================
            BUTTONS
=========================================
*/

function addButton() {

    getEmbed().buttons.push({

        label: "",
        emoji: "",
        style: "primary",

        disabled: false,

        action: {
            type: "url",
            value: ""
        }

    });

}

function updateButton(index, button) {

    if (!getEmbed().buttons[index]) {
        return;
    }

    getEmbed().buttons[index] = clone(button);

}

function removeButton(index) {

    if (!getEmbed().buttons[index]) {
        return;
    }

    getEmbed().buttons.splice(index, 1);

}

/*
=========================================
            DEBUG
=========================================
*/

window.getState = getState;
window.getEmbed = getEmbed;
window.setState = setState;
window.resetState = resetState;

window.setContent = setContent;
window.setTitle = setTitle;
window.setDescription = setDescription;
window.setColor = setColor;

window.setAuthorName = setAuthorName;
window.setAuthorIcon = setAuthorIcon;

window.setFooterText = setFooterText;
window.setFooterIcon = setFooterIcon;

window.setThumbnail = setThumbnail;
window.setImage = setImage;

window.addField = addField;
window.updateField = updateField;
window.removeField = removeField;

window.addButton = addButton;
window.updateButton = updateButton;
window.removeButton = removeButton;