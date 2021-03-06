import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import * as constant from './constant';
import { Button } from 'semantic-ui-react';

class ProductsPage extends Component {
    state = {
        Products:[],
        subCatId:null
        }

    componentDidMount() {
        // console.log(this.props)
        let catid = this.props.match.params.categoryId;
        let subcatid = this.props.match.params.subcategoryId;
        axios.get(constant.ms1+'/categories/' + catid + "/" + subcatid)
            .then(res => {
                console.log(res.data);
                if(res.data.statusCode===200){
                    this.setState({
                        Products: res.data.responseData,
                        subCatId:subcatid,
                        filterBy:null
                    })
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch(error=> {
                console.log(error);
            });
        }
    // componentDidMount(){
    // }

    handleFilter=(value)=>{
        axios.get(constant.ms4+'/filterByPopularScore/'+this.state.subCatId+'/'+value)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    Products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }
    handleSortLow=()=>{
        axios.get(constant.ms4+'/sortByPriceLTH/'+this.state.subCatId)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    Products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    handleSortHigh=()=>{
        axios.get(constant.ms4+'/sortByPriceHTL/'+this.state.subCatId)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    Products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    render() {
        const prod = this.state;
        const products = prod.Products
        const productsList = this.state.Products.length ? (
            products.map((product, index) => {
                let features=[];
                let products1=product.genFeatures;
                for(let key in products1)
                   features.push(products1[key])
                return (
                    <div className="products row" key={index}>
                    <hr/>
                    <Link to ={'/product/'+product.productId}>
                        <div className="collection-item col s3">Name:</div>
                        <div className="collection-item col s3">{product.productName}</div>
                        <div className="collection-item col s3">Brand:</div>
                        <div className="collection-item col s3">{product.brand}</div>
                        <div className="collection-item col s3">Price:</div>
                        <div className="collection-item col s3">Rs.{product.price}</div>
                        <div className="collection-item col s3">Product Description:</div>
                        <div className="collection-item col s3">{product.desc}</div>
                        {/* <div className="collection-item col s3">{features.map(item=>{return item})}</div> */}
                        <div>
                        </div>
                        </Link>
                    </div>
                )
            })
        ) : (
                <div className="center">
                    No Products To Show
            </div>
            )
        return (
            <div className="container">
                <div className="row">
                <div className="col s6">
                    <Button className="btn" onClick={this.handleSortHigh}>Sort By Decreasing Price</Button>
                </div>
                <div className="col s3">
                </div>
                <div className="col s3">
                    <Button className="btn" onClick={()=>{this.handleFilter(4)}}>4 Star Products</Button>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <Button className="btn" onClick={this.handleSortLow}>Sort By Increasing Price</Button>
                </div>
                <div className="col s3">
                </div>

                <div className="col s3">
                    <Button className="btn" onClick={()=>{this.handleFilter(5)}}>5 Star Products</Button>
                </div>
            </div>
            {/* <input type="radio" value="4" checked={this.state.filterBy==4} onChange={this.handleOptionChange}/> */}
                {productsList}
            </div>
        )
    }
}
export default ProductsPage;