const puppeteer = require("puppeteer");
const express = require("express");

const app = express();

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/public/index.html");

  res.send(`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<div class="container">
			<div class="card">
				<div class="card-body">
        <form action="/" method="POST">
        <div class="input-wrap">
            <input type="name" id="youtube" name="youtube" value="https://www.youtube.com/@test">
            <button type="submit" class="button">get</button>
        </div>
    </form>
				</div>
			</div>
		</div>
	`);
});

app.post("/", async (req, res) => {

  const username2 = req.body.youtube;
  console.log("Password: " + username2);

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
