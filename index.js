const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
    headless:false, 
    defaultViewport:null,
    devtools: true,
    //args: ['--window-size=1920,1170','--window-position=0,0']
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1920,1080", "--window-position=1921,0"]
  });
  const page = await browser.newPage();
  await page.goto("https://instagram.com/gio/");
  await page.waitForTimeout(2000)
  const text = await page.$eval("body", (el) => el.innerHTML);
  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
