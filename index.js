const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", async (req, res) => {
  var myText = req.query.youtube; //mytext is the name of your input box 
  console.log(myText);
  
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com/@test");
  await page.waitForTimeout(4000)
  const text = await page.$eval("#subscriber-count", (el) => el.innerHTML);
  //await page.screenshot({ path: 'fullpage.png', fullPage: true });

  res.send(text);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
