import React, { Component } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import Geocode from 'react-geocode'
import icon from './icon.png'


export class MapWrap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLocation: {
                lat: this.props.current.lat,
                lng: this.props.current.lng
            },
            address: '',
            yourLocation: '',
            flat: '',
            gender: ''
        }
    }


    onDragend = (e, data) => {
        const { center } = data
        const currentLocation = {
            lat: center.lat(),
            lng: center.lng()
        }

        Geocode.setApiKey(process.env.REACT_APP_MAP_API)
        Geocode.fromLatLng(`${center.lat()}`, `${center.lng()}`).then(
            response => {
                const address = response.results[0].formatted_address;

                this.setState({ address })
            },
            error => {
                console.error(error);
            }
        );
        this.setState({
            currentLocation
        })
    }

    componentDidMount() {
        Geocode.setApiKey(process.env.REACT_APP_MAP_API)
        if (this.props.manual != '') {

            Geocode.fromAddress(this.props.manual).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({
                        address: this.props.manual,
                        currentLocation: {
                            lat,
                            lng
                        }
                    })
                },
                error => {
                    console.error(error);
                }
            );
        } else {
            Geocode.fromLatLng(`${this.props.current.lat}`, `${this.props.current.lng}`).then(
                response => {
                    const address = response.results[0].formatted_address;

                    this.setState({
                        address,
                        currentLocation: this.props.current
                    })
                },
                error => {
                    console.error(error);
                }
            );

        }


    }

    render() {


        return (

            <div className="main" >

                <div className="markerdiv">
                    <img className="marker" alt="error img" src={icon}></img>

                </div>
                <div className="gmap">
                    <Map
                        google={this.props.google}
                        center={this.state.currentLocation}
                        zoom={17}
                        zoomControl={false}
                        scrollwheel={false}
                        draggable={true}
                        onDragend={this.onDragend}

                    >



                    </Map>




                </div>
                <div className="mapformdiv">
                    <form >
                        <fieldset>
                            <legend>Your Location</legend>
                            <input type="text" value={this.state.address} placeholder="your location" />
                        </fieldset>
                        <br />


                        <input className="input" type="text" value={this.state.flat} placeholder="Flat/Building" />
                        <br /><br />

                        <select value={"this.state.gender"} >
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                        </select>
                        <input className="input" type="text" />
                    </form>
                </div>

            </div>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API
})(MapWrap)