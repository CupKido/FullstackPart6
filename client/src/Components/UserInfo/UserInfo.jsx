
import { useUser } from '../../UserContext'
import '../../styles/UserInfo.css';

const UserInfo = () => {
  const user = useUser();

  return (
    <div className="user-container">
      <div className="user-header">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-username">{user.username}</p>
        <p className="user-email">{user.email}</p>
      </div>
      <div className="user-details">
        <div className="user-address">
          <p><strong>Address</strong></p>
          <p>
            {user.address.street}, {user.address.suite}<br />
            {user.address.city} - {user.address.zipcode}
          </p>
        </div>
        <div className="user-phone">
          <p><strong>Phone</strong></p>
          <p>{user.phone}</p>
        </div>
        <div className="user-website">
          <p><strong>Website</strong></p>
          <p>{user.website}</p>
        </div>
        <div className="user-company">
          <p><strong>Company</strong></p>
          <p>{user.company.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;