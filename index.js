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
  (async () => {
    const browser = await puppeteer.launch(
    { args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    const myText = req.body.facebook;
    console.log(myText);
    try {

        page.on('error', msg => {
          throw msg ;
        });

        await page.goto(myText);
        //await page.waitForTimeout(4000)
        const followers = await page.$eval("div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x78zum5.xdt5ytf.x1t2pt76 > div > div > div:nth-child(1) > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.xl56j7k.x1qjc9v5.xozqiw3.x1q0g3np.x1l90r2v.x1ve1bff > div > div > div > div.x78zum5.x15sbx0n.x5oxk1f.x1jxijyj.xym1h4x.xuy2c7u.x1ltux0g.xc9uqle > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.x1cy8zhl.xyamay9 > span > a:nth-child(1)", (el) => el.innerHTML);
        const totallikes = await page.$eval("div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x78zum5.xdt5ytf.x1t2pt76 > div > div > div:nth-child(1) > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.xl56j7k.x1qjc9v5.xozqiw3.x1q0g3np.x1l90r2v.x1ve1bff > div > div > div > div.x78zum5.x15sbx0n.x5oxk1f.x1jxijyj.xym1h4x.xuy2c7u.x1ltux0g.xc9uqle > div > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.x1cy8zhl.xyamay9 > span > a:nth-child(2)", (el) => el.innerHTML);
        res.send(followers + " " + totallikes);
        

    }catch (error) {
      throw error;
    }finally{
      await browser.close();
    }
  })().catch((error) => {
    console.log(error);
  });
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
