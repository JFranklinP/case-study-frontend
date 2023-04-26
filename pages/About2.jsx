import { Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

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
];

function Item({ year }) {
  return (
    <Stack spacing={1} className=''>
      <Typography variant='h4' className='text-center'>{year}</Typography>
      <div  className='grid  grid-cols-3 gap-8  '  >
      {contextos
        .filter((c) => c.year === year)
        .map((c) => (
         
          <Paper key={c.name}  variant='outlined' className='p-4  shadow-lg' >
            <Stack spacing={1}>
              <Typography variant='h7' className='font-bold'>{c.name}</Typography>
              <div  className=' grid  grid-cols-1 gap-4  '>
                {c.uas.map((ua) => (
                  <Paper variant='outlined' className='p-4 m-2' key={ua}>
                  <Typography key={ua} variant='body'>
                    {ua}
                  </Typography>
                  </Paper>
                ))}
              </div>
            </Stack>
          </Paper>
         
        ))}
         </div>
    </Stack>
  );
}

export default function About() {
  const [year, setYear] = useState(2020);

  return (
    <Stack spacing={1} className='p-7'>
      <Typography  variant='h6'>Proyectos de bus de servicios empresariales</Typography>
      <Typography variant='body1'>Este artículo presenta un estudio de caso en el contexto de tres áreas de 
      procesos de la Empresa Laboratorios Farmacéuticos AICA. El estudio interviene 97 flujos de integración desarrollados con tecnología ESB,
como una alternativa tecnológica que permite crear una capa de virtualización, que brinda acceso a la información integrada en tiempo real, y facilita el proceso de análisis y toma de decisiones en diferentes
niveles. </Typography>
      <Carousel>
        {[2020, 2021, 2022].map((y) => (
          <Item key={y} year={year} />
        ))}
      </Carousel>
    </Stack>
  );
}
