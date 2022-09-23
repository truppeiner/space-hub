import '../../assets/css/home.css';
import videoBg from '../../assets/landing-background.mp4';

function Home(){
    return(
        <>
            <div class='main'>
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

export default Home;


