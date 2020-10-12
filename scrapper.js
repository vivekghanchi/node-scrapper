const request = require('request-promise');
const cheerio = require('cheerio');
const URL = require('url');

let scrapper = async function(req, res) {
    try {
        const uri = 'https://medium.com/';
        let tempArray = [];
        const html = await request.get(uri);
        let $ = cheerio.load(html.toString());

        $("a").each((i, link) => {
            let allHref = URL.parse($(link).attr("href"), true);
            let qArr = Object.keys(allHref['query']);
            let url = allHref['href'].split('?')[0];
            tempArray.push({ url, qArr });
        });

        let urlsArray = tempArray.map(x => x['url']);
        let urlsSet = new Set(urlsArray);
        let arrObj = [...urlsSet].map(url => {
            return {
                urls: url,
                totalRefs: tempArray.filter(item => item['url'] === url).length,
                params: tempArray.find(item => item['url'] === url).qArr,
            }
        });

        let mongoRes = await mongoCon.collection.insertMany(arrObj);
        res.status(200).jsonp({ "URL_count": mongoRes['result']['n'], "scrapData": mongoRes['ops'] });
    } catch (err) {
        console.log(err);
        res.status(500).jsonp({ 'message': 'Internal server error', 'err': err });
    }
}

module.exports = scrapper;