# Stock Data API and Scraper

This application is a Node.js server built with Express.js for scraping and retrieving stock data from a canadian stock market website. It utilizes Axios for making HTTP requests and Cheerio for parsing HTML.

## Prerequisites

Before running this application locally or deploying it, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your/repository.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project-directory
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Running the Server

To start the server, run the following command:

```bash
npm start
```

By default, the server will run on port `8000`. You can specify a different port by setting the `PORT` environment variable.

### Endpoints

#### `/topdividend`

This endpoint retrieves data of Canadian stocks with the highest dividend yield. It returns an array of objects containing details such as stock title, symbol, price, volume, and dividend yield percentage.

Example:

```http
GET /topdividend
```

Response:

```json
{
  "main": "Stocks with the highest dividend yield data from Canada",
  "marketData": [
    {
      "title": "Stock Title",
      "symbol": "Stock Symbol",
      "price": "Stock Price",
      "volume": "Stock Volume",
      "dividend_yield_percentage": "Dividend Yield Percentage"
    },
    ...
  ]
}
```

## Error Handling

The server is equipped with error handling middleware to catch and log any errors that may occur during request processing. If an error occurs, the server will respond with a status code of `500` along with an error message.


---
## Developer

Please note that this API operates under a free license and is intended for non-commercial use only. Any commercial use of the data obtained through this API may be subject to legal restrictions.

This API is developed by Raj Kapadia. For any queries or support, please leave a comment.

© 2024 Raj Kapadia

---