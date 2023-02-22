const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://instagram.com/ebo");
  await page.waitForTimeout(2000)
  const text = await page.$eval("h2", (el) => el.innerHTML);
  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
