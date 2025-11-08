import { useState, useEffect, useRef } from 'react'
// import { useMsal } from '@azure/msal-react'
// import { loginRequest } from './authConfig'
import { xsltService, exerciseService } from './services/api'
import Modal from './components/Modal'
import { ResizableBox } from 'react-resizable'
import './App.css'

function App() {
  // const { instance, accounts } = useMsal()
  const [xmlInput, setXmlInput] = useState('');
  const [xsltCode, setXsltCode] = useState('');
  const [result, setResult] = useState('');
  const [targetXml, setTargetXml] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [panelWidths, setPanelWidths] = useState([0, 0, 0, 0]); // pixels
  const [containerWidth, setContainerWidth] = useState(0);
  const [oldContainerWidth, setOldContainerWidth] = useState(0);
  const containerRef = useRef();

  const containerHeight = window.innerHeight - 250;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        if (newWidth !== containerWidth) {
          if (containerWidth > 0) {
            // scale existing widths
            const scale = newWidth / containerWidth;
            setPanelWidths(panelWidths.map(w => w * scale));
          } else {
            // initial
            setPanelWidths([newWidth / 4, newWidth / 4, newWidth / 4, newWidth / 4]);
          }
          setContainerWidth(newWidth);
        }
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [containerWidth, panelWidths]);

  // const isAuthenticated = accounts.length > 0
  // const userName = isAuthenticated ? accounts[0].name : null
  const isAuthenticated = false // Temporary
  const userName = null

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exs = await exerciseService.getAllExercises();
        setExercises(exs);
      } catch (error) {
        console.error('Failed to load exercises:', error);
      }
    };
    loadExercises();
  }, []);

  const handleLogin = () => {
    // instance.loginPopup(loginRequest).catch(e => {
    //   console.error(e);
    // });
    alert('Login not configured yet. Set VITE_CLIENT_ID and VITE_TENANT_ID in .env');
  };

  const handleLogout = () => {
    // instance.logoutPopup().catch(e => {
    //   console.error(e);
    // });
  };

  const handleExerciseChange = async (e) => {
    const id = e.target.value;
    setSelectedExerciseId(id);
    if (id) {
      try {
        const exercise = await exerciseService.getExerciseById(id);
        setXmlInput(exercise.InputXml || '');
        setXsltCode(''); // Leave XSLT empty for user to fill
        setTargetXml(exercise.ExpectedOutput || '');
        setResult('');
      } catch (error) {
        console.error('Failed to load exercise:', error);
      }
    } else {
      setXmlInput('');
      setXsltCode('');
      setTargetXml('');
      setResult('');
    }
  };

  const handleRun = async () => {
    try {
      const response = await xsltService.transform(xmlInput, xsltCode);
      if (response.success) {
        setResult(response.output || '');
      } else {
        setResult(`Error: ${response.error}`);
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const handleClear = () => {
    setXmlInput('');
    setXsltCode('');
    setResult('');
    setTargetXml('');
    setSelectedExerciseId('');
  };

  const handlePanelResize = (index, size) => {
    console.log(`Resizing panel ${index} to width ${size.width}`);
    // Resize only the dragged panel (index) and its immediate right neighbor (index+1)
    if (containerWidth === 0) return;
    const min = 50;
    const maxIndex = Math.min(index + 1, panelWidths.length - 1);

    // New width for the dragged panel (clamped between min and available space)
    let newWidth = Math.max(min, size.width);

    // Compute the sum of widths for panels that should remain untouched
    const fixedSum = panelWidths.reduce((s, w, i) => {
      if (i !== index && i !== maxIndex) return s + w;
      return s;
    }, 0);

    // Maximum width we can give to the dragged panel so that neighbor has at least `min` left
    const maxForIndex = containerWidth - fixedSum - min;
    newWidth = Math.min(newWidth, maxForIndex);

    const delta = newWidth - panelWidths[index];

    const newWidths = [...panelWidths];
    newWidths[index] = newWidth;
    // Reduce/increase the immediate neighbor by the same delta (inverse)
    newWidths[maxIndex] = Math.max(min, panelWidths[maxIndex] - delta);

    // If rounding left a small difference with container width, repair it by adjusting the last panel
    const total = newWidths.reduce((s, w) => s + w, 0);
    const diff = containerWidth - total;
    if (Math.abs(diff) > 0.5) {
      // Prefer to correct on the last panel without going below min
      const lastIdx = newWidths.length - 1;
      newWidths[lastIdx] = Math.max(min, newWidths[lastIdx] + diff);
    }

    setPanelWidths(newWidths);
  };

  // Handler for resizing the last panel from its left edge (west handle)
  const handleLastPanelResizeFromLeft = (size) => {
    if (containerWidth === 0) return;
    const min = 50;
    const lastIdx = 3;
    const leftIdx = lastIdx - 1;

    // newWidth is the width of the last panel after resize
    let newWidth = Math.max(min, size.width);

    // Compute delta for last panel
    const delta = newWidth - panelWidths[lastIdx];

    const newWidths = [...panelWidths];
    newWidths[lastIdx] = newWidth;
    // Adjust left neighbor inversely
    newWidths[leftIdx] = Math.max(min, panelWidths[leftIdx] - delta);

    // Repair any tiny rounding diff
    const total = newWidths.reduce((s, w) => s + w, 0);
    const diff = containerWidth - total;
    if (Math.abs(diff) > 0.5) {
      newWidths[lastIdx] = Math.max(min, newWidths[lastIdx] + diff);
    }

    setPanelWidths(newWidths);
  };

  return (
    <div className="app">
      <header className="app-header">
        <button className="help-button" onClick={() => setIsHelpOpen(true)}>Help</button>
        <h1>XSLT Trainer</h1>
        <p>Learn XSLT transformations through interactive exercises</p>
        <div className="user-info">
          {isAuthenticated ? (
            <>
              <span>Welcome, {userName}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <span>Welcome, Guest</span>
              <button onClick={handleLogin}>Login</button>
            </>
          )}
        </div>
      </header>
      
      <main className="app-main">
        <div className="exercise-selector">
          <label htmlFor="exercise-select">Select Exercise:</label>
          <select id="exercise-select" value={selectedExerciseId} onChange={handleExerciseChange}>
            <option value="">-- Choose an exercise --</option>
            {exercises.map(ex => (
              <option key={ex.Id} value={ex.Id}>{ex.Title}</option>
            ))}
          </select>
        </div>
        
        <div className="panels-container" ref={containerRef}>
          <ResizableBox width={panelWidths[0]} height={containerHeight} axis="x" onResize={(e, {size}) => handlePanelResize(0, size)} resizeHandles={['e']}>
            <div className="panel">
              <h3>XML Input</h3>
              <textarea 
                value={xmlInput} 
                readOnly
                className="readonly"
                placeholder="XML loaded from exercise (read-only)"
              />
            </div>
          </ResizableBox>
          <ResizableBox width={panelWidths[1]} height={containerHeight} axis="x" onResize={(e, {size}) => handlePanelResize(1, size)} resizeHandles={['e']}>
            <div className="panel">
              <h3>XSLT Code</h3>
              <textarea 
                value={xsltCode} 
                onChange={(e) => setXsltCode(e.target.value)} 
                placeholder="Enter your XSLT here..."
              />
            </div>
          </ResizableBox>
          <ResizableBox width={panelWidths[2]} height={containerHeight} axis="x" onResize={(e, {size}) => handlePanelResize(2, size)} resizeHandles={['e']}>
            <div className="panel">
              <h3>Result</h3>
              <pre>{result}</pre>
            </div>
          </ResizableBox>

          {/* Last panel: non-resizable wrapper. The east handle of panel 3 (index 2) controls this boundary. */}
          <div className="panel-wrapper" style={{ width: panelWidths[3], height: containerHeight }}>
            <div className="panel">
              <h3>Target XML</h3>
              <pre>{targetXml}</pre>
            </div>
          </div>
        </div>
        <div className="button-group">
          <button className="run-button" onClick={handleRun}>Run</button>
          <button className="clear-button" onClick={handleClear}>Clear</button>
        </div>
      </main>

      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)}>
        <h2>How to Use XSLT Trainer</h2>
        <p>Select an exercise from the dropdown to load sample XML and the target output.</p>
        <p>Write your XSLT code in the "XSLT Code" panel to transform the XML.</p>
        <p>Click "Run" to see the result in the "Result" panel.</p>
        <p>Compare your result with the "Target XML" to check if it's correct.</p>
        <p>Login with your Microsoft account to save progress (optional).</p>
        <p>Happy learning!</p>
      </Modal>
    </div>
  )
}

export default App
