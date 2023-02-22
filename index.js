const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {


  const browser = await puppeteer.launch({
    headless:false, 
    defaultViewport:null,
    devtools: true,
    //args: ['--window-size=1920,1170','--window-position=0,0']
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1920,1080", "--window-position=1921,0"]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
  await page.goto("https://instagram.com/gio/");
  await page.waitForTimeout(2000)
  const text = await page.$eval("body", (el) => el.innerHTML);
  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
