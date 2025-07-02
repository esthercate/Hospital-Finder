import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Maps from './components/Maps';
import Feature from './components/Feature';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
	return (
		<div>
			<Navbar />
			<Hero />
			<Maps />
			<Feature />
			<Contact />
			<Footer />
		</div>
	);
}
