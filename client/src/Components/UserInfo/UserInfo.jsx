
import { useUser } from '../../UserContext'
import '../../styles/UserInfo.css';

const UserInfo = () => {
  const user = useUser();

  return (
    <div className="user-container">
      <div className="user-header">
        <h3 className="user-name">{user.firstName}</h3>
        <p className="user-username">{user.username}</p>
        <p className="user-email">{user.email}</p>
      </div>
      <div className="user-details">
        <div className="user-phone">
          <p><strong>Phone</strong></p>
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;