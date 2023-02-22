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
  console.log(myText);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(myText);
  await page.waitForTimeout(4000)
  const text = await page.$eval("body", (el) => el.innerHTML);
  res.send(text);
  await browser.close();
});

app.post("/facebook", async (req, res) => {
  const myText = req.body.facebook;
  console.log(myText);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(myText);
  await page.waitForTimeout(4000)
  const text = await page.$eval("div.x9f619.x2lah0s.x1nhvcw1.x1qjc9v5.xozqiw3.x1q0g3np.x78zum5.x1iyjqo2.x1t2pt76.x1n2onr6.x1ja2u2z.x1h6rjhl > div.x9f619.x1n2onr6.x1ja2u2z.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x78zum5.x1t2pt76 > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6 > div.x6s0dn4.x78zum5.xdt5ytf.x193iq5w > div > div > div:nth-child(1) > div > div:nth-child(3) > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.xamitd3.xsyo7zv.x16hj40l.x10b6aqq.x1yrsyyn > div > div > span > span", (el) => el.innerHTML);
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


app.post("/twitter", async (req, res) => {
  const myText = req.body.twitter;
  console.log(myText);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(myText);
  const text = await page.$eval("body", (el) => el.innerHTML);
  res.send(text);
  await browser.close();
});



app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
