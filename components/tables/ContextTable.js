
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
//import Table2 from '../Table';
import useToggle from '../useToggle';
import { Add, Check, CheckBox, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';


export  function Contexts ({year,contextList,handleChange}){
    const [cases, setCases] = useState([]);
    const  [contexts, setContexts] = useState([]);
    const [openC, toggleC] = useToggle();
    const [open2, toggle2] = useToggle();

    useEffect(() => {
        console.log(year);
        async function fetchCases() {
          const response = await axios.get("http://localhost:3000/api/context");
          setCases(response.data);
        }
        fetchCases();
      }, [year]);
      
    
      const handleC = () => {
        setCases((c) => [...c, { name: 'Prueba', desc: 'Descripcion' }]);
        toggleC();
      };

      return(
        <>
        <IconButton   onClick={toggleC}>
        <Add />
      </IconButton>
      <Dialog open={openC} onClose={toggleC}>

      <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Descripcion</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cases.map((row) => (
          <TableRow key={row.id} >
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>
            <IconButton onClick={(event) => handleChange(event, row)}>
            <Add />
          </IconButton>
         
          
            </TableCell>
            <TableCell>
            <Checkbox checked={contextList.some(ctx=>ctx.id===row.id )}
            onChange={(event) => handleChange(event, row)}
            inputProps={{ 'aria-label': 'Seleccionar Item' }} />
            </TableCell>
            

          </TableRow>
        ))}
      </TableBody>
    </Table>
      <IconButton onClick={toggle2}>
            <Add />
          </IconButton>
      <Dialog open={open2} onClose={toggle2}>
        <DialogTitle>Crear nuevo contexto</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField label='Nombre' />
            <TextField label='Descripcion' />

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleC} variant='contained'>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
      </Dialog>
        </>
      )
    
}