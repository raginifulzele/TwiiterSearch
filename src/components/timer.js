import React, { Component } from "react";

export default class Timer extends Component {
  state = {
    seconds: 30
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        this.setState(() => ({
          seconds: 30
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { seconds } = this.state;
    return <span>{seconds} </span>;
  }
}
