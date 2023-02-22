const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/instagram", async (req, res) => {
  const myText = req.body.instagram;
  //console.log(myText);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(myText);
  await page.waitForTimeout(4000)
  const text = await page.$eval("section > main > div > header > section > ul > li:nth-child(2) > a > span", (el) => el.innerHTML);
  res.send(text);
  await browser.close();
});

app.post("/youtube", async (req, res) => {
  const myText = req.body.youtube;
  //console.log(myText);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(myText);
  await page.waitForTimeout(4000)
  const text = await page.$eval("#subscriber-count", (el) => el.innerHTML);
  res.send(text);
  await browser.close();
});

app.post("/tiktok", async (req, res) => {
  const myText = req.body.tiktok;
  //console.log(myText);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(myText);
  await page.waitForTimeout(4000)
  const text = await page.$eval(".tiktok-7k173h-H2CountInfos", (el) => el.innerHTML);
  res.send(text);
  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
