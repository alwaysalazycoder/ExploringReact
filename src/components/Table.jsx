import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useSortBy, useTable } from 'react-table';

const Table = () => {

    const [products,setProducts] = useState([]);

    const fetchProductData = async() =>{
        const response = await axios.get("https://fakestoreapi.com/products").catch(err=>console.log(err));

        if(response){
            const products = response.data;
            setProducts(products);
        }
    }

   

    const data = useMemo(()=>(
       [
        {
          "id": 1,
          "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          "price": 109.95,
          "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          "rating": {
            "rate": 3.9,
            "count": 120
          }
        },
        {
          "id": 2,
          "title": "Mens Casual Premium Slim Fit T-Shirts ",
          "price": 22.3,
          "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "rating": {
            "rate": 4.1,
            "count": 259
          }
        },
        {
          "id": 3,
          "title": "Mens Cotton Jacket",
          "price": 55.99,
          "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          "rating": {
            "rate": 4.7,
            "count": 500
          }
        }]
    ),[]);
    const columns = useMemo(()=>(
        [
            {
                Header: "Id", //title of the columns
                accessor: "id"
            },
            {
                Header : "Price",
                accessor:"price"
            },
            {
                Header:"Title",
                accessor:"title"
            }
        ]
    ),[]); // use parenthesis for useMemo

    const productsData = useMemo(()=>
    [...products]
    ,[products]);



    const productColumns = useMemo(()=>products[0] ? Object.keys(products[0]).filter((key)=>key !== "rating").map((key)=>{
      if(key === "image"){
        return{
          Header:key,
          accessor:key,
          Cell: ({value}) => <img src={value} className="img"/> 
        }
      }
      return{
        Header:key,
        accessor:key
      }
    }) : []
    ,[products])

    const tableHooks = (hooks) =>{
      hooks.visibleColumns.push((columns)=> [
        ...columns,
        {
          id:"Edit",
          Header:"Edit",
          Cell:({row})=>(
            <button className='button-1' onClick={()=>alert("hello " + row.values.price)}>
              Edit
            </button>
          )
        }
      ])
    }

    const tableInstance = useTable({columns:productColumns,data : productsData},tableHooks,useSortBy) // columns and data

    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance;

    useEffect(()=>{
        fetchProductData();
    },[]);

  return (
    <div>
        <h2>Table</h2>
        <table {...getTableProps()}> 

        <thead>
            {headerGroups.map((headerGroup,index)=>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column,i)=>(
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                                {column.isSorted ? (column.isSortedDesc ? "Asc" : "Desc") : ""}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>

        <tbody {...getTableBodyProps()}>
           {rows.map((row)=>{
            prepareRow(row);

            return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
           })}
        </tbody>

        </table>
        </div>
  )
}

export default Table