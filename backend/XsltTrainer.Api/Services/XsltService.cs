using System.Xml;
using System.Xml.Xsl;
using XsltTrainer.Api.Models;

namespace XsltTrainer.Api.Services;

public interface IXsltService
{
    XsltTransformResponse Transform(XsltTransformRequest request);
}

public class XsltService : IXsltService
{
    public XsltTransformResponse Transform(XsltTransformRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.XmlInput))
            {
                return new XsltTransformResponse
                {
                    Success = false,
                    Error = "XML input is required"
                };
            }

            if (string.IsNullOrWhiteSpace(request.XsltTemplate))
            {
                return new XsltTransformResponse
                {
                    Success = false,
                    Error = "XSLT template is required"
                };
            }

            var xslt = new XslCompiledTransform();
            using var xsltReader = XmlReader.Create(new StringReader(request.XsltTemplate));
            xslt.Load(xsltReader);

            using var xmlReader = XmlReader.Create(new StringReader(request.XmlInput));
            using var stringWriter = new StringWriter();
            using var xmlWriter = XmlWriter.Create(stringWriter, new XmlWriterSettings
            {
                Indent = true,
                OmitXmlDeclaration = false
            });

            xslt.Transform(xmlReader, xmlWriter);

            return new XsltTransformResponse
            {
                Success = true,
                Output = stringWriter.ToString()
            };
        }
        catch (Exception ex)
        {
            return new XsltTransformResponse
            {
                Success = false,
                Error = ex.Message
            };
        }
    }
}
