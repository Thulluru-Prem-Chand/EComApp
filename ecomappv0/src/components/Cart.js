// Almost out of storage … If you run out, you can't create or edit files, send or receive emails on Gmail, or back up to Google Photos.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'bootstrap';

class Cart extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            quantity: 0,
            cart: 0,
            id: 0,
            product_id: 0,
            finalPrice:0,
            searchProduct: "",
            totalItems: 0,
            total: 0
        };

        this.showProduct();

        // let sw = [1, 2, 3, 4, 5];
        // sw.map((a) => (console.log(a)));
    }



    showProduct = (event) => {
        fetch("http://localhost:8081/show_cart")
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    const updatedValue = { products: res };
                    let totalItems = 0;
                    let total=0;
                    this.setState({totalItems:0,total:0})
                    for (const item of res) {
                        totalItems += item.count;
                        console.log(item.count);
                        console.log(item.final_price);
                     
                       
                        total+=item.final_price*item.count;
                        console.log(item.final_price);
                    }
                    console.log("Total Items: " + totalItems);
                    console.log("Total : " + total);
                    this.setState({totalItems:totalItems,total:total})
                    this.setState(updatedValue);
                }
            )

    }


    addcart = (event) => {
        console.log("okay");
        let cart = event.target.value;
        console.log(event);
        // cart.push(this.state.product_id);
        const updatedValue = { cart: cart };
        this.setState(updatedValue);

        console.log("this.state.products");
        console.log(this.state.cart);
        //         let totalItems = 0;
        // for (const item of cart.items) {
        //   totalItems += item.quantity;
        // }
        // console.log("Total Items: " + totalItems);

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                // product_id: event.target.value
                product_id: event.target.getAttribute('product_id')
                
                

            })
        };


        fetch('http://localhost:8081/add_cart', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        this.showProduct();
                        // this.setState({ loggedIn: true });
                        // this.setState({ username: res.user_details.first_name });
                        // count=count+1

                    }
                    else {
                        // this.setState({ loggedIn: false });
                        // this.setState({ error: "Wrong credentials" });

                    }
                }
            );
    }


    deletecart = (event) =>{
        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: event.target.getAttribute('product_id')
            })
        };

        fetch("http://localhost:8081/delete_cart_single_product", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    if (res.success) {
                        this.showProduct();
                    }
                }
            )

    };





    deleteproduct = (event) => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: event.target.value
            })
        };

        fetch("http://localhost:8081/delete_cart", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    if (res.success) {
                        this.showProduct();
                    }
                }
            )
    }

    updatedeleteProduct = (event) => {

        let sw = event.target.value;
        const updatedValue = { deleteproduct: sw };
        this.setState(updatedValue);
    }
    // disp=(event)=>{
    //     let totalItems = 0;
    // for (const item of products.items) {
    //   totalItems += item.quantity;
    // }
    // console.log("Total Items: " + totalItems);
    // }
    NumFormatter=(data) =>{
        return parseFloat(data).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
   

    render() {
        let sw;
        const formatter = new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3 });
        sw = <div>

            {/* <h1> Products List: </h1> */}
            <br></br>
            <div className='row'>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="input-group">
                        <div className="form-outline">
                            {/* <input value={this.state.deleteproduct} onChange={this.updatedeleteProduct} type="search" id="form1" className="form-control" /> */}
                        </div>

                    </div>
                </div>
            </div>

            <div className='row'>
                {
                    this.state.products.map(
                        (product, i) => (
                            <div className="col-lg-2 border p-3 bg-white " style={{ marginLeft: "20px", marginTop: "20px" }}>
                                <img className="img-thumbnail" src={product.product_image} style={{ height: "150px", width: "150px" }} />
                                <h4 className='text-capitalize'>{product.product_name}</h4>
                                <h6>Rs. {formatter.format(product.final_price)} /-</h6>
                                <button className='btn btn-dark'  product_id={product.product_id}  onClick={this.addcart}  > + </button>
                                <span> {product.count} </span>
                                <button className='btn btn-dark' product_id={product.product_id} onClick={this.deletecart} > - </button>
                                <br></br>
                               <div>
                                <button className='btn btn-dark' value={product.product_id} onClick={this.deleteproduct}>Delete</button>
                                </div>
                                {/* <div>
                                    
                                    <span id="item-name">{this.state.products.productName}</span>
                                    <span style={{ marginLeft: 5 }} id="item-quantity">
                                        {this.state.products.count}x
                                    </span>
                                    <div className="border-bottom mb-3">
                                        <span>Total: </span>
                                        <span>
                                            Rs.
                                            {this.state.cart.total.toLocaleString(undefined, {
                                                minimumFractionDigits: 2
                                            })}
                                        </span>
                                    </div>
                                    <div className="border-bottom mb-3">
                                        <span>Total Items: </span>
                                        <span>{this.state.cart.items.length}</span>
                                    </div>
                                    <div className="border-bottom mb-3">
                                        <span>Total Items: </span>
                                        <span>
                                            {this.state.cart.items.reduce(
                                                (accum, item) => accum + item.quantity,
                                                0
                                            )}
                                        </span>
                                    </div>
                                </div>
 */}

                            </div>

                        )
                    )
                }
            </div>
            <p>Total items : {this.state.totalItems}</p>
            <p>Total amount: Rs  {formatter.format(this.state.total)} /-</p>
            
            <br></br>
            <button className='btn btn-dark' onClick={this.placeorder}>Place Order</button>
            
            {/* <span>{product.items.reduce((accum,item) => accum + item.quantity, 0)}</span> */}
        </div>;


        return (sw);
    }
}

export default Cart;