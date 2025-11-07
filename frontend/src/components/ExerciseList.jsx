import { useState, useEffect } from 'react';
import { exerciseService } from '../services/api';
import './ExerciseList.css';

function ExerciseList({ onSelectExercise }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = await exerciseService.getAllExercises();
      setExercises(data);
      setError(null);
    } catch (err) {
      setError('Failed to load exercises');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading exercises...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="exercise-list">
      <h2>XSLT Training Exercises</h2>
      <div className="exercises">
        {exercises.map((exercise) => (
          <div 
            key={exercise.id} 
            className="exercise-card"
            onClick={() => onSelectExercise(exercise)}
          >
            <h3>{exercise.title}</h3>
            <p className="difficulty">{exercise.difficultyLevel}</p>
            <p className="description">{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseList;
