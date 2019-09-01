// Github usernames: ssjsid, cyberdanes, technomudit

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card{...profile}/>)}
  </div>
);

class Form extends React.Component{
  state={userName : ''};
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  };
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Github username" value={this.state.userName} onChange={event => this.setState({userName: event.target.value})} required/>
        <button>Add card</button>
      </form>
    );
  }
}

class Card extends React.Component{
  render(){
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}
class App extends React.Component{
  //constructor
//  constructor(props){
//    super(props);
//   this.state={
//      profiles:testData,
//    };
//  }
  
  state={
    profiles:[],
  };

  addNewProfile = (profileData) => {
   this.setState(prevState => ({
     profiles: [...prevState.profiles, profileData],
   }));
  };
  //this
  
  render(){
    return (
    <div>
      <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
    </div>
      );
  }
}

//const App = ({title}) => (
//  <div className="header">{title}</div>
//);

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);