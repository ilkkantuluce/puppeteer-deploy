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
    args: [
      '--ignore-certificate-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--lang=ja,en-US;q=0.9,en;q=0.8',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      '--proxy-server=http://PROXYaddress:port'
    ],
  });
  const page = await browser.newPage();
  await page.goto(myText);
  await page.waitForTimeout(4000)
  const text = await page.$eval("body", (el) => el.innerHTML);
  res.send(text);
  await browser.close();
});

app.post("/facebook", async (req, res) => {
    const browser = await puppeteer.launch(
    { args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    const myText = req.body.facebook;
    console.log(myText);

    await page.goto(myText);
    //await page.waitForTimeout(4000)
    try {
      const followers = await page.$eval("div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6 > div.x6s0dn4.x78zum5.xdt5ytf.x193iq5w > div.x9f619.x193iq5w.x1talbiv.x1swvt13.x1pi30zi.x1y1aw1k > div > div.x9f619.x1n2onr6.x1ja2u2z.xeuugli.x1iyjqo2.xs83m0k.x1xmf6yo.x1emribx.x1e56ztr.x1i64zmx.xjl7jj.xnp8db0.x65f84u.x1xzczws > div.x7wzq59 > div:nth-child(1) > div > div > div > div.x1jx94hy.x78zum5.xdt5ytf > div:nth-child(4) > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.xamitd3.xsyo7zv.x16hj40l.x10b6aqq.x1yrsyyn > div > div > span > span:nth-child(1)", (el) => el.innerHTML);
      const totallikes = await page.$eval("div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6 > div.x6s0dn4.x78zum5.xdt5ytf.x193iq5w > div.x9f619.x193iq5w.x1talbiv.x1swvt13.x1pi30zi.x1y1aw1k > div > div.x9f619.x1n2onr6.x1ja2u2z.xeuugli.x1iyjqo2.xs83m0k.x1xmf6yo.x1emribx.x1e56ztr.x1i64zmx.xjl7jj.xnp8db0.x65f84u.x1xzczws > div.x7wzq59 > div:nth-child(1) > div > div > div > div.x1jx94hy.x78zum5.xdt5ytf > div:nth-child(5) > div > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.xamitd3.xsyo7zv.x16hj40l.x10b6aqq.x1yrsyyn > div > div > span > span", (el) => el.innerHTML);
      res.send(followers + " " + totallikes);
    } catch (error) {
      console.log("The element didn't appear.")
    }

});

app.post("/youtube", async (req, res) => {
  const myText = req.body.youtube;
  //console.log(myText);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(myText);
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
  const following = await page.$eval("strong[data-e2e='following-count']", (el) => el.innerHTML);
  const followers = await page.$eval("strong[data-e2e='followers-count']", (el) => el.innerHTML);
  res.send(following + " " + followers);
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
