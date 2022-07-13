const fs = require('fs')
const readline = require('readline')

//create english->count hashmap
const readTextFileToObj = (filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const contentArray = fileContents.split(/\r?\n/)
    const hashMap = {}
    for (word of contentArray) {
        hashMap[word] = 0
    }
    return hashMap
}

//create english->french hashmap
const readCSVToObj = async (filePath) => {
    const stream = fs.createReadStream(filePath)
    const readAllLines = readline.createInterface({ input: stream })
    const hashMap = {}
    for await (const line of readAllLines) {
        abc = line.split(',')
        hashMap[abc[0]] = abc[1]
    }
    return hashMap
}

//contains main flow
const main = async () => {
    const EnglishToFrench = await readCSVToObj('./input_files/french_dictionary.csv')
    const EnglishToCount = readTextFileToObj('./input_files/find_words.txt')

}


main()