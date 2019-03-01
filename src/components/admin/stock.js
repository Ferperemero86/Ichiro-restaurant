import React, { Component } from 'react';


const AddItemMessages = ({ newElementAdded, elmExists, newItemPriceValidation, 
                           newItemNameValidation, newItemTypeValidation }) => {
    return (
        <div>
            { newElementAdded === 'true' && 
            <p className="add-item-message-success">New item created!</p> }
            { newElementAdded === 'error' && 
            <p className="add-item-message-fail">Something went Wrong!</p> }
            { elmExists === 'true' && 
            <p className="add-item-message-fail">Element already exists! </p> }
            { newItemNameValidation === 'error' && 
            <p className="add-item-message-fail">Please include just letters and numbers for item!</p> }
            { newItemPriceValidation === 'error' && 
            <p className="add-item-message-fail">Please introduce just numbers for Price!</p> }
            { newItemTypeValidation === 'error' && 
            <p className="add-item-message-fail">Please introduce just letters/numbers or / for type!</p> }
        </div>
    )
}

const AddItemsFields = () => {
    return (
        <ul className="stock-add-item-fields">
            <li className="stock-add-item-element">
                <p className="stock-add-item-text">Item</p>
            </li>
            <li className="stock-add-item-element">
                <p className="stock-add-item-text">Price</p>
            </li>
            <li className="type">
                <p className="stock-add-item-text">Type</p>
            </li>
            <li className="stock-add-item-element">
                <p className="stock-add-item-text">Availability</p>
            </li>
        </ul>   
    )
}

const AddItemNameInput = ({ addValue, itemName }) => {
    return (
        <li className="stock-add-item-element">
        <input id="item-name"
               onChange = { addValue } 
               value = { itemName }
               className="stock-add-item-input" />
        </li>
    )
}

const AddItemPrice = ({ addValue, itemPrice }) => {
    return (
        <li className="stock-add-item-element">
        <input id="item-price"
               onChange={ addValue } 
               value={ itemPrice } 
               className="stock-add-item-input"/>
        </li>
    )
}

const AddItemType = ({ addValue, itemType }) => {
    return (
        <li className="type">
        <input id="item-type"
               onChange={ addValue } 
               value={ itemType } 
               className="stock-add-item-input"/>
        </li>
    )
}

const AddItemStock = ({ addValue,outStock }) => {
    return (   
        <li className="stock-add-item-element">
            <select id="out-stock"
                    onChange={ addValue } 
                    value={ outStock }
                    className="stock-add-item-select">
                <option  value='false'>Available</option>
                <option  value='true'>Out of Stock</option>
            </select>
        </li>
    )
}

const AddItemTextArea = ({ addValue, newItemDesc }) => {
    return (
        <div> 
            <textarea id="item-desc" 
                      className="stock-add-item-text-area" 
                      maxlength="200" 
                      rows="10" 
                      cols="60" 
                      onChange={ addValue } 
                      value={ newItemDesc }>
            </textarea>
        </div>
    )
}

const AddItemButtons = ({ closeItem, saveItem }) => {
    return (
        <div>
            <button  onClick={ closeItem } 
                     className="stock-add-item-button">Close</button>
            <button  onClick={ saveItem }  
                     className="stock-add-item-button">Save</button>
        </div>
    )
}

const AddItemInputs = ({ addValue, newItemDesc, closeItem, saveItem, 
                         outStock, itemType, itemPrice, itemName }) => {
    return (
        <ul className="stock-add-item-inputs-first">
            <AddItemNameInput
               addValue={ addValue }
               itemName={ itemName }
            />
            <AddItemPrice
                addValue={ addValue }
                itemPrice={ itemPrice }
            />
            <AddItemType 
                addValue={ addValue }
                itemType={ itemType }
            />
            <AddItemStock 
                addValue={ addValue }
                outStock={ outStock }
            />
      
        <div className="stock-add-item-inputs-second">
            <AddItemTextArea 
                addValue={ addValue }
                newItemDesc={ newItemDesc }
            />
            <AddItemButtons 
                closeItem={ closeItem }
                saveItem={ saveItem }
            />
        </div>
    </ul>                      
    )
}


