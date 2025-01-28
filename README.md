#  Epicure Recipes

## Intro

Recently (as of this writing, 1/27/25), the company Epicure went bankrupt. They were known for easy meal solutions, beginning with seasoning packets and jars, followed by branching out into kitchen tools like microwave steamers, pepper grinders, and other useful stuff. But I digress.

When Epicure closed up shop, they _really_ closed up shop. Social media accounts were deleted. Their website was shut down completely. Of course this meant no more sales, but it also meant that the 1,500+ recipes on their website also went with it. I decided to resurrect them.

## Getting the Data

Using the [Wayback Machine](https://web.archive.org/), it is possible to view all of Epicure's recipes. Using the tool [Wayback Machine Downloader](https://github.com/hartator/wayback-machine-downloader), I downloaded every recipe. Then I wrote a script in [Puppeteer](https://pptr.dev/) to scrape recipe data off of those HTML files. (I do plan on making that source code available, but getting the recipes back online was the important part.) That scraped data, I transformed into easy-to-use JSON format.

## Bringing Recipes Back

Now for the relevant part: this project, the ReadMe for which you're, well, reading. I built a static site in [Gatsby](https://www.gatsbyjs.com/) and hosted on [Netlify](https://www.netlify.com/) to parse said JSON recipe data. All the important bits are reverse-engineered and brought over to this website: recipe pages, of course, including the ingredients, instructions, and helpful tips. I have excluded all the upselling data, since you can't buy Epicure products anymore.

I also noticed that each recipe has tagging data. Since there's always room for improvement, I built a tagging system. This information seemed to be hidden on Epicure's recipe pages, but I've brought it to the top of each recipe page to make discovery a little easier. I also built search functionality for not only the index, but also for each tag page.