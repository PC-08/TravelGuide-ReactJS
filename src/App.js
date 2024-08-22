import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here

const GetCard = props => {
  const {each} = props
  const {name, imageUrl, description} = each

  return (
    <li className="li">
      <img className="img" alt={name} src={imageUrl} />
      <div className="licon">
        <h1 className="headli">{name}</h1>
        <p>{description}</p>
      </div>
    </li>
  )
}

class App extends Component {
  state = {placeData: '', isLoading: true}

  componentDidMount() {
    this.getPlaceData()
  }

  getPlaceData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()

    const formatedData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))
    console.log(formatedData)
    this.setState({placeData: formatedData, isLoading: false})
  }

  render() {
    const {placeData, isLoading} = this.state
    console.log(placeData)
    return (
      <div>
        {isLoading ? (
          <div className="bg">
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          </div>
        ) : (
          <div className="bg-2">
            <h1 className="head">Travel Guide</h1>
            <ul className="ul">
              {placeData.map(each => (
                <GetCard key={each.id} each={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default App
