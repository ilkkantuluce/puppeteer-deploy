const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://livecounts.io/instagram-live-follower-counter/gio");
  await page.waitForTimeout(2000)
  const text = await page.$eval("#__next > div > div.px-3.px-0.max-w-4xl.xl\:max-w-5xl.m-auto > div:nth-child(2) > div > div", (el) => el.innerHTML);
  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
