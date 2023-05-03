const express = require("express");
 const request = require("request-promise");
const app = express();

const port = process.env.PORT || 3000;

const generateScraperUrl = (apikey)=> `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("JSM AMAZON DATA SCRAPER");
});

// get product detail - localhost:port/products/product_id, copy product_id from product's url from amazon, right after db/
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const {apikey} = req.query;

  try {
    const response = await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.com/dp/${productId}`);
    
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// get product reviews - localhost:port/products/product_id/reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const {apikey} = req.query;
  try {
    const response = await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.com/product-reviews/${productId}`);
    
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// get product offers - localhost:port/products/product_id/offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const {apikey} = req.query;
  try {
    const response = await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
    
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// get search result - localhost:port/search/product_name
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const {apikey} = req.query;
  try {
    const response = await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
    
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});




app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
