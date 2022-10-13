export const utilService = {
  delay,
  getRandomInt,
  makeId,
  // getImageUrl
  getImgUrl,
  getImgUrlFilter,
  getImgUrlMap
};

function delay(ms = 1500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

// function getImageUrl(path, alt) {
//     try {
//         return new URL(`assets/${path}`, import.meta.url).href
//     } catch (err) {
//         if (alt) getImageUrl(alt);
//         return null;
//     }
// }

// function getImgUrl(file) {
//   const folders = ['app-filter-img', 'fonts', 'icons', 'images', 'maps', 'styles'];
//   folders.forEach(folder => {
//     let imgUrl = new URL(`../assets/${folder}/${file},`, import.meta.url);
//     return imgUrl;
//   });
// }
function getImgUrl(file) {
  const imgUrl = new URL(`../assets/images/${file}`, import.meta.url);
  return imgUrl;
}
function getImgUrlFilter(file) {
  const imgUrl = new URL(`../assets/app-filter-img/${file}`, import.meta.url);
  return imgUrl;
}
function getImgUrlMap(file) {
  const imgUrl = new URL(`../assets/maps/${file}`, import.meta.url);
  return imgUrl;
}
