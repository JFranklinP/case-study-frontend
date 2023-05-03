import Link from "next/link"


export default function AnalisysUnitCard({analysis_unit}) {
  return (
    <Link href={'/analisys_unit/'+ analysis_unit.id} key={analysis_unit.id}> 
            
<div className='border border-gray-200 shadow-md p-6  ml-2 mr-2' >
    <h1>{analysis_unit.name}</h1>
    <p>{analysis_unit.description}</p>

</div>
</Link>
  )
}