//Handles new items added by Admin
class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItemName: '',
            newItemPrice: '',
            newOutStock: '',
            newItemType: '',
            newItemDesc: '',
            newItemNameValidation: '',
            newItemPriceValidation: '',
            newItemDescValidation: '',
            newItemTypeValidation: '',
            newElementAdded: '',
            elmExists: ''
        }
        this.addValue = this.addValue.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.closeItem = this.closeItem.bind(this);
    }

    //Takes values from new item input forms and set new states with those values
    addValue() {
        const newItemName = document.querySelector('#item-name').value;
        const newItemPrice = document.querySelector('#item-price').value;
        const newOutStock = document.querySelector('#out-stock').value;
        const newItemType = document.querySelector('#item-type').value;
        const newItemDesc = document.querySelector('#item-desc').value;

        this.setState ({ newItemName, newItemPrice, newOutStock , newItemType, newItemDesc })
    }

    //Hides AddItem component
    closeItem(e) {
        e.preventDefault();
        this.props.restart('false','');
    }

    //Validates new item inputs form content and send content to server
    saveItem() {
        const newItemName = this.state.newItemName;
        const newItemPrice = this.state.newItemPrice;
        const newOutStock = this.state.newOutStock;
        const newItemType = this.state.newItemType;
        const newItemDesc = this.state.newItemDesc;


        let totalValidation = [];
        let errors = {};

        const nameRegExp = /^( ?\w{1,10})( \w{1,10})?( \w{1,10})?( \w{1,10})?$/;
        const priceRegExp = /^( ?[0-9]{1,2})(\.)?([0-9]{1,2})?$/;
        const typeRegExp = /^(\w{1,10})(\/)?( )?(\w{1,10})?$/;
    
        if (nameRegExp.test(newItemName)) {
            totalValidation.push('true');
        } else {
            errors.newElementName ='errorNameValidation';
        }
    
        if (priceRegExp.test(newItemPrice)) {
            totalValidation.push('true');
        } else {
            errors.newElementPrice = 'errorPriceValidation';   
        }
        if (typeRegExp.test(newItemType)) {
            totalValidation.push('true');
        } else {
            errors.newElementType = 'errorTypeValidation';   
        }  
        
        //If name,price or type validation are not good sends messag
        if (totalValidation.length !== 3) {
            if( (errors.newElementName === 'errorNameValidation') && (errors.newElementPrice === 'errorPriceValidation')
              && (errors.newElementType === 'errorTypeValidation') ) {
                this.setState({ newItemNameValidation: 'error', newItemPriceValidation: 'error', newItemTypeValidation: 'error' });
            } 

            if((errors.newElementName === 'errorNameValidation') && (errors.newElementPrice !== 'errorPriceValidation')
              && (errors.newElementType === 'errorTypeValidation') ){
                this.setState({ newItemNameValidation: 'error', newItemPriceValidation: '', newItemTypeValidation: 'error' });
            }

            if((errors.newElementPrice === 'errorPriceValidation') && (errors.newElementName !== 'errorNameValidation')
              && (errors.newElementType === 'errorTypeValidation') ){
                this.setState({ newItemPriceValidation: 'error', newItemNameValidation: '', newItemTypeValidation: 'error' });
        
            }

            if((errors.newElementPrice === 'errorPriceValidation') && (errors.newElementName !== 'errorNameValidation')
              && (errors.newElementType !== 'errorTypeValidation') ){
                this.setState({ newItemPriceValidation: 'error', newItemNameValidation: 'error', newItemTypeValidation: 'error' });
          }

        //If they are both ok sends content to server and fetch response
        } else {
            this.setState({ newItemNameValidation: '', newItemPriceValidation: '', newItemTypeValidation: '' });
        
            const newItemValue = {
                newItemName,
                newItemPrice,
                newItemDesc,
                newItemType,
                newOutStock    
            }
    
            fetch('stock/addnewitem', { 
                method: 'post',
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItemValue)
            })    
            .then(result => {
                return result.json()
            })
            .then(result => {
                //If the element already exists changes state
                if(result.elmExists === 'true') {
                    this.setState({elmExists: 'true'})
                }
                //If new element addition succeed or not send message
                if (result.newElementAdded) {
                    if(result.newElementAdded === 'true') {
                        this.addItem('true');
                        this.props.itemUpdated('',result.products)
                    } else {
                        this.addItem('error');
                    }
                    //If there is an error in name or price validation sends message
                } else {
                    if((result.newElementName !== undefined) && (result.newElementName ==='errorNameValidation')) {
                        this.setState({ newItemNameValidation: 'error'})
                    }
                    if((result.newElementPrice !== undefined ) && (result.newElementPrice ==='errorPriceValidation')) {
                        this.setState({ newItemPriceValidation: 'error'})
                    }
                    if((result.newElementPrice !== undefined ) && (result.newElementType ==='errorTypeValidation')) {
                        this.setState({ newItemTypeValidation: 'error'})
                    }
                    if((result.newElementDesc !== undefined ) && (result.newElementDesc ==='errorDescValidation')) {
                        this.setState({ newItemDescValidation: 'error'})
                    }
                }  
            })
        }
    }

    //If the new item was added/not added send message
    addItem(status) {
        if (status === 'true') {
            this.setState({newElementAdded: 'true'});
            setTimeout(() => {
                this.setState({newElementAdded: ''});
            },3000)
            this.setState({newItemNameValidation: '', newItemPriceValidation : ''});
        } else {
            this.setState({newElementAdded: 'error'});
            this.setState({newItemNameValidation: '', newItemPriceValidation : ''})
        }
    }

    render() {
        return(
            <div id="stock-add-item-main"> 
                <h1 className="stock-add-item-first-heading">
                    Stock
                </h1>
                <AddItemMessages 
                    newElementAdded={ this.state.newElementAdded }
                    elmExists={ this.state.elmExists } 
                    newItemPriceValidation={ this.state.newItemPriceValidation } 
                    newItemNameValidation={ this.state.newItemValidation }
                    newItemTypeValidation={ this.state.newItemTypeValidation }
                />
                <AddItemsFields />
                <AddItemInputs 
                    addValue={ this.addValue }
                    newItemDesc={ this.state.newItemDesc }
                    closeItem={ this.closeItem }
                    saveItem={ this.saveItem }
                    outStock={ this.state.outStock }
                    addValue={ this.addValue }
                    itemType={ this.state.itemType }
                    itemPrice={ this.state.itemPrice }
                    itemName={ this.state.itemName }   
                />                     
            </div>
        )
    }
}


