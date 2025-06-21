import Footer from "../Footer";
import Header from "../Header";

function DefaultLayout({ children }: any) {
  return (
    <div className="min-h-screen bg-white font-lexend">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
