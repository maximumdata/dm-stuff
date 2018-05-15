// const needle = require('needle');
// const cheerio = require('cheerio');
//
// const getStatue = () => {
//   return needle('get', 'http://warpwalkers.com/2017/statuegenerator/')
//   .then((res) => {
//     const $ = cheerio.load(res.body);
//     let desc = $('h3 .su-box-content').text().trim();
//     let trigger = $('#content > .su-box.su-box-style-default > .su-box-content.su-clearfix').first().text().trim();
//     return { desc, trigger };
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }
//
//
// export default {
//     getStatue
// };

const needle = require('needle');

const getStatue = () => {
    return needle('get', 'https://mikedettmer.com/dm/statue');
}

const getName = (race, sex) => {
    return needle('get', `https://mikedettmer.com/dm/name?race=${race}&sex=${sex}`)
}

export default {
    getStatue,
    getName
}
