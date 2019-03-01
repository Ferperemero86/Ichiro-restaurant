import React, { Component } from 'react';
import OrderCheck from './pending-order-check';


//Returns the orders pending
const OrdersList = ({ orders, itemsPending, checkOrder, orderCheck }) => {
    if  ( (orders.length !== 0) && (orderCheck.length === 0 ) ) { 

        if (itemsPending === 'false') {
            return <div>No items Pending</div>
        } else {
            return orders.map( item => {
                return (
                    <div className="pending-order-details">
                        <div>
                            <span>Num. Order:</span> 
                            <span>{ item._id }</span> 
                            <span>Time: { item.time }</span>
                        </div>
                        <div>
                            <span>Email:</span> 
                            <span>{ item.email }</span>
                        </div>
                        <div>
                            <span>Phone:</span> 
                            <span>{ item.phone }</span>
                        </div>
                        <div>
                            <span>Total:</span> 
                            <span>£{ item.total }</span>
                        </div>
                        <button 
                            onClick={ (e)=>checkOrder(e,item) }
                            className="pending-order-details-button">check</button>
                    </div>  
                )
            }) 
        }

    } else {
        return null;
    }
}

const NoPendingOrdersMessage = ({ orders }) => {
    if (orders.length === 0) {
        return (
            <div id="pending-main">
                <h1 className="pending-second-heading">Today's Orders</h1>
                <h3 className="pending-order-status">No Orders Pending</h3>
            </div>
        )
    } else {
        return null;
    }
}

const PendingOrderCheck = ({ orderCheck }) => {
    if (orderCheck.length !== 0) {
        return (
            <div className="full-order">
                <OrderCheck order={ orderCheck } />
            </div>
        )
    } else {
        return null;
        
    }
}

const PendingOrdersList = ({ orders, itemsPending, checkOrder, orderCheck }) => {
    return(
        <div id="pending-main">
            <h1 className="pending-first-heading">Pending Orders</h1>
            <OrdersList 
                orders={ orders }
                itemsPending={ itemsPending }
                checkOrder={ checkOrder }
                orderCheck={ orderCheck }
            />
            <NoPendingOrdersMessage
                orders={ orders } 
            />
            <PendingOrderCheck 
                orderCheck={ orderCheck }
            /> 
        </div>
    )
}

//Handles pending orders
class PendingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
           orders: [],
           orderCheck: [] ,
           itemsPending: ''  
        }
        this.checkOrder = this.checkOrder.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
    }

    //Fetches pending orders
    fetchOrders() {
        fetch('/pendingOrders', {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
             },
            })
            .then((response) => {
                if(response) {
                    return response.json()
                }   
            })
            .then((result) => {   
                if (result.itemsPending === 'false') {
                    this.setState({ itemsPending: 'false'})
                }  else {
                    this.setState({ orders: result, itemsPending: 'true'})
                }
            })

    }

    //Fetches pending orders every 30 secs
    componentDidMount() {
        setInterval (this.fetchOrders,30000)
        this.fetchOrders()
    }    

    //Sets the order info status
    checkOrder(e,order) {
        e.preventDefault();
        this.setState({ orderCheck: order });     
    }
   
    render() {
        return (
            <PendingOrdersList 
                checkOrder = { this.checkOrder } 
                orderCheck = { this.state.orderCheck }
                orders = { this.state.orders }
                itemsPending={ this.state.itemsPending }
            />
           
        )
    }
}


export default PendingOrders;