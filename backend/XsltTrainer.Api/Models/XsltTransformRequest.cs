namespace XsltTrainer.Api.Models;

public class XsltTransformRequest
{
    public string XmlInput { get; set; } = string.Empty;
    public string XsltTemplate { get; set; } = string.Empty;
}
