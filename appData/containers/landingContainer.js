import {connect} from "react-redux";
import LandingView from "../layouts/landingView";

mapStateToProps = (state, ownProp) => ({
    app: state,
});

export default connect(mapStateToProps)(LandingView)
