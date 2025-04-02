import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/logo.jpeg'
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar-container'>
      <div className='logo-container'>
        <NavLink to="/"><img src={logo} alt='Home Logo' className='logo'/></NavLink>
        <div/>
        <ul className='nav-bar'>
      {sessionUser && (
        <li className='create-spot'>
          <NavLink to='/spots/new'>
          <button className='create-spot-button'>Create a New Spot</button>
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to='/spots/current'>Manage Spots</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </ul>
    </div>
    </div>
  );
}

export default Navigation;