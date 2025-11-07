import { useState } from 'react'
import ExerciseList from './components/ExerciseList'
import XsltEditor from './components/XsltEditor'
import './App.css'

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>XSLT Trainer</h1>
        <p>Learn XSLT transformations through interactive exercises</p>
      </header>
      
      <main className="app-main">
        {selectedExercise ? (
          <XsltEditor 
            exercise={selectedExercise} 
            onBack={() => setSelectedExercise(null)}
          />
        ) : (
          <ExerciseList onSelectExercise={setSelectedExercise} />
        )}
      </main>
    </div>
  )
}

export default App
