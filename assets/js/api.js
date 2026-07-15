/*
=========================================
        Pancake Embed Editor
                API
=========================================
*/

const API_BASE = "https://pancake-embed-api.onrender.com/api/v1/embed";

/*
=========================================
        AUTH TOKEN
=========================================
*/

function getToken() {

    return window.getAuthToken
        ? window.getAuthToken()
        : null;

}

/*
=========================================
        API REQUEST
=========================================
*/

async function apiRequest(endpoint, options = {}) {

    const token = getToken();

    const headers = {

        ...(options.headers || {})

    };

    if (!(options.body instanceof FormData)) {

        headers["Content-Type"] = "application/json";

    }

    if (token) {

        headers.Authorization = `Bearer ${token}`;

    }

    const response = await fetch(

        `${API_BASE}${endpoint}`,

        {

            ...options,

            headers

        }

    );

    return await parseResponse(response);

}

/*
=========================================
        GENERATE EMBED
=========================================
*/

function prepareEmbedPayload(){

    const state = getState();

    const embed = state.embeds[0];


    return {

        content: state.content,

        embeds:[
            {

                title: embed.title,

                description: embed.description,

                color: embed.color,

                author: embed.author,

                footer: embed.footer,

                thumbnail: embed.thumbnail,

                image: embed.image,

                fields: embed.fields

            }
        ],


        components:

            embed.buttons.map(button => ({

                label: button.label,

                emoji: button.emoji,

                style: button.style,

                disabled: button.disabled,

                action: button.action

            }))

    };

}

async function generateEmbedCode() {

    const payload = prepareEmbedPayload();

    const validation = validateEmbed(payload);


    if(!validation.valid){

        alert(validation.message);

        return;

    }

    const button = document.getElementById("generate");

    const originalText = button.textContent;

    button.disabled = true;

    button.textContent = "Generating...";

    try {

        const data = await apiRequest(

            "/generate",

            {

                method: "POST",

                body: JSON.stringify(
                    prepareEmbedPayload()
                )

            }

        );

        showGeneratedCode(data);

        return data;

    }

    catch (error) {

        console.error(error);

        alert(error.message);

        return null;

    }

    finally {

        button.disabled = false;

        button.textContent = originalText;

    }

}

/*
=========================================
            GET EMBED
=========================================
*/

async function fetchEmbed(code) {

    return await apiRequest(

        `/${encodeURIComponent(code)}`,

        {

            method: "GET"

        }

    );

}

/*
=========================================
        DELETE EMBED
=========================================
*/

async function deleteEmbed(code) {

    return await apiRequest(

        `/${encodeURIComponent(code)}`,

        {

            method: "DELETE"

        }

    );

}

/*
=========================================
        RESPONSE PARSER
=========================================
*/

async function parseResponse(response) {

    let data = {};

    try {

        data = await response.json();

    }

    catch {

        throw new Error(

            "Invalid server response."

        );

    }

    if (!response.ok) {

        throw new Error(

            data.error ||

            data.message ||

            "Unexpected server error."

        );

    }

    return data;

}

/*
=========================================
        GENERATED CODE
=========================================
*/

async function showGeneratedCode(data) {

    try {

        await navigator.clipboard.writeText(

            data.code

        );

    }

    catch {

        console.warn(

            "Clipboard unavailable."

        );

    }

alert(
`
Embed code generated successfully.

Code: ${data.code}

This code will expire in one hour.
`
);

}

/*
=========================================
        HEALTH CHECK
=========================================
*/

async function pingAPI() {

    try {

        const response = await fetch(

            "https://pancake-embed-api.onrender.com/"

        );

        return response.ok;

    }

    catch {

        return false;

    }

}

/*
=========================================
            DEBUG
=========================================
*/

window.generateEmbedCode = generateEmbedCode;

window.fetchEmbed = fetchEmbed;

window.deleteEmbed = deleteEmbed;

window.pingAPI = pingAPI;