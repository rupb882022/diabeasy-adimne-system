import React from 'react'
import SecoundPageTable from './SecoundPageTable'

export default function SecoundPage() {
const tempData=[ {  lastName: 'Snow', firstName: 'Jon', age: 35 },
{ lastName: 'Lannister', firstName: 'Cersei', age: 42 },
{  lastName: 'Lannister', firstName: 'Jaime', age: 45 },
{  lastName: 'Stark', firstName: 'Arya', age: 16 },
{  lastName: 'Targaryen', firstName: 'Daenerys', age: null },
{  lastName: 'Melisandre', firstName: null, age: 150 },
{  lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
{  lastName: 'Frances', firstName: 'Rossini', age: 36 },
{  lastName: 'Roxie', firstName: 'Harvey', age: 65 },]

  return (<>
    <div
      style={{ backgroundColor: 'green' }}>SecoundPage
      </div>
<SecoundPageTable
data={tempData}
/>
      </>
  )
}