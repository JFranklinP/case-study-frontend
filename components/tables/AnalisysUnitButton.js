

import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Checkbox,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,

} from '@mui/material';
import { useState, useEffect } from 'react';
import Table2 from '../Table';
import useToggle from '../useToggle';
import { Add, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';
import {toast} from "react-toastify"



export function UAs({ ctx, year, handleChange, aus}) {
    const [uas, setUas] = useState([]);
    const [openC, toggleC] = useToggle();
    const [open2, toggle2] = useToggle();
    const [open3, toggle3] = useToggle();
    const [shouldFetchData, setShouldFetchData] = useState(false);
  
    const [ausBd,setAusBd]= useState([]);
    const [showAus,setShowAus]= useState([]);
    const [analysis_unit, setAnalysisUnit] = useState({
      name: "",
      description: ""
    });
    useEffect(() => {
      async function fetchCases() {
        const response = await axios.get("http://localhost:3000/api/analysis-unit");
        setAusBd(response.data);
      }
      fetchCases();
    }, [shouldFetchData]); 

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try{
          const res = await axios.post(
            "http://localhost:3000/api/analysis-unit/",
            analysis_unit
          );
          setShouldFetchData(!shouldFetchData);
          toast.success("Unidad de Análisis Creada");
          toggle2();
          
      }catch(error){
        toast.error(error.response.data.message);
      }
    };
  
    const handleC = (e) => {
      console.log(e.target.name);
      const { name, value } = e.target;
      setAnalysisUnit({ ...analysis_unit, [name]: value });
    };


    const columns = [
      { title: 'Nombre', key: 'name' },
      { title: 'Descripción', key: 'description' },
    ];

      
      useEffect(() => {
        const filteredElements = ausBd.filter(auBd => {
          return aus.some(au => {
            return (auBd.id === au.id && au.year==year && au.contextId==ctx.id);
          });
        });
        setShowAus(filteredElements);
      }, [aus, ausBd,year,ctx.id]);
    
  
  
    return (
      <>
        <IconButton onClick={toggleC}>
          <Visibility />
        </IconButton>
        <Dialog open={openC} onClose={toggleC}>
        <DialogTitle>Unidades de analisis del contexto {ctx.name}</DialogTitle>
          <DialogContent>
            <Table2
              actions={
                <IconButton onClick={toggle3}>
                  <Add />
                </IconButton>
              }
              columns={columns}
              data={showAus}
              title='Unidades de análisis'
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleC}>Cerrar</Button>
          </DialogActions>
        <Dialog open={open3} onClose={toggle3}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>
                <IconButton onClick={toggle2}>
                  <Add />
                </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ausBd.map((row) => (
            <TableRow key={row.id} >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
            <Checkbox checked={showAus.some(au=>au.id===row.id )}
            onChange={(event) => handleChange(event, row,ctx)}
            inputProps={{ 'aria-label': 'Seleccionar Item' }} />
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open2} onClose={toggle2}>
              <DialogTitle>Crear unidad de análisis</DialogTitle>
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
        
        </Dialog>
      </>
    );
  }
  