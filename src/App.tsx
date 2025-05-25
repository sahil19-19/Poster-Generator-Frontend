import "./App.css";
import Footer from "./components/footer/footer";
import PosterForm from "./components/poster_form/posterForm";

function App() {
    return (
        <div className="outer-container">
            <div className="container">
                <h1>Poster Generator</h1>
                <hr />
                <PosterForm />
            </div>
			<Footer/>
        </div>
    );
}

export default App;
