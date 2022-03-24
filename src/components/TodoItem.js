import React from "react";

export default function TodoItem(props) {
  return (
    <li>
     {props.title} 
     <button type="button" 
       className="btn btn-danger" 
       onClick={props.remove}>
       Hapus
     </button>
    </li>
    );
}
