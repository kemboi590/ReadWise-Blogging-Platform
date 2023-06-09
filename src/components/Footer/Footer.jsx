import React from 'react'
import './footer.css'

let today = new Date();
let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
console.log(today);

function Footer() {
  return (
    <div>
      <ul className='myFooter'>
              <li>Copy right reserved @2023</li>
             <li >Date  <span>{date }</span></li>
          </ul>
    </div>
  )
}

export default Footer