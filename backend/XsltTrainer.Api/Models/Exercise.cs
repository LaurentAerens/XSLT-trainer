namespace XsltTrainer.Api.Models;

public class Exercise
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string InputXml { get; set; } = string.Empty;
    public string ExpectedOutput { get; set; } = string.Empty;
    public string? Hints { get; set; }
    public string DifficultyLevel { get; set; } = "Beginner";
}
