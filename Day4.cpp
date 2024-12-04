#include <bits/stdc++.h>

using namespace std;

int X, Y;
bool inRange(int x, int y)
{
    return 0 <= x && x < X && 0 <= y && y < Y;
}

int main()
{
    ios::sync_with_stdio(false);
    ifstream infile("input.txt");

    vector<string> rows;

    string line;
    while (getline(infile, line))
    {
        Y = line.size();
        rows.push_back(line);
    }
    X = rows.size();

    int res = 0;

    string searchedWord = "MAS";
    int midPoint = searchedWord.size() / 2;

    vector<pair<int, int>> dirs = {
        {1, 1},
        {1, -1},
        {-1, -1},
        {-1, 1}};

    bool originCnt[X][Y];
    memset(originCnt, 0, X * Y);

    for (int i = 0; i < X; i++)
    {
        for (int j = 0; j < Y; j++)
        {
            if (rows[i][j] != searchedWord[0])
                continue;
            for (auto dir : dirs)
            {
                int x = i, y = j;
                bool valid = true;
                for (auto letter : searchedWord)
                {
                    if (!inRange(x, y) || letter != rows[x][y])
                    {
                        valid = false;
                        break;
                    }
                    x += dir.first;
                    y += dir.second;
                }

                if (valid)
                {
                    if (originCnt[i + midPoint * dir.first][j + midPoint * dir.second])
                        res++;
                    originCnt[i + midPoint * dir.first][j + midPoint * dir.second] = true;
                }
            }
        }
    }

    cout << res;
    infile.close();

    return 0;
}
