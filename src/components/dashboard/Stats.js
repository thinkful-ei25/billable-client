import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData } from '../../actions/protected-data';
import { Line } from 'react-chartjs-2';




export class Stats extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (

            <div>
                < Line data={{
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "Minutes",
                        backgroundColor: 'transparent',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [0, 10, 5, 2, 20, 30, 45],
                    },
                    {
                        label: "Calls",
                        backgroundColor: 'transparent',
                        borderColor: 'rgb(0, 255, 89)',
                        data: [5, 4, 23, 5, 13, 15, 4]
                    }]
                }} />
            </div>

        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        // username: state.auth.currentUser.username,
        // name: `${currentUser.firstName} ${currentUser.lastName}`,
        // protectedData: state.protectedData.data
    };
};

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));

export default connect(mapStateToProps)(Stats);
