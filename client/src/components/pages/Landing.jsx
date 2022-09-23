import '../../assets/css/home.css';
import Header from '../layout/Header';
import videoBg from '../../assets/landing-background.mp4';

function Landing(){
    return(
        <>
            <div class='main'>
                <Header/>
                <video 
                    src={videoBg}
                    autoPlay
                    loop
                    muted
                    />
            </div>
        </>
    )
}

export default Landing;


