namespace XsltTrainer.Api.Models;

public class XsltTransformResponse
{
    public bool Success { get; set; }
    public string? Output { get; set; }
    public string? Error { get; set; }
}
