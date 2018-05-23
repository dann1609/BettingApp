import {connect} from "react-redux";
import LoginView from "../layouts/loginView";

mapStateToProps = (state, ownProp) => ({
    app: state,
});

export default connect(mapStateToProps)(LoginView)
