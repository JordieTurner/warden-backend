const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1367638259097927711/ABDYok2ak0Kq65ANdmRMTxP5yUpTnALW-va3-FImzt5u9P4iymPh41qIgciZLHCDAT7I";

app.post("/webhook", async (req, res) => {
  const alert = req.body;

  try {
    await axios.post(DISCORD_WEBHOOK, {
      content: `Warden Alert: ${alert.signal} on ${alert.ticker} (${alert.timeframe})`
    });
    res.status(200).send("Sent to Discord");
  } catch (err) {
    console.error("Failed to send:", err.response?.data || err.message);
    res.status(500).send("Failed to send");
  }
});

app.get("/", (req, res) => res.send("Warden is running"));

app.listen(3000, () => console.log("Warden live on port 3000"));