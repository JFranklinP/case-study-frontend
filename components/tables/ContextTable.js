
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
import {toast} from "react-toastify"

export  function Contexts ({year,contextList,handleChange}){
    const [cases, setCases] = useState([]);
    const  [contexts, setContexts] = useState([]);
    const [openC, toggleC] = useToggle();
    const [open2, toggle2] = useToggle();
    const [shouldFetchData, setShouldFetchData] = useState(false);

    useEffect(() => {
        
        async function fetchCases() {
          const response = await axios.get("http://localhost:3000/api/context");
          setCases(response.data);
        }
        fetchCases();
      }, [shouldFetchData]);

      const [context, setContext] = useState({
        name: "",
        description: ""
      });
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
            const res = await axios.post(
              "http://localhost:3000/api/context/",
              context
            );
            setShouldFetchData(!shouldFetchData);
            toggle2();
            toast.success("Contexto Creado");
          
        }catch(error){
          toast.error(error.response.data.message);
        }
    
      };
    
      const handleC = (e) => {
        console.log(e.target.name);
        const { name, value } = e.target;
        setContext({ ...context, [name]: value });
      };
     
      
    
      /*const handleC = () => {
        setCases((c) => [...c, { name: 'Prueba', desc: 'Descripcion' }]);
        toggleC();
      };*/

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
          <TableCell>
          <IconButton onClick={toggle2}>
            <Add />
          </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cases.map((row) => (
          <TableRow key={row.id} >
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>
            <Checkbox checked={contextList.some(ctx=>ctx.id===row.id )}
            onChange={(event) => handleChange(event, row)}
            inputProps={{ 'aria-label': 'Seleccionar Item' }} />
            </TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </Table>
      
      <Dialog open={open2} onClose={toggle2}>
        <DialogTitle>Crear nuevo contexto</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField label='Nombre' name='name' id='name' onChange={handleC} />
            <TextField label='Descripcion' name='description' id='description' onChange={handleC} />

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' className='bg-blue-500'>
            Crear
          </Button>
          <Button onClick={toggle2} variant='contained' className='bg-blue-500'>Cerrar</Button>
        </DialogActions>
      </Dialog>
      </Dialog>
        </>
      )
    
}