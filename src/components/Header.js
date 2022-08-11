import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import CartOverlay from './CartOverlay';
import {CURRENCY} from '../queries/graphqlQueries';
import { useQuery } from '@apollo/client';

function Header() {

  const {data, error,loading } = useQuery(CURRENCY)

  const [open, setOpen] = useState({
    currencyDropdown: false,
    cartOverlay: false,
  });

  const dropDown = (e)=>{
    if(e.target.id == 'currencies'){
      setOpen(prevOpen =>{
        return {
          ...prevOpen,
          currencyDropdown : !prevOpen.currencyDropdown
        }
      })
    }else {
      setOpen(prevOpen =>{
        return{
          ...prevOpen,
          cartOverlay : !prevOpen.cartOverlay
        }
      })
      }
    }

  if(error) return <h1>Error....</h1>
  if(loading) return <h1>Loading....</h1>

  return (

    <header>
      <div className="container d-flex align-center space-between">
        <ul className="list d-flex">
          <li className="Nav_list_items">women</li>
          <li className="Nav_list_items">men</li>
          <li className="Nav_list_items">kids</li>
        </ul>
        <Link to='/'>
          <img className="logo" src="../images/logo.png" alt="logo" />
        </Link>
        <div className="d-flex align-center">
          <div className="bold relative header_currency">
            <small id="currencies" onClick={dropDown} className="header_currency" >{data?.currencies[0].symbol}</small>
            { open.currencyDropdown &&
              <ul className="list absolute currency_list_position">
                { data?.currencies.slice(1).map(currency =>{
                  return (
                    <li key={currency.label} id={currency.label} className="currency_list">{currency.symbol} {currency.label}</li>
                  )
                })

                }
              </ul>
            }
          </div>
          <div className="relative">
            <img onClick={dropDown} className="header_cart" src="../images/cart.svg" />
            { open.cartOverlay &&
              <CartOverlay />
            }
          </div>
        </div>
      </div>
      
    </header>






  )
}

export default Header


{/*
            
*/}