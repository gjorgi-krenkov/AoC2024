import System.IO
import Data.List (sort)

parseTuples :: String -> [(Int, Int)]
parseTuples content = 
    map (\line -> let [a, b] = map read (words line) in (a, b)) (lines content)

sumOfAbsoluteDifferences :: [Int] -> [Int] -> Int
sumOfAbsoluteDifferences a b = sum [abs (x - y) | (x, y) <- zip a b]

countOccurrences :: [Int] -> [Int] -> Int
countOccurrences a b = sum (map (\x -> x * length (filter (== x) b)) a)

main :: IO ()
main = do
    content <- readFile "input.txt"
    let tuples = parseTuples content

    let aList = sort [a | (a, _) <- tuples]
    let bList = sort [b | (_, b) <- tuples]

    let result1 = sumOfAbsoluteDifferences aList bList
    let result2 = countOccurrences aList bList

    print result1
    print result2
