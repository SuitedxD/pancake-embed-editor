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

async function generateEmbedCode() {

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

                    getState()

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

`Embed generated successfully.

Code

${data.code}

${data.reused
? "Existing code reused."
: "New code generated."}

The code has been copied to the clipboard.`

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