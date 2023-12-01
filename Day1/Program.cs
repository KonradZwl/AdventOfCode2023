var file = File.ReadAllLines("input.txt");
var input = new List<string>(file);

int sum = 0;
for (int i = 0; i < input.Count; i++)
{
    var stringNumber = input[i].Where(char.IsNumber).ToArray();
    if (stringNumber.Length == 1) sum += int.Parse(stringNumber[0] + "" + stringNumber[0]);
    else sum += int.Parse(stringNumber[0] + "" + stringNumber[^1]);
}
Console.WriteLine(sum);
file = File.ReadAllLines("input.txt");
input = new List<string>(file);
var input2 = new List<string>(file);
sum = 0;

for (int i = 0; i < input.Count; i++)
{
    //Initialize dictionary with written numbers and their values
    Dictionary<string,string> dictionary = new Dictionary<string, string>();
    dictionary.Add("one", "1");
    dictionary.Add("two", "2");
    dictionary.Add("three", "3");
    dictionary.Add("four", "4");
    dictionary.Add("five", "5");
    dictionary.Add("six", "6");
    dictionary.Add("seven", "7");
    dictionary.Add("eight", "8");
    dictionary.Add("nine", "9");

    Dictionary<string, string> edgeCases = new Dictionary<string, string>();
    edgeCases.Add("oneight", "18");
    edgeCases.Add("sevenine", "79");
    edgeCases.Add("eightwo", "82");
    edgeCases.Add("eighthree", "83");
    edgeCases.Add("twone", "21");
    edgeCases.Add("threeight", "38");

    for (int j = 0; j < input[i].Length; j++)
    {
     if (char.IsNumber(input[i][j])) continue;
     foreach (var pair in edgeCases)
     {
         var substring = input[i].Substring(j);
         if (substring.Contains(pair.Key))
         {
             input[i] = input[i].Replace(substring, substring.Replace(pair.Key, pair.Value));
         }
     }
     
     foreach (var pair in dictionary){
         var substring = input[i].Substring(j);
         if (substring.Contains(pair.Key))
         {
             input[i] = input[i].Replace(substring, substring.Replace(pair.Key, pair.Value));
         }
     }
    }

    var numberList = input[i].Where(x => char.IsNumber(x)).ToArray();
    int value = int.Parse(numberList[0] + "" + numberList[^1]);
    sum += value;
}

Console.WriteLine(sum);