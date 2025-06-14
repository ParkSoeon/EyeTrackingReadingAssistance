import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './MainScreen';
import BookSelect from './BookSelect';
import SelectMode from './SelectMode';

const treeSrc = '/logo/tree.png';

function LeftTrees() {
  return (
    <div className="flex items-end pl-16">
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] z-10" />
      <img src={treeSrc} alt="tree" className="w-[160px] h-[160px] -ml-20 z-20" />
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] -ml-20 z-10" />
    </div>
  );
}

function RightTrees() {
  return (
    <div className="flex items-end pr-16">
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] z-10" />
      <img src={treeSrc} alt="tree" className="w-[160px] h-[160px] -mr-20 z-20" />
      <img src={treeSrc} alt="tree" className="w-[120px] h-[120px] -mr-20 z-10" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/books" element={<BookSelect />} />
        <Route path="/select-mode" element={<SelectMode />} />
      </Routes>
    </Router>
  );
}

export default App;
