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
import Table from '../components/Table';
import useToggle from '../components/useToggle';
import { Add, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';

function UAs({ ctx }) {
  const [uas, setUas] = useState([]);
  const [openC, toggleC] = useToggle();
  const [open2, toggle2] = useToggle();

  const columns = [
    { title: 'Nombre', key: 'name' },
    { title: 'Descripción', key: 'desc' },
  ];

  const handleC = () => {
    toggle2();
    setUas((ua) => [...ua, { name: 'UA', desc: 'UA Desc' }]);
  };

  return (
    <>
      <IconButton onClick={toggleC}>
        <Visibility />
      </IconButton>

      <Dialog open={openC} onClose={toggleC}>
        <DialogTitle>Unidades de analisis del contexto {ctx.name}</DialogTitle>
        <DialogContent>
          <Table
            actions={
              <IconButton onClick={toggle2}>
                <Add />
              </IconButton>
            }
            columns={columns}
            data={uas}
            title='Unidades de análisis'
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleC}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function Index() {
  const [cases, setCases] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openC, toggleC] = useToggle();
  const [openT, toggleT] = useToggle();
  const [value, setValue] = useState();
  const [years, setYears] = useState([value]);
  const [tab, setTab] = useState(0);
  
  
  useEffect(() => {
    async function fetchCases() {
      const response = await axios.get("http://localhost:3000/api/context");
      setCases(response.data);
    }
    fetchCases();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
  }


  const columns = [
    { title: 'Nombre', key: 'name' },
    { title: 'Descripción', key: 'description' },
    {
      title: 'Acciones',
      render: (obj) => <UAs ctx={obj} />,
    },
  ];

  const handleC = () => {
    setCases((c) => [...c, { name: 'Prueba', desc: 'Descripcion' }]);
    toggleC();
  };

  return (
    <Stack spacing={1}>
      <TextField fullWidth label='Nombre del estudio de caso' />
      <TextField fullWidth label='Descripción del estudio de caso' />
      <TextField fullWidth label='Año inicial' id='anno'  value={value} onChange={handleChange} />
      <Button onClick={toggleT}> definir</Button>
  
      <Tabs onChange={(ev, newTab) => setTab(newTab)} value={tab} >
        {years.map((y) => (
          <Tab key={y} label={y} />
        ))}
        <Tab label={<Add />} onClick={() => setYears([...years, years[years.length - 1] + 1])}  />
        <Tab label={<Delete />} onClick={() => years.pop}  />
      </Tabs>
      <Table
        actions={

          <IconButton onClick={toggleC}>
            <Add />
          </IconButton>
        }
        columns={columns}
        data={cases}
        title='Listado de contextos'
      />
      <Button variant=''>Crear</Button>
      <Dialog open={openC} onClose={toggleC}>
        <form>
        <DialogTitle>Crear nuevo contexto</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField label='Nombre' />
            <TextField label='Descripcion' />

          </Stack>
          <table>
        <tbody>
          {cases.map((item) => (
            <tr key={item.id} onClick={() => handleItemClick(item)}>
              
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleC} variant='contained'>
            Crear
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
}
