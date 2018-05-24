import {connect} from "react-redux";
import BettsView from "../layouts/bettsView";

mapStateToProps = (state, ownProp) => ({
    app: state,
});

export default connect(mapStateToProps)(BettsView)
