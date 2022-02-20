import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import HorizontalPeter from '../assets/horizontal_peter.png';
import Logo from '../assets/logo_off_white.png';

const LandingPage = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();
  return (
    <div>
        <section className="mb-40 background-radial-gradient">
          <nav className="navbar navbar-expand-lg rounded-md shadow-md py-2 bg-white relative flex items-center w-full justify-between">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
              <div className="flex items-center">
                <button
                  className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContentY"
                  aria-controls="navbarSupportedContentY"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    className="w-5"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                    ></path>
                  </svg>
                </button>
                <a className="navbar-brand text-blue-600">
                  <img src={HorizontalPeter} alt="Logo" className="h-10"/>
                </a>
              </div>
              {/* <div id="navbarSupportedContentY">
                <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                  <li className="nav-item ml-8">
                    <p className="font-['Permanent_Marker']">Homework Homies</p>
                  </li>
                </ul>
              </div> */}
              <div className="flex items-center lg:ml-auto">
                <button type="button" className="inline-block px-6 py-2.5 bg-peach text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-dark-peach hover:shadow-lg focus:bg-dark-peach focus:shadow-lg focus:outline-none focus:ring-0 active:dark-peach active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" 
                  onClick={() => {
                    loginWithPopup();
                  }}>Login with Google</button>
              </div>
            </div>
          </nav>

          <div className="px-6 py-12 md:px-12 text-center lg:text-left bg-white rounded-md mt-3">
            <div className="container mx-auto xl:px-32">
              <div className="grid lg:grid-cols-2 gap-12 flex items-center">
                <div className="mt-12 lg:mt-0">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">Gamify your student experience</h1>
                  <p className="text-lg md:text-xl xl:text-2xl tracking-tight mb-12">Race your friends to complete your homework and keep each other motivated!</p>
                  {isAuthenticated ? (
                    <Link className="inline-block px-7 py-3 mr-2 bg-gray-200 text-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" to="/dashboard" role="button">To my dashboard!</Link>
                  ) : (
                    <Link className="inline-block px-7 py-3 mr-2 bg-gray-200 text-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" to="/dashboard" role="button" 
                    onClick={() => {
                      loginWithPopup();
                    }}>Let's Login</Link>
                  )}
                </div>
                <div className="mb-12 lg:mb-0">
                  <img
                    src={Logo}
                    className="w-full rounded-lg shadow-lg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default LandingPage;
