import React from "react";
import { Route, Redirect } from "react-router-dom";

interface IPrivateRoute {
	component?: any;
	Component?: any;
	authed?: boolean;
	username?: string;
	path?: any;
	exact?: any;
}

const PrivateRoute: React.SFC<IPrivateRoute> = ({
	component: Component,
	authed,
	username,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props =>
				authed === true ? (
					<Component {...props} username={username} />
				) : (
					<Redirect to={{ pathname: "/", state: { from: props.location } }} />
				)
			}
		/>
	);
};

export default PrivateRoute;
