#include <bits/stdc++.h>

using namespace std;

int X, Y;
bool isValid(int x, int y)
{
    return 0 <= x && x < X && 0 <= y && y < Y;
}
pair<int, int> getDelta(string dir)
{
    if (dir == "top")
        return {-1, 0};
    if (dir == "bottom")
        return {1, 0};
    if (dir == "left")
        return {0, -1};
    if (dir == "right")
        return {0, 1};
}
string getClockDir(string dir)
{
    if (dir == "top")
        return "right";
    if (dir == "right")
        return "bottom";
    if (dir == "bottom")
        return "left";
    return "top";
}
string getCounterClockDir(string dir)
{
    if (dir == "top")
        return "left";
    if (dir == "right")
        return "top";
    if (dir == "bottom")
        return "right";
    return "bottom";
}

int main()
{
    ios::sync_with_stdio(false);
    ifstream infile("input.txt");

    vector<string> rows;
    vector<string> orgMp;
    vector<pair<int, int>> coords;

    string line;
    while (getline(infile, line))
    {
        Y = line.size();
        rows.push_back(line);
        orgMp.push_back(line);
    }
    X = rows.size();
    priority_queue<pair<pair<int, pair<int, int>>, string>> dijkstra;
    int reachMap[X][Y];
    pair<int, int> start;
    pair<int, int> finish;
    for (int i = 0; i < X; i++)
    {
        for (int j = 0; j < Y; j++)
        {
            reachMap[i][j] = 99999999;
            if (rows[i][j] == 'S')
                start = {i, j};
            if (rows[i][j] == 'E')
                finish = {i, j};
        }
    }
    int orgRes = 0;

    reachMap[start.first][start.second] = 0;
    dijkstra.push({{0, start}, "right"});
    while (dijkstra.size())
    {
        auto per = dijkstra.top();
        dijkstra.pop();
        int val = per.first.first;
        pair<int, int> coords = per.first.second;
        string dir = per.second;
        for (int i = 0; i < 4; i++)
        {
            pair<int, int> delta = getDelta(dir);

            if (
                isValid(coords.first + delta.first, coords.second + delta.second) && (rows[coords.first + delta.first][coords.second + delta.second] == '.' || rows[coords.first + delta.first][coords.second + delta.second] == 'E') && reachMap[coords.first + delta.first][coords.second + delta.second] > val + 1)
            {
                dijkstra.push({{val + 1, {coords.first + delta.first, coords.second + delta.second}}, dir});
                reachMap[coords.first + delta.first][coords.second + delta.second] = val + 1;
            }
            dir = getClockDir(dir);
        }
        if (dijkstra.size() == 0)
        {
            break;
        }
    }
    orgRes = reachMap[finish.first][finish.second];
    int score = 0;
    for (int i = 0; i < X; i++)
    {
        for (int j = 0; j < Y; j++)
        {
            if (orgMp[i][j] != '.' && orgMp[i][j] != 'S' && orgMp[i][j] != 'E')
                continue;
            int foundCheats = 0;
            bool visited[X][Y];
            for (int q = 0; q < X; q++)
                for (int z = 0; z < Y; z++)
                    visited[q][z] = false;
            for (int l = 0; l <= 20; l++)
            {
                for (int r = 0; r <= 20; r++)
                {
                    if (l + r > 20)
                        continue; // original cost - cost to current + num of hor ver moves >= 50
                    vector<pair<int, int>> dirs = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}, {1, 1}, {-1, 1}, {1, -1}, {-1, -1}};
                    for (auto dir : dirs)
                    {
                        int fin = reachMap[finish.first][finish.second];
                        int tar = reachMap[i + l * dir.first][j + r * dir.second];
                        int cur = reachMap[i][j];

                        if (
                            isValid(i + l * dir.first, j + r * dir.second)                 // valid .
                            && !visited[i + l * dir.first][j + r * dir.second]             // we haven't reached from here yet
                            && reachMap[i + l * dir.first][j + r * dir.second] != 99999999 // we don't end on #
                            && (cur - (l + r) - 100) >= tar                                // from here + 20 - (50 to save) reaches faster then tar
                        )
                        {

                            visited[i + l * dir.first][j + r * dir.second] = true; // mark the field as visited from this pos
                            foundCheats++;
                        }
                    }
                }
            }
            score += foundCheats;
        }
    }
    cout << score;
    infile.close();

    return 0;
}
