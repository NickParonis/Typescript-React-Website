import IntroductionSection from './components/IntroductionSection/IntroductionSection.tsx';
import CardListSection from './components/CardListSection/CardListSection.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
// import ContactSection from './components/ContactSection/ContactSection.tsx';
// import MusicSection from './components/MusicSection/MusicSection.tsx';
import './index.css'
// import AboutSection from './components/AboutSection/AboutSection.tsx';
// import "./styles/global.css";
// import ChatSection from './components/ChatSection.tsx';


function App(){
  return (
    <>
      <Navbar />
      <IntroductionSection />
      <CardListSection />
      {/* <ContactSection />
      <MusicSection />
      <AboutSection /> */}
      {/* <BasicModal /> */}
    </>
  );
}
export default App;