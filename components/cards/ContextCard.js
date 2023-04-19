import Link from "next/link"


export default function ContextCard({context}) {
  return (
    <Link href={'/context/${context.id}'} key={context.id}> 
            
<div className='border border-gray-200 shadow-md p-6' >
    <h1>{context.name}</h1>
    <p>{context.description}</p>

</div>
</Link>
  )
}
