// embedValidator.js (front)

const DISCORD_LIMITS = {

    content: 2000,

    title: 256,

    description: 4096,

    fields: 25,

    fieldName: 256,

    fieldValue: 1024,

    footer: 2048,

    author: 256,

    buttons: 25,

    buttonLabel: 80,

    totalEmbed: 6000

};

function validateURL(value){

    if(!value){
        return true;
    }

    try {

        new URL(value);

        return true;

    } catch {

        return false;

    }

}

function validateEmbed(){

    const state = getState();

    const embed = state.embeds?.[0];

    if(!embed){

    return error(
        "Embed data is missing."
    );

    }

    if(

        (!state.content || state.content.trim() === "") &&

        (!embed.title || embed.title.trim() === "") &&

        (!embed.description || embed.description.trim() === "") &&

        (!embed.fields || embed.fields.length === 0) &&

        (!embed.image?.url || embed.image.url.trim() === "") &&

        (!embed.thumbnail?.url || embed.thumbnail.url.trim() === "")

    ){

        return error(
            "Embed cannot be completely empty."
        );

    }

    const hasContent =
        !!state.content?.trim();

    const hasEmbed =
        !!(
            embed.title?.trim() ||
            embed.description?.trim() ||
            embed.fields?.length ||
            embed.image?.url ||
            embed.thumbnail?.url ||
            embed.author?.name ||
            embed.footer?.text
        );

    if (!hasContent && !hasEmbed){

        return error(
            "Discord requires message content or at least one embed."
        );

    }

    if(
        (state.content?.length || 0) >
        DISCORD_LIMITS.content
    ){
        return error(
            "Message content exceeds Discord's 2000 character limit."
        );

    }

    if(
        (embed.title?.length || 0) >
        DISCORD_LIMITS.title
    ){

    return error(
        "Embed title exceeds Discord's 256 character limit."
    );

    }

    if(
        (embed.description?.length || 0) >
        DISCORD_LIMITS.description
    ){

        return error(
            "Embed description exceeds Discord's 4096 character limit."
        );

    }

    if(
        (embed.author?.name?.length || 0) >
        DISCORD_LIMITS.author
    ){

        return error(
            "Author name exceeds Discord's 256 character limit."
        );

    }


    if(
        embed.author?.icon_url &&
        !validateURL(embed.author.icon_url)
    ){

        return error(
            "Author icon URL is invalid."
        );

    }

    if(
        (embed.footer?.text?.length || 0) >
        DISCORD_LIMITS.footer
    ){

        return error(
            "Footer exceeds Discord's 2048 character limit."
        );

    }


    if(
        embed.footer?.icon_url &&
        !validateURL(embed.footer.icon_url)
    ){

        return error(
            "Footer icon URL is invalid."
        );

    }

if(
    embed.image?.url &&
    !validateURL(embed.image.url)
){

    return error(
        "Image URL is invalid."
    );

}


if(
    embed.thumbnail?.url &&
    !validateURL(embed.thumbnail.url)
){

    return error(
        "Thumbnail URL is invalid."
    );

}


    if(
        (embed.fields?.length || 0) >
        DISCORD_LIMITS.fields
    ){

        return error(
            "Discord allows maximum 25 fields."
        );

    }


    for(const field of (embed.fields || [])){

        if(
            !field?.name?.trim() ||
            !field?.value?.trim()
            ){

            return error(
                "Fields require name and value."
            );

        }


        if(
            (field.name?.length || 0) >
            DISCORD_LIMITS.fieldName
        ){

            return error(
                "Field name exceeds Discord's 256 character limit."
            );

        }


        if(
            (field.value?.length || 0) >
            DISCORD_LIMITS.fieldValue
        ){

            return error(
                "Field value exceeds Discord's 1024 character limit."
            );

        }

    }

if(
    (embed.buttons?.length || 0) >
    DISCORD_LIMITS.buttons
){

    return error(
        "Discord allows maximum 25 buttons."
    );

}


    for(const button of (embed.buttons || [])){

        if(!button.action){

            return error(
                "Button action is required."
            );

        }

        if(!button.label?.trim()){

            return error(
                "Buttons require a label."
            );

        }


        if(
            (button.label?.length || 0) >
            DISCORD_LIMITS.buttonLabel
        ){

            return error(
                "Button label exceeds Discord's 80 character limit."
            );

        }

        if (

            button.style === "link" &&

            button.action.type !== "url"

        ){

            return error(
                "Link buttons must use the URL action."
            );

        }

        if (

            button.style !== "link" &&

            button.action.type === "url"

        ){

            return error(
                "URL buttons must use the Link style."
            );

        }

        if(button.action?.type === "url"){


            if(!button.action.value?.trim()){

                return error(
                    "URL buttons require a URL."
                );

            }


            if(!validateURL(button.action.value)){

                return error(
                    "Invalid button URL."
                );

            }

        }

        if (["assign","remove","toggle"].includes(button.action.type)){

            if(

                !/^\d{17,20}$/.test(button.action.value)

            ){

                return error(
                    "Role ID is invalid."
                );

            }

        }

        if (button.action.type === "event"){

            if(

                !button.action.value.trim()

            ){

                return error(
                    "Event name cannot be empty."
                );

            }

            if(

                button.action.value.length > 100

            ){

                return error(
                    "Event name is too long."
                );

            }

        }


        
    }

const total =

    (state.content?.length || 0) +

    (embed.title?.length || 0) +

    (embed.description?.length || 0) +

    (embed.footer?.text?.length || 0) +

    (embed.author?.name?.length || 0) +

    (embed.fields || [])
    .reduce(
        (sum,field)=>
            sum +
            (field.name?.length || 0) +
            (field.value?.length || 0),
        0
    );

if(total > DISCORD_LIMITS.totalEmbed){

    return error(
        "Embed exceeds Discord's total 6000 character limit."
    );

}


return {

    valid:true

};


}


function error(message){

    return {

        valid:false,

        message

    };

}

window.validateEmbed = validateEmbed;