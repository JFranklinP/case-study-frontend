
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

  

function UAs({ ctx }) {
  const [uas, setUas] = useState([]);
  const [openC, toggleC] = useToggle();
  const [open2, toggle2] = useToggle();
  const [open3, toggle3] = useToggle();

  const columns = [
    { title: 'Nombre', key: 'name' },
    { title: 'Descripción', key: 'desc' },
  ];

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
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Descripción</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {uas.map((row) => (
          <TableRow key={row.id} onClick={(event) => handleAusClick(event, row)}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      <Dialog open={open3} onClose={toggle3}>
        <DialogTitle>Unidades de analisis del contexto {ctx.name}</DialogTitle>
        <DialogContent>
          <Table2
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
      </Dialog>
    </>
  );
}

export default function Index() {
  const [cases, setCases] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openC, toggleC] = useToggle();
  const [open2, toggle2] = useToggle();
  const [openT, toggleT] = useToggle();
  const [value, setValue] = useState();

  const  [systems, setSystems] = useState([]);
  const  [aus, setAus] = useState([]);
  const  [contexts, setContexts] = useState([]);
  const [years, setYears] = useState([]);
  const [case_study, setCaseStudy] = useState({
    name: "",
    description: "",
    create_date: "",
    commit_date: "",
    end_date: ""
  })
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSystemsClick = (event, row) => {
    const isSelected = systems.find(selectedRow => selectedRow.id === row.id);
    if (!isSelected) {
      setSystems([...systems, row]);
    } else {
      setSystems(systems.filter(selectedRow => selectedRow.id !== row.id));
    }
  };

  const handleAusClick = (event, row) => {
    const isSelected = aus.find(selectedRow => selectedRow.id === row.id);
    if (!isSelected) {
      setAus([...aus, row]);
    } else {
      setAus(aus.filter(selectedRow => selectedRow.id !== row.id));
    }
  };
  const handleContextClick = (event, row) => {
    const isSelected = contexts.find(selectedRow => selectedRow.id === row.id);
    if (!isSelected) {
      setContexts([...contexts, row]);
    } else {
      //setCases(cases.filter(selectedRow => selectedRow.id !== row.id));
    }
  };
  const handleYearClick = (event, row) => {
    const isSelected = selectedRows.find(selectedRow => selectedRow.id === row.id);
    if (!isSelected) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(selectedRows.filter(selectedRow => selectedRow.id !== row.id));
    }
  };
  const [tab, setTab] = useState(0);
  const router = useRouter();
  const { name, email } = router.query;
  
  
  useEffect(() => {
    async function fetchCases() {
      const response = await axios.get("http://localhost:3000/api/context");
      setCases(response.data);
    }
    fetchCases();
  }, []);

 //// const handleChange = (event) => {
  //setValue(event.target.value);
 /// }
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
  const [context, setContext] = useState({
    name: "",
    description: "",
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if (router.query.id) {
        const res = await axios.put(
          "http://localhost:3000/api/case-study/" + router.query.id,
          case_study
        );
       
        router.push("../CaseStudytList");
        toast.success("Estudio de caso Actualizado");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/case-study/",
          case_study
        );
        
        router.push("/case_study/CaseStudytList");
        toast.success("Estudio de caso Creado");
      }
    }catch(error){
      toast.error(error.response.data.message);
    }

  };

  const handleChange = (e) => {
    //console.log(e.target.name);
    const { name, value } = e.target;
    setContext({ ...context, [name]: value });
  };

  useEffect(() => {
    const getContext = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/context/ " + router.query.id
      );
      setContext({ name: data.name, description: data.description });
    };
    if (router.query.id) {
      getContext();
    }
  }, [router.query.id]);



  return (
    <Stack spacing={1}>
      <TextField fullWidth label='Nombre del estudio de caso' id="name" name="name" onChange={handleChange} />
      <TextField fullWidth label='Descripción del estudio de caso' id="description" name="description" onChange={handleChange} />
      <TextField type='date' fullWidth label='Fecha de inicio ' id='create_date' name='create_date'  onChange={handleChange} />
      <TextField type='date' fullWidth label='Fecha fin' id='end_date' name='end_date' onChange={handleChange} />

      <Button onClick={toggleT}> definir</Button>
  
      <Tabs onChange={(ev, newTab) => setTab(newTab)} value={tab} >
        {years.map((y) => (
          <Tab key={y} label={y} />
        ))}
        <Tab label={<Add />} onClick={() => setYears([...years, years[years.length - 1] + 1])}  />
        <Tab label={<Delete />} onClick={() => years.pop}  />
      </Tabs>
      <Table2
        actions={

          <IconButton onClick={toggleC}>
            <Add />
          </IconButton>
        }
        columns={columns}
        data={contexts}
        title='Listado de contextos'
      />
      <Button onClick={handleSubmit}>Crear</Button>
     
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
    </Stack>
  );
}
