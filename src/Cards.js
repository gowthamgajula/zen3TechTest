import React, { Component } from "react";
import Dialog from "react-dialog";
import PropTypes from "prop-types";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentPost: "",
      commentsList: [],
      likes: 0,
      isLike: true,
      isDialogOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnLike = this.handleUnLike.bind(this);
    this.wrapperRef = React.createRef();
    // this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  handleSubmit() {
    if (this.state.commentPost.length === 0) {
      return;
    }

    const newItem = {
      commentPost: this.state.commentPost,
      id: Date.now(),
    };

    this.setState({
      commentsList: this.state.commentsList.concat(newItem),
      commentPost: "",
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      // alert('You clicked outside of me!');
    }
  }

  handleChange(e) {
    this.setState({ commentPost: e.target.value });
  }

  handleLike() {
    this.setState({ likes: this.state.likes + 1, isLike: false });
  }

  handleUnLike() {
    this.setState({ likes: this.state.likes - 1, isLike: true });
  }

  deleteRow(index) {
    console.log(index);
    var comments1 = this.props.item.comments;
    comments1.splice(index, 1);
    this.setState({ comments1 });
  }

  render() {
    const comments = this.props.item.comments.map((com, i) => (
      <div className="commentStyle" key={com}>
        {" "}
        {com}{" "}
        <span
          className="delComment"
          onClick={this.deleteRow.bind(this)}
          index={i}
        >
          x
        </span>
      </div>
    ));

    const comments1 = this.state.commentsList.map((com, i) => (
      <div className="commentStyle" key={com.id}>
        {" "}
        {com.commentPost}{" "}
        <span
          className="delComment"
          onClick={this.deleteRow.bind(this)}
          index={i}
        >
          x
        </span>
      </div>
    ));
    const isLike = this.state.isLike;
    let togleLike;
    if (isLike) {
      togleLike = (
        <label className="like" onClick={this.handleLike}>
          Like
        </label>
      );
    } else {
      togleLike = (
        <label className="like" onClick={this.handleUnLike}>
          Unlike
        </label>
      );
    }

    return (
      <div className="imageSection" ref={this.wrapperRef}>
        {" "}
        {this.props.children}
        <div className="imgCards">
          <img
            className="img"
            src={this.props.item.url}
            alt=""
            onClick={this.openDialog}
          />

          {this.state.isDialogOpen && (
            <Dialog
              modal={true}
              onClose={this.handleClose}
              buttons={[
                {
                  text: "Close",
                  onClick: () => this.handleClose(),
                },
              ]}
            >
              <img className="modalImg" src={this.props.item.url} alt="" />
            </Dialog>
          )}

          <div className="imgDetails">
            <div className="imgCaptions">
              <div className="labelStyle">
                <label className="noCount">
                  {this.props.item.likes + this.state.likes}
                </label>
                {togleLike}
              </div>
              <div className="typeDiv">
                <label className="typeImg">{this.props.item.category}</label>
              </div>
            </div>
          </div>
          <div className="imgDetails">
            <div className="postComment">
              <input
                className="inputCommnt"
                type="text"
                placeholder="Type Your Comment here..."
                value={this.state.commentPost}
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className="postbtn"
                onClick={this.handleSubmit}
              >
                post
              </button>
            </div>
          </div>
          <div className="imgDetails">
            <div className="listComment">
              {comments} {comments1}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Cards.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Cards;
