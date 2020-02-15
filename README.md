# news-scraper

## Description
This is a Node/Express app with a Mongo database that scrapes and stores album reviews from Pitchfork. The view was made using ejs.

## Usage
On the navbar there are two button items which will scrape new albums from the site and the second will clear the database.

Note that the database will not hold duplicate albums so usually two rapid calls to scrape the site will not yield new albums.

Each album review has a card and an individual comment section. The "comment" button will open the collapsable comment section simply add your comment and name and submit!

## Installation
To install either clone or fork this repo.

``` git clone git@github.com:jwmann13/news-scraper.git ```

## Authors

* __Jeffrey Mann__ - all contributions

## License

This project is licensed under the MIT License

Copyright 2019 Jeffrey Mann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.