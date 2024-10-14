import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { TextField } from '@mui/material';
import './index.css';


export default function DenseAppBar({ setBusqueda }) {

  
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setBusqueda(value);  // Actualiza el estado en el componente padre
  };
    return (
      <Box sx={{ flexGrow: 1, }}>
        <AppBar position="static" style={{backgroundColor: '#F4DC26', height: '120px'}}>
          <Toolbar variant="dense">
            <img alt='logo' 
              className='logo'
               src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8bf49eb-f01d-4851-810a-6aa6fc317107/defoec0-d0c0a40d-139d-482a-a043-6da7178296dd.png/v1/fill/w_1600,h_975/pokemon_logo_update_2021_by_obsolete00_defoec0-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTc1IiwicGF0aCI6IlwvZlwvZDhiZjQ5ZWItZjAxZC00ODUxLTgxMGEtNmFhNmZjMzE3MTA3XC9kZWZvZWMwLWQwYzBhNDBkLTEzOWQtNDgyYS1hMDQzLTZkYTcxNzgyOTZkZC5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.q5xiGiCiW5rIaSkzLpngofi4bsdFnlMMGEGIC14R5Ic' 
               style={{width: '200px',
                marginLeft: '200px'
               }}/>

            <TextField
            className='label'
            label="Buscar Pokémon"
            onChange={handleSearchChange}
            sx={{
              backgroundColor: 'white',
              borderRadius: '4px',
              width: '500px',
              marginLeft: '30px',
              marginTop: '20px'
            }}
          />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }