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
  const text = await page.$eval("div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div > header > section > ul", (el) => el.innerHTML);
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
