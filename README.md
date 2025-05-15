# 🎁 GiveawayManager

GiveawayManager is a simple, reliable, and easy-to-use Discord bot designed specifically for managing giveaways on Discord servers.  
Perfect for communities that want to run fair and engaging contests with automatic winner selection.

> ⚠️ Note: This bot is based on an older implementation and may require 2–3 minor updates to be fully production-ready.
It is currently functional and stable for basic giveaway use, but may not fully comply with the latest Discord API best practices.

---

## ✨ Features

- Slash command interface (`/giveaway`)
- Create giveaways with duration, number of winners, and custom description
- Automatically selects random winners when the giveaway ends
- Supports multiple concurrent giveaways
- Sends winner announcements and logs to a specific channel

---

## ⚙️ Prerequisites

- Node.js v16 or higher
- A registered Discord bot with the following enabled:
  - **MESSAGE CONTENT INTENT**
  - **SERVER MEMBERS INTENT**
  - **APPLICATION COMMANDS**

---

## 📦 Installation

### 1. Clone the repository:

```bash
git clone https://github.com/Crimeeee/GiveawayManager.git
cd GiveawayManager
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Create File Named .env and add the following environment variables:

```.env
TOKEN=your_discord_bot_token_here
CLIENT_ID=your_bot_application_client_id_here
GUILD_ID=your_guild_id_here
LOG_CHANNEL_ID=your_log_channel_id_here
```

---

## 🤖 Run the Bot

### 1. Once your .env is set up and dependencies are installed, deploy the slash commands to your server by running:

```
node deploy-commands.js
```

### 2. After this run the bot with:

```
node index.js
```

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).
