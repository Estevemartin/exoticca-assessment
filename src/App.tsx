import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import {Routes, Route} from 'react-router-dom';
import {BrowserRouter as Router } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';

import Main from './pages/Main';

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box sx={{height:"100%"}}>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Main/>}/>
          </Routes>
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
