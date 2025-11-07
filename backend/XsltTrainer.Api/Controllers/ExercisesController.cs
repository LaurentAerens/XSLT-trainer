using Microsoft.AspNetCore.Mvc;
using XsltTrainer.Api.Models;
using XsltTrainer.Api.Services;

namespace XsltTrainer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExercisesController : ControllerBase
{
    private readonly IExerciseService _exerciseService;

    public ExercisesController(IExerciseService exerciseService)
    {
        _exerciseService = exerciseService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Exercise>>> GetAll()
    {
        var exercises = await _exerciseService.GetAllExercises();
        return Ok(exercises);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Exercise>> GetById(int id)
    {
        var exercise = await _exerciseService.GetExerciseById(id);
        if (exercise == null)
        {
            return NotFound();
        }
        return Ok(exercise);
    }
}
