// Read out input file
var file = File.ReadAllLines("input.txt");
var input = new List<string>(file);

// Part 1
// Create dictionary for cubes and max values
Dictionary<string, int> dictionary = new Dictionary<string, int>();
dictionary.Add("red", 12);
dictionary.Add("green", 13);
dictionary.Add("blue", 14);

// Initialize sum
int sum = 0;

// Iterate through all lines
foreach (var line in input)
{
    var possible = true;
    // Split line into game number section and actual games/ moves
    var lineSplitted = line.Split(":");
    var gameNumber = lineSplitted[0].Trim().Split(" ")[1];
    var games = lineSplitted[1].Split(";");

    // Iterate through all the games
    foreach (var game in games)
    {
        // Check if the game/set is not possible
        if (!possible) break;
        var cubes = game.Split(",");

        foreach (var cubeSet in cubes)
        {
            var cubeSplitted = cubeSet.Trim().Split(" "); 
            var color = cubeSplitted[1];
            var number = int.Parse(cubeSplitted[0]);

            // Check if the number is higher than the max value for the color
            if (number > dictionary[color])
            {
                possible = false;
                break;
            }
        }
    }
    if (!possible) continue;
    sum += int.Parse(gameNumber);
}
Console.WriteLine(sum);

//Part 2
// Initialize sum
dictionary = new Dictionary<string, int>();
sum = 0;

// Iterate through all lines
foreach (var line in input)
{
    dictionary["red"] = 0;
    dictionary["green"] = 0;
    dictionary["blue"] = 0;
    
    // Split line into game number section and actual games/ moves
    var lineSplitted = line.Split(":");
    var games = lineSplitted[1].Split(";");
    
    // Iterate through all the games
    foreach (var game in games)
    {   
        var cubes = game.Split(",");

        foreach (var cubeSet in cubes)
        {
            var cubeSplitted = cubeSet.Trim().Split(" "); 
            var color = cubeSplitted[1];
            var number = int.Parse(cubeSplitted[0]);

            // Check if the number is higher than the max value for the color
            if (number > dictionary[color])
                dictionary[color] = number;
        }
    }
    sum += dictionary["red"] * dictionary["green"] * dictionary["blue"];
}
Console.WriteLine(sum);
