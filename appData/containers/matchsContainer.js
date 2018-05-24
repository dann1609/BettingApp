import {connect} from "react-redux";
import MatchsView from "../layouts/matchsView";

mapStateToProps = (state, ownProp) => ({
    app: state,
});

export default connect(mapStateToProps)(MatchsView)
