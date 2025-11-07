using Microsoft.AspNetCore.Mvc;
using XsltTrainer.Api.Models;
using XsltTrainer.Api.Services;

namespace XsltTrainer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class XsltController : ControllerBase
{
    private readonly IXsltService _xsltService;

    public XsltController(IXsltService xsltService)
    {
        _xsltService = xsltService;
    }

    [HttpPost("transform")]
    public ActionResult<XsltTransformResponse> Transform([FromBody] XsltTransformRequest request)
    {
        var result = _xsltService.Transform(request);
        return Ok(result);
    }
}
