import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "./../../actions/profileActions";
import { logoutUser } from "./../../actions/authActions";
import Spinner from "./../common/Spinner";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = () => {
    this.props.deleteAccount(); //deletes account and unauthenticates
    this.props.logoutUser(); //Destroys token on LS so no accidental login
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete my Account
            </button>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not setup a profile yet. Please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  logoutUser
})(Dashboard);
