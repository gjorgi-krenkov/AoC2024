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

    string line;
    while (getline(infile, line))
    {
        Y = line.size();
        rows.push_back(line);
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
    bool visited[X][Y];
    reachMap[start.first][start.second] = 0;
    dijkstra.push({{0, start}, "right"});
    while (dijkstra.size())
    {
        auto per = dijkstra.top();
        dijkstra.pop();
        int val = per.first.first;
        pair<int, int> coords = per.first.second;
        string dir = per.second;
        pair<int, int> delta = getDelta(dir);
        if (!visited[coords.first][coords.second])
        {
            dijkstra.push({{val + 1000, coords}, getClockDir(dir)});
            dijkstra.push({{val + 1000, coords}, getCounterClockDir(dir)});
        }
        visited[coords.first][coords.second] = true;
        if (
            isValid(coords.first + delta.first, coords.second + delta.second) && (rows[coords.first + delta.first][coords.second + delta.second] == '.' || rows[coords.first + delta.first][coords.second + delta.second] == 'E') && reachMap[coords.first + delta.first][coords.second + delta.second] > val + 1)
        {
            dijkstra.push({{val + 1, {coords.first + delta.first, coords.second + delta.second}}, dir});
            reachMap[coords.first + delta.first][coords.second + delta.second] = val + 1;
            visited[coords.first + delta.first][coords.second + delta.second] = false;
        }
    }

    for (int i = 0; i < X; i++)
        for (int j = 0; j < Y; j++)
            visited[i][j] = false;

    cout << reachMap[finish.first][finish.second] << endl;

    queue<pair<int, int>> elements;
    elements.push(finish);
    while (elements.size())
    {
        pair<int, int> coords = elements.front();
        elements.pop();
        if (visited[coords.first][coords.second])
            continue;
        visited[coords.first][coords.second] = true;
        int value = reachMap[coords.first][coords.second];
        if (
            isValid(coords.first - 1, coords.second) && (value - reachMap[coords.first - 1][coords.second] == 1 || value - reachMap[coords.first - 1][coords.second] == 1001 || (value - reachMap[coords.first - 1][coords.second] == -999 && reachMap[coords.first + 1][coords.second] - value == 1001)))
        {
            elements.push({coords.first - 1, coords.second});
        }
        if (isValid(coords.first + 1, coords.second) && (value - reachMap[coords.first + 1][coords.second] == 1 || value - reachMap[coords.first + 1][coords.second] == 1001) || (value - reachMap[coords.first + 1][coords.second] == -999 && reachMap[coords.first - 1][coords.second] - value == 1001))
        {
            elements.push({coords.first + 1, coords.second});
        }
        if (isValid(coords.first, coords.second - 1) && (value - reachMap[coords.first][coords.second - 1] == 1 || value - reachMap[coords.first][coords.second - 1] == 1001) || (value - reachMap[coords.first][coords.second - 1] == -999 && reachMap[coords.first][coords.second + 1] - value == 1001))
        {
            elements.push({coords.first, coords.second - 1});
        }
        if (isValid(coords.first, coords.second + 1) && (value - reachMap[coords.first][coords.second + 1] == 1 || value - reachMap[coords.first][coords.second + 1] == 1001) || (value - reachMap[coords.first][coords.second + 1] == -999 && reachMap[coords.first][coords.second - 1] - value == 1001))
        {
            elements.push({coords.first, coords.second + 1});
        }
    }
    int res = 0;
    for (int i = 0; i < X; i++)
    {
        for (int j = 0; j < Y; j++)
        {
            if (visited[i][j])
                res++;
        }
    }
    cout << res;
    infile.close();

    return 0;
}