class App extends React.Component {
  constructor() {
    super();
    this.state = {
      colClass: "Col1" };

    this.handleColChange = this.handleColChange.bind(this);
  }

  handleColChange(color) {
    this.setState({
      colClass: color });

  }

  render() {
    return (
      React.createElement("div", { id: "app", className: this.state.colClass },
      React.createElement(Quotebox, { onChangeCol: this.handleColChange, color: this.state.colClass })));


  }}
;

class Quotebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      tweetUrl: '',
      compCol: this.props.color };

    this.getQuote = this.getQuote.bind(this);
    this.getQuote();
  }
  getQuote() {
    const app = this;
    const colors = ["Col2", "Col3", "Col4", "Col5", "Col6"];
    let color = colors[Math.floor(Math.random() * colors.length)];
    while (color == this.state.compCol) {
      color = colors[Math.floor(Math.random() * colors.length)];
    }
    this.setState({
      compCol: color });

    this.props.onChangeCol(color);
    fetch('https://api.quotable.io/random').
    then(response => response.json()).
    then(data => {
      app.setState({
        quote: data.content,
        author: data.author,
        tweetUrl: "https://twitter.com/intent/tweet/?text=" + data.content.replace(/ /g, "+") });

    });
  }

  render() {
    return (
      React.createElement("div", { id: "quote-box" },
      React.createElement("div", { id: "quote-main" },
      React.createElement("div", { id: "text" }, React.createElement("i", { class: "fas fa-quote-left" }), " ", this.state.quote),
      React.createElement("div", { id: "author" }, "-", this.state.author)),

      React.createElement("div", { id: "interact" },
      React.createElement("button", { id: "new-quote", onClick: this.getQuote, className: "button1" }, "New Quote"),
      React.createElement("a", { href: this.state.tweetUrl, target: "_blank", id: "tweet-quote" }, React.createElement("i", { class: "fab fa-twitter" })))));



  }}
;
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));