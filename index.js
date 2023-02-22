const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://famoid.com/instagram-follower-count-checker/");
  await page.waitForTimeout(2000)


    await page.waitForSelector('[name="username"]')
    await page.type('[name="username"]', 'ebo')
    await page.click('#get_free_button')
    await page.waitForSelector('#count')
    const text = await page.$eval("#count", (el) => el.innerHTML);

  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
