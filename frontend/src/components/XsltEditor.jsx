import { useState } from 'react';
import { xsltService } from '../services/api';
import './XsltEditor.css';

function XsltEditor({ exercise, onBack }) {
  const [xsltTemplate, setXsltTemplate] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransform = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await xsltService.transform(exercise.inputXml, xsltTemplate);
      
      if (result.success) {
        setOutput(result.output);
      } else {
        setError(result.error || 'Transformation failed');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xslt-editor">
      <div className="editor-header">
        <button onClick={onBack} className="back-button">← Back to Exercises</button>
        <h2>{exercise.title}</h2>
      </div>

      <div className="exercise-info">
        <p><strong>Description:</strong> {exercise.description}</p>
        <p><strong>Difficulty:</strong> {exercise.difficultyLevel}</p>
        {exercise.hints && <p className="hints"><strong>Hints:</strong> {exercise.hints}</p>}
      </div>

      <div className="editor-container">
        <div className="editor-pane">
          <h3>Input XML</h3>
          <pre className="code-display">{exercise.inputXml}</pre>
        </div>

        <div className="editor-pane">
          <h3>Your XSLT Template</h3>
          <textarea
            value={xsltTemplate}
            onChange={(e) => setXsltTemplate(e.target.value)}
            placeholder="Write your XSLT transformation here..."
            className="xslt-input"
          />
          <button 
            onClick={handleTransform} 
            disabled={loading || !xsltTemplate}
            className="transform-button"
          >
            {loading ? 'Transforming...' : 'Transform'}
          </button>
        </div>

        <div className="editor-pane">
          <h3>Output</h3>
          {error ? (
            <div className="error-display">{error}</div>
          ) : (
            <pre className="code-display">{output || 'No output yet. Write your XSLT and click Transform.'}</pre>
          )}
        </div>

        <div className="editor-pane">
          <h3>Expected Output</h3>
          <pre className="code-display">{exercise.expectedOutput}</pre>
        </div>
      </div>
    </div>
  );
}

export default XsltEditor;
