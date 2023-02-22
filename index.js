const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://livecounts.io/instagram-live-follower-counter/gio");
  await page.waitForTimeout(4000)
  const text = await page.$eval(".odometer.odometer-auto-theme", (el) => el.innerHTML);
  await page.waitForTimeout(4000)
  await page.screenshot({ path: 'fullpage.png', fullPage: true });

  const screenshot = await page.screenshot({ encoding: 'binary' });

  
  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
