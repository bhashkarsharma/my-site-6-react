const fs = require('fs')
const path = require('path')
const gm = require('gray-matter')

const postLoc = './public/posts'
const outputLoc = './src/posts/index.js'
const arr = []

const read = (dir) =>
  fs.readdirSync(dir)
    .reduce((files, file) =>
      fs.statSync(path.join(dir, file)).isDirectory() ?
        files.concat(read(path.join(dir, file))) :
        files.concat(path.join(dir, file)),
      [])

read(postLoc).forEach(file => {
    const meta = gm(fs.readFileSync(file, 'utf8'))
    let fn = file.split(/[\/]+/).pop()
    fn = fn.split('.md')[0]
    meta.data['path'] = fn
    arr.push(meta.data)
})

arr.sort((a, b) => a.date > b.date ? -1 : b.date > a.date ? 1 : 0)

fs.writeFile(outputLoc, `export default ${JSON.stringify(arr, null, 4)}`, (err) => {
    if (err) {
        return console.error(err)
    }
    console.log('Posts have been indexed')
})
