import {connect} from "react-redux";
import RegisterView from "../layouts/registerView";

mapStateToProps = (state, ownProp) => ({
    app: state,
});

export default connect(mapStateToProps)(RegisterView)
