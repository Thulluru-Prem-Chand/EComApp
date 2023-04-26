import React from 'react';
import ReactDOM from 'react-dom/client';

class Product extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            quantity: 0
        };
        // let sw = [1, 2, 3, 4, 5];
        // sw.map((a) => (console.log(a)));
    }



    changeColor = () => {
        console.log("Prev val:" + this.state.brand);

        if (this.state.brand == "Ford") {
            console.log("In If condition");
            const updatedValue = { brand: "Audi" };
            this.setState(updatedValue);
            console.log("After updating val:" + this.state.brand);
        } else {
            console.log("In else condition");
            const updatedValue = { brand: "Ford" };
            this.setState(updatedValue);
        }

    }

    upCounter = () => {
        let sw = this.state.counter;
        sw++;
        const updatedValue = { counter: sw };
        this.setState(updatedValue);
    }

    downCounter = () => {
        let sw = this.state.counter;
        sw--;
        const updatedValue = { counter: sw };
        this.setState(updatedValue);
    }

    updateLabel = (event) => {
        let sw = event.target.value;
        const updatedValue = { text: sw };
        this.setState(updatedValue);
    }



    updateProductName = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { productName: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateProductPrice = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { productPrice: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateQuantity = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { quantity: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    addProduct = (event) => {
        console.log("okay");
        let products = this.state.products;
        products.push(this.state.productName);
        products.push(this.state.productPrice);
        products.push(this.state.quantity);

        const updatedValue = { products: products };
        this.setState(updatedValue);

        console.log("this.state.products");
        console.log(this.state.products);


        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                product_name: this.state.productName,
                product_price: this.state.productPrice,
                quantity: this.state.quantity
            })
        };

        fetch('http://127.0.0.1:8081/insert_product', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                       alert("Product successfully added!!");

                    }
                    else {
                        alert("Failed to add the Product!!");
                    }
                }
            );



    }


    deleteProduct = (event) => {
        let index = event.target.value;
        console.log("index");
        console.log(index);
    }



    render() {
        let flag = true;
        let sw;
        sw = <div>

            <h1> Add Products:</h1>
            <div className="row">
                <div className="col-lg-4 ">
                </div>
                <div className="col-lg-4 ">
                    <div className="mb-3 mt-3">
                        <label for="product_name" className="form-label">Product Name:</label>
                        <input type="text" value={this.state.productName} onChange={this.updateProductName} className="form-control" id="product_name" placeholder="Enter Product Name" name="product_name" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="product_price" className="form-label">Product Price:</label>
                        <input type="text" value={this.state.productPrice} onChange={this.updateProductPrice} className="form-control" id="product_price" placeholder="Enter Product Price" name="product_price" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="product_quantity" className="form-label">Product Quantity:</label>
                        <input type="number" value={this.state.quantity} onChange={this.updateQuantity} className="form-control" id="product_quantity" placeholder="Enter Product Quantity" name="product_quantity" />
                    </div>
                    <button onClick={this.addProduct} className="btn btn-primary">Add Product</button>
                </div>
            </div>


            {/* <label htmlFor="productName">Product Name:</label>
            <input id="productName" type="text" value={this.state.productName} onChange={this.updateProductName} />
            <label htmlFor="productPrice">Product Price:</label>
            <input id="productPrice" type="text" value={this.state.productPrice} onChange={this.updateProductPrice} />
            <label htmlFor="quantity">Quantity:</label>
            <input id="quantity" type="text" value={this.state.quantity} onChange={this.updateQuantity} /> */}

            {/* <button onClick={this.addProduct}> Add Product</button> */}




        </div>;


        return (sw);
    }
}

export default Product;