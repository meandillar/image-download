const download = require('image-downloader')

const { find } = require('./helpers')
const data = require('./data')
let count = 0
let failed = []

function next () {
  count++
  if (count > data.length - 1) {
    console.log('FAILED IMAGES: ' + failed)
    process.exit(0)
  } else {
    init()
  }
}

function init () {
  let opts = {
    url: data[count],
    dest: 'images'
  }

  download.image(opts)
    .then(({ filename, image }) => {
      console.log('File saved to', filename)
      next()
    })
    .catch((err) => {
      console.error(err, url)
      failed.push(url)
      next()
    })
}

init()

// const url = 'https://www.sportsfuel.co.nz/blog/wp-content/uploads/2015/10/dumbbells-932426_1280.jpg'
// find(data, url, process.exit)
