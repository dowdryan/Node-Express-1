const fs = require('fs')
const axios = require('axios')
const { URL } = require('url')
const path = require('path')

const filename = process.argv[2] // Print contents of given text file.
fs.readFile(`${filename}`, 'utf8', async (err, data) => {
  try {
    if (err) {
      throw err
    }
    const urls = data.split('\n')
    console.log(urls)
    for (const urlString of urls) {
      const url = new URL(urlString)
      const hostname = url.hostname
      const filePath = `url_files/${hostname}.txt`
        try {
          const response = await axios.get(urlString)
          const fileData = response.data
          if (fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, fileData)
            console.log(`Updated ${hostname}`)
          } else {
            fs.writeFileSync(filePath, fileData)
            console.log(`Created ${hostname}`)
          }
        } catch (error) {
          console.error(`Error fetching ${urlString}: ${error.message}`)
        }
      }
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})