// fileManager.js

const FILE_EXTENSION = ".pancakembed";
const FILE_VERSION = 1;
const APPLICATION_NAME = "Pancake Embed Editor";

function initializeFileManager() {

    const importButton =
        document.getElementById("import-embed");

    const exportButton =
        document.getElementById("export-embed");

    const fileInput =
        document.getElementById("import-file");

    importButton.addEventListener("click", () => {

        fileInput.click();

    });

    exportButton.addEventListener("click", exportProject);

    fileInput.addEventListener("change", event => {

        const file = event.target.files[0];

        if (file) {

            importProject(file);

        }

        event.target.value = "";

    });

}

function exportProject() {

    const project = {

        application: APPLICATION_NAME,

        version: FILE_VERSION,

        exportedAt: new Date().toISOString(),

        state: getState()

    };

    const blob = new Blob(

        [

            JSON.stringify(project, null, 4)

        ],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    const embed = getEmbed();

    const filename = embed.title.trim()

        ? sanitizeFilename(embed.title)

        : "embed";

    link.href = url;

    link.download = filename + FILE_EXTENSION;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}

function importProject(file) {

    const reader = new FileReader();

    reader.onload = event => {

        try {

            const project = JSON.parse(

                event.target.result

            );

            validateProject(project);

            setState(project.state);

            refreshEditor();

            alert("Project imported successfully.");

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    };

    reader.readAsText(file);

}

function validateProject(project) {

    if (!project) {

        throw new Error("Invalid file.");

    }

    if (project.application !== APPLICATION_NAME) {

        throw new Error(

            "This is not a Pancake Embed project."

        );

    }

    if (project.version !== FILE_VERSION) {

        throw new Error(

            "Unsupported project version."

        );

    }

    if (!project.state) {

        throw new Error(

            "Project state not found."

        );

    }

    if (!Array.isArray(project.state.embeds)) {

        throw new Error(

            "Invalid embed data."

        );

    }

}

function sanitizeFilename(name) {

    return name

        .trim()

        .replace(/[\\/:*?"<>|]/g, "")

        .replace(/\s+/g, "_")

        .substring(0, 80);

}

window.initializeFileManager = initializeFileManager;
window.exportProject = exportProject;
window.importProject = importProject;