import Header from "./Header";
import "./styles.scss";

export default function Layout({children}) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}