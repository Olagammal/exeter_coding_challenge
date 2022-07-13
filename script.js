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

//convert file->array
const readFileToArray = (filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    // console.log(typeof fileContents)
    const contentArray = fileContents.split(/\r?\n/)
    return contentArray
    // return fileContents
}

const replaceWords = (FileLineArray, EnglishToFrench, EnglishToCount) => {
    let finalEnglishCount = EnglishToCount
    let finalFileLines = []
    let allWords = Object.keys(EnglishToFrench)
    for (line of FileLineArray) {
        let FileWords = line.split(" ")
        let finalListOfWords = []
        for (word of FileWords) {
            let currentWord = word
            let testWord = word.replace(/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '')
            if (allWords.includes(testWord.toLowerCase())) {
                let wordFormat = checkWordFormat(testWord)
                let equivalentFrenchWord = EnglishToFrench[testWord.toLowerCase()]
                switch (wordFormat) {
                    case 0:
                        currentWord = currentWord = currentWord.replace(testWord, equivalentFrenchWord.toLowerCase())
                        break
                    case 1:
                        currentWord = currentWord = currentWord.replace(testWord, capitalizeWord(equivalentFrenchWord))
                        break
                    case 2:
                        currentWord = currentWord = currentWord.replace(testWord, equivalentFrenchWord.toUpperCase())
                        break
                    default:
                        break
                }
                finalEnglishCount = increaseCount(testWord.toLowerCase(), finalEnglishCount)
            }
            finalListOfWords.push(currentWord)
        }
        finalFileLines.push(finalListOfWords.join(" "))
    }
    // console.log(finalFileLines)
    console.log(finalEnglishCount)
}

const checkWordFormat = (word) => {
    // 0 -> lowercase
    // 1 -> capitalized
    // 2 -> uppercase
    if (word === word.toLowerCase()) {
        return 0
    } else if (word === word.toUpperCase()) {
        return 2
    } else {
        return 1
    }
}

const capitalizeWord = (word) => {
    return word[0].toUpperCase() + word.substring(1)
}

const increaseCount = (word, hashMap) => {
    let count = parseInt(hashMap[word.toLowerCase()])
    hashMap[word.toLowerCase()] = count + 1
    return hashMap
}

//contains main flow
const main = async () => {
    const EnglishToFrench = await readCSVToObj('./input_files/french_dictionary.csv')
    const EnglishToCount = readTextFileToObj('./input_files/find_words.txt')
    const InputFileArray = readFileToArray('./input_files/t8.shakespeare.txt')
    replaceWords(InputFileArray, EnglishToFrench, EnglishToCount)
    // console.log(InputFileArray)

}


main()