import { Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
/*const caseStudy={

     years:[
      {
        year: 2019,
       contexts:[
        { name:"Contexto 1", uas:["UA1","UA2","UA3" ] },
        { name:"Contexto 2", uas:["UA1","UA2","UA3" ] },
        { name:"Contexto 3", uas:["UA1","UA2","UA3" ] }
       ] 
      },
      {
        year: 2020,
       contexts:[
        { name:"Contexto 4", uas:["UA1","UA2","UA3" ] },
        { name:"Contexto 5", uas:["UA1","UA2","UA3" ] },
        { name:"Contexto 6", uas:["UA1","UA2","UA3" ] }
       ] 
      },
      {
        year: 2021,
       contexts:[
        { name:"Contexto 7", uas:["UA1","UA2","UA3" ] },
        { name:"Contexto 8", uas:["UA1","UA2","UA3" ] },
        { name:"Contexto 9", uas:["UA1","UA2","UA3" ] }
       ] 
      }
    ]
}

const contextos = [
  { name: 'Área de proceso Gestión de Estrategia y Negocios', uas: [' flujos de integración'], year: 2020 },
  { name: ' Área de proceso Gestión de Capital Humano', uas: [' flujos de integración'], year: 2020 },
  { name: 'Área de proceso Gestión de la Documentación', uas: [' flujos de integración'], year: 2020 },
  { name: 'Área de proceso Gestión de Estrategia y Negocios', uas: ['UA7', 'UA8'], year: 2021 },
  { name: 'Área de proceso Gestión de Capital Humano', uas: ['UA9', 'UA10'], year: 2021 },
  { name: 'Área de proceso Gestión de la Documentación', uas: ['UA11', 'UA12'], year: 2021 },
  { name: 'Área de proceso Gestión de Estrategia y Negocios', uas: ['UA13', 'UA14'], year: 2022 },
  { name: 'Área de proceso Gestión de Capital Humano', uas: ['UA15', 'UA16'], year: 2022 },
  { name: 'Área de proceso Gestión de la Documentación', uas: ['UA17', 'UA18'], year: 2022 },
]*/;

function Item({ YearsDto,year}) {
  
  
  return (
    <Stack spacing={1} >
      <Typography variant='h4' className='text-center'>{year}</Typography>
      <div  className='grid  grid-cols-3 gap-8  '  >
      {YearsDto
        .filter((y) => y.year === year)
        .map((y) => (
         y.contexts.map((c) =>
          <Paper key={c.name}  variant='outlined' className='p-4  shadow-lg' >
            <Stack spacing={1}>
              <Typography variant='h7' className='font-bold'>{c.name}</Typography>
              <div  className=' grid  grid-cols-2 gap-4  '>
                {c.aus.map((ua) => (
                  <Paper variant='outlined' className='p-4 m-2' key={ua}>
                  <Typography key={ua} variant='body'>
                    {ua}
                  </Typography>
                  </Paper>
                ))}
              </div>
            </Stack>
          </Paper>
         )
        ))}
         </div>
    </Stack>
  );
}

export default function About() {
  const  [caseStudy, setCase] = useState([]);
  const [contextsBd,setContextsBd]=useState([]);
  const  [aus, setAus] = useState([]);
  const  [ausBd, setAusBd] = useState([]);
  const  [Years, setYears] = useState([]);
  const  [year, setYear] = useState([2020]);

  useEffect(() => {
    async function fetchCase({id}) {
      const response = await axios.get("http://localhost:3000/api/case-study/"+23);
      setCase(response.data);
    }
    fetchCase(23);
  }, []);

  const [YearsDto, setYearsDto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const contextsBd = await axios.get('http://localhost:3000/api/context');
        const ausBd = await axios.get('http://localhost:3000/api/analysis-unit');

        const YearsDto = [];
for (const year of caseStudy.years) {
  const yearDto = {
    year,
    contexts: []
  };
  for (const c of year.contexts) {
    const aus = [];
    const matchingContextBD = contextBD.find(ctx => ctx.id === c.id);
    if (matchingContextBD) {
      for (const ausItem of c.aus) {
        const matchingAusBD = ausBD.find(ua => ua.id === ausItem.id);
        if (matchingAusBD) {
          aus.push(matchingAusBD);
        }
      }
      const contextDto={
        id: matchingContextBD.id,
        name: matchingContextBD.name,
        description: matchingContextBD.description,
        aus: aus}
      yearDto.contexts.push({ contextDto });
    }
  }
  YearsDto.push(yearDto);
}

        setYearsDto(YearsDto);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);
  

 /*useEffect(() => {
    async function fetchCases() {
      const response = await axios.get("http://localhost:3000/api/context");
      setContextsBd(response.data);
    }
    fetchCases();
  }, []);


  useEffect(() => {
    async function fetchCases() {
      const response = await axios.get("http://localhost:3000/api/analysis-unit");
      setAusBd(response.data);
    }
    fetchCases();
  }, []);*/

  

  return (
    <Stack spacing={1} className='p-7'>
      <Typography  variant='h6'>{caseStudy.name}</Typography>
      <Typography variant='body1'>{caseStudy.description} </Typography>
      <Carousel>
        {[2019,2020,2021].map((y) => (
          <Item key={y} year={year} YearsDto={YearsDto} />
        ))}
      </Carousel>
    </Stack>
  );
}
