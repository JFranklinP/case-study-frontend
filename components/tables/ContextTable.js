
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {
  Button,
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
import Table2 from '../components/Table';
import useToggle from '../components/useToggle';
import { Add, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function Contexts ({year}){
    const  [contexts, setContexts] = useState([]);
    const [openC, toggleC] = useToggle();
    const [open2, toggle2] = useToggle();

    const columns = [
        { title: 'Nombre', key: 'name' },
        { title: 'Descripción', key: 'description' },
        {
            title: 'Añadir',
           // render: (obj) => <UAs ctx={obj} />,
          },
      ];
    

    const handleContextClick = (event, row) => {
        const isSelected = contexts.find(selectedRow => selectedRow.id === row.id);
        if (!isSelected) {
          setContexts([...contexts, row]);
          contexts.push({id,year})
        } else {
          //setCases(cases.filter(selectedRow => selectedRow.id !== row.id));
        }
      };

      return(
        <>
        <IconButton onClick={toggleC}>
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
          <TableRow key={row.id} onClick={(event) => handleContextClick(event, row)}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            <IconButton onClick={(event) => handleContextClick(event, row)}>
            <Add />
          </IconButton>

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