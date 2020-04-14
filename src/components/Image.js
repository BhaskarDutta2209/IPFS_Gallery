import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import "./Image.css"

const accessLink = "https://ipfs.infura.io/ipfs/"

class Image extends Component {
    render() {
        var hashList = this.props.list
        return(
            <InfiniteScroll>
                {
                    hashList.map((hash)=>{
                        return(
                            <div className="gallery">
                                    <img src={accessLink+hash[1]}  width="1000" height="600"/>
                                <div className="desc">#Id: {hash[0]}</div>
                            </div>
                        )
                    })
                }
            </InfiniteScroll>
        )
    }
}

export default Image;