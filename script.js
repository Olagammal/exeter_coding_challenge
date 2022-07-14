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
    //FOR TESTING
    // let count = 0
    let finalEnglishCount = EnglishToCount
    let finalFileLines = []
    let allWords = Object.keys(EnglishToFrench)
    for (line of FileLineArray) {
        let FileWords = line.split(" ")
        let finalListOfWords = []
        for (word of FileWords) {
            let currentWord = word
            if (currentWord.includes('-')) {
                let tempWordArray = currentWord.split('-')
                let fullWord = currentWord
                for (word of tempWordArray) {
                    let testWord = word.replace(/[`~!@#$%^&*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '')
                    // console.log(testWord)
                    if (allWords.includes(testWord.toLowerCase())) {
                        let wordFormat = checkWordFormat(testWord)
                        let equivalentFrenchWord = EnglishToFrench[testWord.toLowerCase()]
                        switch (wordFormat) {
                            case 0:
                                fullWord = fullWord.replace(testWord, equivalentFrenchWord.toLowerCase())
                                break
                            case 1:
                                fullWord = fullWord.replace(testWord, capitalizeWord(equivalentFrenchWord))
                                break
                            case 2:
                                fullWord = fullWord.replace(testWord, equivalentFrenchWord.toUpperCase())
                                break
                            default:
                                break
                        }
                        // console.log(testWord, finalEnglishCount[testWord.toLowerCase()])
                        finalEnglishCount = increaseCount(testWord.toLowerCase(), finalEnglishCount)
                        // console.log(testWord, finalEnglishCount[testWord.toLowerCase()])
                    }
                }
                currentWord = fullWord
                // console.log(fullWord)
            }
            else {
                let testWord = currentWord.replace(/[`~!@#$%^&*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '')
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
                //test the not included cases
                // else {

                //     if (testWord.includes('WATCH')) {
                //         console.log('test', testWord)
                //         count++
                //         console.log("finalcount:", count)
                //     }

                // }
            }
            finalListOfWords.push(currentWord)
        }
        finalFileLines.push(finalListOfWords.join(" "))
    }
    return [finalFileLines, finalEnglishCount]
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

//write to csv file
const writeToCsv = (EnglishToFrench, EnglishToCount, path) => {
    const fileHeader = 'English Word,French Word,Frequency'
    fs.writeFileSync(path, fileHeader)
    for (english in EnglishToFrench) {
        let arrayToAppend = '\n' + english + ',' + EnglishToFrench[english] + ',' + EnglishToCount[english]
        // fs.appendFileSync(path, '\nabc')
        fs.appendFileSync(path, arrayToAppend)
    }
}

//write to txt file
const writeToTextFile = (arrayOfLines, path) => {
    let finalString = ""
    for (line of arrayOfLines) {
        finalString += line + '\n'
    }
    fs.writeFileSync(path, finalString)
}

//contains main flow
const main = async () => {
    let EnglishToFrench = await readCSVToObj('./input_files/french_dictionary.csv')
    let EnglishToCount = readTextFileToObj('./input_files/find_words.txt')
    let InputFileArray = readFileToArray('./input_files/t8.shakespeare.txt')
    let returnedValues = replaceWords(InputFileArray, EnglishToFrench, EnglishToCount)
    let outputFileLines = returnedValues[0]
    EnglishToCount = returnedValues[1]
    writeToCsv(EnglishToFrench, EnglishToCount, './output_files/frequency.csv')
    writeToTextFile(outputFileLines, './output_files/t8.shakespeare.translated.txt')
    // console.log(InputFileArray)

}


main()