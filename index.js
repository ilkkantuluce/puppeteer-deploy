const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
    timeout: 100000
  });
  const page = await browser.newPage();
  await page.goto("https://livecounts.io/instagram-live-follower-counter/gio");
  await page.waitForTimeout(3000)
  await page.screenshot({ path: 'fullpage.png', fullPage: true });

  const text = await page.$eval("body", (el) => el.innerHTML);
  
  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
