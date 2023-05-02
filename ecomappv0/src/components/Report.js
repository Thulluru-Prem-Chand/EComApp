import React from 'react';
import ReactDOM from 'react-dom/client';

class Report extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            orders: [],
            productName: "",
            productPrice: 0,
            quantity: 0,
            selectedFile: null,
            selectedFileName: null,
            productImage: "",
            productDescription: "",
            Name: "",
            startDate: "",
            endDate: ""
                };
        this.render();
    }

    updateStartDate = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { startDate: sw };
        this.setState(updatedValue);
        console.log(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updateEndDate = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { endDate: sw };
        this.setState(updatedValue);
        console.log(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateName = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { Name: sw };
        this.setState(updatedValue);
        console.log(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    report = (event) => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                start_date: this.state.startDate,
                end_date: this.state.endDate
            })
        };

        this.render();
        fetch("http://localhost:8081/report", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {

                    console.log(res);
                    const updatedValue = { orders: res };
                    this.setState(updatedValue);

                    // const updatedValue = { products: res };
                    // this.setState({startDate: startDate, endDate: endDate })



                    // this.setState(updatedValue);



                }
            )

    }

    ChangeOrderStatus = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);
        
        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_status: event.target.value,
                order_id: event.target.getAttribute('order_id')
                
            })
        };

        fetch("http://localhost:8081/order_status", postData)
        .then(
            res => (res.json())
        )
        .then(
            (res) => {

                console.log(res);
               alert("order status changed successfully");

                // const updatedValue = { products: res };
                // this.setState({startDate: startDate, endDate: endDate })



                // this.setState(updatedValue);



            }
        )

    }


    render() {
        let sw;
        sw = <div>

            <h1>Report:</h1>
            <div className="row">
                <div className="col-lg-4 ">
                </div>
                <div className="col-lg-4 ">
                    <div className="mb-3 mt-3">
                        <label for="start_date" className="form-label">Please select start date:</label>
                        <input type="date" value={this.state.startDate} onChange={this.updateStartDate} className="form-control" id="start_date" name="start_date" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="product_price" className="form-label">Please select end date:</label>
                        <input type="date" value={this.state.endDate} onChange={this.updateEndDate} className="form-control" id="product_price" name="product_price" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="discount" className="form-label">Please enter customer Name/Number:</label>
                        <input type="text" value={this.state.Name} onChange={this.updateName} className="form-control" id="discount" placeholder="Enter Customer name/number" name="discount" />
                    </div>
                </div>
            </div>




            <br></br>
            <div class="text-center">
                <button className='btn btn-dark' onClick={this.report}>show report</button>
            </div>
            {/* 
            <div className='row'>
                { */}
            <table class="table">

                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Total</th>
                        <th scope="col">Order State</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.orders.map(
                            (order, i) => (


                                <tr>
                                    {/* <div className="col-lg-2 border p-3 bg-white " style={{ marginLeft: "20px", marginTop: "20px" }}> */}
                                    <th scope="row">{order.user_id}</th>
                                    <td> <h4 className='text-capitalize'>{this.state.Name}</h4></td>
                                    <td><h4>{order.mobile_number}</h4></td>
                                    <td><p>Rs. {order.total_payable} /-</p></td>
                                    <td>
                                    <select className="form-select" value={this.state.order_status} order_id={order.order_id} onChange={this.ChangeOrderStatus} type="text">
                                        <option selected>Order State</option>
                                        <option value="pending" >pending</option>
                                        <option value="dispatched">dispatched</option>
                                        <option value="delivered">delivered</option>
                                    </select></td>
                                    <td><h4 className='date'>{order.date}</h4></td>

                                    {/* </div> */}


                                </tr>
                            )
                        )
                    }


                </tbody>


            </table>


        </div>;

        return (sw);
    }

}
export default Report;