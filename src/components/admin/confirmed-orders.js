import React, { Component } from 'react';


const FullOrderIchiroDetails = () => {
    return (
        <div className="full-order-ichiro-details full-order-details">
            <p className="title">Ichiro Restaurant</p>
            <p className="address">Shopping Palace. 347 North End Road, Fulham. SW6 1NN</p>
            <p className="phone">Contact Number: 02036328078</p>
        </div>
    )
}

const FullOrderClientDetails = ({ item }) => {
    return (
        <div className="full-order-client-details full-order-details">
            <p className="full-order-number">
                <span>Num. Order:</span><span>{ item._id }</span> 
                <span>Time: { item.time }</span>
            </p>
            <p className="full-order-phone">
                <span>Phone:</span> 
                <span>{ item.phone }</span>
            </p>
            <p className="full-order-email">
                <span>Email:</span> 
                <span>{ item.email }</span>
            </p>
        </div>
    )
}

const FullOrderItemDetails = ({ item }) => {
    return (
        <div className="full-order-items-details full-order-details">
            {
                item.order.map( value => {
                    return (
                        <p className="full-order-item-values">
                            {value.quantity} {value.name} £{value.price}
                        </p> 
                    )
                })
            }
        </div>
    )
}

const FullOrderTotal = ({ item }) => {
    return (
        <div className="full-order-total full-order-details">
            <span>Total:</span> 
            <span>£{ item.total }</span>
        </div>
    )
}

//Returns the full order to print
const FullOrderDisplay = ({ item }) => {
    function printOrder(e) {
        e.preventDefault();
        const divContents = document.getElementById("full-order-display-info").innerHTML;
        let printWindow = window.open();  
            printWindow.document.write('<html><head><title>Order Info</title>');  
            printWindow.document.write('</head><body >');  
            printWindow.document.write(divContents);  
            printWindow.document.write('</body></html>');  
            printWindow.document.close();  
            printWindow.print();        
    }

    return (
        <div className="full-order-display">
            <div id="full-order-display-info" 
                 className="full-order-display-details">
                <FullOrderIchiroDetails item={ item } />
                <FullOrderClientDetails item={ item } />
                <FullOrderItemDetails item={ item } />
                <FullOrderTotal item={ item } />
            </div>
            <button onClick={ printOrder } 
                    className="full-order-print-button">print</button> 
        </div>    
    )     
}

const OrdersFormYearSelect = () => {
    let years = ["2019","2020","2021","2022","2023","2024","2025"];
    return (
        <div className="orders-form-field">
            <label className="orders-form-label">Year</label>
            <select id="year-selection" 
                    className="orders-form-select">
            {
                    years.map( year => {
                        return (
                            <option id={ year } 
                                    value={ year }>{ year }</option>
                        )
                    })
            }
               </select>
        </div>
    )
}

const OrdersFormMonthSelect = () => {
    let monthNames = ["January","Febraury","March","April","May","June",
                      "July","August","September","October","November","December"];
    return (
        <div className="orders-form-field">
            <label className="orders-form-label-element">Month</label>
            <select id="month-selection" 
                    className="orders-form-select">
               {
                    monthNames.map( month => {
                        return (
                            <option value={ monthNames.indexOf(month) }>{ month }</option>
                        )
                    })
               }
            </select>
        </div>
    )
}

