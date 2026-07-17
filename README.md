![ ](https://i.imgur.com/V1VPIKx.png)

# Pancake Embed Editor

Welcome! The **Pancake Embed Editor** is a simple web application that allows you to create beautiful Discord embeds without writing JSON or touching code.

Once your embed is ready, the editor generates a unique code that can be used with the **Web Embed** plugin for Pancake (For example: `/web-embed-fire code:ABC123DE`), allowing you to send your embed directly from your Discord server.

Let's see how everything works!

# Getting Started

Before you begin, make sure the **Web Embed plugin** is installed on your server. You can install it quickly using `/install plugin: web_embed`. If you need more help or aren't familiar with the Pancake ecosystem, we recommend visiting the [Official Pancake Repository](https://github.com/SuitedxD/Pancake) or the [Pancake Plugin List](https://github.com/SuitedxD/Pancake/blob/main/docs/plugins-list.md), where you'll find useful information on how it works and how it relates to Web Embeds and the Pancake Embed Editor.

The first thing you'll need is to sign in with your Discord account.

The editor uses Discord authentication to identify you and generate embed codes associated with your account. Once you've logged in, you'll be taken directly to the editor.

From there, you can start building your message.

# Creating your Embed

The editor is divided into two main sections.

- **Editor** (left)
- **Preview** (right)

Everything you modify on the left will immediately update in the preview, allowing you to see almost exactly how your embed will look inside Discord.

## Message Content

The **Content** box is the normal Discord message that appears above the embed.

This part is completely optional.

## Embed

This is the main body of your Discord embed.

Here you can configure:

- Title
- Description
- Color

The color simply changes the vertical bar shown on the left side of the embed.

## Author

The author section appears at the very top of the embed.

You can configure:

- Author name
- Author icon

Both fields are optional.

## Footer

The footer appears at the bottom of the embed.

You can configure:

- Footer text
- Footer icon

This is commonly used for timestamps, credits or additional information.

## Images

Embeds support two different images.

### Thumbnail

A small image displayed in the upper-right corner.

### Image

A large image displayed at the bottom of the embed.

Both require a valid image URL.

# Fields

Fields allow you to organize information into separate blocks.

Each field contains:

- Name
- Value
- Inline option

### Inline

When **Inline** is disabled, each field occupies an entire row.

```
Field One

Field Two

Field Three
```

When **Inline** is enabled, Discord tries to place multiple fields on the same row.

```
Field One    Field Two    Field Three
```

This is useful for statistics, small pieces of information or compact layouts.

Discord supports up to **25 fields** per embed.

# Buttons

Buttons allow users to interact with your message.

Every button contains:

- Label
- Optional emoji
- Style
- Action
- Disabled state

Current button actions include:

- Open URL
- Assign Role
- Copy Text
- Send Message
- Custom ID

- **IMPORTANT NOTE:** The Web Embed plugin currently supports **URL buttons**. Other button types may be available in future versions or for other Pancake plugins.

# Preview

The preview updates automatically while you edit.

Although it closely resembles Discord, small visual differences may exist depending on future Discord updates.

The preview should always be considered a visual reference.

# Generate Embed Code

Once you're happy with your embed, simply press:

**Generate Embed Code**

The editor will:

- Validate your embed
- Upload it to the Pancake Embed service
- Generate a unique Embed Code
- Copy that code to your clipboard

The generated code looks similar to:

```
PANCAKE-AB12CD34-EMBED
```

This code is **not** your embed.

Instead, it's a temporary identifier that points to your stored embed data.

You can use it with the Pancake Web Embed plugin:

```
/web-embed-fire code: PANCAKE-AB12CD34-EMBED
```

The plugin will retrieve the stored embed and send it directly into your Discord channel.

- **IMPORTANT NOTE:** Generated codes expire after one hour or if you generate another Embed Code.

# Saving your Embed

If you want to keep working on an embed later, press:

**Save This Embed**

The editor will download a local `.pancakembed` file containing all your embed data.

Nothing is uploaded when using this feature.

# Importing an Embed

Already have a `.pancakembed` file?

Simply press:

**Import Embed File**

Select your file and the editor will restore everything automatically, including:

- Content
- Embed
- Fields
- Buttons
- Images
- Colors

This is the easiest way to continue editing an old project.

# Need to Edit Something?

Don't worry.

Nothing is permanent until you generate a new Embed Code.

Feel free to experiment with different layouts, colors and buttons until everything looks exactly how you want.

# See Also

- [Pancake Bot Repository](https://github.com/SuitedxD/Pancake)
- [Pancake Embed Editor](https://suitedxd.github.io/pancake-embed-editor/)
- [Pancake Plugin List](https://github.com/SuitedxD/Pancake/blob/main/docs/plugins-list.md)
- [Discord Server](https://discord.gg/SgXdeVaxuh)

By signing in or using the Pancake Embed Editor, you agree to the project's [Terms of Service](/TERMS.md) and [Privacy Policy](/PRIVACY.md). Pancake Embed Editor is developed and maintained by the Pancake Development Team. For legal notices, data requests or vulnerability reports please contact: pancakebot.team@gmail.com.