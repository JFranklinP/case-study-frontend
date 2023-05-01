

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



export function UAs({ ctx, year, handleChange, aus}) {
    const [uas, setUas] = useState([]);
    const [openC, toggleC] = useToggle();
    const [open2, toggle2] = useToggle();
    const [open3, toggle3] = useToggle();

  
    const [ausBd,setAusBd]= useState([]);
    const [showAus,setShowAus]= useState([]);


    const columns = [
      { title: 'Nombre', key: 'name' },
      { title: 'Descripción', key: 'description' },
    ];
    const handleAusClick = (event, row) => {
      const isSelected = aus.find(selectedRow => selectedRow.id === row.id);
      if (!isSelected) {
        setAus([...aus, row]);
      } else {
        setAus(aus.filter(selectedRow => selectedRow.id !== row.id));
      }
    };
    useEffect(() => {
        async function fetchCases() {
          const response = await axios.get("http://localhost:3000/api/analysis-unit");
          setAusBd(response.data);
        }
        fetchCases();
      }, []);
      const handleAusBd=()=>{
      }
      useEffect(() => {
        const filteredElements = ausBd.filter(auBd => {
          return aus.some(au => {
            return (auBd.id === au.id && au.year==year && au.contextId==ctx.id);
          });
        });
        setShowAus(filteredElements);
      }, [aus, ausBd,year,ctx.id]);
    
  
    const handleC = () => {
      toggle2();
      setUas((ua) => [...ua, { name: 'Trabajadores', desc: 'Personal que trabaja en el área' }]);
    };
  
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
            <Checkbox checked={aus.includes(row)}
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
                  <TextField label='Nombre' />
                  <TextField label='Descripción' />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleC} variant='contained'>
                  Crear
                </Button>
              </DialogActions>
            </Dialog>
        </Dialog>
        
        </Dialog>
      </>
    );
  }
  