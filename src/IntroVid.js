import React from 'react';

class IntroVid extends React.Component {
    state = {  }
    render() {
        return (
            <div className="video_frame">
                <iframe className="video" width="420" height="315"
                    src="https://player.vimeo.com/video/231737519?byline=0&portrait=0&autoplay=1&title=0&background=1" allow="autoplay">
                </iframe>
            </div>
        );
    }
}

export default IntroVid;