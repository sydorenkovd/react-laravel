import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product'
/* Main Component */
class Main extends Component {

    constructor() {

        super();

        /* currentProduct keeps track of the product currently
         * displayed */
        this.state = {
            products: [],
            currentProduct: null
        }
    }

    componentDidMount() {
        /* fetch API in action */
        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                //Fetched product is stored in the state
                this.setState({ products });
            });
    }

    renderProducts() {
        return this.state.products.map(product => {
            return (
                //this.handleClick() method is invoked onClick.
                <li onClick={
                    () =>this.handleClick(product)} key={product.id} >
                    { product.description }
                </li>
            );
        })
    }

    handleClick(product) {
        //handleClick is used to set the state
        this.setState({currentProduct:product});

    }

    render() {
        return (
            /* The extra divs are for the css styles */
            <div>
                <div className="col-xs-4">
                    <h3> All products </h3>
                    <ul>
                        { this.renderProducts() }
                    </ul>
                </div>

                <Product product={this.state.currentProduct} />
            </div>
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}