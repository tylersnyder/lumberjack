function main() {
  console.log('es2015 goodies, yo')

  getPages().then(pages => {
    pages.map(page => {
      console.log(`page number ${page}`)
    })
  })
}

function getPages() {
  return new Promise((resolve, reject) => {
    resolve([1, 2, 3])
  })
}

main()