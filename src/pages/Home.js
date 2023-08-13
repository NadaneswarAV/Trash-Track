import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Caurousel from '../components/Caurousel';
import b1 from "../images/b1.jpeg" 
const Home = () => {
    return (
    <>
    <div>
        <div>
        <Navbar />
    </div>
    <div >
    <Caurousel/>

    </div>
  
    <div >
        <h1 className='heading1'>TRASH TRACK</h1>
            <h2 className='heading2'>INTRODUCTION</h2>
                <p className='paragraph'>'Trash Track' is a web application aimed to provide a digital way of complaining about waste or
                 garbage problems near their locality to their respective municipalities.</p>
<p className='paragraph'>1.Allows general citizens to easily report and communicate their concerns regarding waste management, fostering a more efficient 
and responsive approach to addressing such issues.</p>
<p className='paragraph'>1.Users can see their complain Report and check if the work is done! or not.</p>
    </div>
    <div>
    <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <p className='paragraph'>Waste management is a crucial concern in today's world. The accumulation of waste 
                        in every nook and corner of the streets is alarming. Proper waste management can reduce the negative impact of waste on the environment 
                        and public health. It also promotes the reuse and recycling of resources like paper, cans, and glass. Waste management encompasses the disposal of solid, liquid, gaseous, and hazardous substances.</p>
                    </div>
                    <div style={{ flex: 1 }}>
                        <img src={b1} alt="Waste Management" style={{ width: '100%', height: 'auto' }} />
                    </div>
    </div>
    </div>
    <div>
        
                <p className='paragraph'>Complaining about the waste problem encountered everyday to municipality
                 is hefty process and Trash Track aims to make this process easier. With a simple handheld 
                 device with access to internet, user can use this platform complain their concerns to municipality .
                  The automated system will redirect the complains .The municipality admins at the receiving side can 
                  acknowledge the reports which lets the users whether their complain is adddressed or not.</p>

    </div>
    </div>
    
   
    <div>
    <Footer />

    </div>
    </>
    )
}




export default Home;