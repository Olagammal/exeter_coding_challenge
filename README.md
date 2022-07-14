# exeter_coding_challenge
This is a programming challenge given by exeter premedia services as a part of the hiring process

## GOAL
Given a text file, we need to replace all possible words in English to French using any programming language of choice

## TECH-STACK USED
I have used javascript to solve the problem.

## APPROACH USED
1. Have created 2 hashmaps :
 - One with english words as key and french equivalent as value.
 - Other one with english words as key and the no of times it was replaced as value.
2. Read the [find_words.txt](./input_files/find_words.txt) to create the hashmap with count and initialized the count to 0 and created an array with all the english words.
3. Read the [french_dictionary.csv](./input_files/french_dictionary.csv) to create hashmap with english and french equivalent values
4. Read the [main input file](./input_files/t8.shakespeare.txt) and broke down it into individual words.
Checked if the word has a french equivalent.
If it had a french equivalent then the french equivalent was replaced by changing to the corresponding case and without altering the special characters.
The count was increased if the word was replaced.
NOTE: Derived words were not replaced to make the system meaningful.
5. The final translated string was written to the [output file](./output_files/t8.shakespeare.translated.txt)
6. The english words,french equivalent and the count value from the hashmaps were written to the file [frequency.csv](./output_files/frequency.csv) with headers English Word,French Word,Frequency.
7. The performance of the system in terms of memory and time take was written to the file [performance.txt](./output_files/performance.txt).
