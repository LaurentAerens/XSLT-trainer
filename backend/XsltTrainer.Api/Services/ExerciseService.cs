using XsltTrainer.Api.Models;

namespace XsltTrainer.Api.Services;

public interface IExerciseService
{
    Task<List<Exercise>> GetAllExercises();
    Task<Exercise?> GetExerciseById(int id);
}

public class ExerciseService : IExerciseService
{
    private readonly List<Exercise> _exercises;

    public ExerciseService()
    {
        _exercises = new List<Exercise>
        {
            new Exercise
            {
                Id = 1,
                Title = "Basic Element Transformation",
                Description = "Transform a simple XML document by copying all elements and attributes.",
                DifficultyLevel = "Beginner",
                InputXml = @"<?xml version=""1.0"" encoding=""UTF-8""?>
<book>
    <title>XSLT Essentials</title>
    <author>John Doe</author>
    <year>2023</year>
</book>",
                ExpectedOutput = @"<?xml version=""1.0"" encoding=""utf-16""?>
<book>
  <title>XSLT Essentials</title>
  <author>John Doe</author>
  <year>2023</year>
</book>",
                Hints = "Use xsl:copy-of or create an identity template to copy all nodes."
            },
            new Exercise
            {
                Id = 2,
                Title = "Filtering Elements",
                Description = "Select and display only books published after 2020.",
                DifficultyLevel = "Beginner",
                InputXml = @"<?xml version=""1.0"" encoding=""UTF-8""?>
<library>
    <book>
        <title>Old Book</title>
        <year>2018</year>
    </book>
    <book>
        <title>New Book</title>
        <year>2022</year>
    </book>
    <book>
        <title>Recent Book</title>
        <year>2023</year>
    </book>
</library>",
                ExpectedOutput = @"<?xml version=""1.0"" encoding=""utf-16""?>
<library>
  <book>
    <title>New Book</title>
    <year>2022</year>
  </book>
  <book>
    <title>Recent Book</title>
    <year>2023</year>
  </book>
</library>",
                Hints = "Use xsl:if or xsl:choose to filter elements based on the year value."
            },
            new Exercise
            {
                Id = 3,
                Title = "Creating New Structure",
                Description = "Transform a flat list of products into a grouped structure by category.",
                DifficultyLevel = "Intermediate",
                InputXml = @"<?xml version=""1.0"" encoding=""UTF-8""?>
<products>
    <product category=""electronics"">Laptop</product>
    <product category=""books"">XSLT Guide</product>
    <product category=""electronics"">Phone</product>
    <product category=""books"">XML Handbook</product>
</products>",
                ExpectedOutput = @"<?xml version=""1.0"" encoding=""utf-16""?>
<catalog>
  <category name=""electronics"">
    <item>Laptop</item>
    <item>Phone</item>
  </category>
  <category name=""books"">
    <item>XSLT Guide</item>
    <item>XML Handbook</item>
  </category>
</catalog>",
                Hints = "Use xsl:for-each-group or Muenchian method for grouping. Create new element structures."
            }
        };
    }

    public Task<List<Exercise>> GetAllExercises()
    {
        return Task.FromResult(_exercises);
    }

    public Task<Exercise?> GetExerciseById(int id)
    {
        var exercise = _exercises.FirstOrDefault(e => e.Id == id);
        return Task.FromResult(exercise);
    }
}
