import React, { Component } from "react";
import axios from "axios";
import Cards from "./Cards";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { imgList: [], filter: "" };
    this.mostLiked = this.mostLiked.bind(this);
    this.mostCommented = this.mostCommented.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  mostLiked() {
    this.setState((prevState) => {
      return this.state.imgList.sort((a, b) => b.likes - a.likes);
    });
  }

  mostCommented() {
    this.setState((prevState) => {
      this.state.imgList.map((commt) => {
        return commt.comments.sort((a, b) => b - a);
      });
    });
  }

  handleChange(e) {
    this.setState({ filter: e.target.value });
  }

  componentDidMount() {
    axios
      .get(
        ` https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json`
      )
      .then((res) => {
        this.setState({ imgList: res.data.pics });
      });
  }

  render() {
    const { filter } = this.state;
    const filterPic = this.state.imgList.filter((val) => {
      return val.category.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
    const imgCards = filterPic.map((item) => (
      <Cards key={item.id} item={item} />
    ));
    return (
      <div>
        <div className="mainDiv">
          <div className="title">
            <label className="App">Imaginary</label>
          </div>

          <div className="fields">
            <div className="first">
              <label className="mostLiked" onClick={this.mostLiked}>
                Most Liked
              </label>
              <label className="mostComment" onClick={this.mostCommented}>
                Most Commented
              </label>
            </div>
            <div className="second">
              <input
                type="text"
                placeholder="Search Images..."
                value={this.state.filter}
                onChange={this.handleChange}
              />
            </div>
            <div className="third"></div>
          </div>

          <div className="cardStyle">{imgCards}</div>
        </div>
      </div>
    );
  }
}

export default Gallery;
