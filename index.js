const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const scrapeLinks = [
  {
    name: "Canadian Top Dividend stock data ",
    address: "https://money.tmx.com/stock-list/TOP_DIVIDEND",
  },
  {
    name: "Canadian stock-list data ",
    address: "https://money.tmx.com/stock-lists",
    base: "https://money.tmx.com",
  },
];

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/index.html");
    // res.send(html);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

const topDividendData = async () => {
  try {
    const response = await axios.get(scrapeLinks[0].address);
    const html = response.data;
    const $ = cheerio.load(html);
    const marketData = [];

    $("tbody > tr").each((i, element) => {
      const title = $(element)
        .find(".StockListTable__CompanyName-sc-c64p2n-1")
        .text()
        .trim();
      const symbol = $(element)
        .find(".Symbol__StyledLink-sc-17pywdc-2")
        .text()
        .trim();
      const price = $(element)
        .find(".RightAlign__Wrapper-sc-16y4669-0")
        .eq(0)
        .text()
        .trim();
      const volume = $(element)
        .find(".RightAlign__Wrapper-sc-16y4669-0")
        .eq(1)
        .text()
        .trim();
      const dividend_yield_percentage = $(element)
        .find(".RightAlign__Wrapper-sc-16y4669-0")
        .eq(2)
        .text()
        .trim();

      marketData.push({
        title: title,
        symbol: symbol,
        price: price,
        volume: volume,
        dividend_yield_percentage: dividend_yield_percentage,
      });
    });
    let newData = {
      main: "Stocks with the highest dividend yield data from Canada",
      marketData,
    };
    return newData;
  } catch (error) {
    console.error("Error:", error);
  }
};

const scrapeStockListData = async () => {
  try {
    const response = await axios.get(scrapeLinks[1].address);
    const html = response.data;
    const $ = cheerio.load(html);
    const blogData = [];

    $("div.StockLists__OtherStocklists-sc-k3e2t6-15 a").each((i, element) => {
      const $a = $(element);
      const halfhref = $a.attr("href");
      const image = $a.find("img").attr("src");
      const name = $a.find(".Stocklist__Header-sc-vt2vpi-3").text().trim();
      const description = $a.find(".Stocklist__Desc-sc-vt2vpi-6").text().trim();
      const count = $a.find(".Stocklist__Count-sc-vt2vpi-5").text().trim();
      const link = scrapeLinks[1].base + halfhref;
      blogData.push({
        link,
        image,
        name,
        description,
        count,
      });
    });
    let newData = { main: "This is a stock-list data from Canada", blogData };
    return newData;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

app.get("/stock-list", async (req, res) => {
  try {
    const blogData = await scrapeStockListData();
    res.json(blogData);
    // console.log(blogData.blogData.length);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/topdividend", async (req, res) => {
  try {
    const marketData = await topDividendData();
    res.json(marketData);
    // console.log(marketData.marketData.length);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
