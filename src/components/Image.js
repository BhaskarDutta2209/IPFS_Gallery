import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import "./Image.css"
// import baguetteBox from 'baguettebox.js'

const accesLisnk = "https://ipfs.infura.io/ipfs/"

// baguetteBox.run('.gallery')
class Image extends Component {
    render() {
        var hashList = this.props.list
        return(
            <InfiniteScroll>
                {
                    hashList.map((hash)=>{
                        return(
                            <div className="gallery">
                                    <img src={accesLisnk+hash[1]}  width="1000" height="600"/>
                                <div className="desc">#Id: {hash[0]}</div>
                            </div>
                        )
                    })
                }
            </InfiniteScroll>
        )
        // <div class="gallery">
        //     <a target="_blank" href="img_5terre.jpg">
        //          <img src={this.props.url} alt="Cinque Terre" width="600" height="400" />
        //     </a>
        //     <div class="desc">Add a description of the image here</div>
        // </div>

    }
}

export default Image;