import React from 'react'
import GoogleApiWrapper from './Map'
import icon1 from './magnifier-tool.png'

class LocationSelect extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLocation: {
                lat: 12,
                lng: 7
            },
            manual: '',
            isOpen: false,
            Lcomponent: true
        }
    }
    handleCurrent = () => {
        let _this = this
        if (navigator && navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;

                _this.setState({
                    currentLocation: {
                        lat: Number(coords.latitude),
                        lng: Number(coords.longitude)
                    },
                    isOpen: false,
                    Lcomponent: false
                }, () => {

                })
            })
        }

    }
    handleManual = () => {
        if (!this.state.isOpen) {
            this.setState({ isOpen: true })
        }
        else { this.setState({ isOpen: false }) }

    }
    handleChange = (e) => {
        this.setState({ manual: e.target.value })

    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ Lcomponent: false })
    }

    render() {

        return (
            <div className="locationselect">
                {this.state.Lcomponent && (<div>
                    <img className="searchicon" alt="hi " src={icon1} />
                    <h3>Where you want the service</h3>
                    <button className="btn1" onClick={this.handleCurrent}>
                        Choose current Location
                                                </button><br /><br />
                    <button onClick={this.handleManual}>
                        Enter manual Location
                                                </button>
                    {this.state.isOpen && (<form className="locationform" onSubmit={this.handleSubmit} >
                        <input type="text" value={this.state.manual} onChange={this.handleChange}></input>
                        <input className="submit" type="submit" />
                    </form>
                    )
                    }
                </div>)
                }
                {!this.state.Lcomponent && <GoogleApiWrapper current={this.state.currentLocation} manual={this.state.manual} />}
            </div>

        )
    }
}
export default LocationSelect