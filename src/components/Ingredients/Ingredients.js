import React from 'react';

function Ingredients(props){
return <li>{props.measurement}{props.ingredient}<i class="fas fa-trash-alt" onClick={()=>props.handleClick()}></i></li>
}
 export default Ingredients 