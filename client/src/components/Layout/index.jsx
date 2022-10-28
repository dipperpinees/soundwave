import Header from "./Header";
import Navbar from "./Navbar";
import "./styles.scss";

export default function Layout({children}) {
    return (
        <>
            <Header />
            <Navbar />
            {children}
        </>
    )
}