const EditItemMessages = ({ itemNameValidation, itemPriceValidation, itemTypeValidation, 
                            itemDescValidation, itemDeleted, elmExists }) => {
    return (
        <div>
            { itemNameValidation === 'error' && 
            <p className="edit-item-messages">Please include just letters and numbers for item!</p> }
            { itemPriceValidation === 'error' && 
            <p className="edit-item-messages"> Please introduce just numbers for Price!</p> }
            { itemTypeValidation === 'error' && 
            <p className="edit-item-messages">Please introduce letter,numbers or / for type!</p> }
            { itemDescValidation === 'error' && 
            <p className="edit-item-messages">Please introduce a description!</p>  }
            { itemDeleted === 'false' && 
            <p className="edit-item-messages">Couldn't Delete!</p> }
            { itemDeleted === 'error' && 
            <p className="edit-item-messages">Something went wrong!</p> }
            { elmExists === 'true' && 
            <p className="edit-item-messages">Element Already Exists!</p> }
        </div>
    )
}

const EditItemFields = () => {
    return (
        <ul className="edit-form-stock-fields">
            <li className="edit-form-stock-fields-element">Item</li>
            <li className="edit-form-stock-fields-element">Price</li>
            <li className="edit-form-stock-fields-element">Type</li>
            <li className="edit-form-stock-fields-element">Availability</li>
        </ul>  
    ) 
}

const EditItemNameInput = ({ item, itemName, changeValue }) => {
    return (
        <li className="edit-form-stock-element">
            <input className={ `${ item.id }-input edit-form-stock-input` } 
                   id={ item.name } 
                   onChange={ ()=> changeValue('item-name', item) } 
                   value={ itemName } />
        </li>
    )
}

const EditItemPriceInput = ({ item, itemPrice, changeValue }) => {
    return (
        <li className="edit-form-stock-element">
            <input className={ `${ item.id }-input edit-form-stock-input` } 
                   id={ `${ item.name }-price` } 
                   onChange={ ()=> changeValue('item-price', item) } 
                   value={ itemPrice } />
        </li>
    )
}

const EditItemTypeInput = ({ item, itemType, changeValue }) => {
    return (
        <li className="edit-form-stock-element">
            <input className={ `${ item.id }-input edit-form-stock-input` } 
                   id={ `${ item.name }-type` } 
                   onChange={ ()=> changeValue('item-type', item) } 
                   value={ itemType } />
        </li>
    )
}

const EditItemStockInput = ({ item, outStock, changeValue }) => {
    return (
        <li className="edit-form-stock-element">
            <select id={ `${ item.name }-outStock` } 
                    className="edit-form-stock-select"
                    onChange={ ()=> changeValue('item-outStock', item) } 
                    value={ outStock} >
                <option id={ `${ item.name }-option-available` } 
                        value='false'>Available</option>
                <option id={ `${ item.name }-option-outStock` } 
                        value='true'>Out of Stock</option>
            </select>
        </li>
    )
}

const EditItemTextAreaInput = ({ item, itemDescription, changeValue }) => {
    return (
        <div className="edit-form-stock-text-area">
            <textarea id={ `${ item.name }-description`} 
                      className="edit-form-stock-text-area-element"  
                      maxlength="100" 
                      rows="10" 
                      cols="60" 
                      onChange={ ()=> changeValue('item-description', item) } 
                      value={ itemDescription }>
            </textarea>
        </div>
    )
}

const EditItemButtons = ({ item, closeItem, deleteItem, saveItem }) => {
    return (
        <div className="edit-form-stock-buttons">
            <button  onClick={ (e)=> closeItem(e, item.name, item) } 
                     className="edit-form-stock-button">Close</button>
            <button  onClick={ (e)=> deleteItem(e, item.id) } 
                     className="edit-form-stock-button">Delete</button>
            <button  onClick={ (e)=> saveItem(e, item) } 
                     className="edit-form-stock-button">Save</button>
        </div>
    )
}


//Handles the edition of existing item
class ChangeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: this.props.item.name,
            itemPrice: this.props.item.price,
            itemType: this.props.item.type,
            itemDescription: this.props.item.description,
            outStock: this.props.item.outStock,
            itemNameValidation: '',
            itemPriceValidation: '',
            itemTypeValidation: '',
            itemDeleted: '',
            elmExists: ''
        }

        this.changeValue = this.changeValue.bind(this);
        this.closeItem = this.closeItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    //Gets item values and set new states
    changeValue() {
        const itemName = document.getElementById(`${ this.props.item.name }`).value;
        const itemPrice = document.getElementById(`${ this.props.item.name }-price`).value;
        const outStock = document.getElementById(`${ this.props.item.name }-outStock`).value;
        const itemType = document.getElementById(`${ this.props.item.name }-type`).value;
        const itemDescription  = document.getElementById(`${ this.props.item.name }-description`).value;
        
        this.setState({ itemName, itemPrice, outStock, itemType, itemDescription });
    }

    //Hides the item form for edition
    closeItem(e) {
        e.preventDefault();
        this.props.restart('','');  
    }

    //Sends the item id to server to delete it
    deleteItem(e,itemId) {
        e.preventDefault();

        const itemIdValue = {
            itemId
        }

        fetch('/stock/edititem/delete', {
            method: 'post',
            headers: {
                   'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemIdValue)
            })
            .then((response) => { 
                return response.json();
            })
            .then(result=> {
                if (result.deleted === 'true') {      
                    this.props.deleteItem();
                    this.props.itemUpdated();
                    this.props.restart('',result.products); 
                }      
                if (result.deleted === 'error') {
                    this.setState({ itemDeleted: 'error' });
                   
                }
                if( result.deleted === 'false') {
                    this.setState({ itemDeleted: 'false' })
                }
            })
    }

    //Validates data item from states and sends content to the server
    saveItem(e,item) {
        e.preventDefault();
        const name = this.state.itemName;
        const price = this.state.itemPrice;
        const type = this.state.itemType;
        const description = this.state.itemDescription;
        const outStock = this.state.outStock;

        let totalValidation = [];
        let errors = {};

        const nameRegExp = /^(([ ]{1,10})?\w{1,10})( \w{1,10})?( \w{1,10})?( \w{1,10})?([ ]{1,10})?$/;
        const priceRegExp = /^(([ ]{1,10})?[0-9]{1,2})(\.)?([0-9]{1,2})?([ ]{1,10})?$/;
        const typeRegExp = /^(\w{1,10})(\/)?( )?(\w{1,10})?$/;
    
        if (nameRegExp.test(name)) {
            totalValidation.push('true');
        } else {
            errors.newElementName ='errorNameValidation';
        }
    
        if (priceRegExp.test(price)) {
            totalValidation.push('true');
        } else {
            errors.newElementPrice = 'errorPriceValidation';   
        }

        if (typeRegExp.test(type)) {
            totalValidation.push('true');
        } else {
            errors.newElementType = 'errorTypeValidation';   
        } 
        //If validation is wrong send error messages
        if (totalValidation.length !== 3) {
            if( (errors.newElementName === 'errorNameValidation') && (errors.newElementPrice === 'errorPriceValidation') 
               && (errors.newElementType === 'errorTypeValidation')) {
                this.setState({ itemNameValidation: 'error', itemPriceValidation: 'error', itemTypeValidation: 'error' });
            } else {
                if(errors.newElementName === 'errorNameValidation') {
                    this.setState({ itemNameValidation: 'error' });
                } else {
                    this.setState({ itemNameValidation: '' });
                }
                if(errors.newElementPrice === 'errorPriceValidation') {
                    this.setState({ itemPriceValidation: 'error' });
                } else {
                    this.setState({ itemPriceValidation: '' });
                }
                if(errors.newElementType === 'errorTypeValidation') {
                    this.setState({ itemTypeValidation: 'error' });
                } else {
                    this.setState({ itemTypeValidation: '' });
                }
            }
           
        //Sends content to the server
        } else {
            this.setState({ itemNameValidation : '', itemPriceValidation : '', itemTypeValidation : ''  });
           
            const itemValues = {
                item,
                name,
                price,
                type,
                description,
                outStock
            }
    
            fetch('/stock/edititem', {
                method: 'post',
                headers: {
                       'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemValues)
                })
                .then((response) => { 
                    return response.json();
                })
                .then((result) => {
                        //Handles error validations
                        if( (result.elementName ==='errorNameValidation') && (result.elementPrice ==='errorPriceValidation') && (result.elementType ==='errorTypeValidation') ) {
                            this.setState({ itemPriceValidation: 'error', itemNameValidation: 'error', itemTypeValidation: 'error' });
                        } 
                        else if (result.elementName === 'errorNameValidation') {
                            this.setState({ itemNameValidation: 'error', itemPriceValidation: '', itemTypeValidation: '' });
                        }
                        else if (result.elementPrice ==='errorPriceValidation') {
                            this.setState({ itemPriceValidation: 'error', itemNameValidation: '', itemTypeValidation: '' });
                        }
                        else if (result.elementType ==='errorTypeValidation') {
                            this.setState({ itemPriceValidation: '', itemNameValidation: '', itemTypeValidation: 'error' });
                        }
                        
                        else if ( (result.elementName !=='errorNameValidation') && (result.elementPrice !=='erroPriceValidation') && (result.elementType !=='errorTypeValidation') ){
                            if (result.elmExists === 'true') {
                                this.setState({ elmExists: 'true' })
                            } else {
                                this.props.itemUpdated(result.updated,result.products);
                                this.props.restart('',result.products); 
                            }     
                        }           
                })    
        }
    }

    render() {
        //Displays error massages and items for edition
        return (
            <div className="edit-form-stock"> 
                <h1>Stock</h1>
                <EditItemMessages
                    itemNameValidation={ this.state.itemNameValidation }
                    itemPriceValidation={ this.state.itemPriceValidation }
                    itemTypeValidation={ this.state.itemTypeValidation }
                    itemDescValidation={ this.state.itemDescValidation }
                    itemDeleted={ this.state.itemDeleted } 
                    elmExists={ this.state.elmExists } 
                />
                <EditItemFields />
                <ul className="edit-form-stock-inputs-first">
                <EditItemNameInput 
                    item={ this.props.item }
                    itemName= { this.state.itemName }
                    changeValue={ this.changeValue }
                />
                 <EditItemPriceInput 
                    item={ this.props.item }
                    itemPrice={ this.state.itemPrice }
                    changeValue={ this.changeValue }
                 />
              
                <EditItemTypeInput 
                    item={ this.props.item }
                    itemType={ this.state.itemType }
                    changeValue={ this.changeValue }
                />
                <EditItemStockInput 
                    item={ this.props.item }
                    outStock={ this.state.outStock }
                    changeValue={ this.changeValue }
                />
                </ul> 
                <div className="edit-form-stock-inputs-second">
                    <EditItemTextAreaInput
                        item={ this.props.item }
                        itemDescription={ this.state.itemDescription }
                        changeValue={ this.changeValue }
                    /> 
                    <EditItemButtons 
                        item={ this.props.item }
                        closeItem={ this.closeItem }
                        saveItem={ this.saveItem }
                        deleteItem={ this.deleteItem }
                    />    
                </div>                                                     
            </div>
        )
    }
}


const StockProductsMessages = ({ itemDeleted, itemUpdated, newElement, elmExists }) => {
    return (
        <div>
            { itemDeleted === 'true' && 
            <p className="stock-products-message-succeed"> Item Deleted!</p> }
            { itemUpdated === 'elmExists' && 
            <p className="stock-products-message-fail">Item Already exists!</p> }
            { itemUpdated === 'true' && 
            <p className="stock-products-message-succes">Item updated! </p> }
            { newElement === 'error' && 
            <p className="stock-products-message-fail">Something went wrong!</p> }
            { elmExists === 'true' && 
            <p className="stock-products-message-fail">The element already exists!</p> }
            { newElement === 'errorValidationName' && 
            <p className="stock-products-message-fail">Something went wrong!</p> }
        </div>
    )
}

const StockItemFields = () => {
    return (
        <ul className="stock-fields-list">
            <li className="stock-fields-element"><p className="stock-fields-text">Item</p></li>
            <li className="stock-fields-element"><p className="stock-fields-text">Price</p></li>
            <li className="stock-fields-type"><p className="stock-fields-text">Type</p></li>
            <li className="stock-fields-description"><p className="stock-fields-text">Description</p></li>
            <li className="stock-fields-element"><p className="stock-fields-text">Availability</p></li>
        </ul>
    )
}

const StockItem = ({ editItem, products }) => {
    const items = {};
   // return (
        products.map( item => {
            if (!items[item.type]) {
                items[item.type] = [];
            }
            if (items[item.type]) {
                items[item.type].push(item);
            }
        });

        return Object.keys(items).map(key => {
            return items[key].map(item => {
                 //Returns Items for edition
                return(
                   <div> 
                       <ul className="stock-item-list">
                           <li className="stock-item-element">
                               <p className={ `${item.id } stock-item-text` }>{ item.name }</p>
                           </li>
                           <li className="stock-item-element">
                               <p className={ `${item.id } stock-item-text` }>{ item.price }</p>
                           </li>
                           <li className="stock-item-type">
                               <p className={` ${item.id  } stock-item-text` }>{ item.type }</p>
                           </li>
                           <li className="stock-item-description">
                               <p className={ `${ item.id } stock-item-text` }>{ item.description }</p>
                           </li>
                           <li className="stock-item-element">
                               <p className={ `${ item.id } stock-item-text` }>{ item.outStock === 'false' ? 
                                   <p className="available">Available</p> : 
                                   <p className="outStock">out stock</p> }</p>
                           </li>
                           <li>
                               <button className={ `${item.id} item-button edit-item-button` } 
                                       onClick={ (e)=> editItem(e,item) }>Edit</button>
                           </li>
                       </ul>                       
                   </div>
                ) 
            })
        })

}

//Handles stock products
class StockProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products,
            itemUpdated: 'false',
            item: '',
            addItem: 'false',
            newElement: 'false',
            newItemNameValidation: '',
            elmExists: '',
            itemDeleted: ''
        }
        this.editItem = this.editItem.bind(this);
        this.restartState = this.restartState.bind(this);
        this.itemUpdated = this.itemUpdated.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    //Fetches products
    componentDidMount() {
        fetch('/stock', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
        })    
        .then((response) => { 
            return response.json();
        })
        .then((result) => {
            this.setState({ products: result })            
        })
       
    }

    //Gets the item info to edit
    editItem(e, stockItem) {
        e.preventDefault();
        this.setState({ item: stockItem });
    }

    //Sets state item status state as deleted
    deleteItem() {
        this.setState({ itemDeleted: 'true' })
        setTimeout(() => {
            this.setState({ itemDeleted: 'false' })
        },3000)
    }
    
    //Sets states with initial value and update items after changes
    restartState(addItem, products) {
        if (addItem === 'false') {
            this.setState({ addItem: 'false'})
        } 
        if (products === '' ) {
            this.setState({ item: ''})
        } 
        else {
            this.setState({ item: '',products})
        }
    }

    //Updates states and changes
    itemUpdated(itemUpdated,products,newElement) {
        this.setState({ itemUpdated,products,newElement })
        setTimeout(() => {
            this.setState({ itemUpdated: ''})
        },3000)
    }

    //Sets add item state as true
    addItem() {
        this.setState({ addItem: 'true' })
    }
        
    render() {
        //if there are items to show return items for edition
        if (this.state.item !== '') {
            return <ChangeItem 
                       item = { this.state.item }
                       restart = { this.restartState }
                       itemUpdated = { this.itemUpdated }
                       deleteItem = { this.deleteItem }
                   />
        //shows add item form
        } else if (this.state.addItem === 'true') {
            return <AddItem  
                       restart = { this.restartState }
                       itemUpdated = { this.itemUpdated }
                       addItem = { this.addItem }
                   />
        
        } else {
            //Handles error messages
            return (
                <div id="stock-main">
                    <h1 className="stock-first-heading">Stock</h1>
                    <div>
                        <button onClick={ this.addItem } 
                                className="add-item-button">Add item</button>
                    </div>
                    <StockProductsMessages 
                        itemDeleted={ this.state.itemDeleted }
                        itemUpdated={ this.state.itemUpdated }
                        newElement={ this.state.newElement }
                        elmExists={ this.state.elmExists }
                    />
                    <StockItemFields />
                    <StockItem  
                        editItem={ this.editItem }
                        products={ this.state.products }
                    />
                </div>
            )
        }
    }
}

//Displays the stock 
class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [] 
        }
    }

    componentDidMount() {
        fetch('/stock', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json'
            },
        })    
        .then((response) => { 
            return response.json();
        })
        .then((result) => {
            this.setState({ products: result })            
        })
    }

    render() {
        return (
            <StockProducts products={ this.state.products } />
        )
    }
}

export default Stock;