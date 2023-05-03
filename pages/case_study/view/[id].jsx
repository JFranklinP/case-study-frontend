import { Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useRouter } from "next/router";
import {toast} from "react-toastify"


function Item({ contexts, aus ,year}) {

  return (
    <Stack spacing={1} >
      <Typography variant='h4' className='text-center'>{year}</Typography>
      <div  className='grid  grid-cols-3 gap-8  '  >
      {contexts.filter((c)=>c.year==year).map((c) =>
          <Paper key={c.name}  variant='outlined' className='p-4  shadow-lg' >
            <Stack spacing={1}>
              <Typography variant='h7' className='font-bold'>{c.name}</Typography>
              <div  className=' grid  grid-cols-2 gap-4  '>
                {aus.filter(au => {
            return ( au.year==year && au.context==c.id)}).map((ua) => (
                  <Paper variant='outlined' className='p-4 m-2' key={ua}>
                  <Typography key={ua} variant='body'>
                    {ua.name}
                  </Typography>
                  </Paper>
                ))}
              </div>
            </Stack>
          </Paper>
         )
        }
         </div>
    </Stack>
  );
}

export default function CaseStudyView() {
  const router = useRouter();
  const  [contexts,setContexts]=useState([]);
  const  [aus, setAus] = useState([]);
  const  [caseStudy, setCase] = useState([]);
  const  [years, setYears] = useState([]);
  const  [year, setYear] = useState([2020]);
  const [loading, setLoadig] =useState([]);
  const  [contextsBd,setContextsBd]=useState([]);
  const  [ausBd, setAusBd] = useState([])
  

  useEffect(() => {
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
  }, []);

  useEffect(()=>{
   //\\ if(router.query && router.query.id){
      async function getData(){
        try{
        const caseStudy = await axios.get("http://localhost:3000/api/case-study/"+router.query.id)
        const contexts =[];
        const uas =[];
        caseStudy.data.years.forEach((yearDto)=>{
          yearDto.contexts.forEach((contextDto)=>{
            const context = contextsBd.find((c)=>c.id===contextDto.id);
            contexts.push({...context,year:yearDto.year});
            contextDto.aus.forEach((uaDto)=>{
              const ua = ausBd.find((ua)=> ua.id === uaDto);
              uas.push({...ua, context:context.id,year:yearDto.year});
            });
          });
        });
        setCase(caseStudy);
        setContexts(contexts);
        setAus(uas);
        setYears(caseStudy.data.years.map(yearDto=>yearDto.year));
        setYear(caseStudy.data.years[0].year)
        setLoadig(false)
      }
      catch(error){
        toast.error();
      }
    }

      getData();
    //}
  },[ausBd,contextsBd,router.query.id]);

  if(loading)
  return <h5>Cargando</h5>


  return (
    <Stack spacing={1} className='p-7'>
      <Typography  variant='h6'>{caseStudy.name}</Typography>
      <Typography variant='body1'>{caseStudy.description} </Typography>
     
        {years.map((y) => (
          
          <Item key={y} contexts ={contexts} aus={aus} year={y}/>
        ))}
     
    </Stack>
  );
}
