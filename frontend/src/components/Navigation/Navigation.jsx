import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
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
  );
}

export default Navigation;