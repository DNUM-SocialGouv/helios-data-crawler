import { ListeDesSprints } from './ListeDesSprints';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VisuelSprint } from './VisuelSprint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ListeDesSprints />} />
        <Route path="sprint/:sprintId" element={<VisuelSprint />} />
        {/* <Route path="blogs" element={<h2>Blogs </h2>} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
