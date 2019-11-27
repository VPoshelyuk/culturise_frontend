import React from 'react';
import IntroVid from './IntroVid'

class MainBody extends React.Component {
    state = {  }
    render() {
        return (
            <div>
                <IntroVid />
                <p>nearest map?</p>
                <object src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
                async defer />
                <p>nearest carousel</p>
                <p>top picks</p>
                <p>picks by neighbourhood</p>
            </div>
            
        );
    }
}

export default MainBody;