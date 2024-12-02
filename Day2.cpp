#include <bits/stdc++.h>

using namespace std;

bool inRange(int n)
{
    return abs(n) >= 1 && abs(n) <= 3;
}

int main()
{
    ios::sync_with_stdio(false);
    ifstream infile("input.txt");

    vector<vector<int>> rows;

    string line;
    while (getline(infile, line))
    {
        vector<int> row;
        istringstream iss(line);
        int number;
        while (iss >> number)
        {
            row.push_back(number);
        }
        rows.push_back(row);
    }

    int res = 0;
    for (auto row : rows)
    {
        if (row.size() <= 1)
        {
            res++;
            break;
        }

        bool wildcardIncUsed = false; // set true for part 1
        bool wildcardDecUsed = false;

        int diff = row[1] - row[0];
        bool isIncreasingValid = diff > 0 && inRange(diff);
        bool isDecreasingValid = diff < 0 && inRange(diff);

        for (int j = 2; j < row.size(); j++)
        {
            // a = -0, b = -1, c = -2, d = -3
            int ab = row[j] - row[j - 1];
            int ac = row[j] - row[j - 2];
            int bd = row[j - 1] - row[j - 3];

            if (isIncreasingValid)
            {
                isIncreasingValid = ab > 0 && inRange(ab);
            }
            else if (!wildcardIncUsed)
            { // try to keep increasing monotonicity with respect to a
                wildcardIncUsed = true;
                if (ab > 0 && inRange(ab) && (j == 2 || (bd > 0 && inRange(bd)))) // try remove c
                    isIncreasingValid = true;
                else if (ac > 0 && inRange(ac)) // else try remove b
                    isIncreasingValid = true;
            }

            if (isDecreasingValid)
            {
                isDecreasingValid = ab < 0 && inRange(ab);
            }
            else if (!wildcardDecUsed)
            { // try to keep decreasing monotonicity with respect to a
                wildcardDecUsed = true;
                if (ab < 0 && inRange(ab) && (j == 2 || (bd < 0 && inRange(bd)))) // try remove c
                    isDecreasingValid = true;
                else if (ac < 0 && inRange(ac)) // else try remove b
                    isDecreasingValid = true;
            }
        }
        if (isIncreasingValid || !wildcardIncUsed || isDecreasingValid || !wildcardDecUsed)
            res++;
    }

    cout << res;
    infile.close();

    return 0;
}
