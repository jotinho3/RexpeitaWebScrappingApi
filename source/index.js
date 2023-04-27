import puppeteer from "puppeteer-core";
import { executablePath } from "puppeteer-core";
import express, { response } from "express";


//missing bright data proxy server const auth

const app = express()


async function run() {
    let browser

    try { 
        

        // browser = await puppeteer.connect({
        //     browserWSEndpoint: `wss://${auth}@zproxy.lum-superproxy.io:9222`
        // })

        browser = await puppeteer.launch({
            headless: 'new',

            executablePath: executablePath('chrome'),
        })

        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(2*60*1000)

        await page.goto('https://www.rexpeita.com.br/produtos')



        

        // const body = await page.$('body')

        // const html = await page.evaluate(() => 
        //     document.documentElement.outerHTML)

        // console.log(html)


    //     const selector = '#mfilter-content-container'

    //     await page.waitForSelector(selector)
    //     const el = await page.$(selector)

    //     const text = await el.evaluate(e => e.innerHTML)

    //   console.log(text)

    

    await page.waitForSelector('.product-layout');

  // Extract the data for each product on the page
  const productData = await page.$$eval('.product-layout', products => {
    return products.map(product => {
      const name = product.querySelector('.product-title a').textContent.trim();
      const url = product.querySelector('.product-title a').href;
      const price = product.querySelector('.price').textContent.trim();
      const imageSrc = product.querySelector('img.image-main').src;
      const imageHoverSrc = product.querySelector('img.image-hover').src;
      return { name, url, price, imageSrc, imageHoverSrc };
    });
  });

  app.get("/", (req, res) => {
    return res.json(productData)
   
   })

  console.log(productData);

   

        
    } 
    catch (error) {
        console.log('scrapped failed', error)
        
    }
    finally {
        await browser?.close()
        
         
    }

}


    run();

app.listen(3333)

