import Header from "./containers/Header/Header.tsx";
import PortfolioGrid from "./containers/Portfolio Grid/PortfolioGrid.tsx";

import './App.scss';
import ContactMeWidget from "./components/ContactMeWidget/ContactMeWidget.tsx";

const App = () => {
    return (
        <main>
            <Header />
            <PortfolioGrid />
            <ContactMeWidget />
        </main>
    );
};

export default App;
