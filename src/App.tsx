import IntroductionSection from './components/IntroductionSection/IntroductionSection.tsx';
import CardListSection from './components/CardListSection/CardListSection.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import { ChatSection } from './components/ChatSection/ChatSection.tsx';
// import ContactSection from './components/ContactSection/ContactSection.tsx';
// import MusicSection from './components/MusicSection/MusicSection.tsx';
import './index.css'
// import AboutSection from './components/AboutSection/AboutSection.tsx';
// import "./styles/global.css";


function App(){
  return (
    <>
      <Navbar />
      <IntroductionSection />
      <CardListSection />
      <ChatSection />
      {/* <ContactSection />
      <MusicSection />
      <AboutSection /> */}
      {/* <BasicModal /> */}
    </>
  );
}
export default App;