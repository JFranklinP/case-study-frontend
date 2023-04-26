import Link from "next/link"


export default function CaseStudyCard({case_study}) {
  return (
    <Link href={'/case_study/'+ case_study.id} key={case_study.id}> 
            
<div className='border border-gray-200 shadow-md p-6  ml-2 mr-2' >
    <h1>{case_study.name}</h1>
    <p>{case_study.description}</p>

</div>
</Link>
  )
}
