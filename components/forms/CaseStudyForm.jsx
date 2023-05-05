
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
import Table2 from '../Table';
import useToggle from '../useToggle';
import { Add, Delete, Label, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router';
import {Contexts} from '../tables/ContextTable';
import {UAs} from '../tables/AnalisysUnitButton'
import {toast} from "react-toastify"
  


export  function CaseStudyForm() {
  const [aus, setAus] = useState([]);
  const [contexts, setContexts] = useState([]);
  const [contextsBd,setContextsBd]=useState([]);
  const [showContexts,setShowContext]= useState([]);
  const [selectYear, setSelecYear] = useState([]); 
  const [years, setYears] = useState([]);
  const [case_study, setCaseStudy] = useState({
    name: "",
    description: "",
    create_date: "",
    commit_date: "",
    end_date: ""
  })
  const [tab, setTab] = useState(0);
  const router = useRouter();
  const selectedYear = years[tab];
  const [date, setDate] = useState([]); 
  
  const [caseS, setCase] = useState({
    name: "",
    description: "",
    commit_date:"",
    end_date:""
  });

  useEffect(() => {
    const getCase = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/case-study/ " + router.query.id
      );
      setCase({ name: data.name, description: data.description, commit_date: data.commit_date, end_date: data.end_date });
    };
    if (router.query.id) {
      getCase();
    }
  }, [router.query.id]);
 

  const handleAusClick = (event, au,ctx) => {
    const isSelected = aus.find(selectedRow => selectedRow.id === au.id && selectedRow.year===selectedYear && selectedRow.contextId==ctx.id);
    if (!isSelected) {
      const auToAdd={
        id:au.id,
        year :selectedYear,
        contextId:ctx.id
      }
      setAus([...aus, auToAdd]);
      
    } else {
      setAus(aus.filter(selectedRow => selectedRow.id !== au.id));
    }
  };

  useEffect(() => {
    async function fetchCases() {
      const response = await axios.get("http://localhost:3000/api/context");
      setContextsBd(response.data);
    }
    fetchCases();
  }, []);


  useEffect(() => {
    const filteredElements = contextsBd.filter(contextBd => {
      return contexts.some(context => {
        return (contextBd.id === context.id && context.year===selectedYear);
      });
    });
    setShowContext(filteredElements);
  }, [contexts, contextsBd,selectedYear]);



  const handleContextClick = (event, row) => {
    const isSelected = (contexts.find(selectedRow => selectedRow.id === row.id && selectedRow.year === selectedYear));
    if (!isSelected) {
      const contextToAdd={
        id:row.id,
        year :selectedYear
      }
      setContexts([...contexts, contextToAdd]);
    } else {
      setContexts(contexts.filter(selectedRow => selectedRow.id !== row.id));
    }
  };

  const handleDateChangeDate = (event) => {
    const date = new Date(event.target.value);
    const year = date.getFullYear();
    setSelecYear(year);
    setYears([year])
   
 
    setDate(event.target.value)
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setCaseStudy({ ...case_study, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const YearsDto=[]
    for (const year of years){
      const yearDto={
        year,
        contexts: []
      }
      for(const c of  contexts.filter(c=> c.year === year)){
        yearDto.contexts.push({
          id: c.id,
          aus:aus.filter((ua)=>ua.year===year && ua.contextId===c.id)
          .map((ua)=>ua.id),
          systems:[1]
        })
      }
      YearsDto.push(yearDto)
    }
    const caseToAdd={
      name: case_study.name,
      description: case_study.description,
      commit_date: date,
      end_date: case_study.end_date,
      years : YearsDto
    }
  
    try{
      if (router.query.id) {
        const res = await axios.put(
          "http://localhost:3000/api/case-study/" + router.query.id,
          caseToAdd
        );
       
       router.push("../CaseStudyList");
        toast.success("Estudio de caso Actualizado");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/case-study/",
          caseToAdd
        );
        
       router.push("/case_study/CaseStudyList");
        toast.success("Estudio de caso Creado");
      }
    }catch(error){
      toast.error(error.response.data.message);
    }

  };


  const columns = [
    { title: 'Nombre', key: 'name' },
    { title: 'Descripción', key: 'description' },
    {
      title: 'Acciones',
      render: (obj) => <UAs ctx={obj } year={selectedYear} handleChange={handleAusClick} aus={aus} />,
    },
  ];

  return (
    <Stack spacing={1}>
      <TextField fullWidth label='Nombre del estudio de caso' id="name" name="name" required  onChange={handleChange} />
      <TextField fullWidth label='Descripción del estudio de caso' id="description"  name="description"  onChange={handleChange} />
      <label className=' pl-3'>Fecha de inicio </label>
      <TextField type='date' id='create_date' name='create_date' required  onChange={handleDateChangeDate} />
      <label className=' pl-3'>Fecha fin</label>
      <TextField type='date'  id='end_date' name='end_date'   onChange={handleChange} />

      <Tabs  onChange={(ev, newTab) => setTab(newTab)} value={tab} >
        {years.map((y) => (
          <Tab  key={y} label={y} />
        ))}
        <Tab label={<Add />} onClick={() => setYears([...years, years[years.length - 1] + 1])}  />
        <Tab label={<Delete />} onClick={() =>setYears(years.slice(0,-1))}  />
      </Tabs> 
      <Table2 
        actions={
          <Contexts year={selectedYear} contextList={showContexts} handleChange={handleContextClick}/>
        }
        columns={columns}
        data={showContexts}
        title='Listado de contextos'
      />
      <Button onClick={handleSubmit}>{router.query.id ? "Reconstruir" : "Añadir"}</Button>
     
    </Stack>
  );
}
