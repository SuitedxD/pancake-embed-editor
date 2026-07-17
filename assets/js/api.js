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

        content: state.content?.trim() || undefined,

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

/*
=========================================
            MODAL
=========================================
*/

function openModal({

    title,

    message,

    copyText = ""

}){

    const overlay =
        document.getElementById("modal-overlay");

    document.getElementById("modal-title").textContent =
        title;

    document.getElementById("modal-message").textContent =
        message;

    const copy =
        document.getElementById("modal-copy");

    copy.style.display =
        copyText ? "inline-block" : "none";

    copy.onclick = async () => {

        try{

            await navigator.clipboard.writeText(copyText);

            copy.textContent = "Copied!";

        }

        catch{}

    };

    document.getElementById("modal-accept").onclick =
        closeModal;

    overlay.classList.remove("hidden");

}

function closeModal(){

    document
        .getElementById("modal-overlay")
        .classList.add("hidden");

    document
        .getElementById("modal-copy")
        .textContent = "Copy Code";

}

async function showGeneratedCode(data){

    openModal({

        title:"Embed Generated!",

        copyText:data.code,

        message:
`Your Web Embed has been generated successfully.

Embed Code:
${data.code}

Use it on your server with:

/web-embed-fire code:${data.code}

IMPORTANT NOTE: This code will expire in one hour or if you generate another embed.`

    });

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