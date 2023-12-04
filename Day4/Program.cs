using System.Threading.Channels;

var file = File.ReadAllLines("input.txt");
var input = new List<string>(file);

var sum = 0;
// Read through every line

foreach (var line in input)
{
    var matchCounter = 0;
    // Split line into 2 parts, winning and my side
    
    var winningNumbers = line.Split("|")[0].Split(":")[1].Trim();
    var listOfWInningNumbers = winningNumbers.Split(" ").Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => int.Parse(x)).Order().ToList();
    
    var myNumbers = line.Split("|")[1].Trim();
    var listOfMyNumbers = myNumbers.Split(" ").Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => int.Parse(x)).Order().ToList();

    int i = 0; int j = 0;
    
    while (i < listOfMyNumbers.Count && j < listOfWInningNumbers.Count)
    {
        if (listOfMyNumbers[i] < listOfWInningNumbers[j])
        {
            i++;
        }
        else if (listOfMyNumbers[i] > listOfWInningNumbers[j])
        {
            j++;
        }
        else
        {
            matchCounter++;
            i++;
            j++;
        }
    }
    if (matchCounter > 0)
    {
        sum += GetSum(matchCounter - 1);
    }
}

Console.WriteLine(sum);

int GetSum(int counter)
{
    int summed = 0;
    if (counter == 0){
        summed = 1;
    }
    if(counter > 0) {
        summed = 2 * GetSum(counter - 1);
    }
    return summed;
}