const OrdersFormDaySelect = () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
       days.push(i);
    }

    return (
        <div className="orders-form-field">
            <label className="orders-form-label">Day</label>
            <select id="day-selection" 
                    className="orders-form-select">
                {
                    days.map( day => {
                        return (
                           <option id={ day } 
                                   value={ day }>{ day }</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

const OrdersFormInputs = () => {
    return (
        <div>
            <OrdersFormYearSelect />
            <OrdersFormMonthSelect />
            <OrdersFormDaySelect />
        </div>
    )
}

//Returns the search form to find accepted/recjected orders by day
const SearchForm = ({ searchOrders, orders }) => {
    return(
        <div className="orders-form">
            <h1 className="orders-form-heading">Search Order by date</h1>
            <form>
                <div className="orders-form-inputs">
                    <OrdersFormInputs />
                    <button className="search-form-button" 
                            onClick={ (e) => searchOrders(e) }> Search </button>    
                </div> 
            </form>            
        </div>
    )  
}

const Order = ({ orders, checkOrder }) => {
    return (
        orders.map( item => {
            return (
                <div id={`${item._id}`} 
                     className="order">
                    <div><span>Num. Order:</span> 
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
                        className="check-order-button" 
                        onClick={(e)=> checkOrder(e,item)}>check</button>
                </div>  
            )      
        })
    )
}

const UnexistentOrders = ({ orderType }) => {
    return  (
        <div>
            { orderType === 'acceptedorders' && <h3>No orders accepted</h3> }
            { orderType === 'rejectedorders' && <h3>No orders Rejected</h3> }
        </div>
    )
}

//Returns a list of rejected/accepted orders
const OrdersList = ({ orders, checkOrder, orderType }) => {
    if(orders.length !== 0) {
        return (
            <Order 
                orders={ orders }
                checkOrder={ checkOrder }
            />
        )
    } else {
        return (
            <UnexistentOrders 
                orderType={ orderType } 
            />
        )
    } 
}

//Handles accepted/rejected orders
class ConfirmedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
           orders: [],
           fullOrderDisplay: 'false',
           fullOrderItems: [],
           searchOrders: []
        }

        this.searchOrders = this.searchOrders.bind(this);
        this.checkOrder = this.checkOrder.bind(this);
    }

    //Fetches orders 
    componentDidMount() {
        fetch(`/${this.props.orders}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {   
            this.setState({ orders: response});    
        })

        if(this.state.fullOrderDisplay === 'true') {
            this.setState({ fullOrderDisplay: 'false' });
        }
    }

    //Searches orders by day
    searchOrders(e) {
        e.preventDefault();

        const yearSelector = document.querySelector('#year-selection');
        const yearValue = yearSelector[yearSelector.selectedIndex].value;
       
        const monthSelector = document.querySelector('#month-selection');
        const monthValue = monthSelector[monthSelector.selectedIndex].value;
       
        const daySelector = document.querySelector('#day-selection');
        const dayValue = daySelector[daySelector.selectedIndex].value;

        const fullDate = `${yearValue}-${monthValue}-${dayValue}`;

        const date = {
            date : fullDate
        }

        fetch(`http://wwww.ichirorestaurant.co.uk/${this.props.orders}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(date)
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {   
            const orders = JSON.parse(JSON.stringify(response));
            this.setState({ orders });    
        })
    }

    ///Checks the specific order
    checkOrder(e,item) {
        e.preventDefault();
        this.setState({ fullOrderDisplay: 'true', fullOrderItems: item })  
    }

    render() {
        //If false displays search form and orders list
        if (this.state.fullOrderDisplay === 'false') {
            return (
                <div id="confirmed-orders-main">
                    { this.props.orders === 'acceptedorders' && 
                        <h1 className="confirmed-orders-first-heading">Accepted orders</h1> }
                    { this.props.orders === 'rejectedorders' && 
                        <h1 className="confirmed-orders-first-heading">Rejected orders</h1> }
                    <SearchForm
                        searchOrders = { this.searchOrders } 
                        orders = { this.props.orders }
                    />
                    <h2 className="confirmed-orders-second-heading">
                        Today's Orders
                    </h2>
                    <OrdersList 
                        orders ={ this.state.orders }
                        checkOrder = { this.checkOrder }
                        orderType = { this.props.orders }
                    />
                </div>
            )    
        //Otherwise returns the specific order
        } else {
            return (
                <FullOrderDisplay 
                    item={ this.state.fullOrderItems } 
                />
            )
        }        
    }           
}

export default ConfirmedOrders;
