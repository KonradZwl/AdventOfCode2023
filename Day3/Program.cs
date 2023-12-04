// Read out input file

using System.Text;
using System.Text.RegularExpressions;

var file = File.ReadAllLines("input.txt");
var input = new List<string>(file);

var grid = new List<List<char>>();
var regex = new Regex(@"[!@#$%^&*()-+=\[\]{};:'"",<>/?\\|\-]");

// Fill array with input
foreach (var line in input)
{
    var row = new List<char>();

    foreach (var character in line)
    {
        row.Add(character);
    }
    grid.Add(row);
}

int sum = 0;
string stringNumber = "";
bool isValid = false;
// Loop through row
for (int i = 0; i < grid.Count; i++)
{
    // Loop through column
    for (int j = 0; j < grid[i].Count; j++)
    {
        // If character at position is a number check if number has adjacent symbol
        if (char.IsNumber(grid[i][j]))
        {
            // Add to string Number
            stringNumber += grid[i][j];
            
            // Check if number has adjacent symbol
            for (int x = i - 1; x <= i + 1; x++)
            {
                for (int y = j - 1; y <= j + 1; y++)
                {
                    if (x >= 0 && x < grid.Count && y >= 0 && y < grid[x].Count)
                    {
                        if (regex.IsMatch(grid[x][y].ToString()))
                        {
                            isValid = true;
                        }
                    }
                }
            }
        }
        else
        {
            // Checked all positions
            // If number is valid
            CheckIfNumberIsValid();
        }
    }
    CheckIfNumberIsValid();
}
Console.WriteLine(sum);

void CheckIfNumberIsValid()
{
    if (isValid)
    {
        sum += int.Parse(stringNumber);
        stringNumber = "";
        isValid = false;
    }
    else
    {
        stringNumber = "";
    }
}

// Part 2

// Loop through row
var gears = new Dictionary<(int, int), List<int>>();
var neighbouringGears = new HashSet<(int, int)>();

for (int i = 0; i < grid.Count; i++)
{
    // Loop through column
    for (int j = 0; j < grid[i].Count; j++)
    {
        // If character at position is a number check if number has adjacent symbol
        if (char.IsNumber(grid[i][j]))
        {
            // Add to string Number
            stringNumber += grid[i][j];

            // Check if number has adjacent symbol
            for (int x = i - 1; x <= i + 1; x++)
            {
                for (int y = j - 1; y <= j + 1; y++)
                {
                    if (x >= 0 && x < grid.Count && y >= 0 && y < grid[x].Count)
                    {
                        if (grid[x][y] == '*')
                        {
                            neighbouringGears.Add((x, y));
                        }
                    }
                }
            }
        }
        else
        {
            GetGears();
        }
    }
    GetGears();
}

foreach (var gear in gears)
{
    if (gear.Value.Count == 2)
    {
        sum += gear.Value[0] * gear.Value[1];
    }
}

Console.WriteLine(sum);

void GetGears()
{
    foreach (var neighbouringGear in neighbouringGears)
    {
        // Check if gear is not in dictionary
        if (!gears.ContainsKey((neighbouringGear.Item1, neighbouringGear.Item2)))
        {
            gears.Add((neighbouringGear.Item1, neighbouringGear.Item2), new List<int>());
        }
        // Parse string number to int and add to list
        gears[(neighbouringGear.Item1, neighbouringGear.Item2)].Add(int.Parse(stringNumber));
    }
    stringNumber = "";
    neighbouringGears.Clear();
}








